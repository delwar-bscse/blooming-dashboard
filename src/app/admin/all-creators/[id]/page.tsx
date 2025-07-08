"use client";

import CreatorDetails from '@/components/cui/CreatorDetails';
import { TSingleCreator } from '@/type/creatorDataTypes';
import { myFetch } from '@/utils/myFetch';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';


const CreatorDetailsPage: React.FC = () => {
  const [creator, setCreator] = useState<TSingleCreator>();
  const params = useParams();
  const id = params["id"];

  const getCreator = async () => {
    toast.loading("Fetching creator...", { id: "fetch" });
    const res = await myFetch(`/creator/${id}`, {
      method: "GET",
      tags: ["creator"],
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
  }, [])




  return (
    <CreatorDetails creator={creator as TSingleCreator} id={id as string} />
  );
};



export default CreatorDetailsPage;