import { http, HttpResponse } from "msw";
import { IGetDayOrderAmountResponse } from "../get-day-orders-amount";

export const getDayOrdersAmountMock = http.get<
  never,
  never,
  IGetDayOrderAmountResponse
>("/metrics/day-orders-amount", () => {
  return HttpResponse.json({
    amount: 100,
    diffFromYesterday: 10,
  });
});
