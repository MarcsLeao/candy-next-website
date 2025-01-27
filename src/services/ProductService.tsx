import { createProductUrl, putProductUrl, querryProductsUrl } from "../utils/consts"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { ProductsMutationData } from "../@types/product-querry"

export const useGetProducts = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['Products'],
        queryFn: async () => {
            const res = await axios.get(querryProductsUrl)
            return res?.data
        }
    })

    return { data, isLoading }
}

const useCreateProduct = async (info: ProductsMutationData) => {
    const response = await axios.post(createProductUrl, info, {
        headers: {
          'Content-Type': 'application/json',
        }})    
        
    return response.data
}

export const useCreateProductMutation = () => {
    return useMutation({ mutationFn: useCreateProduct })
}

const usePutProduct = async (info: ProductsMutationData) => {
    const response = await axios.put(putProductUrl, info, {
        headers: {
          'Content-Type': 'application/json',
        }})    
        
    return response.data
}

export const useUpdateProductMutation = () => {
    return useMutation({ mutationFn: usePutProduct })
}