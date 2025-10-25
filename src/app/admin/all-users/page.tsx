"use client"


import CustomTable from '@/components/table/CustomTable'
import { StepDataType, UserDataType } from "@/type/type";
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
import { userColumns } from '@/tableColumn/usersColumns';





const stepDatas: StepDataType[] = [
  {
    id: 1,
    title: "Users",
    label: "user",
  },
  {
    id: 2,
    title: "Sub-Admin",
    label: "sub_admin",
  }
];


const AllUsersSuspense = () => {
  const [totalPage, setTotalPage] = useState(1);
  const [allUsersData, setAllUsersData] = useState<UserDataType[]>([]);
  const searchParams = useSearchParams();
  const step = searchParams.get("step") || "user";
  const page = searchParams.get("page") || "1";
  const query = searchParams.get("query") || "";

  // const data = creatorDatas.slice(0, 9) as CreatorDataType[];
  const getAllUsers = async() => {
    toast.loading("Fetching users...", {id: "fetchAllUsers"});
    
    const res  = await myFetch(`/users/all-users?role=${step ?? "user"}&page=${page}&searchTerm=${query}`,{
      method: "GET",
    });
    
    if(res?.data){
      toast.success("All users fetched successfully!", {id: "fetchAllUsers"});
      setAllUsersData(res?.data);
      setTotalPage(res?.pagination?.totalPage || 1);
    }else {
      toast.error(res?.message || "Fetching failed!", {id: "fetchAllUsers"});
    }
  }

  useEffect(() => {
    getAllUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, page, query]);



  return (
    <div className="pt-8">
      <div className="pb-4">
        <CustomStep stepDatas={stepDatas} />
      </div>
      <div className="flex items-center gap-2">
        <div className="w-full max-w-[600px]">
          <CustomSearchBar placeholder="Search by Email, Country"/>
        </div>
      </div>
      <div className="pt-4">
        {allUsersData.length > 0 && <CustomTable<UserDataType> columns={userColumns} data={allUsersData} />}
      </div>
      <CustomPagination TOTAL_PAGES={totalPage}/>
    </div>
  )
}

export default function AllUsers() {
  return (
    <Suspense fallback={<div>Loading...</div>} >
      <AllUsersSuspense />
    </Suspense>
  )
}