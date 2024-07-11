import React from 'react'
import MobileSidebar from './mobile-sidebar'
import NavbarRoutes from './navbar-routes'

function Header() {
  return (
    <header className='flex w-full h-[80px] justify-between px-10'>
      <div className='flex w-full pt-5'>
        <MobileSidebar/>
        <NavbarRoutes/>
      </div>
  </header>
  )
}

export default Header