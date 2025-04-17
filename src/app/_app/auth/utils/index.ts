"use server";

import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import { getUser } from "./get-user";
import { refresh } from "./refresh";

const refreshTokenCookieName = "refresh_token";

const clear = (cookieStore: ReadonlyRequestCookies) => {
  // cookieStore.delete(refreshTokenCookieName);
  return { user: null, accessToken: "" };
};

export const auth = async () => {
  const cookieStore = await cookies();

  const refreshed = await refresh(cookieStore.get(refreshTokenCookieName)?.value);

  console.log("first", refreshed);
  if (!refreshed) return clear(cookieStore);

  const user = await getUser(refreshed.accessToken);
  if (!user) return clear(cookieStore);

  cookieStore.set(refreshTokenCookieName, refreshed.refreshToken);
  return { user, accessToken: refreshed.accessToken };
};
