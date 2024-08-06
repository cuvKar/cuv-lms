"use client"
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ModeToggle } from '@/components/mode-toggle'
import { LogOut } from 'lucide-react'
import { 
    SignInButton,
    SignedOut,
    SignedIn,
    UserButton,
} from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { SearchInput } from './search-input'

function NavbarRoutes() {
    const pathname = usePathname()
    const router = useRouter()

    const isTeacherPage = pathname?.startsWith('/teacher')
    const isStudentPage = pathname?.includes('/courses')
    const isSearchPage = pathname === '/search'

  return (
    <>
        {isSearchPage && (
            <div className='hidden md:block'>
                <SearchInput />
            </div>
        )}
        <div className='flex gap-x-2 ml-auto'>
            {isTeacherPage || isStudentPage ? (
                <Link href="/">
                    <Button size="sm" variant="ghost">
                        <LogOut className='h-4 w-4 mr-2' />
                        Exit
                    </Button>
                </Link>
            ): (
                <Link href="/teacher/courses">
                    <Button size="sm" variant="ghost">
                        Teacher Mode
                    </Button>
                </Link>
            )}
            <UserButton
                afterSignOutUrl='/'
            />
            <ModeToggle />
        </div>
    </>
  ) 
}

export default NavbarRoutes