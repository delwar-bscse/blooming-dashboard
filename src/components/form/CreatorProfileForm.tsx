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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import Image from "next/image";
import profileInputIcon from "@/assets/common/ProfileInputIcon.png";
// import toast, { Toaster } from 'react-hot-toast';

// Schema
const contactUsFormSchema = z.object({
  profileImg: z
    .any()
    .refine(
      (file) => file instanceof File && file.type.startsWith("image/"),
      "Please upload a valid image file"
    ),
  fullName: z.string(),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  //-----------------------------//
  phoneNumber: z.string(),
  dob: z.string(),
  country: z.string(),
  state: z.string(),
  city: z.string(),
  postalCode: z.string(),
  street: z.string(),
  houseNo: z.string(),
  //----------------------------//
  niche: z.string(),
  Languages: z.string(),
  profession: z.string(),
  //--------------------------//
  gender: z.string(),
  ethnicity: z.string(),
  bodyType: z.string(),
  hairType: z.string(),
  skinType: z.string(),
  //--------------------------//
  tiktokHandle: z.string(),
  tiktokLink: z.string(),
  instagramHandle: z.string(),
  instagramLink: z.string(),
  otherSocials: z.string(),
  portfolioLink: z.string(),
  //--------------------------//
  ugcExampleVideos: z
    .any()
    .refine(
      (files) =>
        Array.isArray(files) &&
        files.length > 0 &&
        files.length <= 6 &&
        files.every((file) => file instanceof File && file.type.startsWith("video/")),
      "Please upload up to 6 valid video files"
    ),
  introVideo: z
    .any()
    .refine(
      (file) =>
        file instanceof File && file.type.startsWith("video/"),
      "Please upload a valid video file"
    ),
});

// Type
type ContactUsFormValues = z.infer<typeof contactUsFormSchema>;

const defaultValues: Partial<ContactUsFormValues> = {
  fullName: "",
  email: "",
  phoneNumber: "",
  dob: "",
  country: "",
  state: "",
  city: "",
  postalCode: "",
  street: "",
  houseNo: "",
  niche: "",
  Languages: "",
  profession: "",
  gender: "",
  ethnicity: "",
  bodyType: "",
  hairType: "",
  skinType: "",
  tiktokHandle: "",
  tiktokLink: "",
  instagramHandle: "",
  instagramLink: "",
  otherSocials: "",
  portfolioLink: "",
  introVideo: [],
  ugcExampleVideos: [],
};
{/* ---------------------------- Sign Up Form ---------------------------- */ }
const CreatorProfileForm = () => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const form = useForm<ContactUsFormValues>({
    resolver: zodResolver(contactUsFormSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  function onSubmit(data: ContactUsFormValues) {
    // toast.success("Message send successfully!");
    console.log("Submitted Data:", data);
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
        <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-white pb-12">Creator Profile</h2>

        {isMounted && (
          <div className="relative inline-block">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-3 border-white bg-gray-300">
              {imgUrl ? (
                <Image
                  src={imgUrl}
                  alt="content image"
                  className="object-cover w-full"
                  width={128}
                  height={128}
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
            </div>

            <Image
              onClick={() => document.getElementById("profileImgCtrl")?.click()}
              src={profileInputIcon}
              alt="Upload Icon"
              className="absolute bottom-2 right-1 w-8 h-8 z-10 cursor-pointer hover:scale-110 transition-all duration-300"
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
              name="profileImg"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="profileImgCtrl"
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

            {/* Brand Name */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Full Name</FormLabel>
                  <FormControl>
                    <Input variant="borderblack" placeholder="Enter full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Brand Name */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Email</FormLabel>
                  <FormControl>
                    <Input variant="borderblack" placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Brand Name */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Phone Number</FormLabel>
                  <FormControl>
                    <Input variant="borderblack" placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Brand Name */}
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Date of Birth</FormLabel>
                  <FormControl>
                    <Input variant="borderblack" placeholder="01.01.2001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*--------------------------------------------------------------*/}
            {/* Brand Name */}
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Country</FormLabel>
                  <FormControl>
                    <Input variant="borderblack" placeholder="Enter country name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Brand Name */}
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">State</FormLabel>
                  <FormControl>
                    <Input variant="borderblack" placeholder="Enter state name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Brand Name */}
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Postal Code</FormLabel>
                  <FormControl>
                    <Input variant="borderblack" placeholder="Enter postal code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Brand Name */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">City</FormLabel>
                  <FormControl>
                    <Input variant="borderblack" placeholder="Enter city name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Brand Name */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">City</FormLabel>
                  <FormControl>
                    <Input variant="borderblack" placeholder="Enter city name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Brand Name */}
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Street</FormLabel>
                  <FormControl>
                    <Input variant="borderblack" placeholder="Enter street name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Brand Name */}
            <FormField
              control={form.control}
              name="houseNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">House, Building No</FormLabel>
                  <FormControl>
                    <Input variant="borderblack" placeholder="Enter house, building no" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*------------------------------------------------------------ */}
            <FormField
              control={form.control}
              name="niche"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Niche (E.G. Beauty, Lifestyle, Fitness)</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange} >
                    <FormControl>
                      <SelectTrigger variant="borderblack" className="w-full">
                        <SelectValue placeholder="Select Niche" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Fitness">Fitness & Health</SelectItem>
                      <SelectItem value="Beauty & Skin Care">Beauty & Skin Care</SelectItem>
                      <SelectItem value="Fashion">Fashion</SelectItem>
                      <SelectItem value="Home Decor">Home Decor</SelectItem>
                      <SelectItem value="Gardening">Gardening</SelectItem>
                      <SelectItem value="Food & Drink">Food & Drink</SelectItem>
                      <SelectItem value="Travel">Travel</SelectItem>
                      <SelectItem value="Family & Parenting">Family & Parenting</SelectItem>
                      <SelectItem value="Gaming">Gaming</SelectItem>
                      <SelectItem value="Pets & Animals">Pets & Animals</SelectItem>
                      <SelectItem value="Tech & Gadgets">Tech & Gadgets</SelectItem>
                      <SelectItem value="Business Money">Business Money</SelectItem>
                      <SelectItem value="Digital Products">Digital Products</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Brand Name */}
            <FormField
              control={form.control}
              name="Languages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Languages Spoken</FormLabel>
                  <FormControl>
                    <Input variant="borderblack" placeholder="Type..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Brand Name */}
            <FormField
              control={form.control}
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Job/Profession</FormLabel>
                  <FormControl>
                    <Input variant="borderblack" placeholder="Type..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* -------------------------------------------------------------- */}
             {/* Brand Name */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Gender</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange} >
                    <FormControl>
                      <SelectTrigger variant="borderblack" className="w-full">
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Brand Name */}
            <FormField
              control={form.control}
              name="ethnicity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Ethnicity</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange} >
                    <FormControl>
                      <SelectTrigger variant="borderblack" className="w-full">
                        <SelectValue placeholder="Select Ethnicity" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="White & European">White & European</SelectItem>
                      <SelectItem value="African">African</SelectItem>
                      <SelectItem value="Middle Eastern">Middle Eastern</SelectItem>
                      <SelectItem value="Asian">Asian</SelectItem>
                      <SelectItem value="Hispanic">Hispanic</SelectItem>
                      <SelectItem value="Latino">Latino</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Brand Name */}
            <FormField
              control={form.control}
              name="bodyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Body Type</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange} >
                    <FormControl>
                      <SelectTrigger variant="borderblack" className="w-full">
                        <SelectValue placeholder="Select Body Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Slim">Slim</SelectItem>
                      <SelectItem value="Fit">Fit</SelectItem>
                      <SelectItem value="Plus Size">Plus Size</SelectItem>
                      <SelectItem value="Athletic">Athletic</SelectItem>
                      <SelectItem value="Curvy">Curvy</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Brand Name */}
            <FormField
              control={form.control}
              name="hairType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Hair Type</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange} >
                    <FormControl>
                      <SelectTrigger variant="borderblack" className="w-full">
                        <SelectValue placeholder="Select Hair Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Straight">Straight</SelectItem>
                      <SelectItem value="Curly">Curly</SelectItem>
                      <SelectItem value="Long">Long</SelectItem>
                      <SelectItem value="Short">Short</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Brand Name */}
            <FormField
              control={form.control}
              name="skinType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Skin Type</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange} >
                    <FormControl>
                      <SelectTrigger variant="borderblack" className="w-full">
                        <SelectValue placeholder="Select Skin Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Oily">Oily</SelectItem>
                      <SelectItem value="Dry">Dry</SelectItem>
                      <SelectItem value="Acne Prone">Acne Prone</SelectItem>
                      <SelectItem value="Combination">Combination</SelectItem>
                      <SelectItem value="Sensitive">Sensitive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Brand Name
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Gender</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange} >
                    <FormControl>
                      <SelectTrigger variant="borderblack" className="w-full">
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            {/* ------------------------------------------------------------------ */}
            {/* Brand Name */}
            <FormField
              control={form.control}
              name="tiktokHandle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">TikTok Handle</FormLabel>
                  <FormControl>
                    <Input variant="borderblack" placeholder="Type..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Brand Name */}
            <FormField
              control={form.control}
              name="tiktokLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">TikTok Link</FormLabel>
                  <FormControl>
                    <Input variant="borderblack" placeholder="Type..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Brand Name */}
            <FormField
              control={form.control}
              name="instagramHandle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Instagram Handle</FormLabel>
                  <FormControl>
                    <Input variant="borderblack" placeholder="Type..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Brand Name */}
            <FormField
              control={form.control}
              name="instagramLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Instagram Link</FormLabel>
                  <FormControl>
                    <Input variant="borderblack" placeholder="Type..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Brand Name */}
            <FormField
              control={form.control}
              name="otherSocials"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Other Socials (YouTube, Threads, Etc.)</FormLabel>
                  <FormControl>
                    <Input variant="borderblack" placeholder="Type/paste..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Brand Name */}
            <FormField
              control={form.control}
              name="portfolioLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Portfolio Link</FormLabel>
                  <FormControl>
                    <Input variant="borderblack" placeholder="Enter your portfolio link" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ------------------------------------------------------------------ */}
             {/* Brand Name */}
            <FormField
              control={form.control}
              name="ugcExampleVideos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">UGC Example Videos (Upload Only 6 videos)</FormLabel>
                  <FormControl>
                      <Input
                        variant="borderwhiteVideo"
                        type="file"
                        accept="video/*"
                        multiple
                        onChange={(e) => {
                          const files = Array.from(e.target.files ?? []);
                          field.onChange(files);
                        }}
                      />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Brand Name */}
            <FormField
              control={form.control}
              name="introVideo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Introduction Video (Upload Only 1 video 30 seconds)</FormLabel>
                  <FormControl>
                      <Input
                        variant="borderwhiteVideo"
                        type="file"
                        accept="video/*"
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                      />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button variant="customYellow" type="submit" size="llg" className="w-full">
              Save & Change
            </Button>
          </form>
        </Form>

        {/* <Toaster  position="top-right" reverseOrder={false}/> */}

      </div>
    </div>
  );
};

export default CreatorProfileForm;
