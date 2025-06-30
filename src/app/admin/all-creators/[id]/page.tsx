"use client";

import CustomButton from '@/components/cui/CustomButtom';
import VideoViewCard from '@/components/cui/VideoViewCard';
import { Button } from '@/components/ui/button';
// import { singleCreatorDatas } from '@/data/creatorDatas';
import { TSingleCreator } from '@/type/creatorDataTypes';
import { myFetch } from '@/utils/myFetch';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';


const CreatorDetailsPage: React.FC = () => {
  const router = useRouter();
  const [creator, setCreator] = useState<TSingleCreator>();
  const params = useParams();
  const id = params["id"];

  // const creator: TSingleCreator = singleCreatorDatas;

  const getCreator = async () => {
    toast.loading("Fetching creator...", { id: "fetch" });
    const res = await myFetch(`/creator/${id}`, {
      method: "GET",
    });
    console.log(res?.data);
    if (res?.data) {
      toast.success("Creator fetched successfully!", { id: "fetch" });
      setCreator(res?.data);
    } else {
      toast.error(res?.message || "Fetching failed!", { id: "fetch" });
    }
  }

  useEffect(() => {
    getCreator();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleApprove = async () => {
    toast.loading("Updating creator status...", { id: "approved" });

    const res = await myFetch(`/creator/approved-cancel/${id}?status=approved`, {
      method: "PATCH",
    });
    // console.log(res);
    if (res?.data) {
      toast.success("Creator Approved successfully!", { id: "approved" });
      getCreator();
    } else {
      toast.error(res?.message || "Updating failed!", { id: "approved" });
    }
  }

  const handleDecline = async () => {
    toast.loading("Declining creator...", { id: "decline" });

    const res = await myFetch(`/creator/approved-cancel/${id}`, {
      method: "PATCH",
    });
    console.log(res);
    if (res?.data) {
      toast.success("Creator Declined successfully!", { id: "decline" });
      router.push("/admin/all-creators");
    } else {
      toast.error(res?.message || "Declining failed!", { id: "decline" });
    }
  }


  return (
    <div className="p-6 my-8 w-full max-w-[1000px] mx-auto bg-white shadow-md">
      <div className="flex justify-between items-center mb-8 pb-4 border-b-4 border-b-gray-400">
        <h1 className="text-3xl font-bold text-gray-800">Creator Details</h1>
        <div onClick={() => window.history.back()} className='cursor-pointer w-40'>
          <CustomButton text="Back" variant="button01" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-11 mb-8">
        <div className='w-[290px] h-[290px] rounded-lg overflow-hidden'>
          {creator?.userId?.profile && <Image src={creator?.userId?.profile} alt="Creator" width={100} height={100} className="w-full h-auto rounded-lg" />}
        </div>
        <div className="">
          {/* <h2 className="text-xl font-semibold text-gray-700 mb-4">Personal Information</h2> */}
          <div className="space-y-3">
            <DetailItem label="Name" value={creator?.accountHolderName ?? ""} />
            <DetailItem label="Email" value={creator?.email ?? ""} />
            <DetailItem label="Phone Number" value={creator?.phone ?? ""} />
            <DetailItem label="Date of Birth" value={creator?.dateOfBirth ?? ""} />
            <DetailItem label="Address" value={creator?.country ?? ""} />
            <DetailItem label="Language" value={creator?.language ?? ""} />
            <DetailItem label="Gender" value={creator?.gender ?? ""} />
            <DetailItem label="Body Type" value={creator?.bodyType ?? ""} />
          </div>
        </div>
      </div>


      {/* Creator Details */}
      <div className="p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Creator Details</h2>
        <div className="space-y-3">
          <DetailItem label="Niche" value={creator?.niche ?? ""} isWide={true} />
          <DetailItem label="Job Profession" value={creator?.profession ?? ""} isWide={true} />
          <DetailItem label="Ethnicity" value={creator?.ethnicity ?? ""} isWide={true} />
          <DetailItem label="Skin Type" value={creator?.skinType ?? ""} isWide={true} />
          <DetailItem label="Hair Type" value={creator?.hairType ?? ""} isWide={true} />
          <DetailItem label="Bank Details" value={creator?.bankName ?? ""} isWide={true} />
          <DetailItem label="Bank Email" value={creator?.paypalEmail ?? ""} isWide={true} />
        </div>
      </div>

      {/* Working Links */}
      <div className="p-4 rounded-lg mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Working Links</h2>
        <div className="grid grid-cols-1 gap-4">
          <SocialLinkItem label="TikTok Handle" value={creator?.tiktokHandle ?? ""} />
          <SocialLinkItem label="TikTok Link" value={creator?.tiktokLink ?? ""} isLink />
          <SocialLinkItem label="Instagram Handle" value={creator?.instragramHandle ?? ""} />
          <SocialLinkItem label="Instagram Link" value={creator?.instragramLink ?? ""} isLink />
          <SocialLinkItem label="Other Social Link" value={creator?.othersSocialLink ?? ""} isLink />
          <SocialLinkItem label="Portfolio Link" value={creator?.portfolioLink ?? ""} isLink />
        </div>
      </div>

      {/* UGC Example Videos */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">UGC Example Videos</h2>
        <div className="flex flex-wrap gap-8">
          {creator?.ugcExampleVideo.map((video, index) => (
            <VideoViewCard key={`ugc-${index}`} videoUrl={video?.url} />
          ))}
        </div>
      </div>

      {/* Introduction Example Videos */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Introduction Example Videos</h2>
        {creator?.introductionvideo && <VideoViewCard videoUrl={creator?.introductionvideo} />}
      </div>

      <div className='py-10'>
        {creator?.status === "pending" &&
          <div className="flex items-center justify-center gap-8">
            <Button onClick={handleDecline} size={"lgw"} variant={"outlineRed"} className="mt-4">Decline</Button>
            <Button onClick={handleApprove} size={"lgw"} variant={"btnGreen"} className="mt-4">Approve</Button>
          </div>
        }
      </div>
    </div>
  );
};

const DetailItem: React.FC<{ label: string; value: string, isWide?: boolean }> = ({ label, value, isWide }) => (

  <div className="flex">
    <span className={`font-medium text-gray-600 ${isWide ? 'w-80' : 'w-40'}`}>{label}</span>
    <span className="text-gray-800">: {value}</span>
  </div>
);

const SocialLinkItem: React.FC<{ label: string; value: string; isLink?: boolean }> = ({ label, value, isLink = false }) => (
  <div className="flex">
    <span className="font-medium text-gray-600 w-80">{label}</span>
    {isLink ? (
      <a href={value} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline truncate">
        {value}
      </a>
    ) : (
      <span className="text-gray-800">{value}</span>
    )}
  </div>
);


{/* <div className="flex items-center justify-center gap-8">
  <Button size={"lgw"} variant={"outlineRed"} className="mt-4">Delete</Button>
  <Button size={"lgw"} variant={"btnGreen"} className="mt-4">Block</Button>
</div> */}



export default CreatorDetailsPage;