import { DialogModal } from "@/src/components/modal/DialogModal";
import { useCreateProductMutation } from "@/src/services/ProductService";
import { ProductsMutationData } from "@/src/@types/product-querry";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { GoArrowRight } from "react-icons/go";
import LoadingSpinner from "@/src/components/loading/LoadingButton";
import { zodResolver } from "@hookform/resolvers/zod"
import { productMutationSchema } from "@/src/utils/validations";

export default function CreateProduct() {
  const [openDialogSucess, setOpenDialogSucess] = useState(false)
  const [openDialogFailed, setOpenDialogFailed] = useState(false)
  const {mutate, isPending, error} = useCreateProductMutation()
  const {register, handleSubmit, formState: {errors}, reset} = useForm<ProductsMutationData>({
    resolver: zodResolver(productMutationSchema)
  })

  const handleForm = (data: ProductsMutationData) => {
    mutate(data, {
      onSuccess: () => {
        setOpenDialogSucess(true)
        reset()
      },
      onError: () => setOpenDialogFailed(true)
    })
  }

  return (
    <div>
      <DialogModal open={openDialogSucess} setOpen={setOpenDialogSucess} title={'Sucess'} text={'New product added successfully'}/>
      <DialogModal open={openDialogFailed} setOpen={setOpenDialogFailed} title={'Error'} text={error?.message || ''}/>
      <div className="mb-8">
        <h1 className="mb-1 font-bold text-xl text-zinc-950">Create Product</h1>
        <p className="text-base text-zinc-800">Register new product.</p>
      </div>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(handleForm)}>
        <div className="flex flex-col gap-1">
          <label>Product Name*</label>
          <input 
            type="text" 
            className={`max-w-[350px] px-3 py-2 w-full rounded-lg focus:outline-none border-2 text-sm ${errors?.name ? 'border-red-600' : ''}`}
            {...register('name', {required: true})}
          />
            {errors?.name?.message && (<p className="text-red-600 text-sm">{errors.name?.message}</p>)}
        </div>
        <div className="flex flex-col gap-1">
          <label>Production Price*</label>
          <input 
            type="number" 
            step="0.01"
            className={`max-w-[350px] px-3 py-2 w-full rounded-lg focus:outline-none border-2 text-sm ${errors?.cost_price ? 'border-red-600' : ''}`}
            {...register('cost_price', {required: true})}
          />
          {errors?.cost_price?.message && (<p className="text-red-600 text-sm">{errors.cost_price?.message}</p>)}
        </div>
        <div className="flex flex-col gap-1">
          <label>Selling Price*</label>
          <input 
            type="number" 
            step="0.01"
            className={`max-w-[350px] px-3 py-2 w-full rounded-lg focus:outline-none border-2 text-sm ${errors?.price ? 'border-red-600' : ''}`}
            {...register('price', {required: true})}
          />
          {errors?.price?.message && (<p className="text-red-600 text-sm">{errors.price?.message}</p>)}
        </div>
        <div className="flex flex-col gap-1">
          <label>Stock*</label>
          <input 
            type="number" 
            placeholder="0"
            className={`max-w-[350px] px-3 py-2 w-full rounded-lg focus:outline-none border-2 text-sm ${errors?.stock ? 'border-red-600' : ''}`}
            {...register('stock', {required: true})}
          />
          {errors?.stock?.message && (<p className="text-red-600 text-sm">{errors.stock?.message}</p>)}
        </div>
        <button
          className="mt-10 ml-auto max-w-[350px] text-white rounded-lg bg-zinc-950 hover:bg-zinc-900 transition-colors px-8 py-3 font-medium"
          type="submit">
          {isPending ? <LoadingSpinner />: null}
          Add Order 
          <GoArrowRight className="inline ml-3" />
        </button>
      </form>
    </div>
  )
}