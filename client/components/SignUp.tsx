'use client'
import { AuthHeader } from "./ui/AuthHeader";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { InputBox } from "./ui/InputBox";
import { useState } from "react"

export function SignUpCard() {
  const [postInput,setPostInput] = useState({
      name:"",
      email: "",
      password: "",
    })
  return (
    <Card>
        <AuthHeader Label="Create Account" Desc="Enter your details to get started"/>

        <div className="p-6">
          <form className="space-y-4">
            <InputBox Label="Full Name" Placeholder="John Doe" OnChange={(e)=>{
              setPostInput({
                ...postInput,
                name:e.target.value
              })
            }}/>

            <InputBox Label="Email" Placeholder="johndoe@gmail.com" OnChange={(e)=>{
              setPostInput({
                ...postInput,
                email:e.target.value
              })
            }}/>

            <InputBox Label="Password" Placeholder="Create a Password" Type="password" OnChange={(e)=>{
              setPostInput({
                ...postInput,
                password:e.target.value
              })
            }}/>

            <Button size="long" Label="Sign Up" OnClick={()=>{}}/> 
            {/* add logic */}
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-zinc-400">
              Already have an account?{" "}
              <a href="/signin" className="text-white hover:underline font-medium transition-all duration-200">
                Sign in
              </a>
            </p>
          </div>
        </div>
    </Card>
  )
}
