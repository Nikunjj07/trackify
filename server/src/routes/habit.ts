import { PrismaClient } from "@prisma/client";
import { RequestHandler, Router } from "express";
import zod from "zod";
import { authMiddleware } from "../middleware";

const habitRouter = Router();
const client = new PrismaClient();
habitRouter.use(authMiddleware as RequestHandler)

const habitSchema = zod.object({
    name: zod.string(),
    description: zod.string().optional(),
    goalStreak: zod.number(),
    reminder: zod.boolean()
})

habitRouter.post("/add",async(req,res)=>{
    const body = req.body;
    const userId = (req as any).userId;
    const success = habitSchema.safeParse(body);
    if (!success){
        res.json({
            message:"Invalid Inputs!"
        })
        return
    }
    try{
        const habit = await client.habit.create({
            data:{
                name:body.name,
                userId: userId,
                description: body.description,
                goalStreak: body.goalStreak,
                reminder: body.reminder
            }
        });
        res.json({
            message:"added habit!"
        })
    }catch(e){
        console.error
    }

})



export default habitRouter;