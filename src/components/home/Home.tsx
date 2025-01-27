"use client"

import { useRouter } from "next/navigation";
import { Login } from "./Login";
import { IoMdTrendingUp } from "react-icons/io";

export function Home() {
  const router = useRouter()
  router.push('/dashboard')

  return (
    <section className="flex-1 w-full p-6">
      <div className="flex flex-col justify-between items-center gap-14 min-h-full w-full p-8 px-8 rounded-xl bg-gradient-to-l from-[#772adb] to-[#8a34f3] bga-[#43b2ba] lg:flex-row lg:px-12 lg:p-4 lg:gap-0">
        <div className="flex flex-col gap-12 max-w-[600px] items-center lg:justify-around lg:items-start">
          <div>
            <h1 className="text-white font-bold text-7xl md:text-8xl">Candy.</h1>
          </div>
          <div className="flex flex-col gap-5 border-t border-b border-zinc-900 px-2 py-8 items-center lg:items-start">
            <p className="text-gray-950 text-xl text-justify lg:text-start">The only and one Dashboard to solve your enterprise problems.</p>
            <div className="flex justify-start items-center gap-5 text-lg">
              <div>
                <IoMdTrendingUp className="text-gray-950 text-5xl h-full"/>
              </div>
              <div className="flex flex-col">
                <p className="text-gray-950 ">Your production speed</p> <br />
                <p className="text-gray-950  shadow-2xl "><span className="font-bold">4x</span> Fastar than never</p>
              </div>
            </div>
          </div>
          <div className="flex gap-8">
            <button className="text-white rounded-lg bg-gray-950 hover:bg-gray-900 transition-colors px-8 py-5">Get Your License</button>
            <button className="text-black rounded-lg border-2 border-black hover:bg-gray-950 hover:text-white transition-colors px-8 py-5">Our Pricing</button>
          </div>
        </div>
        <Login />
      </div>
    </section>
  )
}