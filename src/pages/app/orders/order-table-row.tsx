import { ArrowRight, Search, X } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { TableCell, TableRow } from "../../../components/ui/table";
import { Dialog, DialogTrigger } from "../../../components/ui/dialog";
import { OrderDetails } from "./order-details";
import {
  OrderStatus,
  type TOrderStatus,
} from "../../../components/order-status";
import { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "../../../api/cancel-order";
import type { GetOrdersResponse } from "../../../api/get-orders";

import { approveOrder } from "../../../api/approve-order";
import { deliverOrder } from "../../../api/deliver-order";
import { dispatchOrder } from "../../../api/dispatch-order";

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

  function updateOrderStatusOnCache(orderId: string, status: TOrderStatus) {
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
            return { ...order, status };
          }

          return order;
        }),
      });
    }
  }

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
    useMutation({
      mutationFn: cancelOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, "canceled");
      },
    });
  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: approveOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, "processing");
      },
    });
  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, "delivering");
      },
    });
  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: deliverOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, "delivered");
      },
    });

  const isCancelable = ["pending", "processing"].includes(order.status);
  const buttonLabel =
    order.status === "canceled"
      ? "Cancelado"
      : isCancelingOrder
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
          {order.status === "pending" && (
            <Button
              disabled={isApprovingOrder}
              onClick={() => approveOrderFn({ orderId: order.orderId })}
              variant={"outline"}
              size={"sm"}
            >
              <ArrowRight className="size-3 mr-2" />
              Aprovar
            </Button>
          )}

          {order.status === "processing" && (
            <Button
              disabled={isDispatchingOrder}
              onClick={() => dispatchOrderFn({ orderId: order.orderId })}
              variant={"outline"}
              size={"sm"}
            >
              <ArrowRight className="size-3 mr-2" />
              Em entrega
            </Button>
          )}

          {order.status === "delivering" && (
            <Button
              disabled={isDeliveringOrder}
              onClick={() => deliverOrderFn({ orderId: order.orderId })}
              variant={"outline"}
              size={"sm"}
            >
              <ArrowRight className="size-3 mr-2" />
              Entregue
            </Button>
          )}
        </TableCell>
        <TableCell>
          <Button
            onClick={() => cancelOrderFn({ orderId: order.orderId })}
            disabled={!isCancelable || isCancelingOrder}
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
