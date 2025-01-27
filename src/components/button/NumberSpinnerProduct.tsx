import { OrderData } from "@/src/@types/orders-query";
import { SetActionArray } from "@/src/@types/set-state-functions";
import { ChangeEvent, useState } from "react";
import { BsDash } from "react-icons/bs";
import { IoAdd } from "react-icons/io5"; 

export default function NumberSpinnerProduct({ setData, data, index }: { setData: SetActionArray, data: OrderData, index: number }) {
    const [quantity, setQuantity] = useState(data.OrderItems[index].quantity)
  
    const handleAdd = () => {
      const newQuantity = quantity + 1
      setQuantity(newQuantity)
      setData((prevState: OrderData) => ({
        ...prevState,
        OrderItems: prevState.OrderItems.map((item, i) => i === index ? {...prevState.OrderItems[index], quantity: newQuantity} : item )
      }))
    }
  
    const handleSub = () => {
      const newQuantity = Math.max(quantity - 1, 0)
      setQuantity(newQuantity)
      setData((prevState: OrderData) => ({
        ...prevState,
        OrderItems: prevState.OrderItems.map((item, i) => i === index ? {...prevState.OrderItems[index], quantity: newQuantity} : item )
      }))
    }
  
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newQuantity = Number(e.target.value)
      if (newQuantity < 1 || newQuantity > 99) return
  
      setQuantity(newQuantity)
      setData((prevState: OrderData) => ({
        ...prevState,
        OrderItems: prevState.OrderItems.map((item, i) => i === index ? {...prevState.OrderItems[index], quantity: newQuantity} : item )
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