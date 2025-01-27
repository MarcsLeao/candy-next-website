'use client'

import { OrderQuerryData } from '@/src/@types/orders-query'
import { ProductQuerryData } from '@/src/@types/product-querry'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'

export function SearchbarProduct({productList, setStateFn}: {productList: ProductQuerryData[], setStateFn: Dispatch<SetStateAction<ProductQuerryData[] | null>>}) {
    const [input, setInput] = useState<string>('')

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)

        const filtered = productList.filter(product => product.name.toLowerCase().includes(input.toLowerCase()))
        
        if(e.target.value === '') return setStateFn(productList)
        
        return setStateFn(filtered)
    }

    return (
    <div className="w-full max-w-[300px] flex items-center gap-1 cursor-pointer border rounded-full p-2 text-sm hover:border-gray-400 focus:border-gray-400 transition-all">
        <IoSearchOutline /> 
        <input type="text" placeholder="search here" maxLength={20} className="w-full focus:outline-none" onChange={handleOnChange}/>
    </div>
  )
}

export function SearchbarOrder({orderList, setStateFn}: {orderList: OrderQuerryData[], setStateFn: Dispatch<SetStateAction<OrderQuerryData[] | null>>}) {
    const [input, setInput] = useState<string>('')

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)

        const filtered = orderList.filter(order => order.client.toLowerCase().includes(input.toLowerCase()))
        if(!filtered) return

        if(e.target.value === '') return setStateFn(orderList)
        
        console.log(filtered)
        
        return setStateFn(filtered)
    }

    return (
    <div className="w-full max-w-[300px] flex items-center gap-1 cursor-pointer border rounded-full p-2 text-sm hover:border-gray-400 focus:border-gray-400 transition-all">
        <IoSearchOutline className="inline"/> <input type="text" placeholder="search here" maxLength={20} className="w-full focus:outline-none ml-1" onChange={handleOnChange}/>
    </div>
  )
}
