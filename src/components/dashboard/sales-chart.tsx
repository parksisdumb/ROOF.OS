'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartTooltipContent,
  ChartTooltip,
  ChartContainer,
} from '@/components/ui/chart';


const chartData = [
  { month: 'Jan', revenue: 18600 },
  { month: 'Feb', revenue: 30500 },
  { month: 'Mar', revenue: 23700 },
  { month: 'Apr', revenue: 7300 },
  { month: 'May', revenue: 20900 },
  { month: 'Jun', revenue: 21400 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
}

export function SalesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
        <CardDescription>Revenue by month for the last 6 months.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                    <XAxis
                    dataKey="month"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    />
                    <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value / 1000}k`}
                    />
                    <Tooltip
                        cursor={{ fill: 'hsla(var(--primary), 0.1)' }}
                        content={<ChartTooltipContent formatter={(value) => `$${Number(value).toLocaleString()}`} />}
                    />
                    <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
      </CardContent>