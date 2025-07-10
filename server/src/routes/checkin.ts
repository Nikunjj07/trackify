import { PrismaClient } from "@prisma/client";
import { RequestHandler, Router } from "express";
import { updateStreak } from "../services/streakService";
import { authMiddleware } from "../middleware";

const checkInRouter = Router();
const client = new PrismaClient();
checkInRouter.use(authMiddleware as RequestHandler)

checkInRouter.post("/",async(req,res)=>{
    const habitId = Number(req.body.habitId);
    console.log(habitId)
    const userId = (req as any).userId

    if (!habitId){
        res.status(401).json({
            message:"User or Habit not found!"
        })
        return
    }
    try{
        const date = new Date()
        const existing = await client.checkIn.findFirst({
            where:{
                habitId:habitId,
                date: date.toISOString()
            }
        })
        console.log("here")
        if(existing){
            res.json({
                message:"checkIn already exists!"
            })
            return
        }

        const checkIn = await client.checkIn.create({
            data:{
                habitId:habitId,
                date: date.toISOString()
            }
        })
        await updateStreak(habitId);
        res.json({
            checkIn: checkIn
        })
        return
    }catch(e){
        console.log(e);
        res.json({message:"Server error"})
    }
})

checkInRouter.get("/:id",async(req,res)=>{ //heatmaps
    const habitId = Number(req.params.id);

    try{
        const checkIns = await client.checkIn.findMany({
            where:{
                habitId: Number(habitId)
            },
            orderBy:{
                date:"asc"
            }
        })

        res.json({
            checkIns
        })
    }catch(e){
        console.error
    }
})

export default checkInRouter;