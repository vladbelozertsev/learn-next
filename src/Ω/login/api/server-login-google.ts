"use client";

import { UserAPI } from "@/libs/types/user-api";

export type ServerResponse = {
  user: UserAPI;
  accessToken: string;
  refreshToken: string;
};

export const serverLoginGoogle = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Access-Control-Allow-Credentials", "true");
  myHeaders.append("Access-Control-Allow-Origin", "http://localhost:3000");
  const res = await fetch("http://localhost:3000/api/oauth/url/google", {
    method: "GET",
    headers: myHeaders,
    credentials: "include",
  });

  console.log(res.ok);

  if (res.ok) {
    const data = (await res.json()) as { url: string };
    return data;
  }

  return res.text().then((err?: unknown) => {
    const isErrMsg = typeof err === "string";
    const msg = isErrMsg ? err : "Internal server error";
    throw new Error(msg);
  });
};
