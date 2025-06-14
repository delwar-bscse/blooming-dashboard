"use client"

import * as React from "react"
import CustomTable from '@/components/table/CustomTable'
import { CreatorDataType } from "@/type/type";
import { creatorDatas } from "@/data/creatorDatas";
import { CreatorColumns } from "@/tableColumn/CreatorsColumns";
import CustomPagination from "@/components/cui/CustomPagination";


const AllCreators = () => {

const data = creatorDatas.slice(0, 9) as CreatorDataType[];

  return (
    <div>
      <CustomTable<CreatorDataType> columns={CreatorColumns} data={data} />
      <CustomPagination />
    </div>
  )
}

export default AllCreators