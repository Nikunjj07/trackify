import express,{ Router } from "express";
import zod from "zod"
import { sign } from "jsonwebtoken"
import { Prisma, PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt"

const userRouter = Router();
const client = new PrismaClient();

const signupSchema = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    password: zod.string()
})

userRouter.post("/signup",async (req,res)=>{
    const body = req.body;
    const secret = process.env.JWT_SECRET || "";

    const {success} = signupSchema.safeParse(body);
    if(!success){
        res.json({
            message:"Incorrect Inputs!"
        });    
    }
    const findUser = await client.user.findFirst({
        where:{
            email: body.email
        }
    })
    if(findUser){
        res.json({
            message: "Email already taken / Incorrect inputs"
        })
        return
    }

    //hashing pass
    const hashedPassword = await bcrypt.hash(body.password,10);

    try {
        const user = await client.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: hashedPassword,
        }
        });
        const token = sign({id: user.   id},secret) //check format
        console.log(token)
        // add cookie or jwt
        res.cookie("token",token)
        res.json({
            message:"User created successfully!"
        })
    } catch(e) {
        console.log(e);
    }
})

const signinSchema = zod.object({
    email: zod.string().email(),
    password: zod.string()
})

userRouter.post("/signin",async(req,res)=>{
    const body = req.body;
    const secret = process.env.JWT_SECRET || "";
    const parsed = signinSchema.safeParse(body);

    if(!parsed){
        res.status(411).json({
            message:"incorrect inputs!"
        });
        return
    }

    const user = await client.user.findUnique({
        where:{
            email: body.email
        }
    })
    if(!user){
        res.json({
            message:"user not found!"
        })
        return
    }
    const isMatch = bcrypt.compareSync(body.password, user.password);

    if(!isMatch){
        res.json({
            message:"Incorrect Password!"
        })
        return
    }
    
    const token = sign({id: user.id},secret)
    res.cookie("token",token);
    res.json({
        message:"User Signed In!"
    })

})

userRouter.post("/signout",(req, res)=>{
    res.clearCookie("token");
    res.redirect("/landing");//confirm later on
})


export default userRouter;