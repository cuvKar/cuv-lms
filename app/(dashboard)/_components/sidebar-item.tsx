import { LucideIcon } from 'lucide-react'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
    icon: LucideIcon;
    label: string;
    href: string;
}

function SidebarItem({
    icon,
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
            "flex items-center gap-x-2 text-slate-500 text-sm pl-6 transition-all hover:text-slate-600 hover:bg-slate-700",
            isActive && "text-sky-500 bg-sky-200/20"
        )}
    >
    </button>
  )
}

export default SidebarItem