"use client";

import { Category } from "@prisma/client";
import {
    FcBiomass,
    FcEngineering,
    FcFilmReel,
    FcMultipleDevices,
    FcMusic,
    FcOldTimeCamera,
    FcSalesPerformance,
    FcSportsMode,
    FcPieChart,
    FcVideoProjector,
    FcVoicePresentation,
} from "react-icons/fc";

import { IconType } from "react-icons"; 
import { CategoryItem } from "./category-item";

interface CategoriesProps {
    items: Category[];
}

const iconMap: Record<Category['name'], IconType> =  {
    'Engineering': FcEngineering,
    'Chemistry': FcFilmReel,
    'Art': FcMusic,
    'Literature': FcOldTimeCamera,
    'Computer Science': FcSalesPerformance,
    'Sports': FcSportsMode,
    'Music': FcMultipleDevices,
    'Physical Education': FcVideoProjector,
    'Biology': FcVoicePresentation,
    'History': FcPieChart,
    'Geography': FcBiomass,
}

export const Categories = ({
    items,
}: CategoriesProps) => {
    return (
        <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
            {items.map((item) => (
                <CategoryItem 
                    key = {item.id}
                    label = {item.name}
                    icon = {iconMap[item.name]}
                    value = {item.id}
                />
            ))}
        </div>
    )
}