import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const checkInRouter = Router();
const client = new PrismaClient();

checkInRouter.post("/",async(req,res)=>{
    const {habitId} = req.body;
    const userId = (req as any).userId

    if (!userId || !habitId){
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

        res.json({
            checkIn: checkIn
        })
    }catch(e){
        console.error;
    }
})

checkInRouter.get("/",async(req,res)=>{ //heatmaps
    const {habitId} = req.query;

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