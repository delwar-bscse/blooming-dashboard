/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"

// import CustomModal from '@/components/cui/CustomModal';
import { CustomSearchBar } from '@/components/cui/CustomSearchBar';
import CustomStep from '@/components/cui/CustomStep';
// import AdminCreatorListFilter from '@/components/modal/AdminCreatorListFilter';
import CustomTableSelection from '@/components/table/CustomTableSelection';
// import { Button } from '@/components/ui/button';
// import { SlidersHorizontal } from 'lucide-react';
import { useParams, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'
import { AnimatePresence, motion } from "framer-motion";
import { myFetch } from '@/utils/myFetch';
import { toast } from 'sonner';
import { PartialExceptId, TSingleCreator } from '@/type/creatorDataTypes';
import { StepDataType } from "@/type/type";
import { Input } from '@/components/ui/input';
import { usePrice } from '@/contexts/PriceContext';
import Link from 'next/link';
import { PiEyeBold } from "react-icons/pi";
import CustomTableSelection2 from '@/components/table/CustomTableSelection2';
import { adminCreatorListColumns } from '@/tableColumn/adminCreatorsListColumns';
import { adminCreatorListColumns2 } from '@/tableColumn/adminCreatorsListColumns2';
import CustomPagination from '@/components/cui/CustomPagination';

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
    label: "approved-creators",
  },
  {
    id: 4,
    title: "Brand Approved",
    label: "brand-approved",
  }
];



const OrderActionsSuspense = () => {
  const { setPrice } = usePrice();
  const [creatorsDatas, setCreatorsDatas] = useState<PartialExceptId<TSingleCreator>[]>([] as PartialExceptId<TSingleCreator>[]);
  const [agreedCreatorsDatas, setAgreedCreatorsDatas] = useState<PartialExceptId<TSingleCreator>[]>([] as PartialExceptId<TSingleCreator>[]);
  const [approvedByAdminCreatorsDatas, setApprovedByAdminCreatorsDatas] = useState<PartialExceptId<TSingleCreator>[]>([] as PartialExceptId<TSingleCreator>[]);
  const [approvedByBrandCreatorsDatas, setApprovedByBrandCreatorsDatas] = useState<PartialExceptId<TSingleCreator>[]>([] as PartialExceptId<TSingleCreator>[]);
  const searchParams = useSearchParams();
  const params = useParams();
  const step = searchParams.get("step");
  const page = searchParams.get("page") || "1";
  const query = searchParams.get("query") || "";
  const hireCreatorId = params["id"];

  console.log("Hire Creator ID : ", hireCreatorId)

  const getCreators = async () => {
    const res = await myFetch(`/creator?status=approved&searchTerm=${query}`);
    // console.log("Response Data: ", res?.data);
    if (res?.data) {
      const modifyDatas = res?.data?.map((item: any) => {
        return {
          _id: item?._id,
          creatorId:item?._id,
          accountHolderName: item?.accountHolderName,
          email: item?.email,
          phone: item?.phone,
          country: item?.country,
          status: item?.status
        }
      });
      // console.log("Modify Data: ", modifyDatas);
      setCreatorsDatas(modifyDatas);
    } else {
      toast.error(res?.message || "Creators Fetching failed!");
    }
  }


  const getAgreedCreators = async () => {
    const res = await myFetch(`/assign-task-creator/${hireCreatorId}?status=request_approved`);
    // const res = await myFetch(`/assign-task-creator?status=request_approved&hireCreatorId=${hireCreatorId}`);
    if (res?.data) {
      console.log(res?.data);
      const modifyDatas = res?.data?.map((item: any) => {
        return {
          _id: item?._id,
          creatorId:item?.creatorId,
          accountHolderName: item?.creatorUserId?.fullName,
          email: item?.creatorUserId?.email,
          phone: item?.creatorUserId?.phone,
          country: item?.creatorUserId?.address,
          status: item?.status
        }
      });
      console.log(modifyDatas);
      setAgreedCreatorsDatas(modifyDatas);
    } else {
      toast.error(res?.message || "Agreed Creators Fetching failed!");
    }
  }

  const getApprovedCreators = async () => {
    const res = await myFetch(`/assign-task-creator/${hireCreatorId}?status=approved_by_admin`);
    console.log("Approved Creator:", res?.data);
    if (res?.data) {
      const modifyDatas = res?.data?.map((item: any) => {
        return {
          _id: item?._id,
          creatorId:item?.creatorId,
          accountHolderName: item?.creatorUserId?.fullName,
          email: item?.creatorUserId?.email,
          phone: item?.creatorUserId?.phone,
          country: item?.creatorUserId?.address,
          status: item?.status
        }
      });
      // console.log(modifyDatas);
      setApprovedByAdminCreatorsDatas(modifyDatas);
    } else {
      toast.error(res?.message || "Approved Creator Fetching failed!");
    }
  }

  const getApprovedByBrandCreators = async () => {
    const res = await myFetch(`/assign-task-creator/${hireCreatorId}?status=approved`);
    console.log("Approved by Brand:", res?.data);
    if (res?.data) {
      const modifyDatas = res?.data?.map((item: any) => {
        return {
          _id: item?._id,
          creatorId:item?.creatorId,
          accountHolderName: item?.creatorUserId?.fullName,
          email: item?.creatorUserId?.email,
          phone: item?.creatorUserId?.phone,
          country: item?.creatorUserId?.address,
          status: item?.status
        }
      });
      console.log(modifyDatas);
      setApprovedByBrandCreatorsDatas(modifyDatas);
    } else {
      toast.error(res?.message || "Approved Creator Fetching failed!");
    }
  }




  useEffect(() => {
    if (step === "creator-list") {
      getCreators();
    }
    if (step === "agreed-creators") {
      getAgreedCreators();
    }
    if (step === "approved-creators") {
      getApprovedCreators();
    }
    if (step === "brand-approved") {
      getApprovedByBrandCreators();
    }
  }, [step, page, query]);


  return (
    <>
      <div className="py-4 flex items-center justify-between gap-4">
        <div className='flex-1'>
          <CustomStep stepDatas={stepDatas} className='pb-4' />
        </div>
        <div className="flex items-center justify-center w-20 border-4 py-1 border-gray-300 rounded-lg">
          <Link href={`/admin/all-orders/order-details/${hireCreatorId}`} className="flex items-center justify-center">
            <PiEyeBold className="text-3xl font-bold text-green-500 hover:text-green-600 transition-colors duration-300" />
          </Link>
        </div>
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
                  <CustomSearchBar placeholder="Search by Email, Country" />
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <p className='text-gray-800 font-semibold'>Price: </p>
                <Input min={0} onChange={(e) => { setPrice(Number(e.target.value)) }} type="number" className='bg-white h-11' />
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
            {agreedCreatorsDatas && <CustomTableSelection2<PartialExceptId<TSingleCreator>> data={agreedCreatorsDatas} columns={adminCreatorListColumns} />}
          </motion.div>
        )}
        {step === "approved-creators" && (
          <motion.div
            key="video-upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* <CreatorDetails creator={creator} user={user} /> */}

            {approvedByAdminCreatorsDatas && <CustomTableSelection2<PartialExceptId<TSingleCreator>> data={approvedByAdminCreatorsDatas} columns={adminCreatorListColumns2} />}
          </motion.div>
        )}
        {step === "brand-approved" && (
          <motion.div
            key="video-upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* <CreatorDetails creator={creator} user={user} /> */}

            {approvedByBrandCreatorsDatas && <CustomTableSelection2<PartialExceptId<TSingleCreator>> data={approvedByBrandCreatorsDatas} columns={adminCreatorListColumns2} />}
          </motion.div>
        )}
      </AnimatePresence>

      <CustomPagination TOTAL_PAGES={5} />
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