import { ColumnDef } from "@tanstack/react-table";
import { Mail, Star } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Feedbacks } from "./feedback-table";

export const feedbackColumns: ColumnDef<Feedbacks>[] = [
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
    accessorKey: "userName",
    header: "Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("userName")}</div>
    ),
  },
  {
    accessorKey: "userEmail",
    header: "Email",
    cell: ({ row }) => <div>{row.getValue("userEmail")}</div>,
  },
  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => <p>{row.getValue("message") ?? "N/A"}</p>,
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => (
      <div className="flex justify-start">
        {[1, 2, 3, 4, 5].map((_, index) => (
          <Star
            key={index}
            className={`h-5 w-5 cursor-pointer ${
              Number(row.getValue("rating")) > index
                ? "fill-primary"
                : "fill-muted stroke-muted-foreground"
            }`}
          />
        ))}
      </div>
    ),
  },
  {
    header: "Actions",
    cell: () => (
      <div className="flex justify-start">
        <Button variant="secondary">
          Send a email <Mail className="text-indigo-400 h-5 w-5 ml-2" /> </Button>
      </div>
    ),
  },
];
