/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

// import CreatorProjectDetails from '@/components/section/CreatorProjectDetails';
import React, { Suspense, useEffect } from 'react'
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { myFetch } from '@/utils/myFetch';
import { Button } from '@/components/ui/button';
import StarEmogi from "@/assets/common/star.png"
import LoveEmogi from "@/assets/common/loveEmoji.png"
import Image from 'next/image';


const ProjectDetailsPageSuspense = () => {
  const router = useRouter();

  const [orderDetails, setOrderDetails] = React.useState<any>(null);
  const searchParams = useSearchParams();
  const requestId = searchParams.get("requestId");

  const getOrderDetails = async () => {
    // console.log("Request ID:", requestId);

    toast.loading("Request Order Details Fetching...", { id: "fetch" });
    const res = await myFetch(`/assign-task-creator//single/${requestId}`, {
      method: "GET",
    });
    console.log("Request Project Details:", res?.data);

    if (res?.data) {
      toast.success("Request Order Details fetched successfully!", { id: "fetch" });
      setOrderDetails(res?.data);
    } else {
      toast.error(res?.message || "Request Order Details Fetching failed!", { id: "fetch" });
    }
  }

  useEffect(() => {
    getOrderDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDelete = async () => {
    // console.log(id);

    toast.loading("Deleting...", { id: "delete" });
    const res = await myFetch(`/assign-task-creator/status/${requestId}`, {
      method: "PATCH",
    });
    // console.log(res?.data);

    if (res?.data) {
      toast.success("Deleted successfully!", { id: "delete" });
      router.push("/creator/order-request");
    } else {
      toast.error(res?.message || "Failed to delete!", { id: "delete" });
    }
  }

  const handleApprove = async () => {
    // console.log(id);

    toast.loading("Approving...", { id: "approve" });
    const res = await myFetch(`/assign-task-creator/status/${requestId}?status=request_approved`, {
      method: "PATCH",
    });
    // console.log(res?.data);

    if (res?.data) {
      toast.success("Approved successfully!", { id: "approve" });
      getOrderDetails();
    } else {
      toast.error(res?.message || "Failed to approve!", { id: "approve" });
    }
  }


  return (
    <div className='py-10'>
      <AnimatePresence mode="wait">
        <motion.div
          key="project-details"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className='max-w-[900px] mx-auto space-y-5 pb-16'>
            <div className='bg-white rounded-2xl p-8'>
              <div className='flex items-center justify-center rounded-sm bg-[#FFF0BE] shadow gap-2 w-72 py-2.5 mb-6'>
                <Image src={StarEmogi} alt="package" width={30} height={30} />
                <p className='text-xl font-semibold text-gray-700'>Price ${orderDetails?.price}</p>
                <Image src={LoveEmogi} alt="package" width={30} height={30} />
              </div>
              {orderDetails?.brandInfo && <SubComponent title="Project Info" list={orderDetails?.hireCreatorId.brandInfo} />}
            </div>
            <div className='bg-white rounded-2xl p-8'>
              <SubComponent title="Brand Social" list={orderDetails?.hireCreatorId?.brandSocial} />
            </div>
            <div className='bg-white rounded-2xl p-8'>
              <SubComponent title="Contain Info" list={orderDetails?.hireCreatorId?.videoInfo} />
            </div>
            <div className='bg-white rounded-2xl p-8'>
              <SubComponent title="Do & Don'ts" list={orderDetails?.hireCreatorId?.addOns} />
            </div>
            <div className='bg-white rounded-2xl p-8'>
              <SubComponent title="Characteristics Of The Creator" list={orderDetails?.hireCreatorId?.characteristicInfo} />
            </div>
          </div>
          {orderDetails?.status === "pending" && <div className='flex items-center justify-center space-x-4'>
            <Button onClick={handleApprove}>Approve</Button>
            <Button onClick={handleDelete}>Decline</Button>
          </div>}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

const SubComponent = ({ title, list }: { title: string; list: any }) => {
  if (!list || typeof list !== "object") {
    return null; // or render a fallback UI
  }

  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>{title}</h2>
      <ul className='space-y-1.5'>
        {Object.entries(list)?.map(([key, value], index) => {
          if (key === "_id") return null;
          return <li key={index} className="list-disc list-inside pl-4 text-gray-600">
            <span className="font-semibold text-gray-700 text-lg capitalize">{key ?? ""}:</span><br />
            <span className="pl-6">{String(value)}</span>
          </li>
        })}
      </ul>
    </div>
  );
};

export default function CreatorProjectDetailsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>} >
      <ProjectDetailsPageSuspense />
    </Suspense>
  )
}