'use client'

import { useState } from "react"

export function SignUpCard(OnClick:any) {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 rounded-lg border border-zinc-800 shadow-2xl">
        <div className="p-6 space-y-1 text-center border-b border-zinc-800">
          <h1 className="text-2xl font-semibold text-white">Create Account</h1>
          <p className="text-zinc-400 text-sm">Enter your details to get started</p>
        </div>

        <div className="p-6">
          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-zinc-200 text-sm font-medium">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                onChange={(e)=>{setName(e.target.value)}}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-zinc-200 text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                onChange={(e)=>{setEmail(e.target.value)}}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-zinc-200 text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Create a password"
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all duration-200"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-white text-black font-medium rounded-md hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-900 transition-all duration-200"
              // add logic
              onClick={()=>{console.log("hello")}}
            >
              Sign Up
            </button>
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
      </div>
    </div>
  )
}
