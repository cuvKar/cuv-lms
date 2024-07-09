import React from 'react'
import { ModeToggle } from '@/components/mode-toggle'
import { 
  SignInButton,
  SignedOut,
  SignedIn,
  UserButton,
 } from '@clerk/nextjs'

function Header() {
  return (
    <header className='flex w-screen h-[80px] justify-end px-10'>
        <div className='flex'>
        <SignedOut>
            <SignInButton />
        </SignedOut>
        <SignedIn>
            <UserButton />
        </SignedIn>
        <ModeToggle />
        </div>
  </header>
  )
}

export default Header