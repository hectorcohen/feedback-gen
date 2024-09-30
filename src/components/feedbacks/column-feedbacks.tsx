import { ColumnDef } from "@tanstack/react-table";
import { Mail, Star } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Feedbacks } from "./feedback-table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const ratings: {
  rating: number;
  color: string;
}[] = [
  { rating: 1, color: "fill-red-500 stroke-red-600" },
  { rating: 2, color: "fill-red-400 stroke-red-500" },
  { rating: 3, color: "fill-yellow-400 stroke-yellow-500" },
  { rating: 4, color: "fill-green-400 stroke-green-500" },
  { rating: 5, color: "fill-green-500 stroke-green-600" },
];

export const feedbackColumns: ColumnDef<Feedbacks>[] = [
  {
    accessorKey: "userName",
    header: "Name",
    size: 200,
    cell: ({ row }) => (
      <p className="capitalize line-clamp-1">{row.getValue("userName")}</p>
    ),
  },
  {
    accessorKey: "userEmail",
    header: "Email",
    enableColumnFilter: true,
    cell: ({ row }) => <div>{row.getValue("userEmail")}</div>,
  },
  {
    accessorKey: "message",
    header: "Message",
    size: 200,
    cell: ({ row }) => (
      <div className="ml-1 inline-block w-[200px]">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="cursor-pointer" asChild>
              <p className="line-clamp-1">
                {row.getValue("message") ?? "N/A"}
              </p>
            </TooltipTrigger>
            <TooltipContent>
              <p>{row.getValue("message") ?? "N/A"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => (
      <div className="flex justify-start">
        {ratings.map(({ rating, color }, index) => (
          <Star
            key={index}
            className={
              Number(row.getValue("rating")) > index
                ? ratings[Number(row.getValue("rating")) - 1].color
                : "fill-muted stroke-muted-foreground"
            }
          />
        ))}
      </div>
    ),
  },
  {
    header: "Actions",
    cell: () => (
      <div className="flejustify-start">
        <Button variant="secondary">
          Send a email <Mail className="text-indigo-400 h-5 w-5 ml-2" />{" "}
        </Button>
      </div>
    ),
  },
];
