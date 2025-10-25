/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useEffect, useState } from 'react'

import { myFetch } from '@/utils/myFetch';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';



const AdminVideoWatch = () => {
  const [status, setStatus] = useState<string>("");
  const params = useParams();
  const hireCreatorId = params["project-details"];

  const [awsVideoUrls, setAwsVideoUrls] = useState<string[]>([]);
  const [isForward, setIsForward] = useState<boolean>(false);



  const getAwsVideosUrls = async () => {
    toast.loading("Fetching uploaded videos...", { id: "fetch" });
    const res = await myFetch(`/hire-creator/all-videos-by-hirecreator/${hireCreatorId}`, {
      method: "GET",
    });
    
    if (res.success) {
      toast.success("Videos fetched successfully!", { id: "fetch" });
      setIsForward(res?.data?.isForward);
      setAwsVideoUrls(res?.data?.allVideos || []);
      setStatus(res?.data?.status);
    } else {
      toast.error(res.message || "Fetching failed!", { id: "fetch" });
      // console.error("Fetching failed:", res.message);
    }
  };

  useEffect(() => {
    getAwsVideosUrls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const forwardVideosToBrand = async () => {
    const res = await myFetch(`/hire-creator/forward-video/${hireCreatorId}`, {
      method: "PATCH",
    });
    
    if (res.success) {
      toast.success("Videos forwarded successfully!");
      setIsForward(true);
    } else {
      toast.error(res.message || "Forwarding failed!");
    }
  };




  return (
    <div className='px-2 max-w-[1200px] mx-auto'>
      <div className='bg-white p-4 rounded-lg shadow-md min-h-200 '>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {awsVideoUrls?.map((singleVideo: any) => (
            <div key={singleVideo?._id} className='relative'>
              <div className='w-full h-[200px]'>
                <video width="480" height="320" controls className='h-full'>
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
              <p>ID: {singleVideo?.key}</p>
            </div>
          ))}
        </div>
        {awsVideoUrls.length > 0 && !isForward && status !== "delivered" && <div className='flex justify-end pt-6'>
          <button onClick={forwardVideosToBrand} className='py-2 px-8 font-semibold bg-green-500 hover:bg-green-700 text-white rounded-full transition-colors duration-300 cursor-pointer'>Forward For Brand</button>
        </div>}
      </div>
    </div>
  )
}

export default AdminVideoWatch