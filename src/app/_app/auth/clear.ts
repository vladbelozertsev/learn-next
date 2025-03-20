import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const clear = (cookieStore: ReadonlyRequestCookies) => {
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  return { user: null, accessToken: "" };
};
