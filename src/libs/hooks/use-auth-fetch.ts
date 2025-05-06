import { jwtDecode } from "jwt-decode";
import { tokenAtom } from "../state/auth";
import { useAtom } from "jotai";
import { useCallback } from "react";

export const useAuthFetch = () => {
  const [token, setToken] = useAtom(tokenAtom);

  return useCallback(
    async <T>(input: string | URL | globalThis.Request, init?: RequestInit): Promise<{ data?: T; res: Response }> => {
      const handleRes = async (res: Response) => {
        if (res.ok) {
          const json = await res.json().then((r) => r?.data || r);
          return { data: json?.data || json || undefined, res, err: null };
        }

        return res.text().then((err?: unknown) => {
          const isErrMsg = typeof err === "string" && err !== "";
          const msg = isErrMsg ? err : "Internal server error";
          return { data: undefined, res, err: msg };
        });
      };

      const refreshToken = async () => {
        const res = await fetch("http://localhost:3000/api/refresh/web", { credentials: "include" }).then(handleRes);
        if (res.err) throw new Error(res.err);
        return res.data as { accessToken: string };
      };

      const fetchWithRefresh = async () => {
        const refreshedToken = await refreshToken();
        const exp = jwtDecode(refreshedToken.accessToken).exp;
        if (!exp) throw new Error("No token exp (auth fetch)");
        const headers = { Authorization: `Bearer ${refreshedToken.accessToken}`, ...init?.headers };
        const res = await fetch(input, { ...init, headers }).then(handleRes);
        if (res.err) throw new Error(res.err);
        setToken({ jwt: refreshedToken.accessToken, exp });
        return res;
      };

      if (token && token.exp - 30 < Math.round(Date.now() / 1000)) return fetchWithRefresh();
      else {
        const headers = token ? { Authorization: `Bearer ${token.jwt}`, ...init?.headers } : init?.headers;
        const res = await fetch(input, { ...init, headers }).then(handleRes);
        if (res.err === "JwtTokenExpired") return fetchWithRefresh();
        return res;
      }
    },
    [token, setToken]
  );
};
