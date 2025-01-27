import { Dispatch, SetStateAction } from "react";
import { FaUserFriends } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";

export function ProductInterfaceMenu({selectedPage, setSelectedPage}: {selectedPage: string, setSelectedPage: Dispatch<SetStateAction<string>>}) {
    return (
    <div className="flex flex-col w-full border-b justify-between h-[50px] px-6">
        <ul className="flex gap-6 h-full">
            <li className={`border-b-4 border-transparent h-full flex items-center justify-center gap-2 px-2 hover:border-zinc-600 transition-all ${selectedPage === 'product' ? 'InterfaceMenuSelectedItem' : ''}`} onClick={() => setSelectedPage('product')}>
                <a href="#" className="block"><FaUserFriends className="inline"/> Product List</a>
            </li>
            <li className={`border-b-4 border-transparent h-full flex items-center justify-center gap-2 px-2 hover:border-zinc-600 transition-all ${selectedPage === 'create' ? 'InterfaceMenuSelectedItem' : ''}`} onClick={() => setSelectedPage('create')}>
                <a href="#" className="block text-zinc-950"><FaUserPlus className="inline"/> Add New</a>
            </li>
        </ul>
    </div>
  )
}