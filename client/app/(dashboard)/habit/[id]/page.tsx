'use client'
import { CheckIn } from "@/components/Checkin"
import { HeatMapCard } from "@/components/HeatMap";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { CheckInType, HabitType } from "@/types";

export default function Habit(){
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const {id} = useParams()
    const [habit,setHabit]=useState<HabitType | null>(null)
    const [checkins, setCheckins] = useState([]);
    const fetchHabit = async() => {
        try{
            const response = await fetch(`${backendUrl}/habit/${id}`,{
                method: "GET",
                credentials: "include"
            });
            const data = await response.json();
            setHabit(data);
        }catch(e){
            console.error(e)
        }
    }
    const checkInHabit = async()=>{
        try{
          const response = await fetch(`${backendUrl}/checkin`,{
            method:"POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                habitId :id
            }),
          })
          if(response.ok){
            console.log("Checked In!")
          }
        }catch(e){
            console.error(e)
        }
    }
    useEffect(()=>{
        async function fetchCheckins(){
            try{
                const response = await fetch(`${backendUrl}/checkin/${id}`,{
                    method: "GET",
                    credentials: "include"
                });
                const data = await response.json();
                setCheckins(data.checkIns);
            }catch(e){
                console.error(e)
            }
            
        }
        fetchCheckins();
    },[backendUrl, id])

    useEffect(()=>{
        fetchHabit();
    },[fetchHabit]);

    const handleAddHabit = async () => {
        fetchHabit();
    };

    const transformCheckins = (checkIns: CheckInType[]) => {
    const countByDate: { [date: string]: number } = {};

    checkIns.forEach((ci) => {
        const date = ci.date.split("T")[0]; // 'YYYY-MM-DD'
        if (countByDate[date]) {
        countByDate[date]++;
        } else {
        countByDate[date] = 1;
        }
    });

    return Object.entries(countByDate).map(([date, count]) => ({
        date,
        count,
    }));
    };


    return <div className="flex flex-col h-screen w-full items-center justify-around">
        <CheckIn OnSubmit={checkInHabit} AfterSubmit={handleAddHabit} Label={habit?.name || "Habit"} Streak={habit?.streak?.currentStreak || 0}/>
        <div className="min-w-2xl min-h-60">
            <HeatMapCard values={transformCheckins(checkins)}/>
        </div>
    </div>
}