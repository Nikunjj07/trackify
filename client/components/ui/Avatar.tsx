export function Avatar({ name } : { name:string}){
    return <div className={`relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-500`}>
        <span className={`text-xs font-thin text-gray-600 dark:text-slate-200`}>{name[0]}</span>
    </div>
}