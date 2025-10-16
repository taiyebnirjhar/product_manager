import { useSession } from "next-auth/react";

export default function useAuth() {
  const session = useSession();
  return session;
}
