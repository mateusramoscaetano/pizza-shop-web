import type { SignInForm } from "@/pages/auth/sign-in";
import { http, HttpResponse } from "msw";

export const signInMock = http.post<never, SignInForm>(
  "/authenticate",
  async ({ request }) => {
    const { email } = await request.json();

    if (email === "diego.schell.f@gmail.com") {
      return new HttpResponse(null, {
        status: 200,
        headers: {
          "Set-Cookie": "auth=sample-jwt",
        },
      });
    }

    return new HttpResponse(null, {
      status: 401,
    });
  }
);
