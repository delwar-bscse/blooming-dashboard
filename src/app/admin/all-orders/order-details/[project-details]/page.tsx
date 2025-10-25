"use client"

import CustomStep from '@/components/cui/CustomStep'
import { StepDataType } from '@/type/type';
import React, { Suspense } from 'react'
import { AnimatePresence, motion } from "framer-motion";
import { useParams, useSearchParams } from 'next/navigation';
import CreatorVideoGuidelines from '@/components/section/CreatorVideoGuidelines';
import CreatorScript from '@/components/section/CreatorScript';
import Link from 'next/link';
import { BiUserCircle } from "react-icons/bi";
import ProjectDetailsAdmin from '@/components/section/ProjectDetailsAdmin';
import AdminVideoWatchParent from '@/components/section/AdminVideoWatch';

const stepDatas: StepDataType[] = [
  {
    id: 1,
    title: "Order Details",
    label: "order-details",
  },
  {
    id: 2,
    title: "Script",
    label: "script",
  },
  {
    id: 3,
    title: "Video",
    label: "video",
  },
];

const OrderDetailsSuspense = () => {
  const searchParams = useSearchParams();
  const params = useParams();
  const step = searchParams.get("step");
  const hireCreatorId = params["project-details"];


  return (
    <div>
      <div className="py-4 flex items-center justify-between gap-4">
        <div className='flex-1'>
          <CustomStep stepDatas={stepDatas}  className='pb-4'/>
        </div>
        <div className="flex items-center justify-center w-20 border-4 py-1 border-gray-300 rounded-lg">
          <Link href={`/admin/all-orders/order-actions/${hireCreatorId}`} className="flex items-center justify-center">
          <BiUserCircle className="text-3xl font-bold text-blue-500 hover:text-blue-600 transition-colors duration-300" />
        </Link>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {step === "order-details" && (
          <motion.div
            key="project-details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProjectDetailsAdmin />
          </motion.div>
        )}
        {step === "video-guidelines" && (
          <motion.div
            key="video-guidelines"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CreatorVideoGuidelines />
          </motion.div>
        )}
        {step === "video" && (
          <motion.div
            key="video-upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AdminVideoWatchParent />
          </motion.div>
        )}
        {step === "script" && (
          <motion.div
            key="script"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CreatorScript />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function OrderDetails() {
  return (
    <Suspense fallback={<div>Loading...</div>} >
      <OrderDetailsSuspense />
    </Suspense>
  )
}