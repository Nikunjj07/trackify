import { SidebarItem } from "./SidebarItem";

export function SideBar(){
    return(
        <div className="w-72 border-r border-slate-300 h-screen mr-4 pt-28">

                <SidebarItem title="Habit1" href="/dashboard" icon="h"/>
            
        </div>
    )
}