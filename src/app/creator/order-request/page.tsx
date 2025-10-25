/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import CustomTable from '@/components/table/CustomTable'
// import { StepDataType } from "@/type/type";
import CustomPagination from "@/components/cui/CustomPagination";
// import { CustomSearchBar } from "@/components/cui/CustomSearchBar";
// import { Button } from "@/components/ui/button";
// import { SlidersHorizontal } from "lucide-react";
// import CustomStep from "@/components/cui/CustomStep";
// import { orderDatas } from "@/data/orderDatas";
// import OrderFilter from "@/components/modal/OrderFilter";
import { TOrdersData } from "@/type/orderDataTypes";
import { toast } from "sonner";
import { myFetch } from "@/utils/myFetch";
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
// import CustomModalFilter from '@/components/cui/CustomModalFilter';
// import { dynamicFilterValue } from '@/constant/filterValue';
import { requestOrderColumnsForCreator } from '@/tableColumn/requestOrdersColumnsForCreator';



// const stepDatas: StepDataType[] = [
//   {
//     id: 1,
//     title: "All Order",
//     label: "all-order",
//   },
//   {
//     id: 2,
//     title: "Complete Order",
//     label: "complete-order",
//   }
// ];




const AllOrdersSuspense = () => {
  const [totalPage, setTotalPage] = useState(1);
  const [allCreatorsData, setAllCreatorsData] = useState<TOrdersData[]>([]);
  const searchParams = useSearchParams();
  // const filterType = searchParams.get("filter");
  const page = searchParams.get("page") || "1";

  // const data = orderDatas.slice(0, 9) as TOrdersData[];

  const getAllOrders = async () => {
    toast.loading("Fetching Orders request...", { id: "fetch" });
    const res = await myFetch(`/assign-task-creator/assign?status=pending&page=${page}`);

    if (res?.data) {
      toast.success("All Orders request fetched successfully!", { id: "fetch" });
      const formatedData = res?.data?.map((item: any) => ({
        _id: item._id,
        subscriptionId: {
          price: item.price,
        },
        brandInfo: {
          _id: item.hireCreatorId?._id,
          name: item.hireCreatorId?.brandInfo?.name,
          email: item.hireCreatorId?.brandInfo?.email,
          phone: item.hireCreatorId?.brandInfo?.phone,
          productName: item.hireCreatorId?.brandInfo?.productName,
        },
        status: item.status,
        paymentStatus: "paid",
      }));
      
      setAllCreatorsData(formatedData);
      setTotalPage(res?.pagination?.totalPage || 1);
    } else {
      toast.error(res?.message || "Orders Request Fetching failed!", { id: "fetch" });
    }
  }

  useEffect(() => {
    getAllOrders();
  }, [page]);

  return (
    <div className="pt-8">
      {/* <div className="pb-4">
        <CustomStep stepDatas={stepDatas} />
      </div> */}
      <div className="flex items-center gap-2">
        <h2 className="text-3xl font-bold">Requested Orders</h2>
        <div className="w-full max-w-[600px]">
          {/* <CustomSearchBar /> */}
        </div>
      </div>
      <div className="pt-4">
        <CustomTable<TOrdersData> columns={requestOrderColumnsForCreator} data={allCreatorsData} />
      </div>
      <CustomPagination TOTAL_PAGES={totalPage}/>
    </div>
  )
}

export default function OrderRequest() {
  return (
    <Suspense fallback={<div>Loading...</div>} >
      <AllOrdersSuspense />
    </Suspense>
  )
}