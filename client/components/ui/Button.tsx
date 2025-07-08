export function Button({size,Label, OnClick}:{size:string, Label:string,OnClick:React.MouseEventHandler<HTMLButtonElement>}){ //add logic
    return <button
        type="submit"
        className={`${size == "long" ? "w-full": "w"} py-2 px-4 font-semibold bg-white text-black font-medium rounded-md hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-900 transition-all duration-200 cursor-pointer`}
        // add logic
        onClick={OnClick}
        >
            {Label}
    </button>
}