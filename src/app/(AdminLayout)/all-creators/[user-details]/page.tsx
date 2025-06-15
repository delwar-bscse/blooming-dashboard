import { Button } from '@/components/ui/button';
import { singleCreatorDatas } from '@/data/creatorDatas';
import { SingleCreatorData } from '@/type/type';
import Image from 'next/image';
import React from 'react';


const CreatorDetailsPage: React.FC = () => {
  const creator: SingleCreatorData = singleCreatorDatas;
  return (
    <div className="p-6 my-8 w-full max-w-[1000px] mx-auto bg-white shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b-4 border-b-gray-400 pb-3">Creator Details</h1>
      <div className="flex flex-col md:flex-row gap-11 mb-8">
        <div className='w-[290px] h-[290px] rounded-lg overflow-hidden'>
          <Image src={creator.image} alt="Creator" width={100} height={100} className="w-full h-auto rounded-lg" />
        </div>
        <div className="">
          {/* <h2 className="text-xl font-semibold text-gray-700 mb-4">Personal Information</h2> */}
          <div className="space-y-3">
            <DetailItem label="Name" value={creator.name} />
            <DetailItem label="Email" value={creator.email} />
            <DetailItem label="Phone Number" value={creator.phone_number} />
            <DetailItem label="Date of Birth" value={creator.date_of_birth} />
            <DetailItem label="Address" value={creator.address} />
            <DetailItem label="Language" value={creator.language} />
            <DetailItem label="Gender" value={creator.gender} />
            <DetailItem label="Body Type" value={creator.body_type} />
          </div>
        </div>
      </div>


      {/* Creator Details */}
      <div className="p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Creator Details</h2>
        <div className="space-y-3">
          <DetailItem label="Niche" value={creator.job_profession} isWide={true} />
          <DetailItem label="Job Profession" value={creator.job_profession} isWide={true} />
          <DetailItem label="Ethnicity" value={creator.ethnicity} isWide={true} />
          <DetailItem label="Skin Type" value={creator.skin_type} isWide={true} />
          <DetailItem label="Hair Type" value={creator.hair_type} isWide={true} />
          <DetailItem label="Bank Details" value={creator.bank_details.bank_name} isWide={true} />
          <DetailItem label="Bank Email" value={creator.bank_details.bank_email} isWide={true} />
        </div>
      </div>

      {/* Working Links */}
      <div className="p-4 rounded-lg mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Working Links</h2>
        <div className="grid grid-cols-1 gap-4">
          <SocialLinkItem label="TikTok Handle" value={creator.social_links.tik_tok_handle} />
          <SocialLinkItem label="TikTok Link" value={creator.social_links.tik_tok_link} isLink />
          <SocialLinkItem label="Instagram Handle" value={creator.social_links.instagram_handle} />
          <SocialLinkItem label="Instagram Link" value={creator.social_links.instagram_link} isLink />
          <SocialLinkItem label="Other Social Link" value={creator.social_links.others_social_link} isLink />
          <SocialLinkItem label="Portfolio Link" value={creator.social_links.portfolio_link} isLink />
        </div>
      </div>

      {/* UGC Example Videos */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">UGC Example Videos</h2>
        <div className="flex gap-8">
          {creator.ugc_videos.map((video, index) => (
            <VideoCard key={`ugc-${index}`} videoUrl={video} />
          ))}
        </div>
      </div>

      {/* Introduction Example Videos */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Introduction Example Videos</h2>
        <div className="flex gap-8">
          {creator.example_videos.map((video, index) => (
            <VideoCard key={`example-${index}`} videoUrl={video} />
          ))}
        </div>
      </div>

      <div className='py-10'>
        {false ? 
        <div className="flex items-center justify-center gap-8">
          <Button size={"lgw"} variant={"outlineRed"} className="mt-4">Decline</Button>
          <Button size={"lgw"} variant={"btnGreen"} className="mt-4">Approve</Button>
        </div> :
        <div className="flex items-center justify-center gap-8">
          <Button size={"lgw"} variant={"outlineRed"} className="mt-4">Delete</Button>
          <Button size={"lgw"} variant={"btnGreen"} className="mt-4">Block</Button>
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

const VideoCard: React.FC<{ videoUrl?: string }> = () => (
  <div className="bg-gray-200 w-48 h-48 rounded-lg overflow-hidden aspect-video flex items-center justify-center">
    <span className="text-gray-500">Video Placeholder</span>
    {/* In a real implementation, you would use a video player component here */}
  </div>
);

export default CreatorDetailsPage;