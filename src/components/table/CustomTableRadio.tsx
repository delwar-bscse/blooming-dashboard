"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation";
import * as React from "react"
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



interface RowWithId {
  _id: string | number;
}

interface CustomTableProps<TData extends RowWithId> {
  data: TData[];
  columns: ColumnDef<TData>[];
}

function CustomTableRadio<TData extends RowWithId>({ data, columns }: CustomTableProps<TData>) {
  const [rowSelection, setRowSelection] = useState({});
  const searchParams = useSearchParams();
const step = searchParams.get("step"); // "creator-list"

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // getSelectedRowModel: getSelectedRowModel(),
    state: {
      rowSelection,
      pagination: {
        pageIndex: 0,
        pageSize: data?.length,
      },
    },
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
  })


  // Get all selected IDs
  const selectedIds = table.getSelectedRowModel().rows.map(row => row.original._id);

  return (
    <div className="w-full">
      <div className="rounded-md">
        <Table className="border-separate border-spacing-y-2">
          <TableHeader className="bg-[#DEE5EC]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
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
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="space-y-2">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.original._id}
                  data-state={row.getIsSelected() && "selected"}
                  className=""
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="last:rounded-r-md first:rounded-l-md bg-white">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end gap-2 py-4">
        {(step === "creator-list" || step === "agreed-creators") &&<button
          className="mb-4 px-4 py-2 bg-green-700 text-white rounded"
          onClick={() => console.log("Selected IDs: " + selectedIds.join(", "))}
        >
          {step === "creator-list" && "Select Creator"}
          {step === "agreed-creators" && "Approve Creator"}
        </button>}
      </div>
    </div>
  )
}

export default CustomTableRadio
