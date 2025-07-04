import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { PiEyeBold } from "react-icons/pi";
import { creatorOrderDataType} from "@/type/type";

export const creatorOrderColumns: ColumnDef<creatorOrderDataType>[] = [
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
    accessorKey: "deadline",
    header: () => <div className="text-center">Product Name</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("deadline")}</div>
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
      <Link href={`/creator/all-project/${row.getValue("id")}`} className="flex items-center justify-center">
        <PiEyeBold className="text-2xl font-bold text-green-500 hover:text-green-600 transition-colors duration-300" />
      </Link>
    ),
  }
]