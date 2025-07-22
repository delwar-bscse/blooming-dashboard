"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "sonner"
import { myFetch } from "@/utils/myFetch"

interface RowWithId {
  _id: string | number;
}

interface CustomTableProps<TData extends RowWithId> {
  data: TData[];
  columns: ColumnDef<TData>[];
}

function CustomTableRadioSuspense<TData extends RowWithId>({ data, columns }: CustomTableProps<TData>) {
  const [selectedRowId, setSelectedRowId] = React.useState<string | number | null>(null);
  const searchParams = useSearchParams();
  const step = searchParams.get("step"); // e.g., "creator-list"

  // Add a radio button column dynamically
  // const allColumns = React.useMemo<ColumnDef<TData>[]>(() => {
  //   const radioCol: ColumnDef<TData> = {
  //     id: "select",
  //     header: "",
  //     cell: ({ row }) => (
  //       <input
  //         type="radio"
  //         name="rowSelect"
  //         checked={row.getIsSelected()}
  //         onChange={() => row.toggleSelected(true)}
  //       />
  //     ),
  //     enableSorting: false,
  //   };
  //   return [radioCol, ...columns];
  // }, [columns]);
  const handleApprove = async (hiredCreatorId: string) => {
    toast.loading("Approving...", { id: "approved" });
    console.log("Approved: ", hiredCreatorId);
    const res = await myFetch(`/assign-task-creator/approved/${hiredCreatorId}`, {
      method: "PATCH",
    })
    console.log(res?.data);
    if (res?.data) {
      toast.success("Approved successfully!", { id: "approved" });
    } else {
      toast.error(res?.message || "Updating failed!", { id: "approved" });
    }
  }

  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection: selectedRowId ? { [selectedRowId]: true } : {},
      pagination: {
        pageIndex: 0,
        pageSize: data?.length,
      },
    },
    onRowSelectionChange: (updater) => {
      const newSelection = typeof updater === "function" ? updater({}) : updater;
      const newId = Object.keys(newSelection)[0] || null;
      setSelectedRowId(newId);
    },
    enableRowSelection: () => true,
  });

  const selectedIds = table.getSelectedRowModel().rows.map(row => row.original._id);

  return (
    <div className="w-full">
      <div className="rounded-md">
        <Table className="border-separate border-spacing-y-2">
          <TableHeader className="bg-[#DEE5EC]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="bg-[#DEE5EC]"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="space-y-2">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.original._id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="last:rounded-r-md first:rounded-l-md bg-white"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {(step === "creator-list" || step === "agreed-creators") && (
        <div className="flex items-center justify-end gap-2 py-4">
          <button
            className="mb-4 px-4 py-2 bg-green-700 text-white rounded"
            onClick={() => handleApprove(selectedIds.join(", "))}
          >
            {step === "creator-list" && "Select Creator"}
            {step === "agreed-creators" && "Approve Creator"}
          </button>
        </div>
      )}
    </div>
  );
}

export default function CustomTableRadio<TData extends RowWithId>({ data, columns }: CustomTableProps<TData>) {
  return (
    <React.Suspense fallback={<div>Loading...</div>} >
      <CustomTableRadioSuspense data={data} columns={columns}/>
    </React.Suspense>
  )
}
