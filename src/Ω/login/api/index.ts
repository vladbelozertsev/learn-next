import type { UserAPI } from "@/libs/types/user-api";
import { tokenAtom, userAtom } from "@/libs/state/auth";
import { serverLogin } from "./server-login";
import { useAtom } from "jotai";
import { useMutation } from "@tanstack/react-query";

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
      if (result?.accessToken) setToken(result.accessToken);
      return result;
    },
  });
};
