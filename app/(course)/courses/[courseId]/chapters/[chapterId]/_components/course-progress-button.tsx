"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation"
import { useState } from "react";

import { useConfettiStore } from "@/hooks/use-confetti-store";
import { set } from "zod";
import toast from "react-hot-toast";
import axios from "axios";

interface CourseProgressButtonProps {
    courseId: string;
    chapterId: string;
    isCompleted?: boolean;
    nextChapterId?: string;
}

export const CourseProgressButton = ({
    courseId,
    chapterId,
    isCompleted,
    nextChapterId
}: CourseProgressButtonProps) => {
    const Icon = isCompleted ? XCircle : CheckCircle;
    const router = useRouter();
    const confetti = useConfettiStore();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try{
            setIsLoading(true);

            await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
                isCompleted: !isCompleted,
            })

            if(!isCompleted && !nextChapterId){
                confetti.onOpen();
            }

            if(!isCompleted && nextChapterId){
                router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
            }

            toast.success("Progress updated successfully");
            router.refresh();

        } catch (error) {
            toast.error("An error occurred. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div>
            <Button
                onClick={onClick}
                disabled={isLoading}
                type="button"
                variant = {isCompleted ? "outline" : "success"}
            >
                {isCompleted ? "Not Completed" : "Mark as Complete" }
                <Icon className="h-4 w-4 ml-2" />
            </Button>
        </div>
    )
}