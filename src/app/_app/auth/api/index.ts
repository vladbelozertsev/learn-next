import { UserAPI } from "@/libs/types/user-api";
import { jwtDecode } from "jwt-decode";
import { tokenAtom, userAtom } from "@/libs/state/auth";
import { useAtom } from "jotai";
import { useEffect } from "react";

export const useAuth = () => {
  const setUser = useAtom(userAtom)[1];
  const setToken = useAtom(tokenAtom)[1];

  useEffect(() => {
    const setNoAuth = () => {
      setUser(null);
      setToken(null);
    };

    try {
      (async function () {
        const tokenRes = await fetch("http://localhost:3000/api/auth/refresh/web");
        if (!tokenRes.ok) return setNoAuth();

        const headers = new Headers();
        const tokenResJson = (await tokenRes.json()) as { accessToken: string };
        headers.append("Authorization", `Bearer ${tokenResJson.accessToken}`);
        const userRes = await fetch("http://localhost:3000/api/users", { headers });
        if (!userRes.ok) return setNoAuth();

        const tokenDecoded = jwtDecode(tokenResJson.accessToken);
        const userResJson = (await userRes.json()) as { user: UserAPI };
        const token = { jwt: tokenResJson.accessToken, exp: tokenDecoded.exp! };
        return { user: userResJson.user, token };
      })();
    } catch (err) {
      console.error(err);
      setNoAuth();
    }
  }, [setUser, setToken]);
};
