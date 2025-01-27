'use client'

import { OrderQuerryData } from "@/src/@types/orders-query";
import LoadingSpinner from "@/src/components/loading/LoadingButton";
import { useGetOrdersAxios } from "@/src/services/OrderService";

export default function TestPage() {
  const {data, isLoading} = useGetOrdersAxios()
  const date = new Date().toISOString().split('T')[0]
  
  return (
    <div>
      <div className="h-dvh bg-zinc-200 flex justify-center items-center">
        <div className="h-[600px] w-[1200px] bg-white p-4 rounded-lg">
          {isLoading ? <LoadingSpinner /> : data?.map((item: OrderQuerryData, index: number) => (
            <div className="p-2 border-b-2" key={index}>
              <p>{item.client}</p>
            </div>
          ))}
          <p><input type="date" defaultValue={date} className='focus:outline-none focus:ring-2 border-2 border-gray-400 p-1 rounded-lg  max-w-[250px] focus:ring-gray-700'/></p>
        </div>
      </div>
    </div>
  )
}