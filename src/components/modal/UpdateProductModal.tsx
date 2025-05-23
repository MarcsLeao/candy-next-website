'use client '

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { ProductQuerryData } from '@/src/@types/product-querry';
import { SetActionBoolean } from '@/src/@types/set-state-functions';
import { useUpdateProductMutation } from '@/src/services/ProductService';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productUpdateMutationSchema } from '@/src/utils/validations';
import { useQueryClient } from '@tanstack/react-query';
import { CloseButton } from '../button/return-button';
import { DialogModal, DialogModalConfirm } from './DialogModal';
import LoadingSpinner from '../loading/LoadingSpinner';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '95%',
    maxWidth: '600px',
    boxShadow: 24,
    borderRadius: '0.5rem',
    overflow: 'hidden',
    outline: 'none',
    overflowY: 'scroll',
    backgroundColor: 'white',
    scrollbarWidth: 'none',
  }

export default function UpdateProductModal({open, setOpen, productData}: {open: boolean, setOpen: SetActionBoolean, productData: ProductQuerryData}) {
    const queryClient = useQueryClient()
    const [isSucessModalOpen, setIsSucessModalOpen] = useState<boolean>(false)
    const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false)
    const [isNoChangesModalOpen, setIsNoChangesModalOpen] = useState<boolean>(false)
    const {mutate, isPending} = useUpdateProductMutation()
    const {register, handleSubmit, formState: {errors}, setValue, reset} = useForm({
        resolver: zodResolver(productUpdateMutationSchema), defaultValues: {...productData}
    })

    useEffect(() => {
        setValue('id', productData.id)
    }, [productData])
    
    const handleClose = () => {
        reset()
        setIsSucessModalOpen(false)
        setOpen(false)
    }

    const handleUpdate = (data: ProductQuerryData) => {
        if(productData.name === data.name && productData.price === data.price && productData.cost_price === data.cost_price && productData.stock === data.stock) return setIsNoChangesModalOpen(true)

        queryClient.setQueryData(['Products'], (oldData: ProductQuerryData[]) => {
            if (!oldData) return
            return oldData.map((product: ProductQuerryData) => product.id === data.id ? data : product)
        })

        mutate(data , {
            onSuccess: () => {
                setIsSucessModalOpen(true)
            },
            onError: () => setIsErrorModalOpen(true)
        })
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                {isPending ? <LoadingSpinner/> : null}
                <DialogModalConfirm open={isSucessModalOpen} setOpen={setIsSucessModalOpen} title='Success' text='Data successfully updated.' actionFn={handleClose}/>
                <DialogModal open={isNoChangesModalOpen} setOpen={setIsNoChangesModalOpen} title='Warning' text='Make some changes before submitting. Update failed.'/>
                <DialogModal open={isErrorModalOpen} setOpen={setIsErrorModalOpen} title='Error' text='Failed to update data.'/>
                <div className="flex flex-col w-full h-full py-5 px-7 bg-white">
                    <div className="flex justify-between items-start gap-2">
                        <div className="flex flex-col items-start">
                            <h1 className="mb-1 font-bold text-xl text-zinc-950 text-start">Update Product: {productData.name}</h1>
                            <p className="mb-5 text-base text-zinc-800">update your product info</p>
                        </div>
                        <CloseButton buttonFn={handleClose}/>
                    </div>
                    <form onSubmit={handleSubmit(handleUpdate)}>
                        <div className="flex flex-col justify-between gap-4 mb-8">
                            <div className="flex flex-col">
                                <div className='flex flex-col sm:flex-row sm:justify-between'>
                                    <p>Product Name</p>
                                    <input
                                        type="text"
                                        defaultValue={productData.name}
                                        {...register('name')}
                                        className='sm:text-right w-max border rounded-lg px-2 py-1 border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-700'/>
                                </div>
                                {errors?.name && <p className="text-red-600 text-sm">{errors.name?.message?.toString()}</p>}
                            </div>
                            <div className="flex flex-col">
                                <div className="flex flex-col sm:flex-row sm:justify-between">
                                    <p>Price</p>
                                    <input
                                        type="number"
                                        defaultValue={productData.price}
                                        {...register('price')}
                                        className='sm:text-right w-max border rounded-lg px-2 py-1 border-gray-400 max-w-[100px] focus:outline-none focus:ring-2 focus:ring-gray-700'/>
                                </div>
                                {errors?.price && <p className="text-red-600 text-sm">{errors.price?.message?.toString()}</p>}
                            </div>
                            <div className="flex flex-col">
                                <div className="flex flex-col sm:flex-row sm:justify-between">
                                    <p>Cost Price</p>
                                    <input
                                        type="number"
                                        defaultValue={productData.cost_price}
                                        {...register('cost_price')}
                                        className='sm:text-right w-max border rounded-lg px-2 py-1 border-gray-400 max-w-[100px] focus:outline-none focus:ring-2 focus:ring-gray-700'/>
                                </div>
                                {errors?.cost_price && <p className="text-red-600 text-sm">{errors.cost_price?.message?.toString()}</p>}
                            </div>
                            <div className="flex flex-col">
                                <div className="flex flex-col sm:flex-row sm:justify-between">
                                    <p>Stock</p>
                                    <input
                                        type="number"
                                        defaultValue={productData.stock}
                                        {...register('stock')}
                                        className='sm:text-right w-max border rounded-lg px-2 py-1 border-gray-400 max-w-[100px] focus:outline-none focus:ring-2 focus:ring-gray-700'/>
                                </div>
                                {errors?.stock && <p className="text-red-600 text-sm">{errors.stock?.message?.toString()}</p>}
                            </div>
                        </div>
                        <div className="mt-auto flex justify-center gap-7">
                            <button type="button" data-autofocus onClick={() => setOpen(false)} className="w-max ml-auto px-5 py-2 border-2 hover:bg-zinc-200 rounded-lg text-sm transition-colors">
                                Cancel
                            </button>
                            <button type="submit" className="bg-zinc-950 hover:bg-zinc-900 w-max px-5 py-2 rounded-lg text-sm text-white">
                                Confirm
                            </button>
                        </div>
                    </form>
                </div>
            </Box>
        </Modal>
    )
}