import { useQuery } from "@tanstack/react-query";
import { getMonthRevenue } from "../../../../api/get-month-revenue";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { DollarSign } from "lucide-react";
import { MetricCardSkeleton } from "./metric-card-skeleton";
interface IMonthRevenueProps {}

export function MonthRevenue({}: IMonthRevenueProps) {
  const { data: monthRevenueFn } = useQuery({
    queryKey: ["metrics", "month-orders-revenue"],
    queryFn: getMonthRevenue,
  });
  return (
    <>
      <Card>
        <CardHeader className="flex items-center flex-row space-y-0 justify-between pb-2">
          <CardTitle className="text-base font-semibold">
            Receita Total (mês)
          </CardTitle>
          <DollarSign className="text-muted-foreground size-4" />
        </CardHeader>
        <CardContent className="space-y-1">
          {monthRevenueFn ? (
            <>
              <span className="text-2xl font-bold tracking-tight">
                {(monthRevenueFn.receipt / 100).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
              <p className="text-muted-foreground text-xs">
                {monthRevenueFn.diffFromLastMonth >= 0 ? (
                  <>
                    <span className="text-emerald-500 dark:text-emerald-400">
                      +{monthRevenueFn.diffFromLastMonth}%
                    </span>{" "}
                    em relação ao mês passado
                  </>
                ) : (
                  <>
                    <span className="text-rose-500 dark:text-rose-400">
                      {monthRevenueFn.diffFromLastMonth}%
                    </span>{" "}
                    em relação ao mês passado
                  </>
                )}
              </p>
            </>
          ) : (
            <MetricCardSkeleton />
          )}
        </CardContent>
      </Card>
    </>
  );
}
