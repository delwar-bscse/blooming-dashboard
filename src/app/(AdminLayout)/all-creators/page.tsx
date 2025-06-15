"use client"

import * as React from "react"
import CustomTable from '@/components/table/CustomTable'
import { CreatorDataType } from "@/type/type";
import { creatorDatas } from "@/data/creatorDatas";
import { CreatorColumns } from "@/tableColumn/CreatorsColumns";
import CustomPagination from "@/components/cui/CustomPagination";
import { CustomSearchBar } from "@/components/cui/CustomSearchBar";
import CustomModal from "@/components/cui/CustomModal";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";


const AllCreators = () => {

  const data = creatorDatas.slice(0, 9) as CreatorDataType[];

  return (
    <div className="pt-8">
      <div className="flex items-center gap-2">
        <div className="w-full max-w-[600px]">
          <CustomSearchBar />
        </div>
        <div>
          <CustomModal
            title="Advanced Filters"
            cancelText="Cancel"
            submitText="Apply"
            trigger={
              <Button variant="ghost" size="lg" className="rounded-full border flex items-center justify-center h-12 w-12 bg-white">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            }
          >
            <div>
              <h2>Hello World</h2>
            </div>
          </CustomModal>
        </div>
      </div>
      <div className="pt-4">
        <CustomTable<CreatorDataType> columns={CreatorColumns} data={data} />

      </div>
      <CustomPagination />
    </div>
  )
}

export default AllCreators