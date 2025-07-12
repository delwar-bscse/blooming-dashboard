"use client"

import CustomStep from '@/components/cui/CustomStep'
import CreatorProjectDetails from '@/components/section/CreatorProjectDetails'
import { StepDataType } from '@/type/type';
import React from 'react'
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from 'next/navigation';
import CreatorVideoGuidelines from '@/components/section/CreatorVideoGuidelines';
import CreatorVideoUpload from '@/components/section/CreatorVideoUpload';
import CreatorScript from '@/components/section/CreatorScript';

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

const OrderDetails = () => {
  const searchParams = useSearchParams();
  const step = searchParams.get("step");




  return (
    <div>
      <div className="py-4">
        <CustomStep stepDatas={stepDatas} />
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
            <CreatorProjectDetails />
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
            <CreatorVideoUpload />
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

export default OrderDetails