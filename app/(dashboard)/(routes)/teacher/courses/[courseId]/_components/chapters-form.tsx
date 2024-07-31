"use client";

import * as z from 'zod';
import axios from "axios";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button' 
import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Chapter, Course } from '@prisma/client';
import { ChaptersList } from './chapters-list';

interface ChaptersFormProps {
    initialData: Course & {chapters: Chapter[]};
    courseId: string;
}

const formSchema = z.object({
    title: z.string().min(1)
})

export const ChaptersForm = ({
    initialData,
    courseId
}: ChaptersFormProps) => {
    const [isCreating, setIsCreating] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const  form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        
        }
})

const { isSubmitting, isValid } = form.formState;

const toggleCreating = () => {
    setIsCreating((current) => !current)
};
const router = useRouter();

const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try{
        await axios.post(`/api/courses/${courseId}/chapters`, values);
        toast.success('Chapter created')
        toggleCreating()
        router.refresh()
    } catch {
        toast. error('Somthing went wrong')
    }
}

const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);

      await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
        list: updateData
      });
      toast.success("Chapters reordered");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
}

const onEdit = (id: string) => {
    router.push(`/teacher/courses/${courseId}/chapters/${id}`)
};
  return (
    <div className='mt-6 border rounded-md p-4'>
        <div className='font-medium flex items-center justify-between'>
            <p>Course Chapters </p>
            <Button onClick={toggleCreating} variant = 'ghost'>
                {isCreating ? (
                    <>Cancel</>
                ):(
                    <>
                        <PlusCircle className='h-4 w-4 mr-2' />
                        Add a Chapter
                    </>
                )}
            </Button>
        </div>
        {isCreating && (
            <Form {...form}>
               <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 mt-4"
                >
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input 
                                        disabled={isSubmitting}
                                        placeholder='e.g. Introduction to the course'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button
                        disabled={!isValid || isSubmitting}
                        type='submit'
                    >
                        Create
                    </Button>
               </form>
            </Form>
        )} 
        {!isCreating && (
            <div className={cn(
                'text-sm mt-2',
                !initialData.chapters.length && 'text-gray-500 italic'
            )}>
                {!initialData.chapters.length && "No chapters"}
                <ChaptersList 
                    onEdit = {onEdit}
                    onReorder={onReorder}
                    items = {initialData.chapters || []}
                />
            </div>
        )}
        {!isCreating && (
            <p className='text-xs text-muted-forgeound mt-4'>
                Drag & Drop to reorder the chapters
            </p>
        )}

    </div>
  );
}