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
import { useEffect, useState } from "react";
import Image from "next/image";
import profileInputIcon from "@/assets/common/ProfileInputIcon.png";
import { Label } from "@/components/ui/label"
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";


// Schema
const contactUsFormSchema = z.object({
  image: z
    .any()
    .refine(
      (file) => file instanceof File && file.type.startsWith("image/"),
      "Please upload a valid image file"
    ),
  title: z.string(),
  details: z.string(),
  headline: z.string(),
  headlineDetails: z.string(),
  bodyTextDetails: z.string(),
  bodyImage: z
    .any()
    .refine(
      (file) => file instanceof File && file.type.startsWith("image/"),
      "Please upload a valid image file"
    ),
  benefit: z.string(),
  disadvantage: z.string(),
  uploadImg1: z
    .any()
    .refine(
      (file) => file instanceof File && file.type.startsWith("image/"),
      "Please upload a valid image file"
    ),
  uploadImg2: z
    .any()
    .refine(
      (file) => file instanceof File && file.type.startsWith("image/"),
      "Please upload a valid image file"
    ),
  uploadImg3: z
    .any()
    .refine(
      (file) => file instanceof File && file.type.startsWith("image/"),
      "Please upload a valid image file"
    ),
  ugcheadline: z.string(),
  ugcDetails: z.string(),
  ugcImage: z
    .any()
    .refine(
      (file) => file instanceof File && file.type.startsWith("image/"),
      "Please upload a valid image file"
    ),
  keyOfFeature: z.string(),
  price: z.string(),

});

// Type
type ContactUsFormValues = z.infer<typeof contactUsFormSchema>;


{/* ---------------------------- Package Form ---------------------------- */ }
const AddBlogPost = () => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  async function onSubmit(data: ContactUsFormValues) {
    toast.success("Message send successfully!");
    console.log("Submitted Data:", data);

    // const formData = new FormData();


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
    <div className="w-full max-w-[700px] mx-auto flex text-center justify-center py-20 px-2">
      <div className="bg-white px-2 sm:px-4 md:px-8 py-6 md:py-8 w-full rounded-4xl">

        {isMounted && (
          <div className="relative inline-block">
            <div className="w-40 h-40 mx-auto rounded-xl overflow-hidden border-3 border-white bg-gray-300">
              {imgUrl ? (
                <Image
                  src={imgUrl ?? ""}
                  alt="content image"
                  className="object-cover w-full"
                  width={200}
                  height={200}
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
        )}

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
                  <FormLabel className="text-gray-600 text-lg">Name</FormLabel>
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
                  <FormLabel className="text-gray-600 text-lg">Body Text</FormLabel>
                  <FormControl>
                    <Input variant="borderblack" placeholder="Body Text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-gray-600 text-2xl text-center font-semibold ">Details Type Here</div>

            {/* Package title */}
            <FormField
              control={form.control}
              name="headline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 text-lg">Headline</FormLabel>
                  <FormControl>
                    <Input variant="borderblack" placeholder="Type..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*  */}
            <FormField
              control={form.control}
              name="headlineDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 text-lg">Details</FormLabel>
                  <FormControl>
                    <Input variant="borderblack" placeholder="Type..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-gray-600 text-2xl text-center font-semibold ">What Is Deep Fake content ?</div>

            {/* Package title */}
            <FormField
              control={form.control}
              name="bodyTextDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 text-lg">Body Text</FormLabel>
                  <FormControl>
                    <Input variant="borderblack" placeholder="Type..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*  */}
         {/* Body Image Image */}
            <FormField
              control={form.control}
              name="bodyImage"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="packageImgCtrl"
                      type="file"
                      accept="image/*"
                      variant="borderblack"
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

            
            <div className="text-gray-600 text-2xl text-center font-semibold ">Benefit And Disadvantages of AGC</div>

            {/* Package title */}
            <FormField
              control={form.control}
              name="benefit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 text-lg">Benefit</FormLabel>
                  <FormControl>
                    <Input variant="borderblack" placeholder="Type..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*  */}
            <FormField
              control={form.control}
              name="disadvantage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 text-lg">Disadvantage</FormLabel>
                  <FormControl>
                    <Input variant="borderblack" placeholder="Type..." {...field} />
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

        {/* <Toaster  position="top-right" reverseOrder={false}/> */}

      </div>
    </div>
  );
};

export default AddBlogPost;
