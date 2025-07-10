import { Avatar } from "./ui/Avatar";

export function AppBar({landing}:{landing:boolean}){
    return <div className="flex flex-row items-center justify-between w-full h-14 bg-black-900 border-b border-zinc-800 shadow-2xl">
        <div className="text-2xl font-semibold cursor-pointer p-2 text-zinc-400">
            Trackify
        </div>
        <div className="mr-2">
            {landing == true? null: <Avatar name="User"/>}
        </div>
    </div>
}