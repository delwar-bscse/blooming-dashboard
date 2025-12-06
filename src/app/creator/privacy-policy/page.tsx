"use client";

import { myFetch } from '@/utils/myFetch';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const CreatorPrivacyPolicy = () => {
  const [content, setContent] = useState("");

  const getContent = async () => {
    toast.loading("Fetching...", { id: "fetch" });
    const res = await myFetch(`/setting`, {
      method: "GET",
    })
    
    if (res?.data) {
      setContent(res?.data?.privacyPolicy)
      toast.success("Fetched successfully!", { id: "fetch" });
    } else {
      toast.error(res?.message || "Failed to fetch!", { id: "fetch" });
    }
  };
  useEffect(() => {
    getContent();
  }, []);

  return (
    <div className='p-6 my-8 mx-8 min-h-screen rounded-xl bg-white shadow-md'>
      {/* <h1 className='text-3xl font-bold text-gray-800 mb-8 border-b-4 border-b-gray-400 pb-3'>Privacy Policy</h1> */}
      <div>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  )
}

export default CreatorPrivacyPolicy