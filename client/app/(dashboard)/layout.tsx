'use client'
import { AppBar } from "@/components/AppBar";
import { PopUpInput } from "@/components/PopUpInput";
import { SideBar } from "@/components/SideBar";
import { JSX, useState } from "react";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [showPopup, setShowPopup] = useState(false)
  return (
    <div className="flex flex-col h-screen overflow-hidden">
        <AppBar landing={false} />
        <div className="flex flex-row">
            <div className="w-66 border-r border-zinc-800 overflow-y-auto h-full mr-4 pt-28">
                <SideBar OnClick={()=>{
                  setShowPopup(true)
                }}/>
            </div>
            <div className="flex-5">
                {children}
            </div>
        </div>
        {showPopup && (<PopUpInput OnClose={()=>setShowPopup(false)}/>) }
    </div>
  );
}
