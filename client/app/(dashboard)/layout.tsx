'use client'
import { AppBar } from "@/components/AppBar";
import { PopUpInput } from "@/components/PopUpInput";
import { SideBar } from "@/components/SideBar";
import { JSX, useEffect, useState } from "react";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [showPopup, setShowPopup] = useState(false)
  const [habits, setHabits] = useState<any[]>([]);
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const fetchHabits = async()=>{
      try {
        const response = await fetch(`${backendURL}/habit`,{
          method: "GET",
          credentials: "include"
        });
        const data = await response.json();
        setHabits(data);
      } catch (error) {
          console.error("Error fetching habits:", error);
      }
  }
  useEffect(() => {
    fetchHabits();
  }, []);

  const handleAddHabit = async () => {
    await fetchHabits();
    setShowPopup(false);
  };
  return (
    <div className="flex flex-col h-screen overflow-hidden">
        <AppBar landing={false} />
        <div className="flex flex-row">
            <div className="w-66 border-r border-zinc-800 overflow-y-auto h-screen pt-28">
                <SideBar habits={habits} OnClick={()=>{
                  setShowPopup(true)
                }}/>
            </div>
            <div className="flex-5">
                {children}
            </div>
        </div>
        {showPopup && (<PopUpInput OnSubmit={handleAddHabit} OnClose={()=>setShowPopup(false)}/>) }
    </div>
  );
}
