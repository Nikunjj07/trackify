'use client'
import { redirect, useRouter } from "next/navigation";
import { AuthHeader } from "./ui/AuthHeader";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { InputBox } from "./ui/InputBox";
import { useState } from "react"

export function SignUpCard() {
  const router = useRouter();
  const [postInput,setPostInput] = useState({
      name:"",
      email: "",
      password: "",
    })

    const signUpRequest = async({name,email, password}:{name:string,email:string,password:string}) => {
      try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/signup`,{
          method:"POST",
          credentials:"include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password
          
          }),
        })
        if(!response.ok){
          const error = await response.json()
          throw new Error(error.message||"SignUp Failed")
        }
        
        router.push('/dashboard')        
      }catch(e){
        console.error();
      }
    }

  return (
    <Card>
        <AuthHeader Label="Create Account" Desc="Enter your details to get started"/>

        <div className="p-6">
          <form className="space-y-4" onSubmit={(e)=>{
            e.preventDefault();
            signUpRequest(postInput);
          }}>
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

            <Button size="long" Label="Sign Up"/> 
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
