import { render } from "@testing-library/react";
import { SignIn } from "./sign-in";
import { MemoryRouter } from "react-router-dom";
import { queryClient } from "@/lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";

describe("SignIn", () => {
  it("should set default email input value if email is present on search params", () => {
    const wrappers = render(<SignIn />, {
      wrapper: ({ children }) => {
        return (
          <HelmetProvider>
            <MemoryRouter initialEntries={["/sign-in?email=test@test.com"]}>
              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>
            </MemoryRouter>
          </HelmetProvider>
        );
      },
    });

    const emailInput = wrappers.getByLabelText(
      "Seu e-mail"
    ) as HTMLInputElement;
    expect(emailInput.value).toEqual("test@test.com");
  });
});
