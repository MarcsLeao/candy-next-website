import React from 'react'
import { Logo } from '../home/Logo'
import { UserInfo } from './UserInfo'

export default function Header() {
  return (
    <header className='flex justify-between items-center p-5 border-b'>
        <Logo />
        <UserInfo />
    </header>
  )
}
