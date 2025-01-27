'use client'

import { IoMdClose } from "react-icons/io"
import { SetActionBoolean } from "@/src/@types/set-state-functions"
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { useForm } from "react-hook-form"
import { ChangeEvent, useState } from "react"
import { useFinishOrderMutation } from "@/src/services/OrderService"
import { OrderFinishMutationData } from "@/src/@types/orders-query"
import { useQueryClient } from "@tanstack/react-query"

export function DialogModal({open, setOpen, title, text}: {open: boolean, setOpen: SetActionBoolean, title: string, text: string}) {
    return (
        <>
            <Dialog open={open} onClose={setOpen} className="relative z-[9999]">
                <DialogBackdrop transition className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"/>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel transition className="relative transform overflow-hidden rounded-lg bg-white shadow-xl p-5 transition-all sm:my-8 sm:w-full sm:max-w-lg data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95">
                            <div className="flex justify-between items-start">
                                <div className="flex flex-col items-start mb-4">
                                    <h1 className="mb-1 font-bold text-xl text-zinc-950 text-start">{title}</h1>
                                    <p className="my-3 text-base text-zinc-800">{text}</p>
                                </div>
                                <IoMdClose onClick={() => setOpen(false)} className="text-3xl border hover:bg-red-600 rounded-lg p-1 transition-colors cursor-pointer"/>
                            </div>
                            <div className="flex justify-end gap-7">
                                <button type="button" onClick={() => setOpen(false)} className="bg-zinc-950 hover:bg-zinc-900 w-max px-5 py-2 rounded-lg text-sm text-white">
                                    Confirm
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export function DialogModalClose({open, setOpen, closeFn, title, text}: {open: boolean, setOpen: SetActionBoolean, closeFn: () => void, title: string, text: string}) {
    const handleClick = () => {
        setOpen(false)
        closeFn()
    }

    return (
        <>
            <Dialog open={open} onClose={setOpen} className="relative z-[9999]">
                <DialogBackdrop transition className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"/>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel transition className="relative transform overflow-hidden rounded-lg bg-white shadow-xl p-5 transition-all sm:my-8 sm:w-full sm:max-w-lg data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95">
                            <div className="flex justify-between items-start">
                                <div className="flex flex-col items-start mb-4">
                                    <h1 className="mb-1 font-bold text-xl text-zinc-950 text-start">{title}</h1>
                                    <p className="my-3 text-base text-zinc-800">{text}</p>
                                </div>
                                <IoMdClose onClick={() => setOpen(false)} className="text-3xl border hover:bg-red-600 rounded-lg p-1 transition-colors cursor-pointer"/>
                            </div>
                            <div className="flex justify-end gap-7">
                                <button type="button" onClick={handleClick} className="bg-zinc-950 hover:bg-zinc-900 w-max px-5 py-2 rounded-lg text-sm text-white">
                                    Confirm
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export function DialogModalConfirm({open, setOpen, title, text, actionFn}: {open: boolean, setOpen: SetActionBoolean, title: string, text: string, actionFn: () => void}) {
    return (
        <>
            <Dialog open={open} onClose={setOpen} className="relative z-[9999]">
                <DialogBackdrop transition className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"/>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel transition className="relative transform overflow-hidden rounded-lg bg-white shadow-xl p-5 transition-all sm:my-8 sm:w-full sm:max-w-lg data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95">
                            <div className="flex justify-between items-start">
                                <div className="flex flex-col items-start mb-4">
                                    <h1 className="mb-1 font-bold text-xl text-zinc-950 text-start">{title}</h1>
                                    <p className="my-3 text-base text-zinc-800">{text}</p>
                                </div>
                                <IoMdClose onClick={() => setOpen(false)} className="text-3xl border hover:bg-red-600 rounded-lg p-1 transition-colors cursor-pointer"/>
                            </div>
                            <div className="flex justify-end gap-7">
                                <button type="button" onClick={() => setOpen(false)} className="w-max ml-auto px-5 py-2 border-2 hover:bg-zinc-200 rounded-lg text-sm transition-colors">
                                    Cancel
                                </button>
                                <button type="button" onClick={actionFn} className="bg-zinc-950 hover:bg-zinc-900 w-max px-5 py-2 rounded-lg text-sm text-white">
                                    Confirm
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export function FinishOrderDialogModal({open, setOpen, title, clientId, closeFn}: {closeFn: () => void, open: boolean, setOpen: SetActionBoolean, title: string, clientId: number}) {
    const {mutate} = useFinishOrderMutation()
    const {register, setValue, handleSubmit, reset} = useForm<OrderFinishMutationData>()
    const formattedPaymentDate = new Date().toISOString().split("T")[0]
    const [isPaymentDateOptionHidden, setIsPaymentDateOptionHidden] = useState(true)
    const [date, setDate] = useState<null | string>(null)
    const queryClient = useQueryClient()

    setValue("id", clientId || 0)

    const handleClickPaymentDateOption = () => {
        setDate(formattedPaymentDate)
        setValue('paymentDate', formattedPaymentDate)
        setIsPaymentDateOptionHidden(false)
    }
    const dateInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedDate = e.target.value
        setValue("paymentDate", selectedDate)
        setDate(selectedDate)
    }   

    const handleForm= (data: OrderFinishMutationData) => {
        mutate(data, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['Orders'] })
                setOpen(false)
                reset()
                closeFn()
            }, 
            onError: () => 1
        })
    }

    return (
            <Dialog open={open} onClose={setOpen} className="relative z-[9999]">
                <DialogBackdrop transition className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"/>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
                        <DialogPanel transition className="relative transform overflow-hidden rounded-lg bg-white shadow-xl p-5 transition-all sm:my-8 sm:w-full sm:max-w-lg data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95">
                            <form onSubmit={handleSubmit(handleForm)}>
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col items-start mb-4">
                                        <h1 className="mb-1 font-bold text-xl text-zinc-950 text-start">{title}</h1>
                                        <div className='flex flex-col gap-4 my-2 sm:px-4'>
                                            <div className='flex flex-col gap-1'>
                                                <p>Payment Value</p>
                                                <input type="number" {...register('valuePaid', { valueAsNumber: true })} defaultValue={0} className='border rounded-lg px-2 py-1 border-gray-400 max-w-[150px] focus:outline-none focus:ring-2 focus:ring-gray-700'/>
                                            </div>
                                            <div className='flex flex-col gap-1'>
                                                <p>Payment Date</p>
                                                <input type="date" {...register('paymentDate')} onChange={(e) => dateInputOnChange(e)} value={date || ""} className='focus:outline-none focus:ring-2 border-2 border-gray-400 p-1 rounded-lg  max-w-[250px] focus:ring-gray-700'/>
                                            </div>
                                            <div className="flex gap-3">
                                                {formattedPaymentDate && isPaymentDateOptionHidden ? <span onClick={handleClickPaymentDateOption} className="cursor-pointer rounded-lg bg-zinc-950 text-sm text-white py-1 px-3 w-fit">now</span> : null}
                                            </div>
                                        </div>
                                    </div>
                                    <IoMdClose onClick={() => setOpen(false)} className="text-3xl border hover:bg-red-600 rounded-lg p-1 transition-colors cursor-pointer"/>
                                </div>
                                <div className="flex justify-end gap-7">
                                    <button type="submit" className="bg-zinc-950 hover:bg-zinc-900 w-max px-5 py-2 rounded-lg text-sm text-white">
                                        Confirm
                                    </button>
                                </div>
                            </form>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
    )
}