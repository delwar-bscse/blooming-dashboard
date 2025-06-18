"use client"

import * as React from "react"
import CustomTable from '@/components/table/CustomTable'
import { SupportDataType } from "@/type/type";
import CustomPagination from "@/components/cui/CustomPagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { supportDatas } from "@/data/supportDatas";
import { supportColumns } from "@/tableColumn/supportColumns";



const ContactSupport = () => {

  const data = supportDatas.slice(0, 9) as SupportDataType[];

  return (
    <div className="pt-8">
      <div className="flex items-center justify-between gap-2 ">
        <h2 className="text-3xl font-bold text-gray-700">Contact & Support</h2>
        <div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Solved">Solved</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="pt-4">
        <CustomTable<SupportDataType> columns={supportColumns} data={data} />
      </div>
      <CustomPagination />
    </div>
  )
}

export default ContactSupport