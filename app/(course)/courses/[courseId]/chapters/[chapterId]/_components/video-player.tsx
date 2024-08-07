"use client";

import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Loader2, Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface VideoPlayerProps {
    playbackId: string;
    chapterId: string;
    courseId: string;
    nextChapter?: string;
    isLocked: boolean;
    completeOnEnd: boolean;
    title: string;
}

export const VideoPlayer = ({
    playbackId,
    chapterId,
    courseId,
    nextChapter,
    isLocked,
    completeOnEnd,
    title,
}: VideoPlayerProps) => {
    const [isReady, setIsReady] = useState(false);
    const router = useRouter();
    return(
        <div className="relative aspect-video">
            {!isReady && !isLocked && (
                <div className="absolute inset-0 flex items-center
                justify-center bg-slate-800">
                    <Loader2 className="h-8 w-8 animate-spin text-white" />
                </div>
            )}

            {isLocked && (
                <div className="absolute inset-0 flex items-center
                                justify-center bg-slate-800 flex-col 
                                gap-y-2 text-white"
                >
                    <Lock className="h-8 w-8" />
                    <p className="text-sm">This chapter is locked</p>
                </div>
            )}

            {!isLocked && (
                <MuxPlayer 
                    title={title}
                    className={cn(
                        !isReady && 'hidden',
                    )}
                    onCanPlay={() => setIsReady(true)}
                    onEnded = {() => {}}
                    autoPlay
                    playbackId={playbackId}
                />
            )}
        </div>
    )
};