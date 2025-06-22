export function AuthHeader({Label, Desc}:{Label:string, Desc:string}){
    return <div className="p-6 space-y-1 text-center border-b border-zinc-800">
        <h1 className="text-2xl font-semibold text-white">{Label}</h1>
        <p className="text-zinc-400 text-sm">{Desc}</p>
    </div>
}