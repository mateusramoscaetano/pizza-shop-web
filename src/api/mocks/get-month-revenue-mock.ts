import { http, HttpResponse } from "msw";

import type { IGetMonthRevenueResponse } from "../get-month-revenue";

export const getMonthRevenueMock = http.get<
  never,
  never,
  IGetMonthRevenueResponse
>("metrics/month-receipt", () => {
  return HttpResponse.json({
    receipt: 12000,
    diffFromLastMonth: 10,
  });
});
