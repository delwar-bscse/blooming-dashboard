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
  const step = searchParams.get("step");
  const page = searchParams.get("page") || "1";

  // const data = creatorDatas.slice(0, 9) as CreatorDataType[];
  const getAllCreators = async() => {
    toast.loading("Fetching creators...", {id: "fetchAllCreators"});
    const res  = await myFetch(`/creator?status=${step}&page=${page}`,{
      method: "GET",
    });
    console.log(res?.data);
    if(res?.data){
      toast.success("All creators fetched successfully!", {id: "fetchAllCreators"});
      setAllCreatorsData(res?.data);
      setTotalPage(res?.pagination?.totalPage || 1);
    }else {
      toast.error(res?.message || "Fetching failed!", {id: "fetchAllCreators"});
    }
  }

  useEffect(() => {
    getAllCreators();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])



  return (
    <div className="pt-8">
      <div className="pb-4">
        <CustomStep stepDatas={stepDatas} />
      </div>
      <div className="flex items-center gap-2">
        <div className="w-full max-w-[600px]">
          <CustomSearchBar />
        </div>
        {/* <div>
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
              <CreatorFilter />
            </div>
          </CustomModal>
        </div> */}
      </div>
      <div className="pt-4">
        <CustomTable<CreatorDataType> columns={creatorColumns} data={allCreatorsData} />
      </div>
      <CustomPagination TOTAL_PAGES={totalPage}/>
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