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

const data = [
  {
    name: "Jan",
    Sales: 4000,
    Revenue: 400,
  },
  {
    name: "Feb",
    Sales: 3000,
    Revenue: 1398,
  },
  {
    name: "Mar",
    Sales: 6800,
    Revenue: 3200,
  },
  {
    name: "Apr",
    Sales: 4780,
    Revenue: 1908,
  },
  {
    name: "May",
    Sales: 4890,
    Revenue: 2800,
  },
  {
    name: "Jun",
    Sales: 3390,
    Revenue: 2800,
  },
  {
    name: "Jul",
    Sales: 3490,
    Revenue: 1300,
  },
  {
    name: "Aug",
    Sales: 4000,
    Revenue: 2400,
  },
  {
    name: "Sep",
    Sales: 3000,
    Revenue: 1398,
  },
  {
    name: "Oct",
    Sales: 6800,
    Revenue: 3200,
  },
  {
    name: "Nov",
    Sales: 4780,
    Revenue: 1908,
  },
  {
    name: "Dec",
    Sales: 4890,
    Revenue: 2800,
  }
];

const SalesTrackingChart = () => {
  return (
    <>
      <p className="text-base font-semibold px-4 py-1">total revenue</p>
      <ResponsiveContainer width="90%" height={310}>
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
          <XAxis dataKey="name" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} tickMargin={20} />
          <Tooltip />
          {/* <Legend /> */}
          {/* Thinner bars */}
          <Bar
            dataKey="Revenue"
            stackId="a"
            fill="#828D97"
            background={{ fill: '#DEE5EC' }}
            radius={[20, 20, 0, 0]} // Optional: rounded top corners
            barSize={20} // Make bars thinner
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default SalesTrackingChart;
