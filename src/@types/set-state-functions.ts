import { Dispatch, SetStateAction } from "react"
import { OrderData } from "./orders-query"

export type SetActionString = Dispatch<SetStateAction<string>>
export type SetActionNumber = Dispatch<SetStateAction<number>>
export type SetActionBoolean = Dispatch<SetStateAction<boolean>>
export type SetActionArray = Dispatch<SetStateAction<OrderData>>