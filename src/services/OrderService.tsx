import { createOrdersUrl, deleteOrderItemUrl, finishOrdersUrl, putOrdersUrl, querryOrdersUrl } from "../utils/consts"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { OrderFinishMutationData, OrderMutationData, OrderPutMutationData } from "../@types/orders-query"

export const useGetOrdersAxios = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['Orders'],
        queryFn: async () => {
            const res = await axios.get(querryOrdersUrl)
            return res?.data
        }
    })
    
    return { data, isLoading }
}

const useCreateOrder = async (info: OrderMutationData) => {
    const response = await axios.post(createOrdersUrl, info, {
        headers: {
          'Content-Type': 'application/json',
        }})    
        
    return response.data
}

export const useCreateOrderMutation = () => {
    return useMutation({ mutationFn: useCreateOrder })
}

const usePutOrder = async (info: OrderPutMutationData) => {
    const response = await axios.put(putOrdersUrl, info, {
        headers: {
          'Content-Type': 'application/json',
        }})    
        
    return response.data
}

export const usePutOrderMutation = () => {
    return useMutation({ mutationFn: usePutOrder })
}

const useFinishOrder = async (info: OrderFinishMutationData) => {
    const response = await axios.post(finishOrdersUrl, info, {
        headers: { 'Content-Type': 'application/json' }}
    )    
        
    return response.data
}

export const useFinishOrderMutation = () => {
    return useMutation({ mutationFn: useFinishOrder })
}

const deleteOrderItem = async (info: {id: number}) => {
    const response = await axios.delete(deleteOrderItemUrl, {
        params: info,
        headers: {
          'Content-Type': 'application/json',
        }})    
        
    return response.data
}

export const useDeleteOrderItem = () => {
    return useMutation({ mutationFn: deleteOrderItem })
}