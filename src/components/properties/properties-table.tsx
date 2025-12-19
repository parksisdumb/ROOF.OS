'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpDown, ChevronDown, MoreHorizontal, Building, Warehouse, Building2, Store, Home } from 'lucide-react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Property } from '@/lib/types';
import Link from 'next/link';

type PropertyWithAccount = Property & { accountName: string };

const getPropertyIcon = (type: Property['propertyType']) => {
    switch (type) {
        case 'Commercial':
            return <Building className="h-4 w-4 text-muted-foreground" />;
        case 'Industrial':
            return <Warehouse className="h-4 w-4 text-muted-foreground" />;
        case 'Residential':
            return <Home className="h-4 w-4 text-muted-foreground" />;
        case 'Office':
            return <Building2 className="h-4 w-4 text-muted-foreground" />;
        case 'Retail':
            return <Store className="h-4 w-4 text-muted-foreground" />;
        default:
            return <Building className="h-4 w-4 text-muted-foreground" />;
    }
}


export const columns: ColumnDef<PropertyWithAccount>[] = [
  {
    accessorKey: 'propertyName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Property Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
        return (
            <Link href={`/properties/${row.original.id}`} className="font-medium hover:underline flex items-center gap-2">
                {getPropertyIcon(row.original.propertyType)}
                {row.getValue('propertyName')}
            </Link>
        )
    },
  },
  {
    accessorKey: 'accountName',
    header: 'Account',
    cell: ({row}) => {
        return (
            <Link href={`/accounts/${row.original.accountId}`} className="hover:underline">
                {row.getValue('accountName')}
            </Link>
        )
    }
  },
  {
    accessorKey: 'streetAddress',
    header: 'Address',
    cell: ({row}) => {
        const property = row.original;
        return `${property.streetAddress}, ${property.city}, ${property.state} ${property.zip}`
    }
  },
  {
    accessorKey: 'roofType',
    header: 'Roof Type',
  },
  {
    accessorKey: 'approxSqft',
    header: () => <div className="text-right">Square Footage</div>,
    cell: ({ row }) => {
      const sqft = parseFloat(row.getValue('approxSqft'));
      const formatted = new Intl.NumberFormat('en-US').format(sqft);
      return <div className="text-right font-medium">{formatted} sqft</div>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const property = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(property.id)}
            >
              Copy Property ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/properties/${property.id}`}>View details</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function PropertiesTable({ properties }: { properties: PropertyWithAccount[] }) {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: properties,
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
      <div className="flex items-center gap-4 py-4">
        <Input
          placeholder="Filter by property name..."
          value={(table.getColumn('propertyName')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('propertyName')?.setFilterValue(event.target.value)
          }
          className="max-w-xs"
        />
         <Input
          placeholder="Filter by address..."
          value={(table.getColumn('streetAddress')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('streetAddress')?.setFilterValue(event.target.value)
          }
          className="max-w-xs"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
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
                    className="capitalize"
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
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={() => router.push(`/properties/${row.original.id}`)}
                  className="cursor-pointer"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} onClick={(e) => {
                        if (cell.column.id === 'actions' || (e.target as HTMLElement).closest('a')) {
                            e.stopPropagation();
                        }
                    }}>
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
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
  );
}
