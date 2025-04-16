import { UserAPI } from "@/libs/types/user-api";

export const getUser = async (accessTokenJwt: string) => {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${accessTokenJwt}`);
  const res = await fetch("http://localhost:3000/api/users", { headers });
  if (res.ok) {
    const response = (await res.json()) as { user: UserAPI };
    return response.user;
  }
};
