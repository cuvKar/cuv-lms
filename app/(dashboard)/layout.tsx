import React from 'react'
import Sidebar from './_components/sidebar'
import Header from './_components/header'

export default function DashboardLayout({
    children,
    }: {
    children: React.ReactNode
}) {
  return (
    
    <div className='h-full'>
      <div className='h-[80px] md:pl-56 fixed inset-y-0 w-full z-50'>
        <Header />
      </div>
      <div className='hidden md:flex'>
        <Sidebar />
      </div>
      
      <main className='pl-[16rem]'>
        {children}
      </main>
        
    </div>
  )
}
