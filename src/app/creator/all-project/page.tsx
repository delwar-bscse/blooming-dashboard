"use client"

import CustomTable from '@/components/table/CustomTable'
// import { StepDataType } from "@/type/type";
import CustomPagination from "@/components/cui/CustomPagination";
import { CustomSearchBar } from "@/components/cui/CustomSearchBar";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
// import CustomStep from "@/components/cui/CustomStep";
// import { orderDatas } from "@/data/orderDatas";
import OrderFilter from "@/components/modal/OrderFilter";
import { TOrdersData } from "@/type/orderDataTypes";
import { toast } from "sonner";
import { myFetch } from "@/utils/myFetch";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import CustomModalFilter from '@/components/cui/CustomModalFilter';
import { dynamicFilterValueCreator } from '@/constant/filterValue';
import { orderColumnsForCreator } from '@/tableColumn/ordersColumnsForCreator';
import {Suspense} from 'react';



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
  const filterType = searchParams.get("filter");
  const page = searchParams.get("page") || "1";

  // const data = orderDatas.slice(0, 9) as TOrdersData[];

  const getAllOrders = async() => {
    toast.loading("Fetching Orders...", {id: "fetch"});
    const res  = await myFetch(
      `/hire-creator/creator-all-orders?page=${page}${filterType ? `&status=${filterType}` : ""}`,
      {
        method: "GET",
      }
    );
    // console.log(res?.data);
    if(res?.data){
      toast.success("All Orders fetched successfully!", {id: "fetch"});
      setAllCreatorsData(res?.data);
      setTotalPage(res?.pagination?.totalPage || 1);
    }else {
      toast.error(res?.message || "Orders Fetching failed!", {id: "fetch"});
    }
  }

  useEffect(() => {
    getAllOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterType, page])

  return (
    <div className="pt-8">
      {/* <div className="pb-4">
        <CustomStep stepDatas={stepDatas} />
      </div> */}
      <div className="flex items-center gap-2">
        <div className="w-full max-w-[600px]">
          <CustomSearchBar />
        </div>
        <div>
          <CustomModalFilter
            title="Advanced Filters"
            trigger={
              <Button variant="ghost" size="lg" className="rounded-full border flex items-center justify-center h-12 w-12 bg-white">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            }
          >
            <div>
              <OrderFilter dynamicFilterValue={dynamicFilterValueCreator}/>
            </div>
          </CustomModalFilter>
        </div>
      </div>
      <div className="pt-4">
        <CustomTable<TOrdersData> columns={orderColumnsForCreator} data={allCreatorsData} />
      </div>
      <CustomPagination TOTAL_PAGES={totalPage}/>
    </div>
  )
}

export default function AllOrders() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AllOrdersSuspense />
    </Suspense>
  );
}