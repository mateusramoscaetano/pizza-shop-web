import { http, HttpResponse } from "msw";

import type { GetPopularProductsResponse } from "../get-popular-products";

export const getPopularProductsMock = http.get<
  never,
  never,
  GetPopularProductsResponse
>("metrics/popular-products", () => {
  return HttpResponse.json([
    {
      product: "Pepperoni",
      amount: 100,
    },
    {
      product: "Margherita",
      amount: 50,
    },
    {
      product: "Calabresa",
      amount: 30,
    },
    {
      product: "Frango com Catupiry",
      amount: 20,
    },
    {
      product: "Portuguesa",
      amount: 15,
    },
  ]);
});
