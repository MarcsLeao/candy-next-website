'use client'

import { useState } from "react";
import { BiDockTop } from "react-icons/bi";
import { LuListTodo } from "react-icons/lu";
import { TfiHelpAlt } from "react-icons/tfi";
import { IoSettingsOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DialogModal } from "../modal/DialogModal";

export function SideMenu({selectedMenuOption}: {selectedMenuOption: string}) {
    const [selected] = useState<string>(selectedMenuOption)
    const [openModal, setOpenModal] = useState(false)

    const router = useRouter()

    const handleSelectMenuOption = (address: string) => {
        router.push(`/${address}`)
    }

    return (
        <div>
            <DialogModal open={openModal} setOpen={setOpenModal} title="Warning" text="Sorry! this funcion is not avalibe yet."/>
            <div className="flex flex-col h-full justify-between w-[70px] sm:w-[240px] border-r p-4">
                <ul className="flex flex-col gap-3">
                    <li className={`px-3 py-2 rounded-lg border hover:border-gray-400 transition-colors ${selected === 'dashboard' ? ' dashboardSelectedItem' : ''}`}>
                        <Link href={'/dashboard'}>
                            <p className="block font-medium text-zinc-600" onClick={() => handleSelectMenuOption('dashboard')}>
                                <BiDockTop className="inline"/> <span className="hidden sm:inline">Orders</span>
                            </p>
                        </Link>
                    </li>
                    <li className={`px-3 py-2 rounded-lg border hover:border-gray-400 transition-colors ${selected === 'product' ? ' dashboardSelectedItem' : ''}`}>
                        <Link href={'/product'}>
                            <p className="block font-medium text-zinc-600" onClick={() => handleSelectMenuOption('product')}>
                                <LuListTodo className="inline"/> <span className="hidden sm:inline">Products</span>
                            </p>
                        </Link>
                    </li>
                </ul>
                <ul className="flex flex-col gap-3">
                    <li onClick={() => setOpenModal(true)} className={`px-3 py-2 rounded-lg border hover:border-gray-400 transition-colors `}>
                        <a href="#" className="block font-medium text-zinc-600">
                            <TfiHelpAlt className="inline"/> <span className="hidden sm:inline">Support</span>
                        </a>
                    </li>
                    <li onClick={() => setOpenModal(true)} className={`px-3 py-2 rounded-lg border hover:border-gray-400 transition-colors `}>
                        <a href="#" className="block font-medium text-zinc-600">
                            <IoSettingsOutline className="inline"/> <span className="hidden sm:inline">Settings</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
  )
}