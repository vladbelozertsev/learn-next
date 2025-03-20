import { useCallback } from "react";
import { useLogout } from "./use-logout";
import { toast } from "react-hot-toast";

export const useOnQueryError = (dontShowErr?: boolean) => {
  const logout = useLogout();

  return useCallback(
    (err?: unknown) => {
      const isErr = err instanceof Error;
      const msg = isErr && err.message;
      if (!dontShowErr && msg) toast.error(err.message);
    },
    [dontShowErr, logout]
  );
};
