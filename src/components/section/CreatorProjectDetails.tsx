import Image from 'next/image';
import React from 'react'
import StarEmogi from "@/assets/common/star.png"
import LoveEmogi from "@/assets/common/loveEmoji.png"

type ProjectDetailsType = {
  projectInfo: {
    videos: { title: string; content: number };
    brandName: { title: string; content: string };
    productName: { title: string; content: string };
    productType: { title: string; content: string };
    productLink: { title: string; content: string };
  };
  brandSocial: {
    tiktokLink: { title: string; content: string };
    instagramLink: { title: string; content: string };
    websiteUrl: { title: string; content: string };
  };
  containInfo: {
    videoFormat: { title: string; content: string };
    videoDuration: { title: string; content: string };
    platform: { title: string; content: string };
    adHookOrCtaRequest: { title: string; content: string };
    exampleVideoLinks: { title: string; content: string };
    locationBasedCreatorRequirement: { title: string; content: string };
  };
  doAndDonts: {
    anyWordsNotToBeUsed: { title: string; content: string };
    anySpecificWordToUse: { title: string; content: string };
    howToPronounceYourBrandName: { title: string; content: string };
    anySpecialRequest: { title: string; content: string };
  };
};

type SubComponentProps<T> = {
  title: string;
  list: T;
};

const combinedProjectDetails: ProjectDetailsType = {
  projectInfo: {
    videos: { title: "Number of Videos", content: 2 },
    brandName: { title: "Brand Name", content: "Shamim" },
    productName: { title: "Product Name", content: "Fashion, Beauty, Daily Vlogs, Routines." },
    productType: { title: "Product Type", content: "Fashion, Beauty, Daily Vlogs, Routines." },
    productLink: { title: "Product Link", content: "Fashion, Beauty, Daily Vlogs, Routines." }
  },
  brandSocial: {
    tiktokLink: { title: "TikTok Link", content: "Fashion, Beauty, Daily Vlogs, Routines." },
    instagramLink: { title: "Instagram Link", content: "Fashion, Beauty, Daily Vlogs, Routines." },
    websiteUrl: { title: "Website URL", content: "Fashion, Beauty, Daily Vlogs, Routines." }
  },
  containInfo: {
    videoFormat: { title: "Video Format", content: "Fashion, Beauty, Daily Vlogs, Routines." },
    videoDuration: { title: "Video Duration", content: "15s, 20s, 30s" },
    platform: { title: "Platform", content: "15s, 20s, 30s" },
    adHookOrCtaRequest: { title: "Ad Hook Or CTA Request", content: "15s, 20s, 30s" },
    exampleVideoLinks: { title: "Example Video Links", content: "15s, 20s, 30s" },
    locationBasedCreatorRequirement: { title: "Location Based Creator Requirement", content: "Male" }
  },
  doAndDonts: {
    anyWordsNotToBeUsed: { title: "Any Words Not To Be Used", content: "Anything" },
    anySpecificWordToUse: { title: "Any Specific Word To Use", content: "Yes" },
    howToPronounceYourBrandName: { title: "How To Pronounce Your Brand Name", content: "Blooming Brand" },
    anySpecialRequest: { title: "Any Special Request", content: "Yes" }
  }
};



const CreatorProjectDetails = () => {
  return (
    <div className='space-y-5 pb-16'>
      <div className='bg-white rounded-2xl p-8'>
        <div className='flex items-center justify-center rounded-sm bg-[#FFF0BE] shadow gap-2 w-72 py-2.5 mb-6'>
          <Image src={StarEmogi} alt="package" width={30} height={30} />
          <p className='text-xl font-semibold text-gray-700'>Price $200</p>
          <Image src={LoveEmogi} alt="package" width={30} height={30} />
        </div>
        <SubComponent title="Project Info" list={combinedProjectDetails.projectInfo} />
      </div>
      <div className='bg-white rounded-2xl p-8'>
        <SubComponent title="Brand Social" list={combinedProjectDetails.brandSocial} />
      </div>
      <div className='bg-white rounded-2xl p-8'>
        <SubComponent title="Contain Info" list={combinedProjectDetails.containInfo} />
      </div>
      <div className='bg-white rounded-2xl p-8'>
        <SubComponent title="Do & Don'ts" list={combinedProjectDetails.doAndDonts} />
      </div>
    </div>
  )
}

const SubComponent = <T,>({ title, list }: SubComponentProps<T>) => {
  return (
    <>
      <h2 className='text-2xl font-bold mb-4'>{title}</h2>
      <ul className='space-y-1.5'>
        {Object.values(list as Record<string, { title: string; content: string | number }>).map((item, index) => (
          <li key={index} className='list-disc list-inside pl-4 text-gray-600'>
            <span className='font-semibold text-gray-700 text-lg'>{item.title}</span><br />
            <span className='pl-6'>{item.content}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CreatorProjectDetails