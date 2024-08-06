"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import qs from "query-string";

export const SearchInput = () => {
    const [value, setValue] = useState("");
    const debouncedValue = useDebounce(value);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const currentCategoryId = searchParams.get("categoryId");

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                categoryId: currentCategoryId,
                title: debouncedValue,
            },
        }, { skipEmptyString: true, skipNull: true })

        router.push(url);
    }, [debouncedValue, currentCategoryId, router, pathname]);
    return(
        <div className="relative">
            <Search 
                className="h-4 w-4 absolute top-3 left-3"
            />
            <Input 
                className="w-full md:w-[300px] pl-9 rounded-full
                bg-gray-700 text-gray-800 focus-visible:ring-slate-200"

                placeholder="Search for a course"
            />
        </div>
        
    )
};