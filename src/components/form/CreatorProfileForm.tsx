/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Control } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import Image from "next/image";
// import profileInputIcon from "@/assets/common/ProfileInputIcon.png";
import { bodyTypeSelectOptions, ethnicitySelectOptions, genderSelectOptions, hairTypeSelectOptions, skinTypeSelectOptions } from "@/constant/creatorFormDatas";
import { TSelectionOptions } from "@/type/creatorDataTypes";
import { creatorProfileFormSchema } from "@/schemas/profileSchema";
import VideoViewCard from "../cui/VideoViewCard";
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

const nicheItems = ["Fitness & Health", "Beauty & Skin Care", "Fashion", "Home Decor", "Gardening", "Food & Drink", "Travel", "Family & Parenting", "Gaming", "Pets & Animals", "Tech & Gadgets", "Business Money", "Digital Products"]

// Schema


// Type
type creatorProfileFormValues = z.infer<typeof creatorProfileFormSchema>;

{/* ---------------------------- Sign Up Form ---------------------------- */ }
const CreatorProfileForm = ({ myProfile, getMe }: { myProfile: any, getMe: any }) => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const form = useForm<creatorProfileFormValues>({
    resolver: zodResolver(creatorProfileFormSchema),
    defaultValues: { ...myProfile, introductionvideo: null, ugcExampleVideo: [], profile: null },
    mode: "onChange",
  });

  //console.log("My Profile : ", myProfile)


  useEffect(() => {
    setIsMounted(true);
  }, []);

  async function onSubmit(data: creatorProfileFormValues) {
    toast.loading("Updating Profile...", { id: "updateProfile" });
    const { profile, ugcExampleVideo, introductionvideo, niche, ...restData } = data;

    const formData = new FormData();
    Object.entries(restData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (niche && niche.length > 0) {
      niche.forEach((item: any) => {
        formData.append("niche", item);
      })
    }



    if (profile) {
      formData.append("profile", profile);
    }

    if (introductionvideo) {
      formData.append("introductionvideo", introductionvideo[0]);
    }

    if (ugcExampleVideo?.length > 0) {
      ugcExampleVideo.forEach((file: File) => {
        formData.append("ugcExampleVideo", file);
      });
    }


    const res = await myFetch(`/creator/update-creator`, {
      method: "PATCH",
      body: formData,
      tags: ["creatorProfile"]
    })

    if (res.success) {
      toast.success("Profile updated successfully!", { id: "updateProfile" });
      getMe();
    } else {
      toast.error(res.message || "Profile Update failed!", { id: "updateProfile" });
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

  const handleDelete = async ({creatorId, videoId}: {creatorId: string, videoId: string}) => {
    toast.loading("Deleting video...", { id: "deleteVideo" });
    const res = await myFetch(`/creator/video-delete/${creatorId}`, {
      method: "DELETE",
      body: {
        videoId: videoId
      },
    });
    if (res.success) {
      getMe();
      toast.success("Video deleted successfully!", { id: "deleteVideo" });
    } else {
      toast.error(res.message || "Delete failed!", { id: "deleteVideo" });
    }
  };


  return (
    <div className="w-full max-w-[700px] mx-auto flex text-center justify-center py-20 px-2">
      <div className="bg-white px-2 sm:px-4 md:px-8 py-6 md:py-8 w-full rounded-4xl">
        {/* <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-gray-600 pb-2">Creator Profile</h2> */}

        {isMounted && (
          <div className="relative inline-block">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-3 border-white bg-gray-300">
              <Image
                src={imgUrl || myProfile?.userId?.profile}
                alt="content image"
                className="object-cover w-full h-full"
                width={128}
                height={128}
                unoptimized
              />
            </div>

            {/* <Image
              onClick={() => document.getElementById("profileImgCtrl")?.click()}
              src={profileInputIcon}
              alt="Upload Icon"
              className="absolute bottom-2 right-1 w-8 h-8 z-10 cursor-pointer hover:scale-110 transition-all duration-300"
              width={32}
              height={32}
            /> */}
          </div>
        )}

        {myProfile && <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            {/* Profile Image */}
            <FormField
              control={form.control}
              name="profile"
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
            <TextInputField control={form.control} name="fullName" label="Full Name" isDisabled={true} />

            {/* Brand Email */}
            <TextInputField control={form.control} name="email" label="Email" isDisabled={true} />

            {/* Brand Phone */}
            <TextInputField control={form.control} name="phone" label="Phone Number" isDisabled={true} />

            {/* Brand DOB */}
            <TextInputField control={form.control} name="dateOfBirth" label="Date of Birth" />

            {/*--------------------------------------------------------------*/}
            {/* Brand Country */}
            <TextInputField control={form.control} name="country" label="Country" />

            {/* Brand State */}
            <TextInputField control={form.control} name="state" label="State" />

            {/* Brand Postal Code */}
            <TextInputField control={form.control} name="postalCode" label="Postal Code" />

            {/* Brand City */}
            <TextInputField control={form.control} name="city" label="City" />

            {/* Brand Street */}
            <TextInputField control={form.control} name="street" label="Street" />

            {/* Brand House No */}
            <TextInputField control={form.control} name="houseBuildingNo" label="House, Building No" />


            {/*------------------------------------------------------------ */}
            {/* Brand Niche */}
            {/* <SelectInputField control={form.control} name="niche" label="Select Niche" options={nicheSelectOptions} /> */}
            <FormField
              control={form.control}
              name="niche"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" text-lg">
                    Niche (Select multiple)
                  </FormLabel>

                  <div className="flex flex-wrap gap-3">
                    {nicheItems.map((item: string, index: number) => (
                      <label
                        key={index}
                        className="flex items-center gap-2  text-sm"
                      >
                        <input
                          type="checkbox"
                          checked={field.value?.includes(item)}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            field.onChange(
                              checked
                                ? [...(field.value || []), item]
                                : field.value.filter((v: string) => v !== item)
                            );
                          }}
                        />
                        {item}
                      </label>
                    ))}
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Brand Languages */}
            <TextInputField control={form.control} name="language" label="Languages Spoken" />

            {/* Brand Profession */}
            <TextInputField control={form.control} name="profession" label="Profession" />


            {/* -------------------------------------------------------------- */}
            {/* Brand Gender */}
            <SelectInputField control={form.control} name="gender" label="Gender" options={genderSelectOptions} />

            {/* Brand Ethnicity */}
            <SelectInputField control={form.control} name="ethnicity" label="Ethnicity" options={ethnicitySelectOptions} />

            {/* Brand Body Type */}
            <SelectInputField control={form.control} name="bodyType" label="Body Type" options={bodyTypeSelectOptions} />

            {/* Brand  Hair Type */}
            <SelectInputField control={form.control} name="hairType" label="Hair Type" options={hairTypeSelectOptions} />

            {/* Brand Skin Type */}
            <SelectInputField control={form.control} name="skinType" label="Skin Type" options={skinTypeSelectOptions} />

            {/* ------------------------------------------------------------------ */}
            {/* Brand tiktok handle */}
            <TextInputField control={form.control} name="tiktokHandle" label="TikTok Handle" />


            {/* Brand tiktok link */}
            <TextInputField control={form.control} name="tiktokLink" label="TikTok Link" />



            {/* Brand Instagram Handle */}
            <TextInputField control={form.control} name="instragramHandle" label="Instagram Handle" />


            {/* Brand Instagram Link */}
            <TextInputField control={form.control} name="instragramLink" label="Instagram Link" />


            {/* Brand Other Socials */}
            <TextInputField control={form.control} name="othersSocialLink" label="Other Socials" />


            {/* Brand Portfolio Link */}
            <TextInputField control={form.control} name="portfolioLink" label="Portfolio Link" />


            {/* ------------------------------------------------------------------ */}
            {/* Brand UGC Example Videos */}
            <FormField
              control={form.control}
              name="ugcExampleVideo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">UGC Example Videos (Upload up to 6 videos)</FormLabel>
                  <FormControl>
                    <Input
                      variant="borderwhiteVideo"
                      type="file"
                      accept="video/mp4"
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
            <div className="grid grid-cols-2 gap-4">
              {myProfile?.ugcExampleVideo?.map((item: any) => (
                // <VideoViewCard key={item?.key} videoUrl={item?.url} />
                <div key={item?.key} className="relative bg-gray-200 w-60 h-40 aspect-video flex items-center justify-center">
                  {/* <p>{videoUrl}</p> */}
                  <video width="480" height="320" controls className='h-full object-cover'>
                    <source src={item?.url ?? ""} type="video/mp4" />
                    <track
                      src="/path/to/captions.vtt"
                      kind="subtitles"
                      srcLang="en"
                      label="English"
                    />
                    Your browser does not support the video tag.
                  </video>
                  <p onClick={() => handleDelete({creatorId:myProfile?._id, videoId: item?._id})} className="absolute top-2 left-2 text-lg text-red-500 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 transition-colors duration-300 p-1">
                    <Trash2 className="size-4 hover:text-red-600 transition-colors duration-300"/>
                  </p>
                </div>
              ))
              }
            </div>

            {/* Brand Intro Video */}
            <FormField
              control={form.control}
              name="introductionvideo"
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

            <div className="grid grid-cols-2 gap-4">
              <VideoViewCard videoUrl={myProfile?.introductionvideo} />
            </div>

            {/* Submit */}
            <Button variant="customYellow" type="submit" size="llg" className="w-full">
              Save & Change
            </Button>
          </form>
        </Form>}

        {/* <Toaster  position="top-right" reverseOrder={false}/> */}

      </div>
    </div>
  );
};



// Input Fields Components //
const TextInputField = ({
  isDisabled,
  control,
  name,
  label,
}: {
  control: Control<creatorProfileFormValues>;
  name: keyof creatorProfileFormValues;
  label: string;
  isDisabled?: boolean
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-lg">{label}</FormLabel>
          <FormControl>
            <Input disabled={isDisabled} variant="borderblack" placeholder="Enter full name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};


// Select Fields Components //
const SelectInputField = ({
  control,
  name,
  label,
  options
}: {
  control: Control<creatorProfileFormValues>;
  name: keyof creatorProfileFormValues;
  label: string;
  options: TSelectionOptions[]
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-lg">{label}</FormLabel>
          <Select value={field.value} onValueChange={field.onChange} >
            <FormControl>
              <SelectTrigger variant="borderblack" className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options?.map((option: any) => (
                <SelectItem key={option?.value} value={option?.value} className='cursor-pointer'>
                  {option?.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CreatorProfileForm;
