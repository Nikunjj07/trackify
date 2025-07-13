'use client'
import { useRouter } from "next/navigation";
import { AuthHeader } from "./ui/AuthHeader";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { InputBox } from "./ui/InputBox";
import { useState } from "react"

export function SignInCard() {
  const router = useRouter();
  const [postInput,setPostInput] = useState({
      email: "",
      password: "",
  })

  const signInRequest = async({email, password}:{email:string,password:string}) => {
    try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/signin`,{
      method:"POST",
      credentials:"include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password
      }),
      })
      if(!response.ok){
        const error = await response.json()
        throw new Error(error.message||"SignIn Failed")
      }
      router.push('/dashboard')
      
    }catch(e){
      console.error();
    }

  }

  return (
    <Card>
        <AuthHeader Label="Welcome Back" Desc="Enter your details to get started"/>

        <div className="p-6">
          <form className="space-y-4" onSubmit={(e)=>{e.preventDefault()}}>
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

            <Button size="long" Label="Sign Up" OnClick={()=>{
              signInRequest({
                email:postInput.email,
                password:postInput.password})
            }}/> 
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
