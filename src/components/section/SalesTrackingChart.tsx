"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CustomSelectOption from "../cui/CustomSelectOption";
import { selectOptionsRevenue } from "@/constant/videoSelectDatasts";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { myFetch } from "@/utils/myFetch";

const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


const SalesTrackingChartSuspense = () => {
  const [data, setData] = useState([]);
  const searchParams = useSearchParams();
  const revenueDuration = searchParams.get("revenueDuration") ?? "2025";

  useEffect(() => {
    const getGraphDate = async () => {
      const res = await myFetch(`/payment/all-income-rasio?year=${revenueDuration}`);
      if (res?.success) {
        const formatData = res?.data?.map((item: { month: number; totalIncome: number }) => ({
          month: monthArray[item.month - 1],
          totalIncome: item.totalIncome
        }))
        setData(formatData);
      }
    };
    getGraphDate();
  }, [revenueDuration]);

  return (
    <>
      <div className="flex items-center justify-between mb-4 px-6 py-4">
        <h2 className="text-4xl font-bold text-gray-700">Total Revenue</h2>
        <CustomSelectOption selectOptions={selectOptionsRevenue} placeHolderValue="Select Year" queryKey="revenueDuration" />
      </div>
      <div className="h-[300px] 2xl:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barCategoryGap="30%" // Adjust gap between bars
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} tickMargin={20} />
            <Tooltip />
            {/* <Legend /> */}
            {/* Thinner bars */}
            <Bar
              dataKey="totalIncome"
              stackId="a"
              fill="#828D97"
              background={{ fill: '#DEE5EC' }}
              radius={[20, 20, 0, 0]} // Optional: rounded top corners
              barSize={20} // Make bars thinner
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default function SalesTrackingChart() {
  return (
    <Suspense fallback={<div>Loading...</div>} >
      <SalesTrackingChartSuspense />
    </Suspense>
  )
}
