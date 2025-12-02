// import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
// import { PiEyeBold } from "react-icons/pi";
import { Checkbox } from "@/components/ui/checkbox"
import { PartialExceptId, TSingleCreator } from "@/type/creatorDataTypes";
import Link from "next/link";
import { PiEyeBold } from "react-icons/pi";

export const adminCreatorListColumns: ColumnDef<PartialExceptId<TSingleCreator>>[] = [
  {
    accessorKey: "_id",
    header: () => <div className="text-center">Creator ID</div>,
    cell: ({ row }) => (
      <div className="capitalize text-center">{row.getValue("_id")}</div>
    ),
  },
  {
    accessorKey: "accountHolderName",
    header: () => <div className="text-center">Name</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("accountHolderName")}</div>
    ),
  },
  {
    accessorKey: "phone",
    header: () => <div className="text-center">Contact No</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("phone")}</div>
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
    id: "select",
    header: ({ table }) => (
      <div className="flex justify-center">
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          onCheckedChange={value => table.toggleAllRowsSelected(!!value)}
          aria-label="Select all"
          className=" border-2 border-gray-400"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-2">
        <Link href={`/admin/all-orders/${row.original?.creatorId}`} className="flex items-center justify-center">
          <PiEyeBold className="text-2xl font-bold text-green-500 hover:text-green-600 transition-colors duration-300" />
        </Link>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label="Select row"
          onClick={e => e.stopPropagation()}
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  }
]