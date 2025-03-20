import { useCallback } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../state/auth";

export const useLogout = () => {
  const setUser = useAtom(userAtom)[1];

  return useCallback(() => {
    setUser(null);
  }, [setUser]);
};
