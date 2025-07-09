/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import CreatorProfileForm from '@/components/form/CreatorProfileForm'
import { myFetch } from '@/utils/myFetch';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const CreatorProfile = () => {
  const [myProfile, setMyProfile] = useState<any>(null);


  const getMe = async () => {
      toast.loading("Fetching My Profile...", { id: "fetchProfile" });
      const res = await myFetch(`/creator/me`,{
        tags: ["creatorProfile"]
      });
      console.log("Creator Profile: ", res?.data);
      if (res?.success) {
        toast.success("Profile fetched successfully!", { id: "fetchProfile" });
        setMyProfile(res?.data);
      } else {
        toast.error(res?.message || "Profile Fetching failed!", { id: "fetchProfile" });
      }
    }
  
    useEffect(() => {
      getMe()
    }, [])


  return (
    <div>
      {myProfile && <CreatorProfileForm myProfile={myProfile} getMe={getMe}/>}
    </div>
  )
}

export default CreatorProfile