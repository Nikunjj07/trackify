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
    console.log("check user", userId); ////
    const {success} = habitSchema.safeParse(body);
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


const updateHabitSchema = zod.object({
    name: zod.string().optional(),
    description: zod.string().optional(),
    goalStreak: zod.number().optional(),
    reminder: zod.boolean().optional(),
});

habitRouter.put("/update/:id",async(req,res)=>{
    const habitId = req.params.id;
    const body = req.body;
    const userId = (req as any).userId;

    const {success} = updateHabitSchema.safeParse(body);
    if (!success){
        res.json({
            message:"Invalid Inputs!"
        })
        return
    }
    try{
        const currentHabit = client.habit.findUnique({
            where:{
                id: Number(habitId)
            }
        })
        if(!currentHabit){
            res.json({
                message:"Habit not found"
            })
            return
        }
        const updatedHabit = await client.habit.update({
            where: { id: Number(habitId) },
            data: body,
        });
        res.json({
            message:"habit updated successfully!",
            habit: updatedHabit
        })

    }catch(e){
        console.error
    }

})

habitRouter.delete("/delete/:id",async(req,res)=>{
    const habitId = req.params.id;
    
    try{
        const habit = await client.habit.findUnique({
            where:{
                id: Number(habitId)
            }
        })
        if(!habit){
            res.json({
                message:"invalid habit id"
            })
            return
        }

        const deleted = await client.habit.delete({
            where:{
                id: Number(habitId)
            }
        })
        res.json({
            message:"habit deleted!"
        })
        return
    }catch(e){
        console.error
    }
})

habitRouter.get("/",async(req,res)=>{
    const userId = (req as any).userId;

    if(!userId){
        res.status(401).json({
            message:"Unauthorized"
        })
        return
    }

    try{
        const habits = await client.habit.findMany({
            where:{
                userId: userId
            }
        })
        res.json(habits);
    }catch(e){
        console.error
    }
})

habitRouter.get("/:id",async(req,res)=>{
    const userId = (req as any).userId;
    const habitId = req.params.id

    if(!userId){
        res.status(401).json({
            message:"Unauthorized"
        })
        return
    }

    try{
        const habit = await client.habit.findFirst({
            where:{
                id: Number(habitId)
            }
        })
        res.json(habit);
    }catch(e){
        console.error
    }
})

export default habitRouter;