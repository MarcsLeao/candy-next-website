import { InputProps } from "@headlessui/react";

interface CustomInputProps extends InputProps {
  defaultValue: string;
}

export default function Input({ defaultValue}: CustomInputProps) {
  return (
    <input 
      type="text" 
      maxLength={35} 
      defaultValue={defaultValue} 
      className='border-b border-gray-400 px-1 max-w-[150px] text-right focus:outline-none focus:ring-2 focus:ring-gray-700'
    />
  )
}
