// import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
// import { PiEyeBold } from "react-icons/pi";
import { adminCreatorListDataType } from "@/type/type";
import { Checkbox } from "@/components/ui/checkbox"

export const adminCreatorListColumns: ColumnDef<adminCreatorListDataType>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-center">No.</div>,
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
    accessorKey: "category",
    header: () => <div className="text-center">Category</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {(row.getValue("category") as string[]).join(", ")}
      </div>
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
      <div className="capitalize text-center text-semibold text-white bg-green-600 hover:bg-gray-700 hover:text-gray-100 transition-colors duration-300 py-1 rounded-md cursor-pointer">{row.getValue("status")}</div>
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