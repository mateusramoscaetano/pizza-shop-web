import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { getDailyRevenueInPeriod } from "../../../api/get-daily-revenue-in-period";
import { useQuery } from "@tanstack/react-query";
import { Label } from "../../../components/ui/label";
import { DatePickerWithRange } from "../../../components/date-range-picker";
import { useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import { subDays } from "date-fns";
import { Loader2 } from "lucide-react";

interface IRevenueChartProps {}

export function RevenueChart({}: IRevenueChartProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  const { data: dailyRevenueInPeriod } = useQuery({
    queryKey: ["metrics", "daily-revenue-in-period", dateRange],
    queryFn: () =>
      getDailyRevenueInPeriod({
        from: dateRange?.from,
        to: dateRange?.to,
      }),
  });

  const chartData = useMemo(() => {
    return dailyRevenueInPeriod?.map((chartItem) => {
      return {
        date: chartItem.date,
        receipt: chartItem.receipt / 100,
      };
    });
  }, [dailyRevenueInPeriod]);

  return (
    <>
      <Card className="col-span-6">
        <CardHeader className="flex items-center flex-row space-y-0 justify-between pb-8">
          <div className="space-y-1">
            <CardTitle className="text-base font-medium">
              Receita no perído
            </CardTitle>
            <CardDescription>Receita diária no período</CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <Label>Período</Label>
            <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />
          </div>
        </CardHeader>

        <CardContent className="space-y-1">
          {dailyRevenueInPeriod ? (
            <ResponsiveContainer width={"100%"} height={240}>
              <LineChart data={chartData} style={{ fontSize: 12 }}>
                <XAxis
                  dataKey={"date"}
                  axisLine={false}
                  tickLine={false}
                  dy={16}
                ></XAxis>
                <YAxis
                  stroke="#888"
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value: number) =>
                    value.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })
                  }
                  width={80}
                />
                <CartesianGrid vertical={false} className="stroke-muted" />
                <Line
                  type={"linear"}
                  strokeWidth={2}
                  dataKey={"receipt"}
                  stroke="#8b5cf6"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <>
              <div className="flex h-60 w-full items-center justify-center">
                <Loader2 className="size-8 text-muted-foreground animate-spin" />
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
}
