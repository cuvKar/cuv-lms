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
      <Header />
      <Sidebar />
      <main className='pl-[16rem]'>
        {children}
      </main>
        
    </div>
  )
}
