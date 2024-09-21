import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Utensils } from "lucide-react";
import { getDayOrderAmount } from "../../../../api/get-day-orders-amount";
import { MetricCardSkeleton } from "./metric-card-skeleton";

export function DayOrdersAmount() {
  const { data: dayOrdersAmount } = useQuery({
    queryKey: ["metrics", "day-orders-amount"],
    queryFn: getDayOrderAmount,
  });

  return (
    <>
      <Card>
        <CardHeader className="flex items-center flex-row space-y-0 justify-between pb-2">
          <CardTitle className="text-base font-semibold">
            Pedidos (dia)
          </CardTitle>
          <Utensils className="text-muted-foreground size-4" />
        </CardHeader>
        <CardContent className="space-y-1">
          {dayOrdersAmount ? (
            <>
              <span className="text-2xl font-bold tracking-tight">
                {dayOrdersAmount.amount}
              </span>
              <p className="text-muted-foreground text-xs">
                {dayOrdersAmount.diffFromYesterday >= 0 ? (
                  <>
                    <span className="text-emerald-500 dark:text-emerald-400">
                      +{dayOrdersAmount.diffFromYesterday}%
                    </span>{" "}
                    em relação a ontem
                  </>
                ) : (
                  <>
                    <span className="text-rose-500 dark:text-rose-400">
                      {dayOrdersAmount.diffFromYesterday}%
                    </span>{" "}
                    em relação a ontem
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
