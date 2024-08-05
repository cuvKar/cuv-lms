"use client";
import qs from "query-string";
import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import { 
    usePathname, 
    useRouter, 
    useSearchParams 
} from "next/navigation";
import { IconType } from "react-icons";

interface CategoryItemProps {
    label: string;
    value?: string;
    icon: IconType;
}

export const CategoryItem = ({
    label,
    value,
    icon: Icon,
}: CategoryItemProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentCategoryId = searchParams.get('categoryId');
    const currentTitle = searchParams.get('title');

    const isSelected = currentCategoryId === value;

    const onClick = () => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                categoryId: isSelected ? null : value,
                title: currentTitle,
            }
        }, { 
            skipEmptyString: true, 
            skipNull: true 
        });
        router.push(url);
    }
    return (
        <button className={cn(
            `py-2 px-3 text-sm border rounded-full flex 
             items-center gap-x-2 hover:border-sky-700 
             transition`,
             isSelected && `border-sky-700 bg-sky-200/20 
             text-sky-800 dark:border-grey-700 bg-grey-800/20
             dark:text-white-900`
        )}
        onClick={onClick}>
            {Icon && <Icon size={20} />}
            <div className="truncate">
                {label}
            </div>
        </button>
    )
}