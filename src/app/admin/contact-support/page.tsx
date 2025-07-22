/* eslint-disable react-hooks/exhaustive-deps */
"use client"


import CustomTable from '@/components/table/CustomTable'
import { SupportDataType } from "@/type/type";
import CustomPagination from "@/components/cui/CustomPagination";
import { supportColumns } from "@/tableColumn/supportColumns";
import { toast, Toaster } from "sonner";
import { myFetch } from "@/utils/myFetch";
import { Suspense, useEffect, useState } from 'react';
import CustomSelectOption from '@/components/cui/CustomSelectOption';
import { useSearchParams } from 'next/navigation';

const selectOptions = [
  { value: "pending", label: "Pending" },
  { value: "solved", label: "Solved" },
]


const ContactSupportSuspense = () => {
  const [totalPage, setTotalPage] = useState(1);
  const [data, setData] = useState<SupportDataType[]>([]);
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "pending";
  const page = searchParams.get("page") || "1";

  const getContactSupport = async () => {
    toast.loading("Fetching...", { id: "fetchSupport" });
    const res = await myFetch(`/contact-us?status=${category}&page=${page}`, {
      method: "GET",
    })
    console.log("Contact Support Response:", res);
    if (res?.success) {
      toast.success("Fetched successfully!", { id: "fetchSupport" });
      setData(res?.data);
      setTotalPage(res?.pagination?.totalPage || 1);
    }else {
      toast.error(res?.message || "Failed to fetch!", { id: "fetchSupport" });
      setData([]);
    }
  }

  useEffect(() => {
    getContactSupport();
  }, [category, page])

  return (
    <div className="pt-8">
      <div className="flex items-center justify-between gap-2 ">
        <h2 className="text-3xl font-bold text-gray-700">Contact & Support</h2>
        <div className="pr-4">
          <CustomSelectOption selectOptions={selectOptions} placeHolderValue="Select A Category" queryKey="category" />
        </div>
      </div>
      <div className="pt-4">
        <CustomTable<SupportDataType> columns={supportColumns} data={data} />
      </div>
      <CustomPagination TOTAL_PAGES={totalPage} />
      <Toaster />
    </div>
  )
}

export default function ContactSupport() {
  return (
    <Suspense fallback={<div>Loading...</div>} >
      <ContactSupportSuspense />
    </Suspense>
  )
}