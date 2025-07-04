"use client"

import React from "react";
import { LiaLayerGroupSolid } from "react-icons/lia";
import { TbReportMoney } from "react-icons/tb";
import { PiUsersThree } from "react-icons/pi";
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";
import { useEffect } from "react";

interface TData {
  totalCreator: number;
  totalBrand: number;
  totalProject: number;
  totalRevenue: number;
  totalSubscription: number;
}


const GeneralStateSection = () => {
  const [overviewDatas, setOverviewDatas] = React.useState<TData>({} as TData);

  const getOverview = async () => {
    toast.loading("Fetching...", { id: "fetch" });
    const res = await myFetch(`/payment/overview-all`, {
      method: "GET",
    });
    // console.log(res?.data);
    if (res?.success) {
      setOverviewDatas(res?.data);
      toast.success("Fetched successfully!", { id: "fetch" });
    } else {
      toast.error(res?.message || "Failed to fetch!", { id: "fetch" });
    }
  }

  useEffect(() => {
    getOverview();
  }, []);


  return (
    <div className="grid md:grid-cols-5 gap-6">
      <SubComponent title="Total Creator" des={overviewDatas?.totalCreator} icon={PiUsersThree} />
      <SubComponent title="Total Brand" des={overviewDatas?.totalBrand} icon={PiUsersThree} />
      <SubComponent title="Total Project" des={overviewDatas?.totalProject} icon={LiaLayerGroupSolid} />
      <SubComponent title="Total Revenue" des={"$" + overviewDatas?.totalRevenue + "K"} icon={TbReportMoney} />
      <SubComponent title="Total Subscription" des={overviewDatas?.totalSubscription} icon={PiUsersThree} />
    </div>
  );
};

const SubComponent = ({ title, des, icon }: { title: string; des: string | number; icon: React.ElementType }) => {
  return (
    <div className="bg-white rounded-xl py-6 ps-3 flex gap-4 cursor-pointer">
      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
        {icon && React.createElement(icon, { className: "text-gray-500", size: 20 })}
      </div>
      <div className="flex flex-col items-start gap-1">
        <h2 className="text-center text-2xl font-semibold text-gray-500">{title}</h2>
        <h3 className="text-center text-2xl font-bold text-gray-600">
          {des}
        </h3>
      </div>
    </div>
  )
}

export default GeneralStateSection;
