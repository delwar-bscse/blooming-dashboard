/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { dynamicFilterValue } from '@/constant/filterValue';
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




const AllOrders = () => {
  const [allCreatorsData, setAllCreatorsData] = useState<TOrdersData[]>([]);
  const searchParams = useSearchParams();
  const filterType = searchParams.get("filter");

  // const data = orderDatas.slice(0, 9) as TOrdersData[];

  const getAllOrders = async () => {
    toast.loading("Fetching Orders request...", { id: "fetch" });
    const res = await myFetch(`/assign-task-creator/assign`);
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
      console.log("Formated Data: ", res?.data);
      console.log("Formated Data: ", formatedData);
      setAllCreatorsData(formatedData);
    } else {
      toast.error(res?.message || "Orders Request Fetching failed!", { id: "fetch" });
    }
  }

  useEffect(() => {
    getAllOrders();
  }, [filterType])

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
              <OrderFilter dynamicFilterValue={dynamicFilterValue} />
            </div>
          </CustomModalFilter>
        </div>
      </div>
      <div className="pt-4">
        <CustomTable<TOrdersData> columns={requestOrderColumnsForCreator} data={allCreatorsData} />
      </div>
      <CustomPagination />
    </div>
  )
}

export default AllOrders