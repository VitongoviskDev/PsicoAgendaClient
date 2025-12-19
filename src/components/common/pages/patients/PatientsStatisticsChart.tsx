"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Card, CardContent, CardTitle } from "../../../ui/card"

const chartConfig = {
  current: {
    label: "Atual",
    color: "#2563eb",
  },
  gained: {
    label: "Novos",
    color: "rgb(16, 185, 129)",
  },
  lost: {
    label: "Perdidos",
    color: "rgb(239, 68, 68)",
  },
} satisfies ChartConfig

const chartData = [
  { month: "Janeiro", current: 45, gained: 8, lost: 3 },
  { month: "Fevereiro", current: 50, gained: 7, lost: 2 },
  { month: "Março", current: 52, gained: 5, lost: 3 },
  { month: "Abril", current: 48, gained: 3, lost: 7 },
  { month: "Maio", current: 55, gained: 9, lost: 2 },
  { month: "Junho", current: 58, gained: 6, lost: 3 },
]

export type BarChartDataType<TData> = TData;

const PatientsStatisticsChart = () => {
  return (
    <Card className="p-6 w-full ">
      <CardTitle>Estatísticas dos Pacientes</CardTitle>
      <CardContent className="px-0">
        <ChartContainer config={chartConfig} className="min-h-[200px] -ml-8">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <YAxis
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="current" fill="var(--color-current)" radius={4} />
            <Bar dataKey="gained" fill="var(--color-gained)" radius={4} />
            <Bar dataKey="lost" fill="var(--color-lost)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default PatientsStatisticsChart;