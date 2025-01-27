'use client'

import { useAuth } from "@/src/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GoArrowRight } from "react-icons/go";
import LoadingButton from "../loading/LoadingButton";

export function Login() {
  const {user, login, logout, isLoading} = useAuth()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    if(user) router.push('/dashboard')
    logout()
  }, [user])

  const handleLogin = () => {
    login({email, password})
  }

  return (
    <div className="relative">
      <div className="flex flex-col gap-5 p-6 py-9 rounded-xl bg-white shadow-2xl w-[450px] max-w-full">
          {isLoading && <LoadingButton />}
          <p className="font-bold text-2xl mb-3 text-dark">Login Now</p>
          <p className="font-light text-dark">Account</p>
          <input className="p-3 w-full rounded-lg focus:outline-none border-2" type="email" placeholder="email@example.com" onChange={(e) => setEmail(e.target.value)}/>
          <input className="p-3 w-full rounded-lg focus:outline-none border-2" type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
          <p className="font-thin text-sm mb-6 text-dark">By Login, you agree to our <a href="#" className="underline">Terns & Conditions</a></p>
          <div className="flex justify-between">
                  <button className="p-4 rounded-lg bg-white border-2 border-gray-300 text-black hover:bg-gray-200 transition-colors" onClick={handleLogin}>
                    Login Now <GoArrowRight className="inline ml-3" />
                  </button>
              <button className="p-4 text-dark underline">Forgot Password</button>
          </div>
      </div>
    </div>
  )
}
