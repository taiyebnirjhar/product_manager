import { DefaultSession } from "next-auth";

export interface TokenPayload {
  email: string;
  iat: number;
  exp: number;
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken: string;
    refreshToken?: string; // Stored in cookies by backend
    user: TokenPayload;
    accessTokenExpires?: number;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface User extends TokenPayload {}
}

declare module "next-auth/jwt" {
  interface JWT extends TokenPayload {
    accessToken: string;
    refreshToken?: string;
    accessTokenExpires?: number;
  }
}
