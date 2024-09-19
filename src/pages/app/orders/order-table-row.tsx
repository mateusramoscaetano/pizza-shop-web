import { ArrowRight, Search, X } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { TableCell, TableRow } from "../../../components/ui/table";
import { Dialog, DialogTrigger } from "../../../components/ui/dialog";
import { OrderDetails } from "./order-details";

interface IOrderTableRowProps {}

export function OrderTableRow({}: IOrderTableRowProps) {
  return (
    <>
      <TableRow>
        <TableCell>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"outline"} size={"sm"}>
                <Search className="size-3" />
                <span className="sr-only">Detalhes do pedido</span>
              </Button>
            </DialogTrigger>
            <OrderDetails />
          </Dialog>
        </TableCell>
        <TableCell className="font-mono text-xs font-medium">
          dsa45d4as54das
        </TableCell>
        <TableCell className="text-muted-foreground">há 15 minutos</TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-slate-400" />
            <span className="font-medium text-muted-foreground">Pendente</span>
          </div>
        </TableCell>
        <TableCell className="font-medium">Mateus Ramos Caetano</TableCell>
        <TableCell className="font-medium">R$ 149.90</TableCell>
        <TableCell>
          <Button variant={"outline"} size={"sm"}>
            <ArrowRight className="size-3 mr-2" />
            Aprovar
          </Button>
        </TableCell>
        <TableCell>
          <Button variant={"ghost"} size={"sm"}>
            <X className="size-3 mr-2" />
            Cancelar
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}
