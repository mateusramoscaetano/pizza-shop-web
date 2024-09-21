import { useQuery } from "@tanstack/react-query";
import { getMonthOrderAmount } from "../../../../api/get-month-orders-amount";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Utensils } from "lucide-react";
import { MetricCardSkeleton } from "./metric-card-skeleton";

export function MonthOrdersAmount() {
  const { data: monthOrdersAmount } = useQuery({
    queryKey: ["metrics", "month-orders-amount"],
    queryFn: getMonthOrderAmount,
  });
  return (
    <>
      <Card>
        <CardHeader className="flex items-center flex-row space-y-0 justify-between pb-2">
          <CardTitle className="text-base font-semibold">
            Pedidos (mês)
          </CardTitle>
          <Utensils className="text-muted-foreground size-4" />
        </CardHeader>
        <CardContent className="space-y-1">
          {monthOrdersAmount ? (
            <>
              <span className="text-2xl font-bold tracking-tight">
                {monthOrdersAmount.amount}
              </span>
              <p className="text-muted-foreground text-xs">
                {monthOrdersAmount.diffFromLastMonth >= 0 ? (
                  <>
                    <span className="text-emerald-500 dark:text-emerald-400">
                      +{monthOrdersAmount.diffFromLastMonth}%
                    </span>{" "}
                    em relação ao mês passado
                  </>
                ) : (
                  <>
                    <span className="text-rose-500 dark:text-rose-400">
                      {monthOrdersAmount.diffFromLastMonth}%
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
