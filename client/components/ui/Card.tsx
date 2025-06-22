import { ReactNode } from "react";

export function Card({children}:{children : ReactNode}){
    return <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 rounded-lg border border-zinc-800 shadow-2xl">
        {children}
      </div>
    </div>
}