import { useGetOrdersAxios } from '@/src/services/OrderService';
import { useGetProducts } from '@/src/services/ProductService';
import { OrderQuerryData } from '@/src/@types/orders-query';
import { ProductQuerryData } from '@/src/@types/product-querry';
import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

type DropdownOrdersProps = {
  text: string
  options: string[]
  setFilteredOrders: (data: OrderQuerryData[] | null) => void
}

type DropdownProductsProps = {
  text: string
  options: string[]
  setFilteredProducts: (data: ProductQuerryData[] | null) => void
}

export function DropdownOrder({ text, options, setFilteredOrders }: DropdownOrdersProps) {
  const defaultDropdownDate = text === 'Order Date' ? 'none' : null
  const defaultDropdownPayment = text === 'Payment' ? 'all' : null
  const {data: orders} = useGetOrdersAxios()
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(defaultDropdownDate || defaultDropdownPayment || 'all')

  const handleOpen = () => {
    setIsOpen((prev) => !prev)
  }

  const handleSelected = (option: string) => {
    setSelected(option)
    setIsOpen(false)

    if (option === 'latest') {
      const filtered = [...orders]?.sort(
        (a: OrderQuerryData, b: OrderQuerryData) => {
          const first = a.Order[a.Order.length - 1]
          const second = b.Order[b.Order.length - 1]
          if (!second || !first) return !second ? -1 : 1
          return new Date(second.orderDate).getTime() - new Date(first.orderDate).getTime()
        }
      )
      return setFilteredOrders(filtered)
    }
    
    if (option === 'oldest') {
      const filtered = [...orders]?.sort(
        (a: OrderQuerryData, b: OrderQuerryData) => {
          const first = a.Order[a.Order.length - 1]
          const second = b.Order[b.Order.length - 1]
          if (!second || !first) return !second ? -1 : 1
          return new Date(first.orderDate).getTime() - new Date(second.orderDate).getTime()
        }
      )
      return setFilteredOrders(filtered)
    }

    if (option === 'unpaid') {
      const filtered = orders?.filter((order: OrderQuerryData) => {
        const lastOrder = order.Order[order.Order.length - 1]
        return lastOrder?.unpaidAmount && lastOrder.unpaidAmount > 0
      })
      return setFilteredOrders(filtered || orders)
    }

    if(option === 'overpaid'){
      const filtered = orders?.filter((order: OrderQuerryData) => {
        const lastOrder = order.Order[order.Order.length - 1]
        return lastOrder?.Overpayment && lastOrder.Overpayment > 0
      })
      return setFilteredOrders(filtered || orders)
    }
    
    if(option === 'reset') return setFilteredOrders(orders)
  }

  return (
    <div className="relative inline-block">
      <div className="truncate cursor-pointer border p-2 rounded-lg text-sm hover:border-gray-400 focus:border-gray-400 transition-all" onMouseEnter={handleOpen} onMouseLeave={() => setIsOpen(false)}>
        {text}: <span className="font-medium">{selected}</span>{' '}
        <IoIosArrowDown className="inline" />
        <div className={`${isOpen ? 'absolute' : 'hidden'} overflow-hidden left-0 rounded-lg rounded-t-[0px] w-full z-10 mt-1 bg-white border-x border-b border-gray-400`}>
          <ul>
            {options.map((item, index) => (
              <li key={index} className="hover:bg-gray-200 px-2 py-1" onClick={() => handleSelected(item)}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function DropdownProduct({ text, options, setFilteredProducts }: DropdownProductsProps) {
  const defaultDropdownStock = text === 'Stock' ? 'none' : null
  const defaultDropdownPrice = text === 'Price' ? 'all prices' : null
  const {data} = useGetProducts()
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(defaultDropdownStock || defaultDropdownPrice ||'All')

  const handleOpen = () => {
    setIsOpen((prev) => !prev)
  }

  const handleSelected = (option: string) => {
    setSelected(option)
    setIsOpen(false)

    if(option === 'higher qty') {
      const filtered = [...data].sort((a, b) => b.stock - a.stock)
      return setFilteredProducts(filtered || data)
    }
    
    if(option === 'lower qty') {
      const filtered = [...data].sort((a, b) => a.stock - b.stock)
      return setFilteredProducts(filtered || data)
    }

    if(option === 'higher price') {
      const filtered = [...data].sort((a, b) => b.price - a.price)
      return setFilteredProducts(filtered || data)
    }
    
    if(option === 'lower price') {
      const filtered = [...data].sort((a, b) => a.price - b.price)
      return setFilteredProducts(filtered || data)
    }
  }

  return (
    <div className="relative inline-block">
      <div className="cursor-pointer border p-2 rounded-lg text-sm hover:border-gray-400 focus:border-gray-400 transition-all" onMouseEnter={handleOpen} onMouseLeave={() => setIsOpen(false)}>
        {text}: <span className="font-medium">{selected}</span>{' '}
        <IoIosArrowDown className="inline" />
        <div className={`${isOpen ? 'absolute' : 'hidden'} overflow-hidden left-0 rounded-lg rounded-t-[0px] w-full z-10 mt-1 bg-white border-x border-b border-gray-400`}>
          <ul>
            {options.map((item, index) => (
              <li key={index} className="hover:bg-gray-200 px-2 py-1" onClick={() => handleSelected(item)}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
