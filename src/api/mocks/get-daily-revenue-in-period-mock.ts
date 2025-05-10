import { http, HttpResponse } from "msw";

import type { IGetDailyRevenueInPeriodResponse } from "../get-daily-revenue-in-period";

export const getDailyRevenueInPeriodMock = http.get<
  never,
  never,
  IGetDailyRevenueInPeriodResponse
>("metrics/daily-receipt-in-period", () => {
  return HttpResponse.json([
    {
      date: "01/01/2024",
      receipt: 12000,
    },
    {
      date: "02/01/2024",
      receipt: 13000,
    },
    {
      date: "03/01/2024",
      receipt: 14000,
    },
    {
      date: "04/01/2024",
      receipt: 10000,
    },
    {
      date: "05/01/2024",
      receipt: 11000,
    },
    {
      date: "06/01/2024",
      receipt: 18000,
    },
    {
      date: "07/01/2024",
      receipt: 19000,
    },
  ]);
});
