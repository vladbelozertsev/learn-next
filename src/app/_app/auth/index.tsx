"use client";

import { FC, Fragment, useEffect } from "react";
import { UserAPI } from "@/libs/types/user-api";
import { jwtDecode } from "jwt-decode";
import { tokenAtom, userAtom } from "@/libs/state/auth";
import { useAtom } from "jotai";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  children: React.ReactNode;
};

export const Auth: FC<Props> = ({ children }) => {
  const [user, setUser] = useAtom(userAtom);
  const setToken = useAtom(tokenAtom)[1];
  const qc = useQueryClient();

  useEffect(() => {
    const setNoAuth = () => {
      setUser(null);
      setToken(null);
    };

    try {
      (async function () {
        const credentials = "include";
        const tokenRes = await fetch("http://localhost:3000/api/auth/refresh/web", { credentials });
        if (!tokenRes.ok) return setNoAuth();

        const headers = new Headers();
        const tokenResJson = (await tokenRes.json()) as { accessToken: string };
        headers.append("Authorization", `Bearer ${tokenResJson.accessToken}`);
        const userRes = await fetch("http://localhost:3000/api/users", { headers, credentials });
        if (!userRes.ok) return setNoAuth();

        const exp = jwtDecode(tokenResJson.accessToken).exp;
        if (!exp) throw new Error("No token exp (auth init)");
        await userRes.json().then(setUser);
        setToken({ jwt: tokenResJson.accessToken, exp });
      })();
    } catch (err) {
      console.error(err);
      setNoAuth();
    }
  }, [setUser, setToken]);

  useEffect(() => {
    if (user === null) qc.removeQueries();
  }, [user, qc]);

  return <Fragment>{children}</Fragment>;
};
