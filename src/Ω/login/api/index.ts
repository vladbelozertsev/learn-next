"use client";

import type { UserAPI } from "@/libs/types/user-api";
import { serverLogin } from "./server-login";
import { serverLoginGoogle } from "./server-login-google";
import { tokenAtom, userAtom } from "@/libs/state/auth";
import { useAtom } from "jotai";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export type LoginInput = {
  email: string;
  password: string;
};

export type LoginResult = {
  user: UserAPI;
  accessToken: string;
};

export const useLogin = () => {
  const setUser = useAtom(userAtom)[1];
  const setToken = useAtom(tokenAtom)[1];

  return useMutation({
    mutationFn: async (input: LoginInput) => {
      const result = await serverLogin(input);
      if (result?.user) setUser(result.user);
      if (result?.accessToken) setToken({ jwt: result.accessToken, exp: 1111 });
      return result;
    },
  });
};

export const useLoginGoogle = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const data = await serverLoginGoogle();
      if (data?.url) router.push(data.url);
    },
  });
};
