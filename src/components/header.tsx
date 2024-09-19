import { Home, Pizza, UtensilsCrossed } from "lucide-react";
import { Separator } from "./ui/separator";
import { NavLink } from "./nav-link";
import { ModeToggle } from "./theme/mode-toggle";

export function Header() {
  return (
    <>
      <div className="border-b">
        <div className="flex h-16 items-center gap-6 px-6">
          <Pizza className="size-6" />
          <Separator orientation="vertical" className="h-6" />
          <nav className="flex items-center sapce-x-4 lg:space-x-6">
            <NavLink to={"/"}>
              <Home className="size-4" />
              Início
            </NavLink>
            <NavLink to={"/orders"}>
              <UtensilsCrossed className="size-4" />
              Início
            </NavLink>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <ModeToggle />
          </div>
        </div>
      </div>
    </>
  );
}
