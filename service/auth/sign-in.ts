import { login_credential } from "@/constants/credential-id";
import { signIn as nextAuthSignIn } from "next-auth/react";

export const signIn = async ({
  phone,
  password,
}: {
  phone: string;
  password: string;
}) => {
  return await nextAuthSignIn(login_credential, {
    phone: phone,
    password: password,
    redirect: false,
  });
};
