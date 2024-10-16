"use client";

import * as z from 'zod';
import axios from "axios";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button' 
import { useState } from 'react';
import { File, ImageIcon, Loader2, Pencil, PlusCircle, PlusCircleIcon, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Attachment, Course } from '@prisma/client';
import Image from 'next/image';
import { FileUpload } from '@/components/file-upload';

interface AttachmentFormProps {
    initialData:Course & {attachments: Attachment[]};
    courseId: string;
}

const formSchema = z.object({
    url: z.string().min(1),
})

export const AttachmentForm = ({
    initialData,
    courseId
}: AttachmentFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const  form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
})

const toggleEdit = () => setIsEditing((current) => !current);
const router = useRouter();

const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try{
        await axios.post(`/api/courses/${courseId}/attachments`, values);
        toast.success('Course Image updated')
        toggleEdit()
        router.refresh()
    } catch {
        toast. error('Somthing went wrong')
    }
}

const onDelete = async (id: string) => {
    try{
        setDeletingId(id);
        await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
        toast.success('Attachment deleted');
        router.refresh();
    } catch {
        toast.error('Something went wrong')
    } finally {
        setDeletingId(null)
    }
}
  return (
    <div className='mt-6 border rounded-md p-4'>
        <div className='font-medium flex items-center justify-between'>
            <p>Course Attachments </p>
            <Button onClick={toggleEdit} variant = 'ghost' className='mb-2'>
                {isEditing && (
                    <>Cancel</>
                )}

                {!isEditing && (
                    <>
                        <PlusCircle className='h-4 w-4 mr-2' />
                        Add a file
                    </>
                )}
            </Button>
        </div>
        {!isEditing && (
            <>
                {initialData.attachments.length === 0 && (
                    <p className='text-sm mt-2 text-slate-500 italic'>
                        No attachments yet
                    </p>
                )}

                {initialData.attachments.length > 0 && (
                    <div className='space-y-2'>
                        {initialData.attachments.map((attachment) => (
                            <div
                                key={attachment.id}
                                className='flex items-center p-3 w-full border rounded-md'>
                                <File className='h-6 w-6 mr-2' />
                                <p className='text-xs line-clamp-1'>
                                    {attachment.name}
                                </p>
                                {deletingId === attachment.id && (
                                    <div>
                                        <Loader2 className='h-6 w-6 animate-spin' />
                                    </div>
                                )}
                                {deletingId !== attachment.id && (
                                    <button
                                        onClick={() => onDelete(attachment.id)}
                                        className='ml-auto hover:opacity-75 transition'
                                    >
                                        <X className='h-4 w-4'/>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </>
        )}
        {isEditing && (
            <div>
                <FileUpload
                    endpoint='courseAttachment'
                    onChange={(url) => {
                        if(url){
                            onSubmit({url: url});
                        }
                    }}
                />
                <div className='text-xs text-muted-foreground mt-4'>
                    Add anything your student might need to complete this course
                </div>
            </div>
            
        )}   
    </div>
  );
}