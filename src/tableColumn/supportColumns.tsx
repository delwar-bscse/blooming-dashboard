/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table"
import { PiEyeBold } from "react-icons/pi";
import { SupportDataType } from "@/type/type";
import CustomModalView from "@/components/cui/CustomModalView";
import { toast } from "sonner";
import { myFetch } from "@/utils/myFetch";

const handleStatus = async(supportId: any) => {
  const res = await myFetch(`/contact-us/status/${supportId}`, {
    method: "PATCH",
  })
  console.log(res?.data);
  if (res?.success) {
    toast.success("Solved successfully!");
  } else {
    toast.error(res?.message || "Failed to solve!");
  }
}


export const supportColumns: ColumnDef<SupportDataType>[] = [
  {
    accessorKey: "_id",
    header: () => <div className=" pl-4">Message ID</div>,
    cell: ({ row }) => (
      <div className="capitalize pl-4">{row.getValue("_id")}</div>
    ),
  },
  {
    accessorKey: "fullName",
    header: () => <div className="">Name</div>,
    cell: ({ row }) => (
      <div className="">{row.getValue("fullName")}</div>
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: () => <div className="">Number</div>,
    cell: ({ row }) => (
      <div className="">{row.getValue("phoneNumber")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: () => <div className="">Email</div>,
    cell: ({ row }) => (
      <div className="">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "message",
    header: () => <div className="">Message</div>,
    cell: ({ row }) => (
      <div className="">
        {(row.getValue("message") as string).slice(0, 20)}...
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => (
      <div onClick={() => handleStatus(row.original._id)} className={`capitalize text-center border ${row.getValue("status") === "Solved" ? "text-green-500 border-green-500 hover:text-green-600 hover:border-green-600" : "text-red-500 border-red-500 hover:text-red-600 hover:border-red-600"} hover:font-semibold capitalize text-center text-semibold py-1 rounded-md cursor-pointer transition-all duration-300`}>{row.getValue("status")}</div>
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