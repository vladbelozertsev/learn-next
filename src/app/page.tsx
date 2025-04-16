"use client";

import { Home } from "@/Ω/home";
import { isAuthAtom, isUserLoadingAtom } from "@/libs/state/auth";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function App() {
  const isLoading = useAtom(isUserLoadingAtom)[0];
  const isAuth = useAtom(isAuthAtom)[0];
  const router = useRouter();

  useEffect(() => {
    if (isLoading || isAuth) return;
    router.push("http://localhost:3001/login");
  }, [isLoading, isAuth, router]);

  if (isLoading) return "...Loading";
  return <Home />;
}
