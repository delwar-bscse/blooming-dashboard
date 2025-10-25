import { ColumnDef } from "@tanstack/react-table"
import { UserDataType } from "@/type/type";
import { toast } from "sonner";
import { myFetch } from "@/utils/myFetch";

const handleRoleChange = async (id: string) => {
  toast.loading("Fetching users...", { id: "fetchAllUsers" });
  const res = await myFetch(`/users/roleSwitch/${id}`, {
    method: "POST",
  });
  
  if (res?.data) {
    toast.success("All users fetched successfully!", { id: "fetchAllUsers" });
    window.location.reload();
  } else {
    toast.error(res?.message || "Fetching failed!", { id: "fetchAllUsers" });
  }
}

export const userColumns: ColumnDef<UserDataType>[] = [
  {
    accessorKey: "_id",
    header: () => <div className="text-center">No.</div>,
    cell: ({ row }) => (
      <div className="capitalize text-center">{row.getValue("_id")}</div>
    ),
  },
  {
    accessorKey: "fullName",
    header: () => <div className="text-center">Name</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("fullName")}</div>
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
    accessorKey: "role",
    header: () => <div className="text-center">Role</div>,
    cell: ({ row }) => (
      <div className="capitalize text-center text-semibold text-white bg-gray-600 hover:bg-gray-700 hover:text-gray-100 transition-colors duration-300 py-1 rounded-md cursor-pointer">{row.getValue("role")}</div>
    ),
  },
  {
    id: "action",
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <button onClick={() => handleRoleChange(row.getValue("_id"))} className={`text-center w-40 cursor-pointer ${row.getValue("role") === "user" ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'} transition-colors duration-300 py-1 rounded-md`}>
          {row.getValue("role") === "user" ? "Make Sub Admin" : "Remove Sub Admin"}
        </button>
      </div>
    ),
  }
]