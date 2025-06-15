import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { PiEyeBold } from "react-icons/pi";
import { OrdersDataType } from "@/type/type";

export const orderColumns: ColumnDef<OrdersDataType>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-center">No.</div>,
    cell: ({ row }) => (
      <div className="capitalize text-center">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "brandName",
    header: () => <div className="text-center">Brand Name</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("brandName")}</div>
    ),
  },
  {
    accessorKey: "productName",
    header: () => <div className="text-center">Product Name</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("productName")}</div>
    ),
  },
  {
    accessorKey: "accountManager",
    header: () => <div className="text-center">Account Manager</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("accountManager")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: () => <div className="text-center">Email</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("email")}</div>
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
      <Link href={`/all-creators/${row.getValue("id")}`} className="flex items-center justify-center">
        <PiEyeBold className="text-2xl font-bold text-green-500 hover:text-green-600 transition-colors duration-300" />
      </Link>
    ),
  }
]