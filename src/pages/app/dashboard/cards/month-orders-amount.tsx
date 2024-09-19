import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Utensils } from "lucide-react";
interface IMonthOrdersAmountProps {}

export function MonthOrdersAmount({}: IMonthOrdersAmountProps) {
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
          <span className="text-2xl font-bold tracking-tight">246</span>
          <p className="text-muted-foreground text-xs">
            <span className="text-emerald-500 dark:text-emerald-400">+6%</span>{" "}
            em relação ao mês passado
          </p>
        </CardContent>
      </Card>
    </>
  );
}
