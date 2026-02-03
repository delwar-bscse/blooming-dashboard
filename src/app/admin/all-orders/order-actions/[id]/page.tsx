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
import CustomModalFilter from '@/components/cui/CustomModalFilter';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';
import CustomFilter from '@/components/cui/CustomFilter';

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
  const hireCreatorId = params["id"];

  const status = searchParams.get("status");
  const page = searchParams.get("page") || "1";
  const query = searchParams.get("query") || "";
  const language = searchParams.get("language") || "";
  const gender = searchParams.get("gender") || "";
  const niche = searchParams.get("niche") || "";
  const ethnicity = searchParams.get("ethnicity") || "";
  const skinType = searchParams.get("skinType") || "";
  const bodyType = searchParams.get("bodyType") || "";
  const hairType = searchParams.get("hairType") || "";


  const getCreators = async () => {
    let url = `/creator?status=approved`;

    // Add parameters only if they have values
    const queryParams = [
      { key: 'page', value: page },
      { key: 'searchTerm', value: query },
      // { key: 'status', value: status },
      { key: 'language', value: language },
      { key: 'gender', value: gender },
      { key: 'niche', value: niche },
      { key: 'ethnicity', value: ethnicity },
      { key: 'skinType', value: skinType },
      { key: 'bodyType', value: bodyType },
      { key: 'hairType', value: hairType }
    ];

    queryParams.forEach(param => {
      if (param.value) {
        url += `&${param.key}=${param.value}`;
      }
    });
    //console.log("filter url : ", url)
    const res = await myFetch(url);
    //console.log("Get Creators : ", res?.data);

    if (res?.data) {
      const modifyDatas = res?.data?.map((item: any) => {
        return {
          _id: item?._id,
          creatorId: item?._id,
          accountHolderName: item?.userId?.fullName,
          email: item?.userId?.email,
          phone: item?.userId?.phone,
          country: item?.country,
          status: item?.status
        }
      });
      setCreatorsDatas(modifyDatas);
    } else {
      toast.error(res?.message || "Creators Fetching failed!");
    }
  }


  const getAgreedCreators = async () => {
    const res = await myFetch(`/assign-task-creator/${hireCreatorId}?status=request_approved`);
    // const res = await myFetch(`/assign-task-creator?status=request_approved&hireCreatorId=${hireCreatorId}`);
    if (res?.data) {
      const modifyDatas = res?.data?.map((item: any) => {
        return {
          _id: item?._id,
          creatorId: item?.creatorId,
          accountHolderName: item?.creatorUserId?.fullName,
          email: item?.creatorUserId?.email,
          phone: item?.creatorUserId?.phone,
          country: item?.creatorUserId?.address,
          status: item?.status
        }
      });
      setAgreedCreatorsDatas(modifyDatas);
    } else {
      toast.error(res?.message || "Agreed Creators Fetching failed!");
    }
  }

  const getApprovedCreators = async () => {
    const res = await myFetch(`/assign-task-creator/${hireCreatorId}?status=approved_by_admin`);
    if (res?.data) {
      const modifyDatas = res?.data?.map((item: any) => {
        return {
          _id: item?._id,
          creatorId: item?.creatorId,
          accountHolderName: item?.creatorUserId?.fullName,
          email: item?.creatorUserId?.email,
          phone: item?.creatorUserId?.phone,
          country: item?.creatorUserId?.address,
          status: item?.status
        }
      });
      setApprovedByAdminCreatorsDatas(modifyDatas);
    } else {
      toast.error(res?.message || "Approved Creator Fetching failed!");
    }
  }

  const getApprovedByBrandCreators = async () => {
    const res = await myFetch(`/assign-task-creator/${hireCreatorId}?status=approved`);

    if (res?.data) {
      const modifyDatas = res?.data?.map((item: any) => {
        return {
          _id: item?._id,
          creatorId: item?.creatorId,
          accountHolderName: item?.creatorUserId?.fullName,
          email: item?.creatorUserId?.email,
          phone: item?.creatorUserId?.phone,
          country: item?.creatorUserId?.address,
          status: item?.status,
          paymentStatus: item?.paymentStatus,
        }
      });

      setApprovedByBrandCreatorsDatas(modifyDatas);
    } else {
      toast.error(res?.message || "Approved Creator Fetching failed!");
    }
  }




  useEffect(() => {
    if (status === "creator-list") {
      getCreators();
    }
    if (status === "agreed-creators") {
      getAgreedCreators();
    }
    if (status === "approved-creators") {
      getApprovedCreators();
    }
    if (status === "brand-approved") {
      getApprovedByBrandCreators();
    }
  }, [status, page, query, status, language, gender, niche, ethnicity, skinType, bodyType, hairType]);


  return (
    <>
      <div className="py-4 flex items-center justify-between gap-4">
        <div className='flex-1'>
          <CustomStep stepDatas={stepDatas}  status="status" className='pb-4' />
        </div>
        <div className="flex items-center justify-center w-20 border-4 py-1 border-gray-300 rounded-lg">
          <Link href={`/admin/all-orders/order-details/${hireCreatorId}`} className="flex items-center justify-center">
            <PiEyeBold className="text-3xl font-bold text-green-500 hover:text-green-600 transition-colors duration-300" />
          </Link>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {status === "creator-list" && (
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
                <div>
                  <CustomModalFilter
                    title="Advanced Filters"
                    submitText="Apply"
                    trigger={
                      <Button variant="ghost" size="lg" className="rounded-full border flex items-center justify-center h-12 w-12 bg-white">
                        <SlidersHorizontal className="h-4 w-4" />
                      </Button>
                    }
                  >
                    <div>
                      <CustomFilter/>
                    </div>
                  </CustomModalFilter>
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
        {status === "agreed-creators" && (
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
        {status === "approved-creators" && (
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
        {status === "brand-approved" && (
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