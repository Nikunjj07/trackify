'use client'
import { SidebarItem } from "./SidebarItem";

async function getHabits(){
    let response = fetch()
}

export function SideBar({OnClick}:{OnClick: ()=> void}){

    return(
        <div>
            <button className="p-2 pl-8 font-bold cursor-pointer" onClick={OnClick}>Add Habit</button>
            <SidebarItem href={"/dashboard"} title="Home" />
        </div>
    )
}