// import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { PartialExceptId, TSingleCreator } from "@/type/creatorDataTypes";
import Link from "next/link";
import { PiEyeBold } from "react-icons/pi";
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";

const makePayment = async (creatorId: string) => {
  console.log("Make Payment to : ", creatorId);
  const res = await myFetch(`/assign-task-creator/creator-payment-by-admin/${creatorId}`, { method: 'PATCH' });
  if (res?.success) {
    toast.success("Payment successful");
    window.location.reload();
  }else{
    toast.error(res?.message || "Failed to make payment");
  }
}

export const adminCreatorListColumns2: ColumnDef<PartialExceptId<TSingleCreator>>[] = [
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
    id: "action",
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-4">
        <Link href={`/admin/all-orders/${row.original?.creatorId}`} className="flex items-center justify-center">
          <PiEyeBold className="text-2xl font-bold text-green-500 hover:text-green-600 transition-colors duration-300" />
        </Link>
        {row.original.status === "delivered" && <button onClick={() => makePayment(row.original._id)} className={`px-4 py-1 rounded-md text-white font-semibold ${row.original?.paymentStatus === "pending" ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"} transition-colors duration-300`}>
          {row.original?.paymentStatus === "pending" ? "Pay" : "Paid"}
        </button>}
      </div>
    ),
  }
]