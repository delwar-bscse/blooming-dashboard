import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { PiEyeBold } from "react-icons/pi";
import { CreatorDataType } from "@/type/type";

export const creatorColumns: ColumnDef<CreatorDataType>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-center">Creator ID</div>,
    cell: ({ row }) => (
      <div className="capitalize text-center">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: () => <div className="text-center">Name</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "contactNo",
    header: () => <div className="text-center">Contact No</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("contactNo")}</div>
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
    accessorKey: "country",
    header: () => <div className="text-center">Country</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("country")}</div>
    ),
  },
  // {
  //   accessorKey: "category",
  //   header: () => <div className="text-center">Category</div>,
  //   cell: ({ row }) => (
  //     <div className="text-center">
  //       {(row.getValue("category") as string[]).join(", ")}
  //     </div>
  //   ),
  // },
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
      <Link href={`/admin/all-creators/${row.original?.creatorId}`} className="flex items-center justify-center">
        <PiEyeBold className="text-2xl font-bold text-green-500 hover:text-green-600 transition-colors duration-300" />
      </Link>
    ),
  }
]