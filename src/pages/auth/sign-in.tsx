import { Helmet } from "react-helmet-async";

interface ISignInProps {}

export function SignIn({}: ISignInProps) {
  return (
    <>
      <Helmet title="Login" />
      <h1>sign-in</h1>
    </>
  );
}
