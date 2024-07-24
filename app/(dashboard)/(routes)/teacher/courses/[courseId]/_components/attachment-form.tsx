"use client";

import * as z from 'zod';
import axios from "axios";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button' 
import { useState } from 'react';
import { ImageIcon, Pencil, PlusCircle, PlusCircleIcon } from 'lucide-react';
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
            </>
        )}
        {isEditing && (
            <div>
                <FileUpload
                    endpoint='courseImage'
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