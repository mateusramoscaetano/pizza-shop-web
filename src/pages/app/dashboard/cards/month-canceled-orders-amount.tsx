import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { NotebookText } from "lucide-react";
import { getMonthCanceledOrdersAmount } from "../../../../api/get-month-canceled-orders-amount";
import { MetricCardSkeleton } from "./metric-card-skeleton";
interface IMonthCanceledOrdersAmountProps {}

export function MonthCanceledOrdersAmount({}: IMonthCanceledOrdersAmountProps) {
  const { data: monthCanceledOrdersAmount } = useQuery({
    queryKey: ["metrics", "month-canceled-orders-amount"],
    queryFn: getMonthCanceledOrdersAmount,
  });

  return (
    <>
      <Card>
        <CardHeader className="flex items-center flex-row space-y-0 justify-between pb-2">
          <CardTitle className="text-base font-semibold">
            Cancelamentos (mês)
          </CardTitle>
          <NotebookText className="text-muted-foreground size-4" />
        </CardHeader>
        <CardContent className="space-y-1">
          {monthCanceledOrdersAmount ? (
            <>
              <span className="text-2xl font-bold tracking-tight">
                {monthCanceledOrdersAmount.amount}
              </span>
              <p className="text-muted-foreground text-xs">
                {monthCanceledOrdersAmount.diffFromLastMonth >= 0 ? (
                  <>
                    <span className="text-emerald-500 dark:text-emerald-400">
                      +{monthCanceledOrdersAmount.diffFromLastMonth}%
                    </span>{" "}
                    em relação ao mês passado
                  </>
                ) : (
                  <>
                    <span className="text-rose-500 dark:text-rose-400">
                      {monthCanceledOrdersAmount.diffFromLastMonth}%
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
