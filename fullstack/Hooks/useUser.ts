import { useSession } from "next-auth/react";

export default function useUser() {
  const { data: session, status } = useSession();

  const loading = status === "loading";
  const user = session?.user;

  return {
    loading,
    user,
  };
}
