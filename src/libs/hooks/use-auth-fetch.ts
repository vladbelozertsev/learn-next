import { tokenAtom } from "../state/auth";
import { useAtom } from "jotai";
import { useCallback } from "react";

export const useAuthFetch = () => {
  const [token, setToken] = useAtom(tokenAtom);

  return useCallback(
    async <T1>(input: string | URL | globalThis.Request, init?: RequestInit): Promise<{ json: T1; res: Response }> => {
      const handleRes = async <T2>(res: Response) => {
        if (res.ok) {
          const json = (await res.json()) as T2;
          return { res, json, err: null };
        }

        return res.text().then((err?: unknown) => {
          const isErrMsg = typeof err === "string";
          const msg = isErrMsg ? err : "Internal server error";
          return { res, json: null, err: msg };
        });
      };

      const refreshToken = async () => {
        const res = await fetch("http://localhost:3000/api/refresh/web", { credentials: "include" }).then(handleRes);
        if (res.err) throw new Error(res.err);
        return res.json as { accessToken: string };
      };

      if (token && token.exp - 30 < Math.round(Date.now() / 1000)) {
        const { accessToken } = await refreshToken();
        const headers = { Authorization: `Bearer ${accessToken}`, ...init?.headers };
        const res = await fetch(input, { ...init, headers });
      }
    },
    [token, setToken]
  );
};
