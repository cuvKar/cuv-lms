"use client"
import Image from 'next/image'
import React from 'react'
import SidebarRoutes from './sidebar-routes'


function Sidebar() {
  return (
    <div className='h-screen w-60 absolute top-0 py-5 px-5 border-r'>
      <div className='logo p-6'>
        <Image src='/next.svg' alt='logo' width={100} height={100} />
      </div>
      <div className='flex flex-col w-full'>
        <SidebarRoutes />
      </div>
    </div>
  )
}

export default Sidebar