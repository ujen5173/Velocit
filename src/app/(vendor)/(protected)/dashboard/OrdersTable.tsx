"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { Check, ChevronDown, Trash } from "lucide-react";
import Image from "next/image";
import * as React from "react";

import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { cn } from "~/lib/utils";
import { type vehicleTypeEnum } from "~/server/db/schema";

const data: Payment[] = [
  {
    order: "#0001",
    date: {
      start: "2021-10-01",
      end: "2021-10-15",
    },
    customer: "Michael Scott",
    payment: "online",
    payment_ss:
      "https://utfs.io/f/oGGp19TCxhl9k7PkRH9eD7FrzqU83XahxWIBN1fOPHdAYu2y",
    status: "pending",
    vehicle_types: ["bike"],
    total_vehicle: 2,
    no_of_days: 2,
    phone_number: "+1 123 456 7890",
    amount: 1600,
    note: "This is a note",
    createdAt: "2021-10-01T00:00:00Z",
  },
  {
    order: "#0002",
    date: {
      start: "2023-08-12",
      end: "2023-08-14",
    },
    customer: "Dwight Schrute",
    payment: "offline",
    status: "active",
    vehicle_types: ["car", "scooter"],
    total_vehicle: 3,
    no_of_days: 3,
    phone_number: "+1 234 567 8901",
    payment_ss: undefined,
    amount: 4500,
    note: "Payment received in cash.",
    createdAt: "2021-10-01T00:00:00Z",
  },
  {
    order: "#0003",
    date: {
      start: "2023-05-20",
      end: "2023-05-22",
    },
    customer: "Jim Halpert",
    payment: "online",
    payment_ss:
      "https://utfs.io/f/oGGp19TCxhl9k7PkRH9eD7FrzqU83XahxWIBN1fOPHdAYu2y",
    status: "rejected",
    vehicle_types: ["car"],
    total_vehicle: 1,
    no_of_days: 3,
    phone_number: "+1 345 678 9012",
    amount: 2200,
    note: "Requested delivery to home address.",
    createdAt: "2021-10-01T00:00:00Z",
  },
  {
    order: "#0004",
    date: {
      start: "2024-01-01",
      end: "2024-01-07",
    },
    customer: "Pam Beesly",
    payment: "offline",
    status: "active",
    vehicle_types: ["bike"],
    total_vehicle: 1,
    no_of_days: 7,
    payment_ss: undefined,
    phone_number: "+1 456 789 0123",
    amount: 800,
    note: "Customer did not meet eligibility criteria.",
    createdAt: "2021-10-01T00:00:00Z",
  },
  {
    order: "#0005",
    date: {
      start: "2024-06-15",
      end: "2024-06-18",
    },
    customer: "Ryan Howard",
    payment: "online",
    payment_ss:
      "https://utfs.io/f/oGGp19TCxhl9k7PkRH9eD7FrzqU83XahxWIBN1fOPHdAYu2y",
    status: "active",
    vehicle_types: ["e-bicycle", "car"],
    total_vehicle: 2,
    no_of_days: 4,
    phone_number: "+1 567 890 1234",
    amount: 3600,
    note: "Satisfaction guaranteed with extra insurance.",
    createdAt: "2021-10-01T00:00:00Z",
  },
];

export type Payment = {
  order: string;
  date: {
    start: string;
    end: string;
  };
  customer: string;
  payment: "online" | "offline";
  payment_ss?: string;
  status: "active" | "pending" | "rejected";
  amount: number;
  vehicle_types: (typeof vehicleTypeEnum.enumValues)[number][];
  phone_number: string;
  total_vehicle: number;
  no_of_days: number;
  note?: string;
  createdAt: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "order",
    header: () => <div className="w-max break-keep px-4 pl-4"> UUID</div>,
    cell: ({ row }) => (
      <div className="w-max break-keep px-4 pl-4 capitalize">
        {row.getValue("order")}
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "customer",
    header: () => <div className="w-max break-keep px-4"> Customer</div>,
    cell: ({ row }) => (
      <div className="w-max break-keep px-4 capitalize">
        {row.getValue("customer")}
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="w-max break-keep px-4">Ordered Date</div>,
    cell: ({ row }) => (
      <div className="space-y-1 px-4">
        <p className="w-max break-keep">
          {formatDate(
            new Date(row.getValue("createdAt") ?? new Date()),
            "dd MMM, yyyy",
          )}
        </p>
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "payment",
    header: () => <div className="w-max break-keep px-4"> Payment</div>,
    cell: ({ row }) => (
      <div className="w-max break-keep px-4 capitalize">
        {row.getValue("payment")}
      </div>
    ),
  },
  {
    accessorKey: "vehicle_types",
    header: () => <div className="w-max break-keep px-4"> Vehicles</div>,
    cell: ({ row }) => {
      return (
        <div className="w-max break-keep px-4 capitalize">
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-call */}
          {(
            row.getValue<(typeof vehicleTypeEnum.enumValues)[number][]>(
              "vehicle_types",
            ) ?? []
          )?.join(", ")}
        </div>
      );
    },
  },
  {
    accessorKey: "total_vehicle",
    header: () => <div className="w-max break-keep px-4">Total Vehicles</div>,
    cell: ({ row }) => (
      <div className="w-max break-keep px-4 capitalize">
        {row.getValue("total_vehicle")}
      </div>
    ),
  },
  {
    accessorKey: "no_of_days",
    header: () => <div className="w-max break-keep px-4">No of Days</div>,
    cell: ({ row }) => (
      <div className="w-max break-keep px-4 capitalize">
        {row.getValue("no_of_days")}
      </div>
    ),
  },
  {
    accessorKey: "payment_ss",
    header: () => <div className="w-max break-keep px-4">Payment SS</div>,
    cell: ({ row }) => (
      <div className="w-max break-keep px-4 capitalize">
        {row.getValue("payment_ss") ? (
          <div className="">
            <Dialog>
              <DialogTrigger asChild>
                <div className="cursor-pointer">
                  <Image
                    src={row.getValue("payment_ss")}
                    alt="Payment Screenshot missing..."
                    width={100}
                    height={200}
                    className="w-10 rounded-sm object-cover"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <div className="py-8">
                  <Image
                    src={row.getValue("payment_ss")}
                    alt="Payment Screenshot missing..."
                    width={1440}
                    height={840}
                    className="mx-auto h-[70vh] max-h-[42rem] min-h-[30rem] w-auto rounded-md object-cover"
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          "N/A"
        )}
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: () => <div className="w-max break-keep px-4">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "NPR",
        notation: "compact",
        compactDisplay: "short",
      }).format(amount);

      return <div className="px-6 font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="w-max break-keep px-4">Status</div>,
    cell: ({ row }) => (
      <div
        className={cn(
          row.getValue("status") === "active" &&
            "border border-green-400 bg-green-50 text-green-600",
          row.getValue("status") === "pending" &&
            "border border-yellow-400 bg-yellow-50 text-yellow-600",
          row.getValue("status") === "rejected" &&
            "border border-red-400 bg-red-50 text-red-600",
          "w-20 break-keep rounded-sm px-2 py-1 text-center text-xs capitalize",
        )}
      >
        {row.getValue("status")}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => (
      <div className="ml-auto w-max break-keep px-4 pr-4 text-right">
        Actions
      </div>
    ),

    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-end gap-2 px-4 pr-4">
          <Button
            variant={"outline"}
            size="sm"
            disabled={row.getValue("status") === "active"}
            className="gap-1 text-green-700"
          >
            <Check size={15} className="text-green-700" />
            Accept
          </Button>
          <Button
            variant={"outline"}
            size="sm"
            disabled={row.getValue("status") === "rejected"}
            className="gap-1 text-red-700"
          >
            <Trash size={15} className="text-red-700" />
            Reject
          </Button>
        </div>
      );
    },
  },
];

const OrdersTable = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="max-w-1440px mx-auto">
        <h1 className="text-2xl font-semibold">Orders</h1>
        <div className="flex items-center gap-4 py-4">
          <div className="flex-1">
            <Input
              placeholder="Filter names..."
              value={
                (table.getColumn("customer")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("customer")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>
          <div className="hidden sm:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="ml-auto gap-1">
                  Columns <ChevronDown className="text-slate-700" size={18} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="w-max break-keep capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="overflow-hidden rounded-md border">
          <Table className="relative">
            <TableHeader className="bg-slate-100">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="px-4">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="h-14 w-max break-keep"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="p-4">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="h-14"
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
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
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
