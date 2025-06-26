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
import { CircleCheck, CircleMinus, Plus } from "lucide-react";
import { Label } from "@/components/ui/label"
// import { packageDataType } from "@/type/type";
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";


// Schema
const contactUsFormSchema = z.object({
  image: z
    .any()
    .optional()
    .refine((file) => file instanceof File || file === undefined, {
      message: "Please upload a valid image file",
    }),
  title: z.string(),
  subtitle: z.string(),
  videoCount: z.string(),
  price: z.string(),
});

// Type
type ContactUsFormValues = z.infer<typeof contactUsFormSchema>;


{/* ---------------------------- Package Form ---------------------------- */ }
const EditPackageSubscription = () => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [benefits, setBenefits] = useState<string[]>([]);
  const [benefitInput, setBenefitInput] = useState<string>('');

  const searchParams = useSearchParams();
  const id = searchParams.get("id");     // e.g. "662f..."
  const type = searchParams.get("type");

  // console.log(id, type);

  const defaultValues: Partial<ContactUsFormValues> = {
    title: "",
    subtitle: "",
    videoCount: "",
    price: "",
  };

  const form = useForm<ContactUsFormValues>({
    resolver: zodResolver(contactUsFormSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    console.log("first useEffect called");
    const fetchPackageData = async () => {
      const res = await myFetch(`/package/${id}`, {
        method: "GET",
      });
      console.log("GET: package Response:", res);
      setImgUrl(res?.data?.image || null);
      setBenefits(res?.data?.benefits || []);

      form.reset({
        title: res?.data?.title || "",
        subtitle: res?.data?.subtitle || "",
        videoCount: res?.data?.videoCount?.toString() || "",
        price: res?.data?.price?.toString() || "",
      });

    }
    fetchPackageData();
    setIsMounted(true);
  }, [id, form]);

  async function onSubmit(data: ContactUsFormValues) {
    // toast.success("Message send successfully!");
    // console.log("Submitted Data:", data);

    const formData = new FormData();
    console.log(id, type);


    formData.append("title", data.title);
    formData.append("subtitle", data.subtitle);
    formData.append("videoCount", data.videoCount);
    formData.append("price", data.price);

    if (type === "one_time" || type === "monthly") {
      // console.log( type);
      formData.append("type", type);
    }

    if (data?.image) {
      formData.append("image", data?.image);
    }

    if (benefits.length > 0) {
      benefits.forEach((benefit) => {
        formData.append("benefits", benefit);
      });
    }

    const res = await myFetch(`/package/${id}`, {
      method: "PATCH",
      body: formData,
    });
    console.log("Update package Response:", res);

    if (res?.success) {
      toast.success("Package updated successfully!");
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

            {/* Package Headline */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 text-lg">Package Headline</FormLabel>
                  <FormControl>
                    <Input variant="borderblack" placeholder="Package headline" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Package Description */}
            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 text-lg">Package Description</FormLabel>
                  <FormControl>
                    <Input variant="borderblack" placeholder="Package description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Package Description */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 text-lg">Package Price</FormLabel>
                  <FormControl>
                    <Input variant="borderblack" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Package Description */}
            <FormField
              control={form.control}
              name="videoCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 text-lg">Number of Videos</FormLabel>
                  <FormControl>
                    <Input variant="borderblack" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Package Benefits */}
            <div>
              <Label htmlFor="terms" className="text-gray-600 text-lg pb-1.5">Benefits</Label>
              <div className="flex items-center gap-2">
                <Input id="terms" variant="borderblack" placeholder="" value={benefitInput} onChange={e => setBenefitInput(e.target.value)} />
                <span
                  className="border-2 border-gray-400 cursor-pointer p-2.5 rounded-md"
                  onClick={() => {
                    if (benefitInput.trim()) {
                      // console.log(benefitInput);
                      setBenefits([...benefits as string[], benefitInput.trim()]);
                      setBenefitInput('');
                    }
                  }}
                >
                  <Plus />
                </span>
              </div>
            </div>

            {benefits.length > 0 && <ul className="grid gap-2 p-4 border rounded-lg mb-4">
              {benefits?.map((item, idx) => (
                <li key={idx} className="flex items-center justify-between gap-4 py-2 border-b border-b-gray-100">
                  <p className="flex items-center gap-2">
                    <CircleCheck className="size-5 min-w-5 text-green-500" />
                    {item}
                  </p>
                  <span
                    onClick={() => {
                      const updatedOffers = benefits.filter((_, index) => index !== idx);
                      setBenefits(updatedOffers);
                    }}
                    className="cursor-pointer"
                  >
                    <CircleMinus className="text-stone-500" />
                  </span>
                </li>
              ))}
            </ul>}



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

export default EditPackageSubscription;
