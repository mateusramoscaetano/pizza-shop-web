import { Helmet } from "react-helmet-async";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

interface ISignUpProps {}

const signUpForm = z.object({
  restaurantName: z.string().email(),
  managerName: z.string().email(),
  phone: z.string().email(),
  email: z.string().email(),
});

type SignUpForm = z.infer<typeof signUpForm>;

export function SignUp({}: ISignUpProps) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>();

  async function handleSignUp(values: SignUpForm) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Restaurante cadastrado com sucesso.", {
        action: {
          label: "Login",
          onClick: () => navigate("/sign-in"),
        },
      });
    } catch (error) {
      toast.error("Erro ao cadastrar o restaurante.");
    }
  }
  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8">
        <Button variant={"ghost"} asChild className="absolute right-8 top-8">
          <Link to={"/sign-in"}>Fazer login</Link>
        </Button>
        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-3 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas!
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleSignUp)}
            className="flex flex-col space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome do Estabelecimento</Label>
              <Input
                type="text"
                id="restaurantName"
                {...register("restaurantName")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="managerName">Seu nome</Label>
              <Input
                type="text"
                id="managerName"
                {...register("managerName")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input type="email" id="email" {...register("email")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Seu celular</Label>
              <Input type="tel" id="phone" {...register("phone")} />
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Finalizar cadastro
            </Button>

            <p className="p-x-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos{" "}
              <a className="underline underline-offset-4" href="">
                termos de serviço
              </a>{" "}
              e{" "}
              <a className="underline underline-offset-4" href="">
                políticas de privacidade
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
