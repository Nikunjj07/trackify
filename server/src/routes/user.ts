import express,{ Router } from "express";
import zod from "zod"
import { Prisma, PrismaClient, User } from "@prisma/client";

const userRouter = express.Router();
const client = new PrismaClient();


const signupSchema = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    password: zod.string()
})

userRouter.post("/signup",async (req,res)=>{
    const body = await req.body;
    
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
        return res.json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    try {
        const user = await client.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: body.password,//change to hash password
        }
        });
            
        return res.json({
            id: user.id,
            name: user.name,
            email: user.email
        })
    } catch(e) {
        console.log(e);
    }
})

export default userRouter;