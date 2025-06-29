/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useEffect, useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { MdDeleteForever } from "react-icons/md";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { BsUpload } from "react-icons/bs";
import { myFetch } from '@/utils/myFetch';
// import { LuUpload } from "react-icons/lu";
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';




const VideoUploadFormSchema = z.object({
  uploadVideos: z
    .any()
    .refine(
      (files) =>
        Array.isArray(files) &&
        files.length > 0 &&
        files.length <= 6 &&
        files.every((file) => file instanceof File && file.type.startsWith("video/")),
      "Please upload up to 6 valid video files"
    )
});

// Type
type VideoUploadFormValues = z.infer<typeof VideoUploadFormSchema>;

const defaultValues: Partial<VideoUploadFormValues> = {
  uploadVideos: [],
};



const AdminVideoUpload = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  const [awsVideoUrls, setAwsVideoUrls] = useState<string[]>([]);
  const form = useForm<VideoUploadFormValues>({
    resolver: zodResolver(VideoUploadFormSchema),
    defaultValues,
    mode: "onChange",
  });


  const getAwsVideosUrls = async () => {
    const res = await myFetch(`/upload-video?category=${category}`, {
      method: 'GET',
    }
    );
    console.log("Fetch Uploaded Videos Response:", res);
    setAwsVideoUrls(res?.data?.videos);
  };

  useEffect(() => {
    if(!category) return;
    getAwsVideosUrls();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const deleteVideo = async (url: string) => {
    toast.loading("Deleting video...", { id: "delete" });
    const res = await myFetch('/upload-video', {
      method: 'DELETE',
      body: {
        videourl: url
      }
    })
    console.log("Delete Video Response:", res);
    if (res.success) {
      getAwsVideosUrls();
      toast.success("Video deleted successfully!", { id: "delete" });
    } else {
      toast.error(res.message || "Delete failed!", { id: "delete" });
      // console.error("Delete failed:", res.message);
    }
  }



  async function onSubmit(data: VideoUploadFormValues) {
    toast.loading("Uploading videos...", { id: "upload" });
    // console.log("Submitted Data:", data);
    if(!category) {
      toast.error("Please select a category!", { id: "upload" });
      return;
    }
    console.log(category);
    const formData = new FormData();
    formData.append("category", category);
    data.uploadVideos.forEach((file: File) => {
      formData.append("videos", file);
    });

    const res = await myFetch('/upload-video/create', {
      method: 'POST',
      body: formData,
    }
    );
    // console.log("Upload Videos Response:", res);
    if (res.success) {
      toast.success("Videos uploaded successfully!", { id: "upload" });
      form.reset();
      getAwsVideosUrls();
    } else {
      toast.error(res.message || "Upload failed!", { id: "upload" });
      // console.error("Upload failed:", res.message);
    }

  }

  return (
    <div className='bg-white p-4 rounded-lg shadow-md min-h-200'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          {/* Videos Upload */}
          <FormField
            control={form.control}
            name="uploadVideos"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div>
                    <Input
                      id='uploadVideos'
                      variant="inputHidden"
                      type="file"
                      accept="video/*"
                      multiple
                      onChange={(e) => {
                        const files = Array.from(e.target.files ?? []);
                        field.onChange(files);
                      }}
                    />
                    <div onClick={() => document.getElementById('uploadVideos')?.click()} className='flex flex-wrap items-center justify-center border-3 border-dashed border-gray-200 rounded-lg p-4 mt-2 h-40 cursor-pointer hover:bg-gray-50 transition-colors duration-300 group'>
                      <ul className='flex flex-wrap items-center justify-center gap-8'>
                        {Array.isArray(field.value) && field.value.length > 0 ? (
                          field.value.map((file: File, idx: number) => (
                            <li key={idx}><span className='font-semibold text-gray-800 text-lg'>{idx + 1}.</span> {file.name}</li>
                          ))
                        ) : (
                          <BsUpload className='text-3xl text-gray-700 group-hover:text-gray-400 transition-colors duration-300' />
                        )}
                      </ul>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <div className="flex justify-end">
            <Button variant="customYellow" type="submit" size="llg" className="w-60">
              Upload Videos
            </Button>
          </div>
        </form>
      </Form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-16">
        {awsVideoUrls?.map((singleVideo: any) => (
          <div key={singleVideo?._id} className='relative'>
            <div onClick={() => deleteVideo(singleVideo.url)} className='flex items-center justify-center bg-white p-1 rounded-full shadow w-8 h-8 hover:bg-gray-100 transition-colors duration-300 cursor-pointer group absolute z-10 top-2 right-2'>
              <MdDeleteForever className='text-red-500 cursor-pointer text-xl group-hover:text-red-700 transition-colors duration-300' />
            </div>

            <video width="480" height="320" controls>
              <source src={singleVideo?.url} type="video/mp4" />
              <track
                src="/path/to/captions.vtt"
                kind="subtitles"
                srcLang="en"
                label="English"
              />
              Your browser does not support the video tag.
            </video>
            <p>ID: {singleVideo?.key}</p>

          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminVideoUpload