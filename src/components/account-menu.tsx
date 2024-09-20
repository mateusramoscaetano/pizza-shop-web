import { Building, ChevronDown, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/get-profile";
import { getManagedRestaurant } from "../api/get-managed-restaurant";
import { Skeleton } from "./ui/skeleton";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { StoreProfileDialog } from "./store-profile-dialog";
import { useState } from "react";
import { signOut } from "../api/sign-out";
import { useNavigate } from "react-router-dom";

export function AccountMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: Number.POSITIVE_INFINITY,
  });
  const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } =
    useQuery({
      queryKey: ["managed-restaurant"],
      queryFn: getManagedRestaurant,
      staleTime: Number.POSITIVE_INFINITY,
    });

  const { mutateAsync: signOutFn, isPending: isSigningOut } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      navigate("/sign-in", { replace: true });
    },
  });

  function handleClose() {
    setOpen(!open);
  }

  return (
    <>
      <Dialog onOpenChange={handleClose} open={open}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"outline"}
              className="flex- items-center gap-2 select-none"
            >
              {isLoadingManagedRestaurant ? (
                <Skeleton className="h-4 w-40" />
              ) : (
                managedRestaurant?.name
              )}
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="flex flex-col">
              {isLoadingProfile ? (
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              ) : (
                <>
                  <span>{profile?.name}</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    {profile?.email}
                  </span>
                </>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DialogTrigger asChild>
              <DropdownMenuItem className="cursor-pointer">
                <Building className="size-4 mr-2" />
                <span>Perfil da loja</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuItem
              asChild
              disabled={isSigningOut}
              className="text-rose-500 dark:text-rose-400 cursor-pointer"
            >
              <button
                className="w-full"
                type="button"
                onClick={() => signOutFn()}
              >
                <LogOut className="size-4 mr-2" />
                <span>{isSigningOut ? "Saindo" : "Sair"}</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <StoreProfileDialog onClose={handleClose} />
      </Dialog>
    </>
  );
}
