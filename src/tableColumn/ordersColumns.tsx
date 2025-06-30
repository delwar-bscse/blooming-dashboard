import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { PiEyeBold } from "react-icons/pi";
import { PiUserCircleLight } from "react-icons/pi";
import { TOrdersData } from "@/type/orderDataTypes";

export const orderColumns: ColumnDef<TOrdersData>[] = [
  {
    accessorKey: "_id",
    header: () => <div className="text-center">No.</div>,
    cell: ({ row }) => (
      <div className="capitalize text-center">{row.getValue("_id")}</div>
    ),
  },
  {
    accessorKey: "brandInfo.name",
    header: () => <div className="text-center">Brand Name</div>,
    cell: ({ row }) => {
      // Access nested value directly
      const brandName = row.original?.brandInfo?.name;
      return (
        <div className="text-center">{brandName}</div>
      );
    },
  },
  {
    accessorKey: "brandInfo.productName",
    header: () => <div className="text-center">Product Name</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original?.brandInfo?.productName}</div>
    ),
  },
  // {
  //   accessorKey: "accountManager",
  //   header: () => <div className="text-center">Account Manager</div>,
  //   cell: ({ row }) => (
  //     <div className="text-center">{row.getValue("accountManager")}</div>
  //   ),
  // },
  {
    accessorKey: "brandInfo.email",
    header: () => <div className="text-center">Email</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original?.brandInfo?.email}</div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => (
      <div className="capitalize text-center text-semibold text-white bg-gray-600 hover:bg-gray-700 hover:text-gray-100 transition-colors duration-300 py-1 rounded-md cursor-pointer">{row.getValue("status")}</div>
    ),
  },
  {
    id: "action",
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-2">
        <Link href={`/admin/all-orders/order-details/${row.getValue("_id")}`} className="flex items-center justify-center">
          <PiEyeBold className="text-2xl font-bold text-green-500 hover:text-green-600 transition-colors duration-300" />
        </Link>
        <Link href={`/admin/all-orders/order-actions/${row.getValue("_id")}`} className="flex items-center justify-center">
          <PiUserCircleLight className="text-2xl font-bold text-blue-500 hover:text-blue-600 transition-colors duration-300" />
        </Link>
      </div>
    ),
  }
]