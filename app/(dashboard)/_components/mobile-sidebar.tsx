"use client"
import { Menu } from 'lucide-react'
import React from 'react'
import { 
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet"
import Sidebar from './sidebar'

function MobileSidebar() {
  return (
    <div>
        <Sheet>
            <SheetTrigger className='md:hidden pr-4 hover:opacity-75 transition'>
                <Menu/>
            </SheetTrigger>
            <SheetContent side='left' className='p-0 border-r-0'>
                <Sidebar/>
            </SheetContent>
        </Sheet>
        
    </div>
  )
}

export default MobileSidebar