import { api } from "../lib/axios";

interface SigInBody {
  email: string;
}

export async function signIn({ email }: SigInBody) {
  await api.post("/authenticate", { email });
}
