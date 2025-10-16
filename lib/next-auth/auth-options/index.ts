/* eslint-disable @typescript-eslint/no-explicit-any */
import { loginWithCredential } from "@/actions/auth-actions";
import { envConfig } from "@/config/env-config";
import { login_credential } from "@/constants/credential-id";
import { jwtDecode } from "jwt-decode";
import { AuthOptions, CallbacksOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Provider } from "next-auth/providers/index";

export interface ILoginCredentials {
  email: string;
}

const providers: Provider[] = [
  CredentialsProvider({
    id: login_credential,
    name: "Credentials",
    type: "credentials",
    credentials: {},
    authorize: async (credentials: any) => {
      try {
        const { email } = credentials as ILoginCredentials;

        if (!email) {
          throw new Error("Please enter phone and password");
        }

        const { data } = await loginWithCredential({ email });

        // console.log(data, "data -> loginWithCredential");

        if (!data?.token) {
          throw new Error(data?.message || "Login failed");
        }

        console.log(data.token);

        const decoded: any = jwtDecode(data.token);

        console.log(decoded);

        return {
          ...decoded,
          accessToken: data.token,
          accessTokenExpires: decoded.exp,
        };
      } catch (error: any) {
        throw new Error(error?.message || "Something went wrong during login");
      }
    },
  }),
];

const callbacks: Partial<CallbacksOptions> = {
  // jwt: async ({ token, account, user }: any) => {
  //   // First time JWT callback is run, `account` and `user` are available
  //   if (account && user) {
  //     return {
  //       ...token,
  //       user,
  //       accessToken: user.accessToken,
  //       accessTokenExpires: user.accessTokenExpires,
  //     };
  //   }
  //   // No refresh — if expired, force re-login
  //   const isExpired = token.accessTokenExpires
  //     ? Date.now() / 1000 >= token.accessTokenExpires
  //     : true;
  //   if (isExpired) {
  //     console.log("Access token expired — requiring re-login");
  //     return null;
  //   }
  //   return token;
  // },
  // redirect: async ({ url }) => {
  //   const baseUrl = envConfig.siteUrl;
  //   // Allows relative callback URLs
  //   if (url.startsWith("/")) return `${baseUrl}${url}`;
  //   // Allows callback URLs on the same origin
  //   else if (new URL(url).origin === baseUrl) return url;
  //   return baseUrl;
  // },
  // session: async ({ session, token }: any) => {
  //   if (token?.accessToken) {
  //     session.accessToken = token.accessToken;
  //     session.user = token.user;
  //   }
  //   return session;
  // },
};

export const authOptions: AuthOptions = {
  providers,
  callbacks,
  pages: { signIn: "/login", signOut: "*", error: "/" },
  secret: envConfig.jwt.secret,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 day
  },
};

export default authOptions;
