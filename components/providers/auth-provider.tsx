"use client";

import { Session as NextAuthSession } from "next-auth";
import { ReactNode } from "react";

import { SessionProvider } from "next-auth/react";
const AuthProvider = ({
  children,
  session,
}: {
  children: ReactNode;
  session: NextAuthSession;
}) => {
  return (
    <>
      <SessionProvider session={session}>{children}</SessionProvider>
    </>
  );
};

export default AuthProvider;
