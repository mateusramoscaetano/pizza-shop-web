import { render } from "@testing-library/react";
import { NavLink } from "./nav-link";
import { MemoryRouter } from "react-router-dom";

describe("NavLink", () => {
  it("should highlight the nav link when is the current page", () => {
    const wrappers = render(
      <>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </>,
      {
        wrapper: ({ children }) => {
          return (
            <MemoryRouter initialEntries={["/about"]}>{children}</MemoryRouter>
          );
        },
      }
    );
    expect(wrappers.getByText("About").dataset.current).toEqual("true");
    expect(wrappers.getByText("Home").dataset.current).toEqual("false");
  });
});
