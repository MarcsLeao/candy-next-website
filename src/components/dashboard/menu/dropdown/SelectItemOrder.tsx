'use client'

import { ProductQuerryData } from "@/src/@types/product-querry"
import { IoIosArrowDown } from "react-icons/io"
import { Dispatch, SetStateAction, useState } from "react"
import { OrderItems, OrderQuerryData } from "@/src/@types/orders-query"
import { UseFormSetValue } from "react-hook-form"
import { OrderMutationData } from "@/src/utils/validations"
import { UpdateOrderSchemaType } from "@/src/components/modal/UpdateOrder"

export function SelectItem({setData, products, index, productId}: {setData: Dispatch<SetStateAction<OrderQuerryData>>, products: ProductQuerryData[], index: number, productId?: number}) {
  const [selectedProduct, setSelectedProduct] = useState(
    products.length > 0 && productId !== undefined && products.find((item) => item.id === productId) ? products[productId - 1].name : "Select Item"
  )
  const [isOpen, setIsOpen] = useState(false)

  const handleDropdown = () => {
    setIsOpen(() => !isOpen)
  }

  const handleChoice = (e: React.MouseEvent<HTMLDivElement>, productName: string, productId: number) => {
    e.stopPropagation()
    setData((prevState: OrderQuerryData) => ({
      ...prevState,
      Order: [{...prevState.Order[0], OrderItems: prevState.Order[0].OrderItems.map((item, i) => index === i ? {...prevState.Order[0].OrderItems[index], productId} : item)}] 
    }))
    setSelectedProduct(productName)
    setIsOpen(false)
  }

  return (
    <div className="cursor-pointer hover:bg-zinc-950 hover:text-white hover:shadow-custom relative w-max rounded-lg" onClick={handleDropdown} >
      <div className="p-1">
        <div className="flex gap-3 items-center">{selectedProduct} <IoIosArrowDown /></div>
      </div>
      <div className={`${isOpen ? 'absolute' : 'hidden'} bg-white text-black mt-2 w-full rounded-lg shadow-custom z-50`} onMouseLeave={() => setIsOpen(false)}>
        {products?.map((product: ProductQuerryData) => (
          <div 
            key={product.id} 
            className="m-1 hover:border-b-2 p-1 transition-colors" 
            onClick={(e) => handleChoice(e, product.name, product.id)}
          >
            {product.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export function SelectItemCreate({setData, products, index, productId, setValue}: {setData: Dispatch<SetStateAction<OrderItems>>, products: ProductQuerryData[], index: number, productId?: number, setValue: UseFormSetValue<OrderMutationData>}) {
  const [selectedProduct, setSelectedProduct] = useState(
    products.length > 0 && productId !== undefined && products.find((item) => item.id === productId) ? products[productId - 1].name : "Select Item"
  )
  const [isOpen, setIsOpen] = useState(false)

  const handleDropdown = () => setIsOpen(() => !isOpen)

  const handleChoice = (e: React.MouseEvent<HTMLDivElement>, productName: string, productId: number) => {
    e.stopPropagation()
    setData((prev) => {
      const updatedOrderItem = [...prev]
      updatedOrderItem[index] = {...updatedOrderItem[index], productId}
      return updatedOrderItem
    })
    setValue(`OrderItems.${index}.productId`, productId)
    setSelectedProduct(productName)
    setIsOpen(false)
  }

  return (
    <div className="cursor-pointer hover:bg-zinc-950 hover:text-white hover:shadow-custom relative w-max rounded-lg" onClick={handleDropdown}>
      <div className="p-1">
        <div className="flex gap-3 items-center">{selectedProduct} <IoIosArrowDown /></div>
      </div>
      <div className={`${isOpen ? 'absolute' : 'hidden'} bg-white text-black mt-2 w-full rounded-lg shadow-custom z-50`} onMouseLeave={() => setIsOpen(false)}>
        {products?.map((product: ProductQuerryData) => (
          <div
            key={product.id}
            className="m-1 hover:border-b-2 p-1 transition-colors"
            onClick={(e) => handleChoice(e, product.name, product.id)}
          >
            {product.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export function SelectItemUpdate({setData, products, index, selectedOrderIndex, productId, setValue}: {setData: Dispatch<SetStateAction<OrderQuerryData>>, products: ProductQuerryData[], index: number, selectedOrderIndex: number, productId?: number, setValue: UseFormSetValue<UpdateOrderSchemaType>}) {
  if(productId) setValue(`OrderItems.${index}.productId`, productId)
    
  const [selectedProduct, setSelectedProduct] = useState(
    products.length > 0 && productId !== undefined && products.find((item) => item.id === productId) ? products[productId - 1].name : "Select Item"
  )
  const [isOpen, setIsOpen] = useState(false)

  const handleDropdown = () => setIsOpen(() => !isOpen)

  const handleChoice = (e: React.MouseEvent<HTMLDivElement>, productName: string, productId: number) => {
    e.stopPropagation()
    setData((prev) => {
      const updatedOrder = {...prev}
      updatedOrder.Order[selectedOrderIndex].OrderItems[index] = {...updatedOrder.Order[selectedOrderIndex].OrderItems[index], productId}
      return updatedOrder
    })
    setValue(`OrderItems.${index}.productId`, productId)
    setSelectedProduct(productName)
    setIsOpen(false)
  }

  return (
    <div className="cursor-pointer hover:bg-zinc-950 hover:text-white hover:shadow-custom relative w-max rounded-lg" onClick={handleDropdown}>
      <div className="p-1">
        <div className="flex gap-3 items-center">{selectedProduct} <IoIosArrowDown /></div>
      </div>
      <div className={`${isOpen ? 'absolute' : 'hidden'} w-max m-w-[300px] bg-white border-gray-300 border text-black mt-2 rounded-lg shadow-custom z-[999]`} onMouseLeave={() => setIsOpen(false)}>
        {products?.map((product: ProductQuerryData) => (
          <div
            key={product.id}
            className="m-1 rounded-lg hover:bg-zinc-300 p-1 transition-colors"
            onClick={(e) => handleChoice(e, product.name, product.id)}
          >
            {product.name}
          </div>
        ))}
      </div>
    </div>
  )
}