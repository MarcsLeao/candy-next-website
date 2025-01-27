import { z } from "zod";

export const productMutationSchema = z.object({
    name: z.string().min(3),
    cost_price: z.coerce.number().min(0.01).positive(),
    price: z.coerce.number().min(0.01).positive(),
    stock: z.coerce.number().int().min(0),
})

export const productUpdateMutationSchema = z.object({
    id: z.coerce.number().int(),
    name: z.string().min(3).optional(),
    cost_price: z.coerce.number().min(0.01).positive().optional(),
    price: z.coerce.number().min(0.01).positive().optional(),
    stock: z.coerce.number().int().optional(),
})

export type OrderMutationData = {
    client: string
    phone: string
    isPayment?: boolean,
    paymentDate: string | Date | null
    orderDate?: string,
    OrderItems: { quantity: number; productId: number; }[]
}

export const createOrderSchema = z.object({
    client: z.string().min(3),
    phone: z.string().min(10).max(11),
    paymentDate: z.string().optional().transform((date) => date === '' ? null : date),
    orderDate: z.string().optional().transform((date) => date === '' ? undefined : date),
    OrderItems: z.array(z.object({ quantity: z.coerce.number(), productId: z.number().transform(number => Number(number))}))
})

export const updateOrderSchema = z.object({
    id: z.number().nonnegative(),
    client: z.string().min(3).max(99),
    phone: z.string().min(10).max(11),
    paymentDate: z.string().nullable().transform((date) => date === '' ? null : date),
    valuePaid: z.coerce.number().nullable().optional(),
    // orderDate: z.string().optional().transform((date) => date === '' ? undefined : date),
    OrderItems: z.array(z.object({ id: z.number().nonnegative().optional() ,quantity: z.coerce.number(), productId: z.number().transform(number => Number(number))}))
})

// Type 'string | null | undefined' is not assignable to type 'string | Date | null'.
export const updateOrderFormSchema = z.object({
    id: z.number().nonnegative(),
    client: z.string().min(3).max(99),
    phone: z.string().min(10).max(11),
    paymentDate: z.string().nullable().transform((date) => date === '' ? null : date),
    valuePaid: z.coerce.number().nullable().optional(),
    OrderItems: z.array(z.object({ id: z.number().nonnegative().optional() ,quantity: z.coerce.number(), productId: z.number().transform(number => Number(number))}))
})