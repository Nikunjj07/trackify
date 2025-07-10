import { useState } from "react";
import { Button } from "./ui/Button";
import { InputBox } from "./ui/InputBox";
import { motion } from "framer-motion";

export function PopUpInput({OnClose, OnSubmit}:{OnClose:()=>void, OnSubmit: ()=>void}){
    const [habitName, setHabitName] = useState("");
    const [streakGoal, setStreakGoal] = useState("");
    const handleSubmit = async()=>{
        try{
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/habit/add`,{
            method:"POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                name: habitName,
                streakGoal: Number(streakGoal),
            }),
          })
          if(response.ok){
            OnSubmit()
          }
        }catch(e){
            console.error()
        }
      }

    return <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-800/80 bg-opacity-25">
        <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="bg-zinc-800 p-6 rounded-xl shadow-2xl h-75 w-96 flex flex-col gap-4"
        >
            <InputBox Placeholder="Meditation" Label="Habit" Type="text" OnChange={(e)=>{setHabitName(e.target.value)}}/>
            <InputBox Placeholder="7" Label="Streak Goal" Type="number" OnChange={(e)=>{setStreakGoal(e.target.value)}}/>
            <Button Label="Add" OnClick={handleSubmit} size="long"/>
            <Button Label="Close" OnClick={OnClose} size="long"/>
        </motion.div>
    </div>
}