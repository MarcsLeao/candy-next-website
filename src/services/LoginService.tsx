import { userLoginData } from "../@types/orders-query"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { authUserUrl } from "../utils/consts"

const useAuthUser = async ({email, password}: userLoginData) => {
    const response = await axios.post(authUserUrl, {email, password}, {
        headers: {
          'Content-Type': 'application/json',
        }})    
    
        return response.data
}

export const useLoginMutation = () => {
    return useMutation({ mutationFn: useAuthUser })
}