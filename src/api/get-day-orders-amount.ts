import { api } from "../lib/axios";

export interface IGetDayOrderAmountResponse {
  amount: number;
  diffFromYesterday: number;
}

export async function getDayOrderAmount() {
  const response = await api.get<IGetDayOrderAmountResponse>(
    "/metrics/day-orders-amount"
  );

  return response.data;
}
