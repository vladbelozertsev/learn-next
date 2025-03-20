"use server";

import { cookies } from "next/headers";
import { UserAPI } from "@/libs/types/user-api";
import type { LoginInput } from ".";

export type ServerResponse = {
  user: UserAPI;
  accessToken: string;
  refreshToken: string;
};

export const serverLogin = async (input: LoginInput) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const res = await fetch("http://localhost:3000/api/auth", {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(input),
  });

  if (res.ok) {
    const data = (await res.json()) as ServerResponse;
    const cookieStore = await cookies();
    const token = { name: "token", value: data.refreshToken };
    cookieStore.set({ ...token, httpOnly: true });
    return { user: data.user, accessToken: data.accessToken };
  }

  return res.text().then((err?: unknown) => {
    console.log("errrrrrr", err);
    const isErrMsg = typeof err === "string";
    const msg = isErrMsg ? err : "Internal server error";
    throw new Error(msg);
  });
};
