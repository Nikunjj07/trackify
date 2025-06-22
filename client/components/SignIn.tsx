'use client'
import { AuthHeader } from "./ui/AuthHeader";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { InputBox } from "./ui/InputBox";
import { useState } from "react"

export function SignInCard() {
  const [postInput,setPostInput] = useState({
        email: "",
        password: "",
    })

  return (
    <Card>
        <AuthHeader Label="Welcome Back" Desc="Enter your details to get started"/>

        <div className="p-6">
          <form className="space-y-4">
            <InputBox Label="Email" Placeholder="johndoe@gmail.com" OnChange={(e)=>{
                setPostInput({
                    ...postInput,
                    email: e.target.value
                })
            }}/>

            <InputBox Label="Password" Placeholder="Enter your Password" Type="password" OnChange={(e)=>{
                setPostInput({
                    ...postInput,
                    password: e.target.value
                })
            }}/>

            <Button Label="Sign Up" OnClick={()=>{}}/> 
            {/* add logic */}
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-zinc-400">
              Dont have an account?{" "}
              <a href="/signup" className="text-white hover:underline font-medium transition-all duration-200">
                Sign up
              </a>
            </p>
          </div>
        </div>
    </Card>
  )
}
