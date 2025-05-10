import { http, HttpResponse } from "msw";

import type { GetProfileResponse } from "../get-profile";

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  "/me",
  () => {
    return HttpResponse.json({
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
      role: "manager",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
);
