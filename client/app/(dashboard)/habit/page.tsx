import { CheckIn } from "@/components/Checkin"

export default function habit(){
    return <div className="flex flex-col h-screen w-full items-center justify-around">
        <CheckIn/>
        <div className="bg-red-800 min-w-2xl min-h-60">
            Streak History
        </div>
    </div>
}