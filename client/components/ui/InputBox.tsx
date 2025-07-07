
interface InputBoxType {OnChange:React.ChangeEventHandler<HTMLInputElement> |undefined;
    Placeholder:string;
    Label:string;
    Type?:string}

export function InputBox({OnChange,Placeholder,Label,Type}:InputBoxType){ //change type
    return <div className="space-y-2">
        <label htmlFor={Label} className="block text-zinc-200 text-sm font-medium">
            {Label}
        </label>
        <input
            id={Label}
            type={Type || "text"}
            placeholder={Placeholder}
            onChange={OnChange}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all duration-200"
        />
    </div>
}