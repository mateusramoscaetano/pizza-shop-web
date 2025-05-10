import { http, HttpResponse } from "msw";

import type { IGetMonthCanceledOrdersAmountResponse } from "../get-month-canceled-orders-amount";

export const getMonthCanceledOrdersMock = http.get<
  never,
  never,
  IGetMonthCanceledOrdersAmountResponse
>("/metrics/month-canceled-orders-amount", () => {
  return HttpResponse.json({
    amount: 5,
    diffFromLastMonth: 1,
  });
});
