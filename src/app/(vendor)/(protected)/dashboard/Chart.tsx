"use client";

import { Area, AreaChart, CartesianGrid } from "recharts";

import { type ChartConfig, ChartContainer } from "~/components/ui/chart";

const chartConfig = {
  cd: {
    label: "Chart Data",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function Chart({
  chartColor,
  chartData,
}: {
  chartColor: string;
  chartData: { date: string; cd: number }[];
}) {
  return (
    <ChartContainer className="h-10 w-full" config={chartConfig}>
      <AreaChart
        accessibilityLayer
        height={50}
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />

        <Area
          dataKey="cd"
          type="linear"
          fill={chartColor}
          fillOpacity={0.4}
          stroke={chartColor}
        />
      </AreaChart>
    </ChartContainer>
  );
}
