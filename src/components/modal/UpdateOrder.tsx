'use client '

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { NumberSpinnerUpdate } from "../button/NumberSpinnerOrder";
import { SelectItemUpdate } from "../dashboard/menu/dropdown/SelectItemOrder";
import { AiOutlineDelete } from "react-icons/ai";
import { useGetProducts } from '@/src/services/ProductService';
import { formatDateDistance, formatToBRL } from '@/src/utils/format';
import { SetActionBoolean } from '@/src/@types/set-state-functions';
import { IoAdd } from "react-icons/io5";
import { OrderQuerryData } from '@/src/@types/orders-query';
import { PastOrdersUpdateModal } from './modal-components/PastOrders';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDeleteOrderItem, useGetOrdersAxios, usePutOrderMutation } from '@/src/services/OrderService';
import { DialogModal, FinishOrderDialogModal, DialogModalConfirm, DialogModalClose } from './DialogModal';
import { useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from '../loading/LoadingSpinner';
import { CloseButton } from '../button/return-button';
import { z } from 'zod';
import { updateOrderSchema } from '@/src/utils/validations';
import { UpdateOrderModalStyle } from '@/src/styles/mui-styles';

export type UpdateOrderSchemaType = z.infer<typeof updateOrderSchema>

export default function UpdateOrderModal({open, setOpen, client, lastOrderIndex}: {open: boolean, setOpen: SetActionBoolean, client: OrderQuerryData, lastOrderIndex: number}) {    
    const [selectedOrderIndex, setSelectedOrderIndex] = useState(0)
    const {data: productsData, isLoading} = useGetProducts()    
    const [isRemoveOrderItemModalOpen, setIsRemoveOrderItemModalOpen] = useState(false)
    const [isFinishOrderModalOpen, setIsFinishOrderModalOpen] = useState(false)
    const [isErrorDialogWrongOrderModalOpen, setIsErrorDialogWrongOrderModalOpen] = useState(false)
    const [isDialogModalOpen, setIsDialogModalOpen] = useState(false)
    const [isErrorDialogNoChangesMade, setIsErrorDialogNoChangesMade] = useState(false)
    const [isErrorDialogModalOpen, setIsErrorDialogModalOpen] = useState(false)
    const {mutate, isPending} = usePutOrderMutation()
    const {mutate: deleteMutate} = useDeleteOrderItem()
    const [key, setKey] = useState(1)
    const getRemoveOrderItemActionInfo = useRef({index: 0 , itemId: {id: 0}})
    const [order, setOrder] = useState<OrderQuerryData>({client: client?.client, phone: client?.phone, Order: client?.Order})
    const {register, handleSubmit, formState: {errors}, setValue, reset, getValues} = useForm<UpdateOrderSchemaType>({
        resolver: zodResolver(updateOrderSchema)
    })
    const [subtotal, setSubtotal] = useState<number[]>([])
    const queryClient = useQueryClient()

    if(Object.keys(errors).length > 0) console.log('\n', errors)
    if(Object.keys(errors).length > 0) console.log('\n', getValues())
        
    useEffect(() => {
        reset()
        setOrder({client: client.client, phone: client.phone, Order: client.Order})
        setSelectedOrderIndex(() => lastOrderIndex)
        if(client?.Order[client?.Order.length - 1]?.id) setValue('id', client.Order[client.Order.length - 1].id)
        if(client?.Order[lastOrderIndex]?.paymentDate) setValue('paymentDate', client.Order[lastOrderIndex].paymentDate.toString())
        if(!client?.Order[lastOrderIndex]?.paymentDate) setValue('paymentDate', null)
        if(client?.id) client.Order[lastOrderIndex].OrderItems.forEach((item, index) => setValue(`OrderItems.${index}.id`, item.id))
    }, [client, lastOrderIndex])

    const remountFn = () => setKey(prev => prev + 1)
    
    const handleAddNew = () => {        
        setOrder(prev => {
            const updatedOrders = [...prev.Order]
            const updatedOrderItems = [...updatedOrders[selectedOrderIndex].OrderItems, { quantity: 1, productId: 0 }]
            updatedOrders[selectedOrderIndex] = {...updatedOrders[selectedOrderIndex], OrderItems: updatedOrderItems}
            return { ...prev, Order: updatedOrders }
        })
    }
    
    const handleClose = () => {
        reset()
        setOpen(false)
        setOrder({client: client?.client, phone: client?.phone, Order: client?.Order})
        setSubtotal([0])
    }

    const handleSendReceipt = () => {
        let items: string = ''

        order.Order[order.Order.length - 1].OrderItems.forEach(item => {
            const findProductName = productsData.find((prod: {id: number, name: string, price: number}) => prod.id === item.productId)
            items += `${findProductName.name} \t ${item.quantity} x ${formatToBRL(findProductName.price)}\n`
        })

        const mensagem = `${client.client}, segue a nota de compra plataforma candy.\n\n ${items}\n total: ${formatToBRL(order.Order[order.Order.length - 1].orderValue)}`
        const telefone = `55${client.phone}`
        const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`
        window.open(url, '_blank')
    }

    const handleClickRemoveOrderItem = ({index, itemId}: {index: number, itemId: {id: number}}) => {
        getRemoveOrderItemActionInfo.current = {index, itemId: {id: itemId.id}}
        setIsRemoveOrderItemModalOpen(true)
    }

    const handleRemoveOrderItem = (args: MutableRefObject<{ index: number; itemId: { id: number } }>) => {
        setOrder(prev => {
            const updatedOrders = [...prev.Order]
            const updatedOrderItems = updatedOrders[selectedOrderIndex].OrderItems.filter((_, i) => i !== args.current.index)
            updatedOrders[selectedOrderIndex] = {...updatedOrders[selectedOrderIndex], OrderItems: updatedOrderItems}
            return {...prev, Order: updatedOrders}
        })
        deleteMutate(args.current.itemId, {onError: (error) => alert(error)})
        const currentOrderItems = getValues("OrderItems")
        const updatedOrderItems = currentOrderItems.filter((_, i) => i !== args.current.index)
        setValue("OrderItems", updatedOrderItems)
        setIsRemoveOrderItemModalOpen(false)
        queryClient.invalidateQueries({ queryKey: ['Orders'] })
    }
    
    const {data: ud} = useGetOrdersAxios()

    const handleForm = (data: UpdateOrderSchemaType) => {
        type CheckUpdateForm = {
            id: number,
            client: string,
            phone: string,
            paymentDate: string | null,
            Order: {id: number | null, quantity: number, productId: number}[]
        }

        const findOrderById = structuredClone(ud.find((order: CheckUpdateForm) => order.id === client.id))
        const fomatedOrderItems: {id: number | null, quantity: number, productId: number}[] = []

        findOrderById.Order[findOrderById.Order.length - 1].OrderItems.forEach((item: {id: number | null; quantity: number; productId: number;}) => fomatedOrderItems.push({id: item.id, quantity: item.quantity, productId: item.productId}))

        const formatedOrder = {
            id: client?.Order[client?.Order.length - 1]?.id || 0,
            client: findOrderById.client,
            phone: findOrderById.phone,
            paymentDate: findOrderById.Order[findOrderById.Order.length - 1].paymentDate ? findOrderById.Order[findOrderById.Order.length - 1].paymentDate : null,
            OrderItems: fomatedOrderItems
        }

        if(JSON.stringify(data) === JSON.stringify(formatedOrder)) return setIsErrorDialogNoChangesMade(true)
        if(selectedOrderIndex !== client?.Order?.length - 1) return setIsErrorDialogWrongOrderModalOpen(true)
        mutate(data, {
            onSuccess: () => {
                // setOrder(() => updatedOrder)
                setIsDialogModalOpen(true)
                queryClient.invalidateQueries({ queryKey: ['Orders'] })
                reset()
            },
            onError: (error: Error) => alert(error)
        })
    }
    
    const selectedOrderDate = new Date(order.Order[selectedOrderIndex]?.orderDate).toLocaleString('en-US', { month: 'long' }) || 'N/A'
    const lastOrderMonth = new Date(order.Order[order.Order.length - 1].orderDate).toLocaleString('en-US', { month: 'long' }) || 'N/A'
    
    const calculateOrderSubTotalValue = (index: number) => {
        const productValue = productsData?.find((prod: {id: number, price: number}) => prod.id === order?.Order[selectedOrderIndex]?.OrderItems[index]?.productId)?.price
        const total = client?.Order[selectedOrderIndex]?.OrderItems[index]?.quantity * productValue
        return isNaN(total) ? 0 : total
    }
    
    const calculateOrderTotalValue = () => {
        const asd = order?.Order[selectedOrderIndex]?.OrderItems.reduce((acc, item) => {
            const productValue = productsData?.find((prod: {id: number, price: number}) => prod.id === item.productId)?.price || 0
            const itemQuantity = item.quantity
            const itemTotal = itemQuantity * productValue
            
            return acc + itemTotal
        }, 0) || 0

        return asd || 0
    }
    
    return (
        <div>
            <Modal open={open} onClose={handleClose}>
                <Box sx={UpdateOrderModalStyle}>
                    {isPending ? (<LoadingSpinner />) : null}
                    <DialogModalClose open={isDialogModalOpen} setOpen={setIsDialogModalOpen} closeFn={handleClose} title='Success' text='Order updated successfully.'/>
                    <DialogModal open={isErrorDialogModalOpen} setOpen={setIsErrorDialogModalOpen} title='Error' text='Failed to updade order.'/>
                    <DialogModal open={isErrorDialogWrongOrderModalOpen} setOpen={setIsErrorDialogWrongOrderModalOpen} title='Error' text='You can only make changes to the last order.'/>
                    <DialogModal open={isErrorDialogNoChangesMade} setOpen={setIsErrorDialogNoChangesMade} title='Error' text='No changes were made. Please make some changes before submitting.'/>
                    <FinishOrderDialogModal open={isFinishOrderModalOpen} setOpen={setIsFinishOrderModalOpen} title={`Finish ${lastOrderMonth} Order`} clientId={client?.Order[client?.Order.length - 1]?.id || 0} closeFn={handleClose}/>
                    <DialogModalConfirm open={isRemoveOrderItemModalOpen} setOpen={setIsRemoveOrderItemModalOpen} actionFn={() => handleRemoveOrderItem(getRemoveOrderItemActionInfo)} title='Delete Order Item' text='Are u sure about delete this order item?'/>
                    <div className="flex flex-col w-full h-full py-5 px-7 bg-white overflow-auto">
                        <div className="flex flex-col justify-between items-start">
                            <div className="flex gap-4 justify-between w-full items-start mt-2 mb-2">
                                <div className="flex flex-col items-start">
                                    <h1 className="mb-1 font-bold text-xl text-zinc-950 text-start">Update Order: {client.client}</h1>
                                    <p className=" text-base text-zinc-800">set the new data for the order</p>
                                </div>
                                <CloseButton buttonFn={handleClose}/>
                            </div>
                        </div>
                        <div className='flex gap-5 mb-8'>
                            <div className="flex flex-col justify-between">
                                <button type="button" onClick={handleSendReceipt} className="text-xs sm:text-sm bg-zinc-950 hover:bg-zinc-900 w-max px-5 py-2 rounded-lg text-white">
                                    Send Receipt
                                </button>
                            </div>
                            <div className="flex flex-col justify-between">
                                <button type="button" onClick={() => setIsFinishOrderModalOpen(true)} className="text-xs sm:text-sm bg-zinc-950 hover:bg-zinc-900 w-max px-5 py-2 rounded-lg text-white">
                                    Finish Order
                                </button>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(handleForm)} className="flex flex-col gap-7 h-full">
                            <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row justify-between">
                                <p>Client Name</p>
                                <input type="text" {...register('client')} defaultValue={client.client} className='text-left sm:text-right border rounded-lg px-2 py-1 border-gray-400 max-w-[150px] focus:outline-none focus:ring-2 focus:ring-gray-700'/>
                            </div>
                            <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row justify-between">
                                <p>Phone</p>
                                <input type="text" {...register('phone')} maxLength={11} defaultValue={client.phone} className='text-left sm:text-right border rounded-lg px-2 py-1 border-gray-400 max-w-[150px] focus:outline-none focus:ring-2 focus:ring-gray-700'/>
                            </div>
                            <div>
                                <div className="flex justify-between mb-4">
                                    <p>Client Order: <br /> <strong>{selectedOrderDate}</strong> order has <span>{order.Order[selectedOrderIndex]?.OrderItems.length || 'zero'}</span> items</p>
                                    <button type="button" className="truncate h-fit border-2 bg-white hover:bg-zinc-200 transition-colors px-5 py-2 rounded-lg text-sm flex gap-1" onClick={handleAddNew}>
                                        <IoAdd className="text-xl" /> Add New
                                    </button>
                                </div>
                                <div className='mb-4'>
                                    <PastOrdersUpdateModal order={client} setOrderDateIndex={setSelectedOrderIndex} orderIndex={selectedOrderIndex} remountFn={remountFn}/>
                                </div>
                                <div className="flex flex-col gap-4 sm:gap-0 min-h-[200px] overflow-auto scrollbar-thin scrollbar-thumb-gray-400" key={key}>
                                    {isLoading ? <LoadingSpinner/> : order?.Order[selectedOrderIndex]?.OrderItems?.map((item, index) => (
                                        <div key={index} className="grid grid-cols-[1fr] sm:grid-cols-[auto,1fr,1fr,1fr,1fr,1fr] px-2 sm:px-0 gap-5 items-center border-2 rounded-lg sm:border-0 sm:border-b-2 py-2">
                                            <HiOutlineShoppingBag className="hidden sm:inline w-[30px] h-[30px] mr-4" />
                                            <div className="flex gap-3 items-center justify-between">
                                                <span className='sm:hidden'>Item Name:</span>
                                                <SelectItemUpdate setData={setOrder} products={productsData} index={index} selectedOrderIndex={selectedOrderIndex} setValue={setValue} productId={order?.Order[selectedOrderIndex].OrderItems[index]?.productId}/>
                                            </div>
                                            <div className="flex gap-3 items-center justify-between sm:justify-normal">
                                                <span>Quantity:</span>
                                                <NumberSpinnerUpdate setData={setOrder} data={order} setValue={setValue} register={register} index={index} selectedOrderIndex={selectedOrderIndex} setSubtotal={setSubtotal} calculateOrderSubTotalValue={calculateOrderSubTotalValue}/>
                                            </div>
                                            <div className="flex gap-3 items-center justify-between">
                                                <span className='sm:hidden'>Date:</span>
                                                <div className='flex flex-col items-center justify-center'>
                                                    <span className="text-zinc-800 truncate">{new Date(item.acquisitionDate!).toLocaleDateString("en-US", { timeZone: "UTC" }).replace(/\//g,'-') || 'N/A'}</span>
                                                    <span className="text-zinc-800 truncate">{formatDateDistance(item.acquisitionDate!)}</span>
                                                </div>
                                            </div>
                                            <div className='flex justify-between sm:justify-normal gap-1'>
                                                <span>SubTotal:</span>
                                                <span className="text-zinc-800"> {formatToBRL(subtotal[index] ? subtotal[index] : calculateOrderSubTotalValue(index))} </span>
                                            </div>
                                            <AiOutlineDelete onClick={() => handleClickRemoveOrderItem({index, itemId: {id: item.id || 0}})} className="place-self-end hover:bg-red-600 text-3xl p-1 rounded-lg transition-colors cursor-pointer"/>
                                        </div>
                                    ))}
                                    {order?.Order[selectedOrderIndex]?.OrderItems.length == 0 ? <p className="mt-[50px] self-center font-medium text-2xl text-zinc-600">Order has no items.</p> : null}
                                </div>
                            </div>
                            <div className="flex mt-auto gap-7">
                                <div className='flex flex-col'>
                                    <span>Total</span><span>{formatToBRL(calculateOrderTotalValue())}</span>
                                </div>
                                <button type="button" data-autofocus onClick={handleClose} className="w-max ml-auto px-5 py-2 border-2 hover:bg-zinc-200 rounded-lg text-sm transition-colors">
                                    Cancel
                                </button>
                                <button disabled={client?.Order[client?.Order.length]?.id === selectedOrderIndex ? true : false} type="submit" className="bg-zinc-950 hover:bg-zinc-900 w-max px-5 py-2 rounded-lg text-sm text-white">
                                    Confirm
                                </button>
                            </div>
                        </form>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

// export function UpdateOrder() {
//     const [orderStatus, setOrderStatus] = useState(false)
//     const handleOrderStatus = () => setOrderStatus(prev => !prev)
//     console.log(orderStatus)

//     return (
//         <div className="flex gap-2">
//             <p>Order Status: </p>
//             <div>
//                 <input type="checkbox" id="check" className="peer check hidden" onClick={handleOrderStatus}/>
//                 <label htmlFor="check" className="switch relative flex items-center peer-checked:bg-zinc-950 bg-zinc-300 w-[60px] h-[30px] rounded-[40px] p-[5px] transition-all cursor-pointer">
//                     <span className="slider absolute bg-white rounded-[50%] w-[23px] h-[23px] transition-all"></span>
//                 </label>
//             </div>
//         </div>
                            
//     )
// }