"use client";

import { Home } from "@/Ω/home";
import { Login } from "@/Ω/login";
import { auth } from "./_app/auth";
import { tokenAtom, userAtom } from "@/libs/state/auth";
import { useAtom } from "jotai";
import { useQuery } from "@tanstack/react-query";

export default function App() {
  const [user, setUser] = useAtom(userAtom);
  const setToken = useAtom(tokenAtom)[1];

  useQuery({
    queryKey: ["APP_AUTH_FLOW"],
    enabled: !user,
    queryFn: async () => {
      const res = await auth();
      setToken(res?.accessToken || "");
      setUser(res?.user || null);
      return res;
    },
  });

  if (user === undefined) return "...Loading";
  if (user === null) return <Login />;
  if (user) return <Home />;
}
