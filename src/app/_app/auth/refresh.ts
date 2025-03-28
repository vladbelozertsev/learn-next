import { jwtDecode } from "jwt-decode";

export const refresh = async (refreshTokenJwt?: string) => {
  if (!refreshTokenJwt) return;

  const refreshTokenDecoded = jwtDecode(refreshTokenJwt);
  const now = Math.round(Date.now()) / 1000;
  if ((refreshTokenDecoded?.exp || 0) < now) return;

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${refreshTokenJwt}`);
  const res = await fetch("http://localhost:3000/api/auth/refresh", {
    method: "POST",
    headers,
  });

  if (res.ok) {
    return res.json() as Promise<{
      accessToken: string;
      refreshToken: string;
    }>;
  }
};
