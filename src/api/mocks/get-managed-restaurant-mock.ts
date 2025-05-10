import { http, HttpResponse } from "msw";

import type { GetManagedRestaurantResponse } from "../get-managed-restaurant";

export const getManagedRestaurantMock = http.get<
  never,
  never,
  GetManagedRestaurantResponse
>("/managed-restaurant", () => {
  return HttpResponse.json({
    id: "1",
    name: "Pizzaria do João",
    createdAt: new Date(),
    updatedAt: new Date(),
    description: "Melhor pizzaria da região",
    managerId: "1",
  });
});
