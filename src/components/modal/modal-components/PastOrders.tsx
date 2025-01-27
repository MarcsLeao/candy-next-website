'use client'

import { OrderQuerryData } from "@/src/@types/orders-query";
import { Dispatch, SetStateAction, useState } from "react";

export function PastOrders({order, setOrderDateIndex, orderIndex, remountFn}: {order: OrderQuerryData, setOrderDateIndex: Dispatch<SetStateAction<number>>, orderIndex: number, remountFn: () => void}) {
  const handleClick = (index: number) => {
    setOrderDateIndex(index)
    remountFn()
  }

  return (
    <div className='grid grid-cols-6 grid-rows-2 gap-5'>
      {order === null ? '' : order?.Order?.map((item, index) => (
        <div key={index} onClick={() => handleClick(index)} className={`px-5 py-3 border border-gray-400 rounded-lg hover:bg-gray-100 transition-all cursor-pointer ${orderIndex === index ? 'bg-gray-100' : null}`}>
          <p>
            <span>{new Date(item.orderDate).toLocaleString('pt-BR', { month: 'long' })}</span>, 
            <span> {new Date(item.orderDate).getDate() + 1}</span>
          </p>
        </div>    
      ))}

      {order === null ? '' : order?.Order?.map((item, index) => (
        <div key={index} onClick={() => handleClick(index)} className={`px-5 py-3 border border-gray-400 rounded-lg hover:bg-gray-100 transition-all cursor-pointer ${orderIndex === index ? 'bg-gray-100' : null}`}>
          <p>
            <span>{new Date(item.orderDate).toLocaleString('pt-BR', { month: 'long' })}</span>, 
            <span> {new Date(item.orderDate).getDate() + 1}</span>
          </p>
        </div>    
      ))}
      {order === null ? '' : order?.Order?.map((item, index) => (
        <div key={index} onClick={() => handleClick(index)} className={`px-5 py-3 border border-gray-400 rounded-lg hover:bg-gray-100 transition-all cursor-pointer ${orderIndex === index ? 'bg-gray-100' : null}`}>
          <p>
            <span>{new Date(item.orderDate).toLocaleString('pt-BR', { month: 'long' })}</span>, 
            <span> {new Date(item.orderDate).getDate() + 1}</span>
          </p>
        </div>    
      ))}
      {order === null ? '' : order?.Order?.map((item, index) => (
        <div key={index} onClick={() => handleClick(index)} className={`px-5 py-3 border border-gray-400 rounded-lg hover:bg-gray-100 transition-all cursor-pointer ${orderIndex === index ? 'bg-gray-100' : null}`}>
          <p>
            <span>{new Date(item.orderDate).toLocaleString('pt-BR', { month: 'long' })}</span>, 
            <span> {new Date(item.orderDate).getDate() + 1}</span>
          </p>
        </div>    
      ))}
      {order === null ? '' : order?.Order?.map((item, index) => (
        <div key={index} onClick={() => handleClick(index)} className={`px-5 py-3 border border-gray-400 rounded-lg hover:bg-gray-100 transition-all cursor-pointer ${orderIndex === index ? 'bg-gray-100' : null}`}>
          <p>
            <span>{new Date(item.orderDate).toLocaleString('pt-BR', { month: 'long' })}</span>, 
            <span> {new Date(item.orderDate).getDate() + 1}</span>
          </p>
        </div>    
      ))}
      {order === null ? '' : order?.Order?.map((item, index) => (
        <div key={index} onClick={() => handleClick(index)} className={`px-5 py-3 border border-gray-400 rounded-lg hover:bg-gray-100 transition-all cursor-pointer ${orderIndex === index ? 'bg-gray-100' : null}`}>
          <p>
            <span>{new Date(item.orderDate).toLocaleString('pt-BR', { month: 'long' })}</span>, 
            <span> {new Date(item.orderDate).getDate() + 1}</span>
          </p>
        </div>    
      ))}
      {order === null ? '' : order?.Order?.map((item, index) => (
        <div key={index} onClick={() => handleClick(index)} className={`px-5 py-3 border border-gray-400 rounded-lg hover:bg-gray-100 transition-all cursor-pointer ${orderIndex === index ? 'bg-gray-100' : null}`}>
          <p>
            <span>{new Date(item.orderDate).toLocaleString('pt-BR', { month: 'long' })}</span>, 
            <span> {new Date(item.orderDate).getDate() + 1}</span>
          </p>
        </div>    
      ))}

    </div>
    )
}

export function PastOrdersUpdateModal({ order, setOrderDateIndex, orderIndex, remountFn }: { order: OrderQuerryData, setOrderDateIndex: Dispatch<SetStateAction<number>>, orderIndex: number, remountFn: () => void }) {
  const itemsPerPage = 12
  const [currentPage, setCurrentPage] = useState<number>(Math.floor(order?.Order?.length / itemsPerPage) || 0)

  const paginatedItems = order?.Order?.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  const changePage = (direction: 'next' | 'prev') => {
    setCurrentPage((prev) => direction === 'next' ? prev + 1 : Math.max(prev - 1, 0))
  }

  const handleClick = (index: number) => {
    remountFn()
    setOrderDateIndex(index)
  }

  return (
    <div>
      <div className="grid grid-cols-[repeat(4,minmax(0,1fr))] grid-rows-3 md:grid-cols-[repeat(6,minmax(0,1fr))] md:grid-rows-2 gap-5">
        {paginatedItems && paginatedItems.length > 0 
          ? paginatedItems.map((item, index) => (
              <div key={index} onClick={() => handleClick(currentPage * itemsPerPage + index)} className={`px-5 py-3 border border-gray-400 rounded-lg hover:bg-gray-100 transition-all cursor-pointer ${orderIndex === currentPage * itemsPerPage + index ? 'bg-gray-100' : ''}`}>
                <p>
                  <span className="md:hidden">{new Date(item.orderDate).toLocaleString('pt-BR', { month: 'long' }).slice(0,3)}</span>
                  <span className="hidden md:inline">{new Date(item.orderDate).toLocaleString('pt-BR', { month: 'long' })}</span>, 
                  <span> {new Date(item.orderDate).getDate() + 1}</span>
                </p>
              </div>
            ))
          : <p>No Orders to see</p>}
      </div>

      <div className="flex justify-between mt-4">
        <button type="button" onClick={() => changePage('prev')} disabled={currentPage === 0} className="px-4 py-2 border-2 rounded-lg border-gray-200 hover:bg-gray-300 disabled:opacity-50">
          Prev
        </button>
        <button type="button" onClick={() => changePage('next')} disabled={(currentPage + 1) * itemsPerPage >= (order?.Order?.length || 0)} className="px-4 py-2 border-2 rounded-lg border-gray-200 hover:bg-gray-300 disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  )
}

export function PastOrdersDefault({order, setOrderDateIndex, orderIndex, remountFn}: {order: OrderQuerryData, setOrderDateIndex: Dispatch<SetStateAction<number>>, orderIndex: number, remountFn: () => void}) {
  const handleClick = (index: number) => {
    setOrderDateIndex(index)
    remountFn()
  }

  return (
    <div className='grid grid-cols-6 grid-rows-2 gap-5'>
      {order === null ? '' : order?.Order?.map((item, index) => (
        <div key={index} onClick={() => handleClick(index)} className={`px-5 py-3 border border-gray-400 rounded-lg hover:bg-gray-100 transition-all cursor-pointer ${orderIndex === index ? 'bg-gray-100' : null}`}>
          <p>
            <span>{new Date(item.orderDate).toLocaleString('pt-BR', { month: 'long' })}</span>, 
            <span> {new Date(item.orderDate).getDate() + 1}</span>
          </p>
        </div>    
      ))}
    </div>
  )
}