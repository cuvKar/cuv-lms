import React from 'react'
import Sidebar from './_components/sidebar'
import Header from './_components/header'

export default function DashboardLayout({
    children,
    }: {
    children: React.ReactNode
}) {
  return (
    
    <div>
      <Header />
      <Sidebar />
        {children}
    </div>
  )
}
