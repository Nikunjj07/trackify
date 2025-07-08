'use client'
import { useEffect, useState } from "react";
import { SidebarItem } from "./SidebarItem";

async function getHabits(){
    let response = await fetch("http://localhost:3003/api/habit")
    return response
}

export function SideBar({OnClick}:{OnClick: ()=> void}){
    const [habits, setHabits] = useState<any[]>([]);

    useEffect(() => {
        async function fetchHabits() {
        try {
            const response = await fetch("http://localhost:3003/api/habit",{
                method: "GET",
                credentials: "include"
            });
            const data = await response.json();
            setHabits(data);
            console.log(data);
        } catch (error) {
            console.error("Error fetching habits:", error);
        }
        }

        fetchHabits();
    },[]);
    return(
        <div>
            <button className="p-4 pr-35 px-6 mx-2 rounded-xl font-bold cursor-pointer hover:bg-zinc-900" onClick={OnClick}>Add Habit</button>
            {habits.map((habit, index) => (
                <div key={index} className="">
                    <SidebarItem href="" title={habit.name}/>
                </div>
            ))}
        </div>
    )
}