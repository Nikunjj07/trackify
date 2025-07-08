'use client'
import { useEffect, useState } from "react"
import { Button } from "./ui/Button"

export function CheckIn(){
    const [checkedIn, setCheckedIn] = useState(false);
    const [label, setLabel] = useState("Check In");

    

    return <div className="bg-zinc-800 min-w-2xl flex flex-col items-center justify-around h-95 rounded-2xl">
        <div className="font-bold text-xl p-4">Reading</div>
        <div className="font-bold text-2xl">Current Streak: {1}</div>
        <Button Label={label} size="short" OnClick={()=>{
            setCheckedIn(true)
            setLabel("Checked In")
        }}/>
        <div className="font-thin ">{checkedIn ? "Great Job! Come back tomorrow to update" : "Check in for today!"}</div>
    </div>
}