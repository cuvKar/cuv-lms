import { Icon, LucideIcon } from 'lucide-react'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
    icon: LucideIcon;
    label: string;
    href: string;
}

function SidebarItem({
    icon : Icon,
    label,
    href,
}: SidebarItemProps) {
    const pathname = usePathname();
    const router = useRouter();

    const isActive =
        (pathname === '/' && href === '/') ||
        pathname === href ||
        pathname.startsWith(`${href}/`);

    const onClick = () => {
        router.push(href);
    }
  return (
    <button
        onClick={onClick}
        className={cn(
            "flex items-center gap-x-2 text-slate-500 text-sm pl-6 transition-all hover:bg-slate-700 py-2 rounded-md hover:text-white",
            isActive && "text-sky-500 bg-sky-200/20 mb-5"
        )}
    >
        <div className='flex items-center gap-x-2 py-2 hover:text-white'>
            <Icon size={22}
                className={cn(
                    "text-slate-500",
                    isActive && "text-sky-500 pt-2"
            )}/>
            {label}
        </div>
        <div className={cn(
            "ml-auto opacity-0 border-2 border-sky-700 h-full transition-all",
            isActive && "opacity-100"
        )}></div>
    </button>
  )
}

export default SidebarItem