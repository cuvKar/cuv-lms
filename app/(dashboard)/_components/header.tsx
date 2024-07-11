import React from 'react'
import MobileSidebar from './mobile-sidebar'
import NavbarRoutes from './navbar-routes'

function Header() {
  return (
    <header className='flex w-full h-[70px] justify-between px-10'>
      <div className='flex w-full h-full items-center'>
        <MobileSidebar/>
        <NavbarRoutes/>
      </div>
  </header>
  )
}

export default Header