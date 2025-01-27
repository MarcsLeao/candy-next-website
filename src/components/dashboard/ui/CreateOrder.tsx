import { GoArrowRight } from "react-icons/go";
import { IoAdd } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useCreateOrderMutation } from "@/src/services/OrderService";
import { useGetProducts } from "@/src/services/ProductService";
import { formatToBRL } from "@/src/utils/format";
import { SelectItemCreate } from "../menu/dropdown/SelectItemOrder";
import { NumberSpinnerCreate } from "../../button/NumberSpinnerOrder";
import { useState } from "react";
import LoadingSpinner from "@/src/components/loading/LoadingSpinner";
import { DialogModal } from "@/src/components/modal/DialogModal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOrderSchema, OrderMutationData } from "@/src/utils/validations";
import { OrderItems } from "@/src/@types/orders-query";

export default function CreateOrder() {
  const [key, setKey] = useState(1)
  const {mutate, isPending} = useCreateOrderMutation()
  const {isLoading, data: productsData} = useGetProducts()
  const [openDialogSucess, setOpenDialogSucess] = useState(false)
  const [openDialogFailed, setOpenDialogFailed] = useState(false)
  const {register, handleSubmit, reset, formState: {errors}, setValue} = useForm<OrderMutationData>({
    resolver: zodResolver(createOrderSchema)
  })
  const [orderItems, setOrderItems] = useState<OrderItems>([{ quantity: 1, productId: 0 }])

  if(isLoading) return (<LoadingSpinner />)

  const handleForm = (data: OrderMutationData) => {
    mutate(data, {
      onSuccess: () => {
        setOpenDialogSucess(true)
        reset()
        setOrderItems([{ quantity: 1, productId: 0 }])
        setKey(prev => prev+1)
      },
      onError: (error) => {
        console.log("Failed to add client:", error)
        setOpenDialogFailed(true)
      }
    })
  }

  const handleAddNew = () => {
    setOrderItems((prev) => {
      const addOrderItem = { quantity: 1, productId: 0 }
      const updatedOrder = [...prev, addOrderItem]
      return updatedOrder
    })
  }

  const handleRemoveOrderItem = (index: number) => {
    if(orderItems.length === 1) return
    const newOrderItems = orderItems.filter((_, i) => i !== index)
    setOrderItems(newOrderItems)
    setValue(`OrderItems`, newOrderItems)
    setOrderItems([...newOrderItems])
    setKey(prev => prev+1)
  }

  const orderItemsSubTotal = (index: number) => {
    const findProductById = productsData.find((item: {quantity: number, id: number}) => item.id === orderItems[index].productId)
    const subTotal = orderItems[index].quantity * findProductById?.price || 0
    return subTotal
  }
  
  return (
    <section>
      {isPending ? (<LoadingSpinner />) : null}
      <DialogModal open={openDialogSucess} setOpen={setOpenDialogSucess} title={'Sucess'} text={'Client order added successfully'}/>
      <DialogModal open={openDialogFailed} setOpen={setOpenDialogFailed} title={'Error'} text={'set error message'}/>
      <div className="mb-8">
        <h1 className="mb-1 font-bold text-xl text-zinc-950">Create Order</h1>
        <p className="text-base text-zinc-800">Register new client order and order items.</p>
      </div>
      <form onSubmit={handleSubmit(handleForm)} className="flex flex-col gap-3" key={key}>

        <div className="flex flex-col gap-1">
          <label htmlFor="client">Client*</label>
          <input type="text" {...register("client", {required: true})} className="max-w-[350px] px-3 py-2 w-full rounded-lg focus:outline-none border-2 text-sm"/>
           {errors?.client?.message && (<p className="text-red-600 text-sm">{errors.client?.message}</p>)}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="phone">Phone*</label>
          <input type="text" {...register("phone")} className="max-w-[350px] px-3 py-2 w-full rounded-lg focus:outline-none border-2 text-sm"/>
          {errors?.phone?.message && (<p className="text-red-600 text-sm">{errors.phone?.message}</p>)}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="date">Order Date</label>
          <input type="date" {...register("orderDate")} className="max-w-[350px] px-3 py-2 w-full rounded-lg focus:outline-none border-2 text-sm"/>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="date">Payment Date</label>
          <input type="date" {...register("paymentDate")} className="max-w-[350px] px-3 py-2 w-full rounded-lg focus:outline-none border-2 text-sm"/>
        </div>

        <div className="flex flex-col gap-1 mt-3">
          <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row justify-between items-start mb-4">
            <div>
              <h1 className="text-zinc-950 text-lg font-medium">Order Items</h1>
              <p className="text-zinc-800">Select the items purchased by the customer</p>
            </div>
            <button type="button" className="self-end truncate h-fit bg-zinc-950 hover:bg-zinc-900 transition-colors px-5 py-2 rounded-lg text-sm text-white flex gap-1" onClick={handleAddNew}>
              <IoAdd className="text-xl" /> Add New
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {orderItems.map((item, index) => (
              <div key={index} className="border-b-2 border-2 rounded-lg sm:border-0 sm:border-b-2 px-2 sm:px-0">
                <div className="grid :grid-cols-[1fr] sm:grid-cols-[auto,1fr,1fr,1fr,1fr] gap-5 items-center py-2 mt-2">
                  <HiOutlineShoppingBag className="hidden sm:inline w-[30px] h-[30px] mr-4" />
                  <div className="flex gap-3 items-center justify-between">
                    <span className="sm:hidden">Item Name:</span>
                    <SelectItemCreate setData={setOrderItems} products={productsData} index={index} productId={item.productId} setValue={setValue}/>
                  </div>
                  <div className="flex gap-3 items-center justify-between sm:justify-normal">
                    <span>Quantity:</span>
                    <NumberSpinnerCreate setData={setOrderItems} data={orderItems} index={index} register={register} setValue={setValue}/>
                  </div>
                  {/* <div className="flex justify-between gap-1 sm:justify-normal">
                    <span>Stock:</span>
                    <span className="text-zinc-800">N/A</span>
                  </div> */}
                  <div className="flex justify-between gap-1 sm:justify-normal">
                    <span>SubTotal: </span>
                    <span className="text-zinc-800"> {formatToBRL(orderItemsSubTotal(index))} </span>
                  </div>
                  <AiOutlineDelete onClick={() => handleRemoveOrderItem(index)} className="place-self-end hover:bg-red-600 text-3xl p-1 rounded-lg transition-colors cursor-pointer" />
                </div>
                {errors?.OrderItems && (<p className="text-red-600 text-sm">{errors.OrderItems[index]?.productId?.message}</p>)}
              </div>
            ))}
          </div>
        </div>

        <button
          className="self-end mt-auto max-w-[350px] text-white rounded-lg bg-zinc-950 hover:bg-zinc-900 transition-colors px-8 py-3 font-medium"
          type="submit"
        >
          Add Order <GoArrowRight className="inline ml-3" />
        </button>
      </form>
    </section>
  )
}