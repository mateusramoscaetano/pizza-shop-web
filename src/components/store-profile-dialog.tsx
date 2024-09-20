import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getManagedRestaurant,
  type GetManagedRestaurantResponse,
} from "../api/get-managed-restaurant";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfile } from "../api/update-profile";
import { toast } from "sonner";

interface IStoreProfileDialogProps {
  onClose: () => void;
}

const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
});

type StoreProfileSchema = z.infer<typeof storeProfileSchema>;

export function StoreProfileDialog({ onClose }: IStoreProfileDialogProps) {
  const queryClient = useQueryClient();

  const { data: managedRestaurant } = useQuery({
    queryKey: ["managed-restaurant"],
    queryFn: getManagedRestaurant,
    staleTime: Number.POSITIVE_INFINITY,
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managedRestaurant?.name ?? "",
      description: managedRestaurant?.description ?? "",
    },
  });

  function updateManagedrestaurantCache({
    name,
    description,
  }: StoreProfileSchema) {
    const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
      "managed-restaurant",
    ]);

    if (cached) {
      queryClient.setQueryData<GetManagedRestaurantResponse>(
        ["managed-restaurant"],
        {
          ...cached,
          name,
          description,
        }
      );
    }

    return { cached };
  }

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate({ name, description }) {
      const { cached } = updateManagedrestaurantCache({ name, description });

      return { previousProfile: cached };
    },
    onError(_, __, context) {
      if (context?.previousProfile) {
        updateManagedrestaurantCache(context.previousProfile);
      }
    },
  });

  async function handleUpdateProfile(values: StoreProfileSchema) {
    try {
      await updateProfileFn({
        name: values.name,
        description: values.description,
      });

      onClose();

      toast.success("Perfil atualizado com sucesso.");
    } catch (error) {
      toast.error("Erro ao atualizar o perfil.");
    }
  }

  return (
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Perfil da loja</DialogTitle>
          <DialogDescription>
            Atualize as informações do seu estabelecimento visíveis ao seu
            cliente
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleUpdateProfile)}>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input {...register("name")} className="col-span-3" id="name" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descrição
              </Label>
              <Textarea
                {...register("description")}
                className="col-span-3 min-h-[80px]"
                id="description"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant={"ghost"}>
                Cancelar
              </Button>
            </DialogClose>
            <Button variant={"success"} disabled={isSubmitting}>
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </>
  );
}
