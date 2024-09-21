import { api } from "../lib/axios";

export interface IGetMonthOrderAmountResponse {
  amount: number;
  diffFromLastMonth: number;
}

export async function getMonthOrderAmount() {
  const response = await api.get<IGetMonthOrderAmountResponse>(
    "/metrics/month-orders-amount"
  );

  return response.data;
}
