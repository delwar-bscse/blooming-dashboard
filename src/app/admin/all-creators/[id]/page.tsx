/* eslint-disable react-hooks/exhaustive-deps */
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
    const res = await myFetch(`/creator/${id}`, {
      method: "GET",
      tags: ["creator"],
    });

    console.log("Creator Details : ", res)

    if (res?.data) {
      setCreator(res?.data);
    } else {
      toast.error(res?.message || "Failed to fetch creator!");
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