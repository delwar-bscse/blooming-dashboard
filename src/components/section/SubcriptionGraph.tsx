"use client"

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


const SubscriptionGraph = () => {
  const subscriptionData = {
    data: [
      {
        weekMontYear: "Jan",
        subscriber: 4000,
      },
      {
        weekMontYear: "Feb",
        subscriber: 3000,
      },
      {
        weekMontYear: "Mar",
        subscriber: 5000,
      },
      {
        weekMontYear: "Apr",
        subscriber: 4780,
      },
      {
        weekMontYear: "May",
        subscriber: 5890,
      },
      {
        weekMontYear: "Jun",
        subscriber: 3490,
      },
      {
        weekMontYear: "Jul",
        subscriber: 3490,
      },
      {
        weekMontYear: "Aug",
        subscriber: 2000,
      },
      {
        weekMontYear: "Sep",
        subscriber: 6490,
      },
      {
        weekMontYear: "Oct",
        subscriber: 3000,
      },
      {
        weekMontYear: "Nov",
        subscriber: 3490,
      },
      {
        weekMontYear: "Dec",
        subscriber: 2500,
      },

    ]
  }

  // Custom Tooltip Function

  const renderCustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const { weekMontYear, subscriber } = payload[0].payload; // Access the specific data point
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
          <p><strong>{subscriber}</strong> Subscribers</p>
          <p><strong>{weekMontYear}, 2025</strong></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full border-gray-300 rounded-2xl p-3 bg-white">
      <h4 className="text-2xl font-semibold text-gray-800 py-4 pl-6 capitalize">total subscription weekly</h4>
      <ResponsiveContainer width="100%" height={500}>
        <AreaChart
          data={subscriptionData?.data}
          syncId="anyId"
          margin={{
            top: 20,
            right: 30,
            left: 30,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="0 4" />
          <XAxis dataKey="weekMontYear" tick={{ fontSize: 14 }} tickLine={false} axisLine={false} tickMargin={20} />
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
            dataKey="subscriber"
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
};

export default SubscriptionGraph;
