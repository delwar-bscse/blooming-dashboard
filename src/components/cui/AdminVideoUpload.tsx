"use client"

import React, { useEffect, useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { BsUpload } from "react-icons/bs";
import { myFetch } from '@/utils/myFetch';



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
  const [awsVideoUrls, setAwsVideoUrls] = useState<string[]>([]);
  const form = useForm<VideoUploadFormValues>({
    resolver: zodResolver(VideoUploadFormSchema),
    defaultValues,
    mode: "onChange",
  });


  const getAwsVideosUrls = async () => {

    const res = await myFetch('/upload-video', {
      method: 'GET',
    }
    );
    console.log("Fetch Uploaded Videos Response:", res);
    setAwsVideoUrls(res?.data[0]?.videos);
  };

  useEffect(() => {
    getAwsVideosUrls();
  }, []);



  async function onSubmit(data: VideoUploadFormValues) {
    console.log("Submitted Data:", data);
    const formData = new FormData();
    formData.append("category", "Food & Beverage");
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
      form.reset();
      getAwsVideosUrls();
    } else {
      console.error("Upload failed:", res.message);
    }

  }

  return (
    <div className='px-2 max-w-[1000px] mx-auto py-8'>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-4xl font-bold text-gray-700">Upload Videos</h2>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
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
                        <ul>
                          {Array.isArray(field.value) && field.value.length > 0 ? (
                            field.value.map((file: File, idx: number) => (
                              <li key={idx}>{file.name}</li>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-16">
          {awsVideoUrls.map((singleVideo, index) => (
            <div key={index}>
              <video width="480" height="320" controls preload="none">
                <source src={singleVideo?.url} type="video/mp4" />
                <track
                  src="/path/to/captions.vtt"
                  kind="subtitles"
                  srcLang="en"
                  label="English"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminVideoUpload