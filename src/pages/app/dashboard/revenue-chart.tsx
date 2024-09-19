import {
  CartesianAxis,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
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

interface IRevenueChartProps {}

const data = [
  { date: "10/12", revenue: 1200 },
  { date: "11/12", revenue: 1350 },
  { date: "12/12", revenue: 1100 },
  { date: "13/12", revenue: 1450 },
  { date: "14/12", revenue: 1250 },
  { date: "15/12", revenue: 1300 },
  { date: "16/12", revenue: 1400 },
];

export function RevenueChart({}: IRevenueChartProps) {
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
        </CardHeader>
        <CardContent className="space-y-1">
          <ResponsiveContainer width={"100%"} height={240}>
            <LineChart data={data} style={{ fontSize: 12 }}>
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
                dataKey={"revenue"}
                stroke="#8b5cf6"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );
}
