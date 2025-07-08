"use client"
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const SidebarItem = ({ href, title }: { href: string; title: string }) => {
    const router = useRouter();
    const pathname = usePathname()
    const selected = pathname === href

    return <div className={`flex ${selected ? "text-zinc-400" : "text-zinc-100"} cursor-pointer mx-2 p-4 pl-6 rounded-xl hover:bg-zinc-900 active:border`} onClick={() => {
        router.push(href);
    }}>
        <div className={`font-bold ${selected ? "text-zinc-400" : "text-zinc-100"}`}>
            {title}
        </div>
    </div>
}