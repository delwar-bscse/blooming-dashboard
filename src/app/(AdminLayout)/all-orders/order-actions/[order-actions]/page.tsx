"use client"

import CustomModal from '@/components/cui/CustomModal';
import { CustomSearchBar } from '@/components/cui/CustomSearchBar';
import CustomStep from '@/components/cui/CustomStep';
import AdminCreatorListFilter from '@/components/modal/AdminCreatorListFilter';
import CustomTable from '@/components/table/CustomTable';
import CustomTableSelection from '@/components/table/CustomTableSelection';
import { Button } from '@/components/ui/button';
import { adminCreatorListDatas } from '@/data/adminCreatorListDatas';
import { creatorDatas } from '@/data/creatorDatas';
import { adminCreatorListColumns } from '@/tableColumn/adminCreatorsListColumns';
import { creatorColumns } from '@/tableColumn/creatorsColumns';
import { adminCreatorListDataType, CreatorDataType, StepDataType } from '@/type/type';
import { SlidersHorizontal } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React from 'react'
import { AnimatePresence, motion } from "framer-motion";

const OrderActions = () => {
  const searchParams = useSearchParams();
  const step = searchParams.get("step");

  const data = creatorDatas.slice(0, 9) as CreatorDataType[];

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
      title: "Approved Creators",
      label: "approved-creators",
    }
  ];
  return (
    <div>
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
              <div className="w-full max-w-[600px]">
                <CustomSearchBar />
              </div>
              <div>
                <CustomModal
                  title="Advanced Filters"
                  submitText="Apply"
                  trigger={
                    <Button variant="ghost" size="lg" className="rounded-full border flex items-center justify-center h-12 w-12 bg-white">
                      <SlidersHorizontal className="h-4 w-4" />
                    </Button>
                  }
                >
                  <div>
                    <AdminCreatorListFilter />
                  </div>
                </CustomModal>
              </div>
            </div>
            <CustomTableSelection data={adminCreatorListDatas as adminCreatorListDataType[]} columns={adminCreatorListColumns} />
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
            <CustomTableSelection data={adminCreatorListDatas as adminCreatorListDataType[]} columns={adminCreatorListColumns} />
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
            <CustomTable<CreatorDataType> columns={creatorColumns} data={data} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default OrderActions