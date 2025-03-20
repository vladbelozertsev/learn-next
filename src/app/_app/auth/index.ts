"use server";

import { clear } from "./clear";
import { cookies } from "next/headers";
import { getUser } from "./get-user";
import { jwtDecode } from "jwt-decode";
import { refresh } from "./refresh";

export const auth = async () => {
  const cookieStore = await cookies();
  const accessTokenJwt = cookieStore.get("accessToken")?.value;
  if (!accessTokenJwt) return clear(cookieStore);

  const accessTokenDecoded = jwtDecode(accessTokenJwt);
  const nowPlus29 = Math.round(Date.now()) / 1000 + 29;
  if (!accessTokenDecoded.exp) return clear(cookieStore);

  if (accessTokenDecoded.exp > nowPlus29) {
    const user = await getUser(accessTokenJwt);
    if (!user) return clear(cookieStore);
    return { user, accessToken: accessTokenJwt };
  }

  const refreshed = await refresh(cookieStore.get("refreshToken")?.value);
  if (!refreshed) return clear(cookieStore);
  const user = await getUser(refreshed.accessToken);
  if (!user) return clear(cookieStore);
  cookieStore.set("accessToken", refreshed.accessToken);
  cookieStore.set("refreshToken", refreshed.refreshToken);
  return { user, accessToken: refreshed.accessToken };
};
