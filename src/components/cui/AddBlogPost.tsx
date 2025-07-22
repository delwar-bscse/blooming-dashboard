"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Suspense, useState } from "react";
import Image from "next/image";
import profileInputIcon from "@/assets/common/ProfileInputIcon.png";
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";


// Schema
const contactUsFormSchema = z.object({
  image: z
    .any()
    .refine(
      (file) => file instanceof File && file.type.startsWith("image/"),
      "Please upload a valid image file"
    ),
  title: z.string(),
  details: z.string()

});

// Type
type ContactUsFormValues = z.infer<typeof contactUsFormSchema>;


{/* ---------------------------- Package Form ---------------------------- */ }
const AddBlogPostSuspense = () => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  // const searchParams = useSearchParams();
  // const type = searchParams.get("type");



  const defaultValues: Partial<ContactUsFormValues> = {
    // image: null,
  };

  const form = useForm<ContactUsFormValues>({
    resolver: zodResolver(contactUsFormSchema),
    defaultValues,
    mode: "onChange",
  });


  async function onSubmit(data: ContactUsFormValues) {
    toast.loading("Uploading blog...", { id: "upload" });
    // toast.success("Message send successfully!");
    console.log("Submitted Data:", data);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("details", data.details);
    formData.append("image", data.image!);


    const res = await myFetch("/blog/create-blog", {
      method: "POST",
      body: formData,
    });
    console.log("Blog Response:", res);
    if (res.success) {
      toast.success("Blog uploaded successfully!", { id: "upload" });
      form.reset();
    } else {
      toast.error(res.message || "Upload failed!", { id: "upload" });
      // console.error("Upload failed:", res.message);
    }


  }

  const handleImgUrl = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImgUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImgUrl(null);
    }
  };

  return (
    <div className="w-full max-w-[700px] mx-auto flex text-center justify-center py-10 px-2">
      <div className="bg-white px-2 sm:px-4 md:px-8 py-6 md:py-8 w-full rounded-4xl">

          <div className="relative block">
            <div className="w-full h-80 mx-auto rounded-xl overflow-hidden border-3 border-white bg-gray-300">
              {imgUrl ? (
                <Image
                  src={imgUrl ?? ""}
                  alt="content image"
                  className="object-cover"
                  width={800}
                  height={500}
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
            </div>

            <Image
              onClick={() => document.getElementById("packageImgCtrl")?.click()}
              src={profileInputIcon}
              alt="Upload Icon"
              className="absolute -bottom-1 -right-1 w-8 h-8 z-10 cursor-pointer hover:scale-110 transition-all duration-300"
              width={32}
              height={32}
            />
          </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            {/* Profile Image */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="packageImgCtrl"
                      type="file"
                      accept="image/*"
                      variant="inputHidden"
                      onChange={e => {
                        field.onChange(e.target.files?.[0]);
                        handleImgUrl(e.target.files?.[0] ?? null);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Package title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 text-lg">Title</FormLabel>
                  <FormControl>
                    <Input variant="borderblack" placeholder="Blog Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*  */}
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 text-lg">Description</FormLabel>
                  <FormControl>
                    {/* <Input type="textarea" variant="borderblack" placeholder="Body Text" {...field} className="min-h-[100px]"/> */}
                    <Textarea variant="blackBorder" placeholder="Body Text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            

            {/* Submit */}
            <Button variant="customYellow" type="submit" size="llg" className="w-full">
              Save
            </Button>
          </form>
        </Form>

      </div>
    </div>
  );
};

export default function AddBlogPost() {
  return (
    <Suspense fallback={<div>Loading...</div>} >
      <AddBlogPostSuspense />
    </Suspense>
  )
}
