"use client";

import { myFetch } from '@/utils/myFetch';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import CustomSelectOption from '../cui/CustomSelectOption';
import { selectOptionsSubscription } from '@/constant/videoSelectDatasts';

const TotalRevenue = () => {
  const [data, setData] = useState<string>("");
  const searchParams = useSearchParams();
  const brandEngagementDuration = searchParams.get("brandEngagementDuration") ?? "7day";

  useEffect(() => {
    const getGraphDate = async () => {
      const res = await myFetch(`/payment/brand-engagement?days=${brandEngagementDuration}`);
      console.log("Active Users: ", res?.data);
      if (res?.success) {
        setData(res?.data);
      }
    };
    getGraphDate();
  }, [brandEngagementDuration]);

  const orderSummary = {
    doneByProfessionals: 65,
    doneByFreelancers: 35,
  };

  return (
    <div className="border rounded-2xl bg-white p-4 flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-12 ">
        <h2 className="text-2xl font-bold text-gray-700">Brand Engagement</h2>
        <CustomSelectOption selectOptions={selectOptionsSubscription} placeHolderValue="Weekly" queryKey="brandEngagementDuration"/>
      </div>

      <div className="relative w-80 h-88 mb-6">
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
              (100 * (100 - orderSummary?.doneByProfessionals)) / 100
            }
            strokeLinecap="round"
          ></circle>
        </svg>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary w-24 h-24 rounded-full flex flex-col items-center justify-center">
          <span className="text-2xl font-bold">
            {orderSummary?.doneByProfessionals}%
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-3 rounded-3xl bg-primary"></div>
          <p className="text-sm font-medium">
            Active Users: {orderSummary?.doneByProfessionals}%
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-3 rounded-3xl bg-secondary"></div>
          <p className="text-sm font-medium">
            Inactive Users: {orderSummary?.doneByFreelancers.toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  )
}

export default TotalRevenue