/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";


import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import React, { useMemo, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { X } from "lucide-react";
import { clsx } from "clsx";
import { FilterFn } from "@tanstack/react-table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  Toolbar?: any;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  setPagination: any;
  totalPages: number;
  columnFilters: ColumnFiltersState;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  Toolbar,
  pagination,
  setPagination,
  totalPages,
  columnFilters,
  setColumnFilters,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [sortOpen, setSortOpen] = useState<any>("");
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnsToSearch, setColumnsToSearch] = useState([]);

  const globalFilterFn = useMemo(
    () => createGlobalFilterFn(columnsToSearch),
    [columnsToSearch]
  );

  const table = useReactTable({
    data,
    columns,
    pageCount: totalPages,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    manualPagination: true,
    state: {
      sorting,
      columnFilters,
      pagination,
      globalFilter,
    },
    globalFilterFn,
  });

  function createGlobalFilterFn(columnsToSearch: string[]): FilterFn<any> {
    return (row, _, filterValue) => {
      const search = filterValue.toString().toLowerCase().trim();

      return columnsToSearch.some((col) => {
        const value = row.original[col];
        return value?.toString().toLowerCase().trim().includes(search);
      });
    };
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row items-center justify-between  pr-2">
        <div className="">
          {<Toolbar table={table} setColumnsToSearch={setColumnsToSearch} />}
        </div>
        <div className="flex items-center justify-end space-x-2 ">
          <button
            onClick={() => table.previousPage()}
            className={clsx(
              " bg-primary rounded w-5 h-5 flex items-center justify-center",
              !table.getCanPreviousPage()
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            )}
            disabled={!table.getCanPreviousPage()}
          >
            <MdArrowBackIos className="-mr-1 text-background" />
          </button>
          <button
            onClick={() => table.nextPage()}
            className={clsx(
              "bg-primary  text-foreground rounded flex items-center justify-center h-5 w-5",
              !table.getCanNextPage()
                ? "cursor-not-allowed opacity-50 "
                : "cursor-pointer"
            )}
            disabled={!table.getCanNextPage()}
          >
            <MdArrowForwardIos className="text-background" />
          </button>
        </div>
      </div>
      <div className="border rounded max-h-[70vh] overflow-auto">
  <table className="w-full">
    <thead className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow">
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th key={header.id} className="p-2 bg-inherit">
              <Popover open={sortOpen === header?.column?.id}>
                <PopoverTrigger
                  onClick={() => setSortOpen(header?.column?.id)}
                  className="cursor-pointer flex font-bold items-center gap-1"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </PopoverTrigger>
                <PopoverContent
                  onBlur={() => setSortOpen(false)}
                  className="ml-14 w-fit bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 flex flex-col gap-2 select-none"
                >
                  {["Asc", "Desc", "Clear"].map((option) => {
                    const Icon =
                      option === "Asc"
                        ? FaCaretUp
                        : option === "Desc"
                        ? FaCaretDown
                        : X;
                    const onClickHandler = () => {
                      setSortOpen(false);
                      setTimeout(() => {
                        if (option === "Asc") {
                          table.setSorting([
                            { id: header.column.id, desc: false },
                          ]);
                        } else if (option === "Desc") {
                          table.setSorting([
                            { id: header.column.id, desc: true },
                          ]);
                        } else {
                          table.resetSorting();
                        }
                      }, 50);
                    };
                    return (
                      <button
                        key={option}
                        onClick={onClickHandler}
                        className="flex items-center gap-2 py-1 px-2 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-md hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
                      >
                        <Icon className="w-4 h-4" />
                        {option}
                      </button>
                    );
                  })}
                </PopoverContent>
              </Popover>
            </th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <tr key={row.id} data-state={row.getIsSelected() && "selected"}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="p-2">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={columns.length} className="h-24 text-center">
            No results.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

    </div>
  );
}
