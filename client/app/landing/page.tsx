'use client'
import { AppBar } from "@/components/AppBar";
import { Button } from "@/components/ui/Button";
import { redirect } from "next/navigation";

export default function landing(){
    return(
        <div className="flex flex-col h-screen">
            <AppBar landing={true}/>
            <section className="bg-gradient-to-br from-zinc-900 to-black py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Build Better Habits,
                        <span className="text-zinc-400"> One Day at a Time</span>
                        </h1>
                        <p className="text-xl text-zinc-400 mb-8 max-w-3xl mx-auto">
                        Transform your life with our simple yet powerful habit tracking app. Set goals, track progress, and build
                        lasting habits that stick.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {/* <button className="bg-white text-black px-8 py-3 rounded-lg text-lg font-semibold hover:bg-zinc-200 transition-colors">
                            Sign Up!
                        </button> */}
                        <Button Label="Sign Up" size="" OnClick={()=>{
                            redirect("/signup")
                        }}/>
                        </div>
                    </div>
                </div>
            </section>
            <div className="bg-gradient-to-br from-black to-zinc-900 h-screen">
            </div>
        </div>
    )
}