import { api } from "../lib/axios";

interface GetOrderOrderDetailsParams {
  orderId: string;
}

interface GetOrderDetailsResponse {
  id: string;
  createdAt: string;
  status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
  totalInCents: number;
  customer: {
    name: string;
    email: string;
    phone: string | null;
  };
  orderItems: {
    id: string;
    priceInCents: number;
    quantity: number;
    product: {
      name: string;
    };
  }[];
}
export async function getOrderDetails({ orderId }: GetOrderOrderDetailsParams) {
  const response = await api.get<GetOrderDetailsResponse>(`/orders/${orderId}`);

  return response.data;
}
