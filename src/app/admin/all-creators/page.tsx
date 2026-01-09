/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"


import CustomTable from '@/components/table/CustomTable'
import { CreatorDataType, StepDataType } from "@/type/type";
// import { creatorDatas } from "@/data/creatorDatas";
import CustomPagination from "@/components/cui/CustomPagination";
import { CustomSearchBar } from "@/components/cui/CustomSearchBar";
// import CustomModal from "@/components/cui/CustomModal";
// import { Button } from "@/components/ui/button";
// import { SlidersHorizontal } from "lucide-react";
import CustomStep from "@/components/cui/CustomStep";
// import CreatorFilter from "@/components/modal/CreatorFilter";
import { myFetch } from "@/utils/myFetch";
import { Suspense, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
import { creatorColumns } from '@/tableColumn/CreatorsColumns';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';
import CustomModalFilter from '@/components/cui/CustomModalFilter';
import CustomFilter from '@/components/cui/CustomFilter';



const stepDatas: StepDataType[] = [
  {
    id: 1,
    title: "Pending Creator",
    label: "pending",
  },
  {
    id: 2,
    title: "Approved Creator",
    label: "approved",
  }
];


const AllCreatorsSuspense = () => {
  const [totalPage, setTotalPage] = useState(1);
  const [allCreatorsData, setAllCreatorsData] = useState<CreatorDataType[]>([]);
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "";
  const page = searchParams.get("page") || "1";
  const query = searchParams.get("query") || "";
  const language = searchParams.get("language") || "";
  const gender = searchParams.get("gender") || "";
  const niche = searchParams.get("niche") || "";
  const ethnicity = searchParams.get("ethnicity") || "";
  const skinType = searchParams.get("skinType") || "";
  const bodyType = searchParams.get("bodyType") || "";
  const hairType = searchParams.get("hairType") || "";

  const getAllCreators = async () => {
    toast.loading("Fetching creators...", { id: "fetchAllCreators" });

    // Start with the base URL
    let url = `/creator?`;

    // Add parameters only if they have values
    const queryParams = [
      { key: 'page', value: page },
      { key: 'searchTerm', value: query },
      { key: 'status', value: status },
      { key: 'language', value: language },
      { key: 'gender', value: gender },
      { key: 'niche', value: niche },
      { key: 'ethnicity', value: ethnicity },
      { key: 'skinType', value: skinType },
      { key: 'bodyType', value: bodyType },
      { key: 'hairType', value: hairType }
    ];

    queryParams.forEach(param => {
      if (param.value) {
        url += `&${param.key}=${param.value}`;
      }
    });

    // console.log("filter url : ", url)

    const res = await myFetch(url, {
      method: "GET",
    });

    console.log("Creators list : ", res?.data)

    if (res?.data) {
      toast.success("All creators fetched successfully!", { id: "fetchAllCreators" });
      const resArray = res?.data?.map((item: any) => {
        return {
          id: item?.userId?._id,
          name: item?.userId?.fullName,
          contactNo: item?.phone,
          email: item?.email,
          country: item?.country,
          // category: string[]
          status: item?.status
        }
      });
      setAllCreatorsData(resArray);
      setTotalPage(res?.pagination?.totalPage || 1);
    } else {
      toast.error(res?.message || "Fetching failed!", { id: "fetchAllCreators" });
    }
  }


  useEffect(() => {
    getAllCreators();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, page, query, language, gender, niche, ethnicity, skinType, bodyType, hairType]);



  return (
    <div className="pt-8">
      <div className="pb-4">
        <CustomStep stepDatas={stepDatas} status='status' />
      </div>
      <div className="flex items-center gap-2">
        <div className="w-full max-w-[600px]">
          <CustomSearchBar placeholder="Search by Email, Country" />
        </div>
        <div>
          <CustomModalFilter
            title="Advanced Filters"
            submitText="Apply"
            trigger={
              <Button variant="ghost" size="lg" className="rounded-full border flex items-center justify-center h-12 w-12 bg-white">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            }
          >
            <div>
              <CustomFilter />
            </div>
          </CustomModalFilter>
        </div>
      </div>
      <div className="pt-4">
        <CustomTable<CreatorDataType> columns={creatorColumns} data={allCreatorsData} />
      </div>
      <CustomPagination TOTAL_PAGES={totalPage} />
    </div>
  )
}

export default function AllCreators() {
  return (
    <Suspense fallback={<div>Loading...</div>} >
      <AllCreatorsSuspense />
    </Suspense>
  )
}