'use client'

import LoadingSpinner from '@/src/components/loading/LoadingSpinner'
import UpdateProductModal from '@/src/components/modal/UpdateProductModal'
import { useGetProducts } from '@/src/services/ProductService'
import { ProductQuerryData } from '@/src/@types/product-querry'
import { useEffect, useState } from 'react'
import { DropdownProduct } from '../menu/dropdown/Dropdown'
import { SearchbarProduct } from '../menu/search/Searchbar'
import { formatToBRL } from '@/src/utils/format'

export default function ProductList() {
    const {isLoading, data} = useGetProducts()
    const [openModel, setOpenModal] = useState(false)
    const [modelData, setModelData] = useState<ProductQuerryData>({} as ProductQuerryData)
    const [FilteredProducts, setFilteredProducts] = useState<ProductQuerryData[] | null>(data)

    useEffect(() => {
        if (data) setFilteredProducts(data)
    }, [data])

    useEffect(() => {
        if (data && !FilteredProducts) setFilteredProducts(data)
    }, [FilteredProducts])

    const handleClickOpenModal = (product: ProductQuerryData) => {
        setModelData({
            id: product.id,
            name: product.name,
            cost_price: product.cost_price,
            price: product.price,
            stock: product.stock
        })

        setOpenModal(true)
    }

    if(isLoading) return (<LoadingSpinner />)

    return (
        <>
            <UpdateProductModal open={openModel} setOpen={setOpenModal} productData={modelData}/>
            <section>
                <div className="flex flex-col">
                <div className="overflow-x-auto rounded-lg">
                    <div className="flex flex-col sm:flex-row justify-start items-start gap-3 w-full px-4 py-2 mb-4 border rounded-lg">
                        <DropdownProduct text="Sort By" options={['higher price','lower price', 'higher qty','lower qty']} setFilteredProducts={setFilteredProducts}/>
                        <SearchbarProduct productList={data!} setStateFn={setFilteredProducts}/>
                        {/* <div className="hidden sm:inline cursor-pointer border rounded-lg p-2 text-sm hover:border-gray-400 transition-all ml-auto">
                            Clear
                        </div> */}
                    </div>
                    <div className='hidden sm:inline'>
                        <table className="min-w-full border rounded-lg">
                            <thead className="border-none">
                                <tr className="bg-zinc-100 text-zinc-700 text-sm font-extralight border-none">
                                    <th className="py-3 px-6 text-left">Name</th>
                                    <th className="py-3 px-6 text-left">stock</th>
                                    <th className="py-3 px-6 text-left">cost</th>
                                    <th className="py-3 px-6 text-left">price</th>
                                </tr>
                            </thead>
                            <tbody className="text-zinc-700 text-sm">
                                {FilteredProducts?.map((product: ProductQuerryData) => (
                                    <tr key={product.id} className="cursor-pointer border-b border-gray-300 hover:bg-gray-100" onClick={() => handleClickOpenModal(product)}>
                                        <td className="py-3 px-6">{product.name}</td>
                                        <td className="py-3 px-6">{product.stock}</td>
                                        <td className="py-3 px-6">{formatToBRL(product.cost_price)}</td>
                                        <td className="py-3 px-6">{formatToBRL(product.price)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="sm:hidden flex flex-col gap-4">
                    {FilteredProducts?.map((product: ProductQuerryData) => (
                            <div key={product.id} className="flex flex-col gap-3 cursor-pointer py-3 px-2 border-2 rounded-lg hover:bg-gray-50" onClick={() => handleClickOpenModal(product)}>
                                <div className="flex justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-gray-600">Product</span>
                                        <span className="text-lg">{product.name}</span>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <span>Stock:</span>
                                    {product.stock}
                                </div>
                                <div className="flex justify-between">
                                    <span>Cost Price:</span>
                                    {product.cost_price}
                                </div>
                                <div className="flex justify-between">
                                    <span>Price:</span>
                                    {product.price}
                                </div>
                                <div className='flex justify-center items-center'>
                                    <span className='text-zinc-700 border-zinc-700 m-auto w-full uppercase text-center rounded-xl border font-medium px-4 py-1'>
                                        View Details
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                </div>
            </section>
        </>
  )
}
