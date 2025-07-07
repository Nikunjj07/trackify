import { Button } from "./ui/Button";
import { InputBox } from "./ui/InputBox";

export function PopUpInput({OnClose}:{OnClose:()=>void}){
    return <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-00 bg-opacity-0">
        <div className="bg-zinc-800 p-6 rounded-xl shadow-2xl h-75 w-96 flex flex-col justify-between">
            <InputBox Placeholder="Meditation" Label="Habit" Type="text" OnChange={()=>{}}/>
            <InputBox Placeholder="7" Label="Streak Goal" Type="number" OnChange={()=>{}}/>
            <Button Label="Add" OnClick={OnClose} size="long"/> {/*add logic*/}
            <Button Label="Close" OnClick={OnClose} size="long"/>
        </div>
    </div>
}