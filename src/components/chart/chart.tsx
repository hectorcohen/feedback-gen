"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { feedbacks } from "@/db/schema";
import { Ratings } from "@/lib/chart";
import { format } from "date-fns";
import { InferSelectModel } from "drizzle-orm";
import { Kanban, TrendingUp, Flag } from "lucide-react";
import { useParams } from "next/navigation";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";
import Breadcrumbs from "../breadcrumbs";
import { chartConfig } from "./chart-config";
import { Button } from "@/components/ui/button";
import TitleComponent from "../title-component";
type Feedbacks = InferSelectModel<typeof feedbacks>;

export type FeedbacksChart = Feedbacks & { rating_key: string; fill: string };

type Props = {
  data: Ratings[];
};

const GlobalChart: React.FC<Props> = ({ data }) => {
  const { projectId } = useParams();

  return (
    <div>
      <div className="mb-2">
        <div>
          <Breadcrumbs
            data={[
              { title: "Dashboard", separator: true, navigation: "/dashboard" },
              {
                title: "Feedbacks",
                separator: true,
                navigation: `/projects/${projectId}/`,
              },
              {
                title: "Analytics",
                disabled: true,
                navigation: `/projects/${projectId}/`,
              },
            ]}
          />
        </div>
        <TitleComponent
          title="Overview"
          description="A global feedbacks chart information"
          icon={<Kanban className="w-5 h-5 text-violet-400" />}
          buttonAction={
            <Button variant="outline">
              <Flag className="w-5 h-5 text-violet-400 mr-2" /> Generate Report
            </Button>
          }
        />
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Global</CardTitle>
            <CardDescription>{format(new Date(), "yyy-MM-dd")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={data}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="rating_key"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) =>
                    chartConfig[value as keyof typeof chartConfig]?.label
                  }
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                  dataKey="count"
                  strokeWidth={2}
                  radius={8}
                  activeIndex={2}
                  activeBar={({ ...props }) => {
                    return (
                      <Rectangle
                        {...props}
                        fillOpacity={0.8}
                        stroke={props.payload.fill}
                        strokeDasharray={4}
                        strokeDashoffset={4}
                      />
                    );
                  }}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Total feedbacks from your first record{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total feedbacks.
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default GlobalChart;
