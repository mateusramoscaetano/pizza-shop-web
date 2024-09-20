import { ArrowRight, Search, X } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { TableCell, TableRow } from "../../../components/ui/table";
import { Dialog, DialogTrigger } from "../../../components/ui/dialog";
import { OrderDetails } from "./order-details";
import { OrderStatus } from "../../../components/order-status";

import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.locale("pt-br");
dayjs.extend(relativeTime);

export interface IOrderTableRowProps {
  order: {
    orderId: string;
    createdAt: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  };
}

export function OrderTableRow({ order }: IOrderTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  function handleOrderDetails() {
    setSearchParams((state) => {
      state.set("orderId", order.orderId);

      return state;
    });
  }

  return (
    <>
      <TableRow>
        <TableCell>
          <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
            <DialogTrigger asChild>
              <Button variant={"outline"} size={"sm"}>
                <Search className="size-3" />
                <span className="sr-only">Detalhes do pedido</span>
              </Button>
            </DialogTrigger>
            <OrderDetails open={isDetailsOpen} orderId={order.orderId} />
          </Dialog>
        </TableCell>
        <TableCell className="font-mono text-xs font-medium">
          {order.orderId}
        </TableCell>
        <TableCell className="text-muted-foreground">
          {dayjs(order.createdAt).fromNow()}
        </TableCell>
        <TableCell>
          <OrderStatus status={order.status} />
        </TableCell>
        <TableCell className="font-medium">{order.customerName}</TableCell>
        <TableCell className="font-medium">
          {(order.total / 100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </TableCell>
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
