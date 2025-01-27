'use client'

import { OrderQuerryData } from "@/src/@types/orders-query";
import { DropdownOrder } from "../menu/dropdown/Dropdown";
import { ReactNode, useEffect, useRef, useState } from "react";
import { SearchbarOrder } from "../menu/search/Searchbar";
import { useGetOrdersAxios } from "@/src/services/OrderService";
import LoadingSpinner from "../../loading/LoadingSpinner";
import UpdateOrder from "../../modal/UpdateOrder";
import { formatToBRL } from "@/src/utils/format";

export default function OrderList() {
    const {isLoading, data: orders} = useGetOrdersAxios()
    const [filteredOrders, setFilteredOrders] = useState<OrderQuerryData[] | null>(orders)
    const [openModel, setOpenModal] = useState(false)
    const [modelData, setModelData] = useState<OrderQuerryData | null>(null)
    const lastOrderIndex = useRef(0)

    useEffect(() => {
        if (orders) setFilteredOrders(orders)
    }, [orders])
    
    useEffect(() => {
        if (orders && !filteredOrders) setFilteredOrders(orders)
    }, [filteredOrders])
    
    const handleClickOpenModal = (order: OrderQuerryData, lastOrder: number) => {
        lastOrderIndex.current = lastOrder
        setModelData(order)
        setOpenModal(true)
    }
    
    if(isLoading) return (<LoadingSpinner />)

    const cli = structuredClone(modelData)
        
    return (
        <div>
            {modelData ? <UpdateOrder client={cli!} open={openModel} setOpen={setOpenModal} lastOrderIndex={lastOrderIndex.current}/> : ''}
            <div className="flex flex-col sm:flex-row sm:justify-start justify-start items-start gap-3 w-full px-4 py-2 mb-4 border rounded-lg">
                <DropdownOrder text="Sort By" options={['unpaid', 'overpaid', 'latest', 'oldest', 'reset']} setFilteredOrders={setFilteredOrders}/>
                <SearchbarOrder orderList={orders!} setStateFn={setFilteredOrders}/>
                {/* <span className={`mr-auto uppercase w-20 text-center rounded-xl border-2 font-medium px-4 py-1 text-sm bg-[#fdf1e6] border-[#fae7c8] text-[#b36e1e]`}>debtor</span> */}
                {/* <div onClick={handleClickClear} className="hidden sm:inline cursor-pointer border rounded-lg p-2 text-sm hover:border-gray-400 transition-all ml-auto">
                    Clear
                </div> */}
            </div>
            
            <div className="hidden sm:inline">
                <table className="min-w-full border rounded-lg">
                    <thead className="border-none">
                        <tr className="bg-zinc-100 text-zinc-700 text-sm font-extralight border-none">
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">Order Date</th>
                            <th className="py-3 px-6 text-left">Phone</th>
                            <th className="py-3 px-6 text-left">Order Value</th>
                            <th className="py-3 px-6 text-left">Correction</th>
                            {/* <th className="py-3 px-6 text-left">Payment Date</th> */}
                            <th className="py-3 px-6 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-zinc-700 text-sm">
                        {Array.isArray(filteredOrders) && filteredOrders.length > 0 && Array.isArray(filteredOrders[0].Order) && filteredOrders.map((client: OrderQuerryData, index) => {
                            const check = Array.isArray(client.Order) && client.Order.length > 0 ? client.Order[client.Order.length - 1] : null
                            let correctionElem: ReactNode = <span>{'N/A'}</span>
                            if(check?.Overpayment) correctionElem = <span>{'- '+formatToBRL(check.Overpayment)}</span>
                            if(check?.unpaidAmount) correctionElem = <span>{'+ '+formatToBRL(check.unpaidAmount)}</span>
                            let status: ReactNode = <span className='inline-block mr-auto uppercase w-[105px] text-center rounded-xl border-2 font-medium px-4 py-1 bg-[#cbfaf0] border-[#99eedb] text[#11726a]'>ok</span>
                            if(check?.Overpayment) status = <span className='inline-block mr-auto uppercase w-[105px] text-center rounded-xl border-2 font-medium px-4 py-1 text-sm bg-[#fdf1e6] border-[#fae7c8] text-[#b36e1e]'>overpaid</span>
                            if(check?.unpaidAmount) status = <span className='inline-block mr-auto uppercase w-[105px] text-center rounded-xl border-2 font-medium px-4 py-1 bg-[#fde6eb] border-[#fde2e8] text-[#b31e5b]'>unpaid</span>
                            return (
                                <tr key={client.id} className="cursor-pointer border-b border-gray-300 hover:bg-gray-100" onClick={() => check && handleClickOpenModal(filteredOrders[index], client.Order.length - 1)}>
                                    <td className="py-3 px-6">{client.client}</td>
                                    <td className="py-3 px-6">{check ? new Date(check.orderDate).toLocaleDateString("pt", { timeZone: "UTC" }).replace(/\//g, '-') : 'N/A'}</td>
                                    <td className="py-3 px-6">{client.phone}</td>
                                    <td className="py-3 px-6">{check ? formatToBRL(check.orderValue) : 'N/A'}</td>
                                    <td className="py-3 px-6">{correctionElem}</td>
                                    <td className="py-3 px-6 text-center">{status}</td>
                                    {/* <td className="py-3 px-6">{check?.paymentDate ? new Date(check.paymentDate).toLocaleDateString("pt", { timeZone: "UTC" }).replace(/\//g, '-') : 'N/A'}</td> */}
                                    {/* <td className={`py-3 px-6 flex justify-center items-center`}>
                                        <span className={`mr-auto uppercase w-20 text-center rounded-xl border-2 font-medium px-4 py-1 ${check?.isPayment ? 'bg-[#cbfaf0] border-[#99eedb] text[#11726a]' : 'bg-[#fde6eb] border-[#fde2e8] text-[#b31e5b]'}`}>
                                            {check?.isPayment ? 'paid' : 'unpaid'}
                                        </span>
                                    </td> */}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            
            <div className="sm:hidden flex flex-col gap-4">
            {Array.isArray(filteredOrders) && filteredOrders.map((client: OrderQuerryData, index) => {
                const lastOrder = Array.isArray(client.Order) && client.Order.length > 0 ? client.Order[client.Order.length - 1] : null
                let correctionElem: ReactNode = <span>{'N/A'}</span>
                if(client?.Order[client?.Order?.length - 1]?.Overpayment) correctionElem = <span>{'- '+formatToBRL(client.Order[client.Order.length - 1].Overpayment!)}</span>
                if(client?.Order[client?.Order?.length - 1]?.unpaidAmount) correctionElem = <span>{'+ '+formatToBRL(client.Order[client.Order.length - 1].unpaidAmount!)}</span>
                let status: ReactNode = <span className='inline-block mr-auto uppercase w-[105px] text-center rounded-xl border-2 font-medium px-4 py-1 bg-[#cbfaf0] border-[#99eedb] text[#11726a]'>ok</span>
                if(client?.Order[client?.Order?.length - 1]?.Overpayment) status = <span className='inline-block mr-auto uppercase w-[105px] text-center rounded-xl border-2 font-medium px-4 py-1 text-sm bg-[#fdf1e6] border-[#fae7c8] text-[#b36e1e]'>overpaid</span>
                if(client?.Order[client?.Order?.length - 1]?.unpaidAmount) status = <span className='inline-block mr-auto uppercase w-[105px] text-center rounded-xl border-2 font-medium px-4 py-1 bg-[#fde6eb] border-[#fde2e8] text-[#b31e5b]'>unpaid</span>

                return (
                    <div key={client.id} className="flex flex-col gap-3 cursor-pointer py-3 px-2 border-2 rounded-lg hover:bg-gray-50" onClick={() => lastOrder && handleClickOpenModal(orders[index], client.Order.length - 1)}>
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <span className="text-gray-600">Client</span>
                                <span className="text-lg">{client.client}</span>
                            </div>
                            <div className="flex justify-center items-center">
                                {status}
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <span>Phone:</span>
                            {client.phone || 'N/A'}
                        </div>
                        <div className="flex justify-between">
                            <span>Order Date:</span>
                            {lastOrder ? new Date(lastOrder.orderDate).toLocaleDateString("pt", { timeZone: "UTC" }).replace(/\//g, '-') : 'N/A'}
                        </div>
                        <div className="flex justify-between">
                            <span>Order Value:</span>
                            {lastOrder ? formatToBRL(lastOrder.orderValue) : 'N/A'}
                        </div>
                        <div className="flex justify-between">
                            <span>Correction:</span>
                            {correctionElem}
                        </div>
                        <div className="flex justify-center items-center">
                            <span className="text-zinc-600 border-zinc-600 m-auto w-full uppercase text-center rounded-xl border font-medium px-4 py-1">
                                View Details
                            </span>
                        </div>
                    </div>
                )})}
            </div>
            
            {Array.isArray(filteredOrders) && filteredOrders.length < 1 && (<div className="p-4 w-full text-center text-base text-gray-700 border rounded-lg">No orders found.</div>)}
        </div>
    )
}