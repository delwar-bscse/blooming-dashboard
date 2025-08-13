/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"

// import CustomModal from '@/components/cui/CustomModal';
import { CustomSearchBar } from '@/components/cui/CustomSearchBar';
import CustomStep from '@/components/cui/CustomStep';
// import AdminCreatorListFilter from '@/components/modal/AdminCreatorListFilter';
import CustomTableSelection from '@/components/table/CustomTableSelection';
// import { Button } from '@/components/ui/button';
import { adminCreatorListColumns } from '@/tableColumn/adminCreatorsListColumns';
import { StepDataType } from '@/type/type';
// import { SlidersHorizontal } from 'lucide-react';
import { useParams, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'
import { AnimatePresence, motion } from "framer-motion";
import { myFetch } from '@/utils/myFetch';
import { toast } from 'sonner';
import { PartialExceptId, TSingleCreator } from '@/type/creatorDataTypes';
import CustomTableRadio from '@/components/table/CustomTableRadio';
import CreatorDetails from '@/components/cui/CreatorDetails';
import { Input } from '@/components/ui/input';
import { usePrice } from '@/contexts/PriceContext';

const stepDatas: StepDataType[] = [
  {
    id: 1,
    title: "Creator List",
    label: "creator-list",
  },
  {
    id: 2,
    title: "Agreed Creators",
    label: "agreed-creators",
  },
  {
    id: 3,
    title: "Approved Creator",
    label: "approved-creator",
  }
];



const OrderActionsSuspense = () => {
  const { price, setPrice } = usePrice();
  const [creatorsDatas, setCreatorsDatas] = useState<PartialExceptId<TSingleCreator>[]>([] as PartialExceptId<TSingleCreator>[]);
  const [creator, setCreator] = useState<PartialExceptId<TSingleCreator>>({} as PartialExceptId<TSingleCreator>);
  const [user, setUser] = useState<Record<string, any>>({});
  const [agreedCreatorsDatas, setAgreedCreatorsDatas] = useState<PartialExceptId<TSingleCreator>[]>([] as PartialExceptId<TSingleCreator>[]);
  const searchParams = useSearchParams();
  const params = useParams();
  const step = searchParams.get("step");
  const query = searchParams.get("query") || "";
  const hireCreatorId = params["id"];

  // const data = creatorDatas.slice(0, 9) as CreatorDataType[];

  const getCreators = async () => {
    toast.loading("Fetching Creators...", { id: "fetch" });
    const res = await myFetch(`/creator?status=approved&searchTerm=${query}`);
    // console.log(res?.data);
    if (res?.data) {
      setCreatorsDatas(res?.data);
      toast.success("All creators fetched successfully!", { id: "fetch" });
    } else {
      toast.error(res?.message || "Creators Fetching failed!", { id: "fetch" });
    }
  }

  const getApprovedCreator = async () => {
    toast.loading("Fetching Approved Creator...", { id: "fetchCreator" });
    const res = await myFetch(`/hire-creator/${hireCreatorId}`);
    console.log("Approved Creator:", res?.data?.userId);
    if (res?.data?.creatorId) {
      setCreator(res?.data?.creatorId);
      setUser(res?.data?.userId);
      toast.success("Approved creator fetched successfully!", { id: "fetchCreator" });
    } else {
      toast.error(res?.message || "Approved Creator Fetching failed!", { id: "fetchCreator" });
    }
  }

  const getAgreedCreators = async () => {
    toast.loading("Fetching AgreedCreators...", { id: "fetchAgreedCreators" });
    const res = await myFetch(`/assign-task-creator?status=request_approved&hireCreatorId=${hireCreatorId}`);
    if (res?.data) {
      console.log(res?.data);
      const modifyDatas = res?.data?.map((item: any) => {
        return {
          _id: item?._id,
          accountHolderName: item?.creatorUserId?.fullName,
          email: item?.creatorUserId?.email,
          phone: item?.creatorUserId?.phone,
          country: item?.creatorUserId?.address,
          status: item?.status
        }
      });
      console.log(modifyDatas);
      setAgreedCreatorsDatas(modifyDatas);
      toast.success("All agreed creators fetched successfully!", { id: "fetchAgreedCreators" });
    } else {
      toast.error(res?.message || "Agreed Creators Fetching failed!", { id: "fetchAgreedCreators" });
    }
  }



  useEffect(() => {
    if (step === "creator-list") {
      getCreators();
    }
    if (step === "agreed-creators") {
      getAgreedCreators();
    }
    if (step === "approved-creator") {
      getApprovedCreator();
    }
  }, [step, query]);


  return (
    <>
      <div className="py-4">
        <CustomStep stepDatas={stepDatas} />
      </div>
      <AnimatePresence mode="wait">
        {step === "creator-list" && (
          <motion.div
            key="project-details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <div className='flex-1 flex items-center gap-4'>
                <div className="w-full max-w-[600px]">
                  <CustomSearchBar placeholder = "Search by Email, Country"/>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <p className='text-gray-800 font-semibold'>Price: </p>
                <Input onChange={(e) => { setPrice(Number(e.target.value))}} value={price} type="number" />
              </div>
            </div>
            {creatorsDatas && <CustomTableSelection<PartialExceptId<TSingleCreator>> data={creatorsDatas} columns={adminCreatorListColumns} />}
          </motion.div>
        )}
        {step === "agreed-creators" && (
          <motion.div
            key="video-guidelines"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* {creatorsDatas && <CustomTableRadio<PartialExceptId<TSingleCreator>> data={creatorsDatas} columns={adminCreatorListColumns} />} */}
            {agreedCreatorsDatas && <CustomTableRadio<PartialExceptId<TSingleCreator>> data={agreedCreatorsDatas} columns={adminCreatorListColumns} />}
          </motion.div>
        )}
        {step === "approved-creator" && (
          <motion.div
            key="video-upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CreatorDetails creator={creator} user={user} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default function OrderActions() {
  return (
    <Suspense fallback={<div>Loading...</div>} >
      <OrderActionsSuspense />
    </Suspense>
  )
}