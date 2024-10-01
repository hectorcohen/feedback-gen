import { ChartConfig } from "@/components/ui/chart";

export const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  great: {
    label: "Great",
    color: "hsl(var(--chart-1))",
  },
  good: {
    label: "Good",
    color: "hsl(var(--chart-2))",
  },
  medium: {
    label: "Medium",
    color: "hsl(var(--chart-3))",
  },
  low: {
    label: "Low",
    color: "hsl(var(--chart-4))",
  },
  bad: {
    label: "Bad",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;