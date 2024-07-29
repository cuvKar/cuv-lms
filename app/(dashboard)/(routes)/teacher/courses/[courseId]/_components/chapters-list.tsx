"use client";

import { Chapter } from "@prisma/client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult
} from "@hello-pangea/dnd"
import { Grip, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { set } from "zod";

interface ChaptersListProps {
    items: Chapter[];
    onReorder: (updateData: {id: string, order: number}[]) => void;
    onEdit: (id: String) => void;
}

export const ChaptersList = ({
    items,
    onReorder,
    onEdit
}: ChaptersListProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const [chapters, setChapters] = useState(items);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        setChapters(items);
    }, [items]);

    if(!isMounted){
        return null;
    }

    const onDragEnd = (result: DropResult) => {
        if(!result.destination){
            return;
        }

        const items = Array.from(chapters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        const startIndex = Math.min(result.source.index, result.destination.index);
        const endIndex = Math.max(result.source.index, result.destination.index);

        const updatedChapts  = items.slice(startIndex, endIndex + 1);
        setChapters(items);

        const bulkUpdateData = updatedChapts.map((chapters) => ({
            id: chapters.id,
            order: items.findIndex((item) => item.id === chapters.id)
        }));

        onReorder(bulkUpdateData);

    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="chapters">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {chapters.map((chapter, index) => (
                            <Draggable 
                                key={chapter.id} 
                                draggableId={chapter.id} 
                                index={index}
                            >
                                {(provided) => (
                                    <div
                                        className={cn(
                                            "flex items-center gap-x-2 border-slate-200 p-2 bg-slate-200 dark:bg-gray-500 rounded-md mb-4 text-sm",
                                            chapter.isPublished && "border-sky-200 text-sky-600"
                                        )}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                    >
                                        <div
                                            className={cn(
                                                "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                                                chapter.isPublished && "bg-sky-200 border-sky-200"
                                            )}
                                            {...provided.dragHandleProps}
                                        >
                                            <Grip 
                                                className="h-5 w-5"
                                            />
                                            
                                        </div>
                                        {chapter.title}
                                        <div 
                                            className="ml-auto pr-2 flex items-center gap-x-2">
                                                {chapter.isFree && (
                                                    <Badge>
                                                        Free
                                                    </Badge>
                                                )}
                                                <Badge
                                                    className={cn(
                                                        "bg-slate-500 dark:bg-gray-400",
                                                        chapter.isPublished && "bg-sky-600 dark:bg-gray-500"
                                                    )}
                                                >
                                                    {chapter.isPublished ? "Published" : "Draft"}
                                                </Badge>
                                                <Pencil
                                                    onClick={() => onEdit(chapter.id)} 
                                                    className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                                                />
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}