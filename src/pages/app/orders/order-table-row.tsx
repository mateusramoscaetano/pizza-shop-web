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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "../../../api/cancel-order";
import type { GetOrdersResponse } from "../../../api/get-orders";

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
  const queryClient = useQueryClient();

  const { mutateAsync: cancelOrderFn, isPending: isPendingCancelOrder } =
    useMutation({
      mutationFn: cancelOrder,
      async onSuccess(_, { orderId }) {
        const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
          queryKey: ["orders"],
        });

        for (let i = 0; i < ordersListCache.length; i++) {
          const [cacheKey, cacheData] = ordersListCache[i];

          if (!cacheData) {
            continue;
          }

          queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
            ...cacheData,
            orders: cacheData.orders.map((order) => {
              if (order.orderId === orderId) {
                return { ...order, status: "canceled" };
              }

              return order;
            }),
          });
        }
      },
    });

  const isCancelable = ["pending", "processing"].includes(order.status);
  const buttonLabel =
    order.status === "canceled"
      ? "Cancelado"
      : isPendingCancelOrder
      ? "Cancelando"
      : "Cancelar";

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
          <Button
            onClick={() => cancelOrderFn({ orderId: order.orderId })}
            disabled={!isCancelable || isPendingCancelOrder}
            variant={"ghost"}
            size={"sm"}
          >
            <X className="size-3 mr-2" />
            {buttonLabel}
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}
