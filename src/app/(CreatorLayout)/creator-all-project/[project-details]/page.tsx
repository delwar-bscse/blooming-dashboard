"use client"

import CustomStep from '@/components/cui/CustomStep';
import CreatorProjectDetails from '@/components/section/CreatorProjectDetails';
import CreatorScript from '@/components/section/CreatorScript';
import CreatorVideoUpload from '@/components/section/CreatorVideoUpload';
import { StepDataType } from '@/type/type';
import { useSearchParams } from 'next/navigation';
import React from 'react'
import { AnimatePresence, motion } from "framer-motion";
import CreatorVideoGuidelines from '@/components/section/CreatorVideoGuidelines';


const CreatorProjectDetailsPage = () => {
  const searchParams = useSearchParams();
  const step = searchParams.get("step");



  const stepDatas: StepDataType[] = [
    {
      id: 1,
      title: "Project Details",
      label: "project-details",
    },
    {
      id: 2,
      title: "Video Guidelines",
      label: "video-guidelines",
    },
    {
      id: 3,
      title: "Video upload",
      label: "video-upload",
    },
    {
      id: 4,
      title: "Script",
      label: "script",
    }
  ];

  return (
    <div>
      <div className="py-8">
        <CustomStep stepDatas={stepDatas} />
      </div>

      <AnimatePresence mode="wait">
        {step === "project-details" && (
          <motion.div
            key="project-details"
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
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
            animate={{ opacity: 1}}
            exit={{ opacity: 0}}
            transition={{ duration: 0.3}}
          >
            <CreatorVideoGuidelines />
          </motion.div>
        )}
        {step === "video-upload" && (
          <motion.div
            key="video-upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1}}
            exit={{ opacity: 0}}
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

export default CreatorProjectDetailsPage