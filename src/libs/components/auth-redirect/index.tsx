"use client";

import { FC, Fragment, ReactNode } from "react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { userAtom } from "@/libs/state/auth";

type Props = {
  children: ReactNode;
};

export const AuthRedirect: FC<Props> = (props) => {
  const user = useAtom(userAtom)[0];
  const router = useRouter();
  if (user === undefined) return "...Loading";
  if (user === null) router.push("http://localhost:3001/login");
  return <Fragment>{props.children}</Fragment>;
};
