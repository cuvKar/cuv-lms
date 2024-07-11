"use client"
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ModeToggle } from '@/components/mode-toggle'
import { 
    SignInButton,
    SignedOut,
    SignedIn,
    UserButton,
   } from '@clerk/nextjs'

function NavbarRoutes() {
    const pathname = usePathname()
    const router = useRouter()

    const isTeacherPage = pathname?.startsWith('/teacher')
    const isStudentPage = pathname?.includes('/chapter')

  return (
    <div className='flex gap-x-2 ml-auto'>
        <SignedOut>
            <SignInButton />
        </SignedOut>
        <SignedIn>
            <UserButton />
        </SignedIn>
        <ModeToggle />
    </div>
  ) 
}

export default NavbarRoutes