'use client'

import { ProductQuerryData } from "@/src/@types/product-querry"
import { SetActionArray } from "@/src/@types/set-state-functions"
import { IoIosArrowDown } from "react-icons/io"
import { useState } from "react"
import { OrderData } from "@/src/@types/orders-query"

export default function SelectItem({setData, products, index, option}: {setData: SetActionArray, products: ProductQuerryData[], index: number, option?: string}) {
  const [selectedProduct, setSelectedProduct] = useState(option || 'Select Item')
  const [isOpen, setIsOpen] = useState(false)

  const handleDropdown = () => {
    setIsOpen(() => !isOpen)
  }

  const handleChoice = (e: React.MouseEvent<HTMLDivElement>,productName: string, productId: number) => {
    e.stopPropagation()
    setData((prevState: OrderData) => ({
      ...prevState,
      OrderItems: prevState.OrderItems.map((item, i) => index === i ? {...prevState.OrderItems[index], productId} : item)
    }))
    setSelectedProduct(productName)
    setIsOpen(false)
  }

  return (
    <div className="cursor-pointer hover:bg-zinc-950 hover:text-white hover:shadow-custom relative w-max rounded-lg " onClick={handleDropdown} >
      <div className="p-1">
        <div className="flex gap-3 items-center">{selectedProduct} <IoIosArrowDown /></div>
      </div>
      <div className={`${isOpen ? 'absolute' : 'hidden'} bg-white text-black mt-2 w-full rounded-lg shadow-custom z-50`} onMouseLeave={() => setIsOpen(false)}>
        {products?.map((product: ProductQuerryData) => <div key={product.id} className="m-1 hover:border-b-2 p-1 transition-colors" onClick={(e) => handleChoice(e, product.name, product.id)}>{product.name}</div>)}
      </div>
    </div>
  )
}