import { ColumnDef } from "@tanstack/react-table"
import { PiEyeBold } from "react-icons/pi";
import { SupportDataType } from "@/type/type";
import CustomModal from "@/components/cui/CustomModal";


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
      <div className={`capitalize text-center border ${row.getValue("status") === "Solved" ? "text-green-500 border-green-500" : "text-red-500 border-red-500"} capitalize text-center text-semibold py-1 rounded-md`}>{row.getValue("status")}</div>
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
          <CustomModal
            title="Advanced Filters"
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
          </CustomModal>
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