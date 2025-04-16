"use client";

import { FC, Fragment, useEffect } from "react";
import { auth } from "./utils";
import { tokenAtom, userAtom } from "@/libs/state/auth";
import { useAtom } from "jotai";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type Props = {
  children: React.ReactNode;
};

export const Auth: FC<Props> = ({ children }) => {
  const [user, setUser] = useAtom(userAtom);
  const setToken = useAtom(tokenAtom)[1];
  const qc = useQueryClient();

  useQuery({
    queryKey: ["APP_AUTH_FLOW"],
    enabled: user === undefined,
    queryFn: async () => {
      const res = await auth();
      setToken(res?.accessToken || "");
      setUser(res?.user || null);
      return res;
    },
  });

  useEffect(() => {
    if (user === null) qc.removeQueries();
  }, [user, qc]);

  return <Fragment>{children}</Fragment>;
};
