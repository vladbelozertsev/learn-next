"use client";

import { Login } from "@/Ω/login";
import { isAuthAtom, isUserLoadingAtom } from "@/libs/state/auth";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PageLogin() {
  const isLoading = useAtom(isUserLoadingAtom)[0];
  const isAuth = useAtom(isAuthAtom)[0];
  const router = useRouter();

  useEffect(() => {
    if (isAuth) router.push("http://localhost:3001/");
  }, [isAuth, router]);

  if (isLoading) return "...Loading";
  if (isAuth) return null;
  return <Login />;
}
