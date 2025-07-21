'use client'
import { ReactNode, useState } from "react"
import { Button } from "./ui/Button"

export function CheckIn({OnSubmit, AfterSubmit, Label, Streak}:{OnSubmit:()=>void,AfterSubmit:()=>void,Label:string, Streak:ReactNode}){
    const [checkedIn, setCheckedIn] = useState(false);
    const [buttonLabel, setButtonLabel] = useState("Check In");
    

    return <div className="bg-zinc-800 min-w-2xl flex flex-col items-center justify-around h-95 rounded-2xl">
        <div className="font-bold text-xl p-4">{Label}</div>
        <div className="font-bold text-2xl">Current Streak: {Streak}</div>
        <Button Label={buttonLabel} size="short" OnClick={()=>{
            OnSubmit()
            setCheckedIn(true)
            setButtonLabel("Checked In")
            AfterSubmit()
        }}/>
        <div className="font-thin ">{checkedIn ? "Great Job! Come back tomorrow to update" : "Check in for today!"}</div>
    </div>
}