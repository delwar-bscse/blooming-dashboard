/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import CreatorProjectDetails from '@/components/section/CreatorProjectDetails';
import React, { Suspense, useEffect } from 'react'
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { myFetch } from '@/utils/myFetch';
import { Button } from '@/components/ui/button';


const CreatorProjectDetailsPageSuspense = () => {
  const router = useRouter();

  const [orderDetails, setOrderDetails] = React.useState<any>(null);
  const searchParams = useSearchParams();
  const requestId = searchParams.get("requestId");

  const getOrderDetails = async () => {
    // console.log("Request ID:", requestId);

    toast.loading("Request Order Details Fetching...", { id: "fetch" });
    const res = await myFetch(`/assign-task-creator/${requestId}`, {
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
      const res = await myFetch(`/assign-task-creator/${requestId}`, {
        method: "DELETE",
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
          <CreatorProjectDetails />
          {orderDetails?.status === "pending" && <div className='flex items-center justify-center space-x-4'>
            <Button onClick={handleApprove}>Approve</Button>
            <Button onClick={handleDelete}>Decline</Button>
          </div>}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function CreatorProjectDetailsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>} >
      <CreatorProjectDetailsPageSuspense />
    </Suspense>
  )
}