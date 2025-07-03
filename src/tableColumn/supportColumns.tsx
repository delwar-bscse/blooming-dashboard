/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table"
import { PiEyeBold } from "react-icons/pi";
import { SupportDataType } from "@/type/type";
import CustomModalView from "@/components/cui/CustomModalView";
import { toast } from "sonner";

const handleStatus = (value: any) => {
  toast.success(JSON.stringify(value));
  console.log(value);
}


export const supportColumns: ColumnDef<SupportDataType>[] = [
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
    accessorKey: "number",
    header: () => <div className="text-center">Number</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("number")}</div>
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
      <div onClick={() => handleStatus(row.original)} className={`capitalize text-center border ${row.getValue("status") === "Solved" ? "text-green-500 border-green-500 hover:text-green-600 hover:border-green-600" : "text-red-500 border-red-500 hover:text-red-600 hover:border-red-600"} hover:font-semibold capitalize text-center text-semibold py-1 rounded-md cursor-pointer transition-all duration-300`}>{row.getValue("status")}</div>
    ),
  },
  {
    id: "action",
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => {
      const rowData = row.original
      const handleSubmit = () => {
        console.log("It is working")
      }
      return <div className="flex items-center justify-center">
        <div>
          <CustomModalView
            title="Details"
            submitText="Solved"
            onSubmit={handleSubmit}
            trigger={
              <PiEyeBold className="text-2xl font-bold text-green-500 hover:text-green-600 transition-colors duration-300" />
            }
          >
            <div>
              {Object.entries(rowData).map(([key, value]) => (
                <SubComponent key={key} title={key} des={value} />
              ))}
            </div>
          </CustomModalView>
        </div>
      </div>
    },
  }
]

const SubComponent = ({ title, des }: { title: string; des: string | number }) => (
  <p>
    <span className="w-32 inline-block text-gray-700 font-semibold">{title}</span>
    <span>: {des}</span>
  </p>
)