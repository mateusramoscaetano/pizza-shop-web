import { http, HttpResponse } from "msw";
import type {
  GetOrderDetailsResponse,
  GetOrderOrderDetailsParams,
} from "../get-orders-details";

export const getOrderDetailMock = http.get<
  GetOrderOrderDetailsParams,
  never,
  GetOrderDetailsResponse
>("/orders/:orderId", async ({ params }) => {
  const { orderId } = params;

  return HttpResponse.json<GetOrderDetailsResponse>({
    id: orderId,
    createdAt: new Date().toISOString(),
    status: "pending",
    totalInCents: 24000,
    customer: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
    },
    orderItems: [
      {
        id: "1",
        priceInCents: 10000,
        quantity: 1,
        product: {
          name: "Product 1",
        },
      },
      {
        id: "2",
        priceInCents: 14000,
        quantity: 1,
        product: {
          name: "Product 2",
        },
      },
    ],
  });
});
