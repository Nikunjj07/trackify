'use client'
import { HabitType } from "@/types";
import { SidebarItem } from "./SidebarItem";



export function SideBar({habits, OnClick}:{habits:HabitType[],OnClick: ()=> void}){
    
    return(
        <div>
            <button className="p-4 pr-35 px-6 mx-2 rounded-xl font-bold cursor-pointer hover:bg-zinc-900" onClick={OnClick}>Add Habit</button>
            {habits && habits.length > 0 ? (habits.map((habit, index) => (
                    <div key={index} className="">
                        <SidebarItem href={`/habit/${habit.id}`} title={habit.name}/>
                    </div>
                ))
            ):(
                <p>No Habits</p>
            )}
        </div>
    )
}