"use client"

import * as React from "react"
import CustomTable from '@/components/table/CustomTable'
import { OrdersDataType, StepDataType } from "@/type/type";
import CustomPagination from "@/components/cui/CustomPagination";
import { CustomSearchBar } from "@/components/cui/CustomSearchBar";
import CustomModal from "@/components/cui/CustomModal";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import CustomStep from "@/components/cui/CustomStep";
import { orderDatas } from "@/data/orderDatas";
import { orderColumns } from "@/tableColumn/ordersColumns";
import OrderFilter from "@/components/modal/OrderFilter";



const stepDatas: StepDataType[] = [
  {
    id: 1,
    title: "All Order",
    label: "all-order",
  },
  {
    id: 2,
    title: "Complete Order",
    label: "complete-order",
  }
];


const AllOrders = () => {

  const data = orderDatas.slice(0, 9) as OrdersDataType[];

  return (
    <div className="pt-8">
      <div className="pb-4">
        <CustomStep stepDatas={stepDatas} />
      </div>
      <div className="flex items-center gap-2">
        <div className="w-full max-w-[600px]">
          <CustomSearchBar />
        </div>
        <div>
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
              <OrderFilter />
            </div>
          </CustomModal>
        </div>
      </div>
      <div className="pt-4">
        <CustomTable<OrdersDataType> columns={orderColumns} data={data} />
      </div>
      <CustomPagination />
    </div>
  )
}

export default AllOrders