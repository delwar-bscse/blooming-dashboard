"use client";

import { myFetch } from '@/utils/myFetch';
// import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
// import CustomSelectOption from '../cui/CustomSelectOption';
// import { selectOptionsSubscription } from '@/constant/videoSelectDatasts';
import { toast } from 'sonner';

const TotalRevenue = () => {
  const [userSummary, setUserSummary] = useState<Record<string, number>>({
    totalBrands: 65,
    totalCreators: 35,
  });
  // const searchParams = useSearchParams();
  // const brandEngagementDuration = searchParams.get("brandEngagementDuration") ?? "7day";

  const getOverview = async () => {
    const response = await myFetch(`/payment/overview-all`, {
      method: "GET",
    });

    console.log("Brand Engagement Data:", response);

    if (response?.success) {
      // setOverviewDatas(response?.data);
      const brand = Math.round(response?.data?.totalBrand * 100 / (response?.data?.totalBrand + response?.data?.totalCreator));
      const creator = Math.round(response?.data?.totalCreator * 100 / (response?.data?.totalBrand +  response?.data?.totalCreator));

      setUserSummary((prev) => ({
        ...prev,
        totalBrands: brand,
        totalCreators: creator
      }))
    } else {
      toast.error(response?.message || "Failed to fetch Brand And Creator ratio!");
    }
  }

  useEffect(() => {
    getOverview();
  }, []);

  // useEffect(() => {
  //   const getGraphDate = async () => {
  //     // const response = await myFetch(`/payment/brand-engagement?days=${brandEngagementDuration}`);


  //     // if (response?.success) {
  //     //   setUserSummary((prev) => ({
  //     //     ...prev,
  //     //     totalBrands: response?.data,
  //     //     totalCreators: 100 - response?.data
  //     //   }))
  //     // }
  //   };
  //   getGraphDate();
  // }, [brandEngagementDuration]);



  return (
    <div className="border rounded-2xl bg-white p-4 flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-12 ">
        <h2 className="text-2xl font-bold text-gray-700">Brand & Creator Engagement</h2>
        {/* <CustomSelectOption selectOptions={selectOptionsSubscription} placeHolderValue="Weekly" queryKey="brandEngagementDuration" /> */}
      </div>

      <div className="relative w-60 h-60 2xl:w-80 2xl:h-88 mb-6">
        <svg
          className="absolute inset-0 transform -rotate-90"
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className="stroke-current text-secondary"
            strokeWidth="4"
          ></circle>
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className="stroke-current text-primary"
            strokeWidth="4"
            strokeDasharray="100"
            strokeDashoffset={
              (100 * (100 - userSummary?.totalBrands)) / 100
            }
            strokeLinecap="round"
          ></circle>
        </svg>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary w-24 h-24 rounded-full flex flex-col items-center justify-center">
          <span className="text-2xl font-bold">
            {userSummary?.totalBrands}%
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-3 rounded-3xl bg-primary"></div>
          <p className="text-sm font-medium">
            Brands: {userSummary?.totalBrands}%
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-3 rounded-3xl bg-secondary"></div>
          <p className="text-sm font-medium">
            Creators: {userSummary?.totalCreators}%
          </p>
        </div>
      </div>
    </div>
  )
}

export default TotalRevenue