"use client"

import { myFetch } from '@/utils/myFetch';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import type { TooltipProps } from "recharts";
import { selectOptionsSubscription } from '@/constant/videoSelectDatasts';
import CustomSelectOption from '../cui/CustomSelectOption';
import { useSearchParams } from 'next/navigation';

interface TData {
  dateHour: string;
  totalUsers: number;
}


export function formatDay(dateStr: string) {
  const day = dayjs(dateStr).format('dddd');

  return day;
}

export function formatHour(datetimeStr: string) {
  const hour = dayjs(datetimeStr).format('HH');

  return hour;
}


function SubscriptionGraph() {
  const [data, setData] = useState([]);
  const searchParams = useSearchParams();
  const subscriptionDuration = searchParams.get("subscriptionDuration") ?? "7day";

  useEffect(() => {
    const getGraphDate = async () => {
      const res = await myFetch(`/payment/all-subsription-users-rasio?days=${subscriptionDuration}`);
      // console.log(res?.data);
      if (res?.success) {
        if(subscriptionDuration === "7day") {
          const formatedData = res?.data?.map((item:TData) => ({
            dateHour: formatDay(item.dateHour),
            totalUsers: item.totalUsers
          }));
          setData(formatedData);
        }
        if(subscriptionDuration === "24hour") {
          const formatedData = res?.data?.map((item:TData) => ({
            dateHour: formatHour(item.dateHour),
            totalUsers: item.totalUsers
          }));
          setData(formatedData);
        }
      }
    };
    getGraphDate();
  }, [subscriptionDuration]);


  // Custom Tooltip Function
  const renderCustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const { dateHour, totalUsers } = payload[0].payload; // Access the specific data point
      return (
        <div
          style={{
            backgroundColor: "white",
            color: "rgba(0, 0, 0, 0.7)",
            padding: "10px",
            borderRadius: "5px",
            fontSize: "14px",
            maxWidth: "200px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Optional: Adds a subtle shadow
          }}
        >
          <p><strong>{totalUsers}</strong> Subscribers</p>
          <p><strong>{dateHour}, 2025</strong></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full border-gray-300 rounded-2xl p-3 bg-white py-10">
      <div className="flex items-center justify-between mb-4 px-10 pb-8">
        <h2 className="text-4xl font-bold text-gray-700">Total Subscription</h2>
        <CustomSelectOption selectOptions={selectOptionsSubscription} placeHolderValue="Weekly" queryKey="subscriptionDuration"/>
      </div>
      <ResponsiveContainer width="100%" height={500}>
        <AreaChart
          data={data}
          syncId="anyId"
          margin={{
            top: 20,
            right: 30,
            left: 30,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="0 4" />
          <XAxis dataKey="dateHour" tick={{ fontSize: 14 }} tickLine={false} axisLine={false} tickMargin={20} />
          <YAxis tickLine={false} axisLine={false} tickMargin={20} />
          <Tooltip content={renderCustomTooltip} />

          {/* Gradient fill definition */}
          <defs>
            <linearGradient id="gradientColor" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="1%" stopColor="#828D97" stopOpacity={1} />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          {/* Area with gradient fill */}
          <Area
            type="monotone"
            dataKey="totalUsers"
            stroke="#6D715F"
            strokeWidth={6}
            fill="url(#gradientColor)" // Apply gradient by referencing its ID
            activeDot={{
              fill: "#6D715F", // Dot fill color
              stroke: "white", // Dot borders color
              strokeWidth: 6, // Dot borders width
              r: 12, // Dot size (radius)
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SubscriptionGraph;
