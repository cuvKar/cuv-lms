import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";


interface CourseProgressProps {
    variant?: "default" | "success";
    value: number;
    size?: "default" | "sm"
}

const colorByVariant = {
    default: "text-gray-300",
    success: "text-green-500"
}

const sizeByVariant = {
    default: "text-sm",
    sm: "text-xs"
}

export const CourseProgress =({
    variant,
    value,
    size
}: CourseProgressProps) => {
    return (
        <div>
            <Progress 
                className="h-2"
                variant={variant}
                value={value}
            />
            <p className={cn(
                "font-medium mt-2",
                sizeByVariant[size || "default"],
                colorByVariant[variant || "default"]
            )}>
                {Math.round(value)}% Complete
            </p>
        </div>
    )
};