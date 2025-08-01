// import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
// import { PiEyeBold } from "react-icons/pi";
import { Checkbox } from "@/components/ui/checkbox"
import { PartialExceptId, TSingleCreator } from "@/type/creatorDataTypes";

export const adminCreatorListColumns: ColumnDef<PartialExceptId<TSingleCreator>>[] = [
  {
    accessorKey: "_id",
    header: () => <div className="text-center">No.</div>,
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
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
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
  },
  // {
  //   id: "select",
  //   header: () => <div className="text-center">Select</div>,
  //   cell: ({ row }) => (
  //     <div className="flex justify-center items-center">
  //       <input
  //         type="checkbox"
  //         checked={row.getIsSelected?.()}
  //         onChange={e => {
  //           e.stopPropagation(); // Prevent row click
  //           row.toggleSelected?.();
  //           console.log(e.target.checked);
  //         }}
  //       />
  //     </div>
  //   ),
  // }
]