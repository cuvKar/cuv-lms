import { Compass, Layout, List, BarChart } from 'lucide-react'
import React from 'react'
import SidebarItem from './sidebar-item';
import { usePathname } from 'next/navigation';


const guestRoutes = [
    {
        icon: Layout,
        label: 'Dashboard',
        href: '/',
    },
    {
        icon: Compass,
        label: 'Browse',
        href: '/search',
    }
]

const teacherRoutes = [
    {
        icon: List,
        label: 'Courses',
        href: '/teacher/courses',
    },
    {
        icon: BarChart,
        label: 'Browse',
        href: '/teacher/analytics',
    }
]

function SidebarRoutes() {
    const pathname = usePathname()

    const isTeacherPage = pathname?.includes('/teacher')
    const routes = isTeacherPage ? teacherRoutes : guestRoutes;
  return (
    <div className='flex flex-col w-full'>
        {routes.map((routes) => (
            <SidebarItem 
                key={routes.href}
                icon={routes.icon}
                label={routes.label}
                href={routes.href}
            />
        ))}
    </div>
  )
}

export default SidebarRoutes