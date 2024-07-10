"use client"
import Image from 'next/image'
import React from 'react'
import SidebarRoutes from './sidebar-routes'


function Sidebar() {
  return (
    <div className='h-screen w-60 absolute top-0  border-r'>
      <div className='logo p-6'>
        <Image src='/next.svg' alt='logo' width={100} height={100} className='block dark:hidden'/>
        <Image src='/next-white.svg' alt='logo' width={100} height={100} className='hidden dark:block'/>
      </div>
      <div className='flex flex-col w-full'>
        <SidebarRoutes />
      </div>
    </div>
  )
}

export default Sidebar