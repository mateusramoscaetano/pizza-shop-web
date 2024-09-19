import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { NotebookText } from "lucide-react";
interface IMonthCanceledOrdersAmountProps {}

export function MonthCanceledOrdersAmount({}: IMonthCanceledOrdersAmountProps) {
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
          <span className="text-2xl font-bold tracking-tight">32</span>
          <p className="text-muted-foreground text-xs">
            <span className="text-emerald-500 dark:text-emerald-400">-2%</span>{" "}
            em relação ao mês passado
          </p>
        </CardContent>
      </Card>
    </>
  );
}
