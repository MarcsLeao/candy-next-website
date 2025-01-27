"use client"

import { useGetOrdersAxios } from "../services/OrderService";
import { OrderQuerryData } from "../@types/orders-query";
import { createContext, ReactNode, useContext, useState } from "react";

type OrderContextProps = {
    orders: OrderQuerryData[] | null
    setOrders: (data: OrderQuerryData[]) => void
    isLoading: boolean
}

export const OrderContext = createContext<OrderContextProps>({} as OrderContextProps)
export const useOrder = () => useContext(OrderContext)

export function OrderProvider({ children }: { children: ReactNode }) {
    const [orders, setOrders] = useState<OrderQuerryData[] | null>(null)
    const {isLoading} = useGetOrdersAxios()

    return (
        <OrderContext.Provider value={{ orders, setOrders, isLoading }}>
            {children}
        </OrderContext.Provider>
    );
}
