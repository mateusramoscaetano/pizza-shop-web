import { Helmet } from "react-helmet-async";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface ISignInProps {}

const signInForm = z.object({
  email: z.string().email(),
});

type SignInForm = z.infer<typeof signInForm>;

export function SignIn({}: ISignInProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>();

  async function handleSignIn(values: SignInForm) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Enviamos um link de autenticação no seu e-mail.", {
        action: {
          label: "Reenviar",
          onClick: () => handleSignIn(values),
        },
      });
    } catch (error) {
      toast.error("Credenciais inválidas.");
    }
  }
  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <Button variant={"ghost"} asChild className="absolute right-8 top-8">
          <Link to={"/sign-up"}>Novo Estabelecimento</Link>
        </Button>
        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-3 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro!
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleSignIn)}
            className="flex flex-col space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input type="email" id="email" {...register("email")} />
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Acessar Painel
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
