import { ColumnDef } from "@tanstack/react-table";
import { Eye, Settings2 } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Projects } from "./projects-table";

export const columns: ColumnDef<Projects>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "url",
    header: "URL",
    cell: ({ row }) => <div>{row.getValue("url")}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <p>{row.getValue("description") ?? "N/A"}</p>,
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Link href={`/projects/${row.original?.id}`}>
          <Button variant="outline">
            View project <Eye className="h-5 w-5 ml-2" />
          </Button>
        </Link>
        <Button variant="destructive">Delete</Button>
        <Link href={`/projects/${row.original?.id}/preferences`}>
          <Button variant="secondary">
            Update
            <Settings2 className="h-5 w-5 ml-2 text-indigo-400" />
          </Button>
        </Link>
      </div>
    ),
  },
];
