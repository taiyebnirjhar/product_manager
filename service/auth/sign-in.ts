import { login_credential } from "@/constants/credential-id";
import { signIn as nextAuthSignIn } from "next-auth/react";

export const signIn = async ({ email }: { email: string }) => {
  return await nextAuthSignIn(login_credential, {
    email,
    redirect: false,
  });
};
