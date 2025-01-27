import { OrderItems, OrderMutationData, OrderQuerryData } from "@/src/@types/orders-query";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { BsDash } from "react-icons/bs";
import { IoAdd } from "react-icons/io5";
import { UpdateOrderSchemaType } from "../modal/UpdateOrder";

export function NumberSpinner({ setData, data, index, selectedOrderIndex }: { setData: Dispatch<SetStateAction<OrderQuerryData>>, data: OrderQuerryData, index: number, selectedOrderIndex: number }) {
  const [quantity, setQuantity] = useState(data.Order[selectedOrderIndex].OrderItems[index].quantity)

  const handleAdd = () => {
    const newQuantity = quantity + 1
    setQuantity(newQuantity)
    setData((prevState: OrderQuerryData) => ({
      ...prevState,
      Order: [
        {
          ...prevState.Order[0],
          OrderItems: prevState.Order[selectedOrderIndex].OrderItems.map((item, i) => i === index ? {...prevState.Order[selectedOrderIndex].OrderItems[index], quantity: newQuantity} : item )
        }
      ]
    }))
  }

  const handleSub = () => {
    const newQuantity = Math.max(quantity - 1, 0)
    setQuantity(newQuantity)
    setData((prevState: OrderQuerryData) => ({
      ...prevState,
      Order: [
        {
          ...prevState.Order[0],
          OrderItems: prevState.Order[selectedOrderIndex].OrderItems.map((item, i) => i === index ? {...prevState.Order[selectedOrderIndex].OrderItems[index], quantity: newQuantity} : item )
        }
      ]
    }))
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(e.target.value)
    if (newQuantity < 1 || newQuantity > 99) return

    setQuantity(newQuantity)
    setData((prevState: OrderQuerryData) => ({
      ...prevState,
      Order: [
        {
          ...prevState.Order[0],
          OrderItems: prevState.Order[selectedOrderIndex].OrderItems.map((item, i) => i === index ? {...prevState.Order[selectedOrderIndex].OrderItems[index], quantity: newQuantity} : item )
        }
      ]
    }))
  }

  return (
    <div className="flex border-2 rounded-lg w-max">
      <button type="button" className="hover:bg-zinc-200 border-r" onClick={handleSub}>
        <BsDash className="text-3xl" />
      </button>
      <input
        type="text"
        value={quantity}
        className="w-8 text-center focus:outline-none"
        onChange={handleChange}
      />
      <button type="button" className="hover:bg-zinc-200 border-l" onClick={handleAdd}>
        <IoAdd className="text-3xl" />
      </button>
    </div>
  )
}

export function NumberSpinnerCreate({ setData, data, index, register, setValue }: { setData: Dispatch<SetStateAction<OrderItems>>, data: OrderItems, index: number, register: UseFormRegister<OrderMutationData>, setValue: UseFormSetValue<OrderMutationData>}) {
  const [quantity, setQuantity] = useState<number>(data[index]?.quantity || 0)

  const handleAdd = () => {
    const newQuantity = Math.max(quantity + 1, 0)
    setQuantity(newQuantity)
    setData((prev) => {
      const updatedOrderItem = [...prev]
      updatedOrderItem[index] = {...updatedOrderItem[index], quantity: newQuantity}
      setValue(`OrderItems.${index}.quantity`, newQuantity)
      return updatedOrderItem
    })
  }

  const handleSub = () => {
    const newQuantity = Math.max(quantity - 1, 0)
    setQuantity(newQuantity)
    setData((prev) => {
      const updatedOrderItem = [...prev]
      updatedOrderItem[index] = {...updatedOrderItem[index], quantity: newQuantity}
      setValue(`OrderItems.${index}.quantity`, newQuantity)
      return updatedOrderItem
    })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(e.target.value)
    if (newQuantity < 1 || newQuantity > 99) return

    setQuantity(newQuantity)
    setData((prev) => {
      const updatedOrderItem = [...prev]
      updatedOrderItem[index] = {...updatedOrderItem[index], quantity: newQuantity}
      return updatedOrderItem
    })
  }

  return (
    <div className="flex border-2 rounded-lg w-max">
      <button type="button" className="hover:bg-zinc-200 border-r" onClick={handleSub}>
        <BsDash className="text-3xl" />
      </button>
      <input
        type="text"
        value={quantity}
        className="w-8 text-center focus:outline-none"
        {...register(`OrderItems.${index}.quantity`, {onChange: handleChange})}
      />
      <button type="button" className="hover:bg-zinc-200 border-l" onClick={handleAdd}>
        <IoAdd className="text-3xl" />
      </button>
    </div>
  )
}

export function NumberSpinnerUpdate({ setData, data, index, selectedOrderIndex, register, setValue, setSubtotal, calculateOrderSubTotalValue }: { setData: Dispatch<SetStateAction<OrderQuerryData>>, data: OrderQuerryData, index: number, selectedOrderIndex: number, register: UseFormRegister<UpdateOrderSchemaType>, setValue: UseFormSetValue<UpdateOrderSchemaType>, setSubtotal: Dispatch<SetStateAction<number[]>>, calculateOrderSubTotalValue: (index: number) => number}) {
  const [quantity, setQuantity] = useState(data.Order[selectedOrderIndex].OrderItems[index].quantity)

  useEffect(() => {
    const updatedQuantity = data.Order[selectedOrderIndex].OrderItems[index].quantity
    setQuantity(() => updatedQuantity)
    setValue(`OrderItems.${index}.quantity`, updatedQuantity)
  }, [selectedOrderIndex])
  
  const handleAdd = () => {
    const newQuantity = Math.max(quantity + 1, 0)
    setQuantity(newQuantity)
    setData((prev) => {
      const updatedOrder = {...prev}
      updatedOrder.Order[selectedOrderIndex].OrderItems[index] = {...updatedOrder.Order[selectedOrderIndex].OrderItems[index], quantity: newQuantity}
      setValue(`OrderItems.${index}.quantity`, newQuantity)
      return updatedOrder
    })
    setSubtotal((prev: number[]) => {
      const updated = [...prev]
      updated[index] = calculateOrderSubTotalValue(index)
      return updated
    })
  }

  const handleSub = () => {
    const newQuantity = Math.max(quantity - 1, 0)
    setQuantity(newQuantity)
    setData((prev) => {
      const updatedOrder = {...prev}
      updatedOrder.Order[selectedOrderIndex].OrderItems[index] = {...updatedOrder.Order[selectedOrderIndex].OrderItems[index], quantity: newQuantity}
      setValue(`OrderItems.${index}.quantity`, newQuantity)
      return updatedOrder
    })
    setSubtotal((prev: number[]) => {
      const updated = [...prev]
      updated[index] = calculateOrderSubTotalValue(index)
      return updated
    })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(e.target.value)
    if (newQuantity < 1 || newQuantity > 99) return

    setQuantity(newQuantity)
    setData((prev) => {
      const updatedOrder = {...prev}
      updatedOrder.Order[selectedOrderIndex].OrderItems[index] = {...updatedOrder.Order[selectedOrderIndex].OrderItems[index], quantity: newQuantity}
      return updatedOrder
    })
    setSubtotal((prev: number[]) => {
      const updated = [...prev]
      updated[index] = calculateOrderSubTotalValue(index)
      return updated
    })
  }

  return (
    <div className="flex border-2 rounded-lg w-max">
      <button type="button" className="hover:bg-zinc-200 border-r" onClick={handleSub}>
        <BsDash className="text-3xl" />
      </button>
      <input
        type="text"
        value={quantity}
        className="w-8 text-center focus:outline-none"
        {...register(`OrderItems.${index}.quantity`, {onChange: handleChange})}
      />
      <button type="button" className="hover:bg-zinc-200 border-l" onClick={handleAdd}>
        <IoAdd className="text-3xl" />
      </button>
    </div>
  )
}