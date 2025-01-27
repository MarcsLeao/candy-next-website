export type OrderQuerryData = {
    id?: number,
    client: string,
    phone: string,
    Order: {
        id: number,
        orderValue: number,
        Overpayment: number | null,
        unpaidAmount: number | null,
        valuePaid: number | null,
        orderDate: Date ,
        paymentDate: Date | null,
        isPayment: boolean,
        OrderItems: { id?: number, quantity: number; productId: number; acquisitionDate?: string }[]
    }[]
}

export type OrderMutationData = {
    client: string
    phone: string
    isPayment?: boolean
    paymentDate: string | Date | null
    orderDate?: string
    OrderItems: { quantity: number; productId: number; }[]
}

export type OrderPutMutationData = {
    id?: number
    client: string
    phone: string
    isPayment?: boolean
    paymentDate: string | Date | null
    orderDate?: string
    OrderItems: { quantity: number; productId: number; }[]
}

export type OrderFinishMutationData = {
    id: number;
    valuePaid: number;
    paymentDate: string;
}

export type userLoginData = {
    email: string
    password: string
}

export type OrderData = {
    client: string,
    phone:  string,
    isPayment: boolean | undefined
    paymentDate: Date | null
    orderDate: Date
    OrderItems: {productId: number, quantity: number}[]
}

export type OrderItems = { quantity: number, productId: number }[]
