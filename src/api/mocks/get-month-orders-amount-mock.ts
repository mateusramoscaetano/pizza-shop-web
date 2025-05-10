import { http, HttpResponse } from "msw";

import type { IGetMonthOrderAmountResponse } from "../get-month-orders-amount";

export const getMonthOrdersAmountMock = http.get<
  never,
  never,
  IGetMonthOrderAmountResponse
>("/metrics/month-orders-amount", () => {
  return HttpResponse.json({
    amount: 1000,
    diffFromLastMonth: 80,
  });
});
