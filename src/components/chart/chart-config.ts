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

export const chartData = [
  { browser: "great", visitors: 187, fill: "#059669" },
  { browser: "good", visitors: 200, fill: "#34D399" },
  { browser: "medium", visitors: 275, fill: "#F59E0B" },
  { browser: "low", visitors: 173, fill: "#FCD34D" },
  { browser: "bad", visitors: 90, fill: "#EF4444" },
];
