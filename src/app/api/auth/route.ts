import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
  const { name } = body;

  // const data = await fetch("http://localhost:3000/api/auth", {
  //   method: "POST",
  //   body: JSON.stringify({ email: "ddd@mail.ru", password: "5553121" }),
  // }).then((r) => r.json());

  const res = await fetch("http://localhost:3000/api/auth", {
    method: "POST",
    body: JSON.stringify({ email: "ddd@mail.ru", password: "5553121" }),
  });

  const data = await res.json();

  // e.g. Insert new user into your DB
  const newUser = { id: Date.now(), name };

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
    status: res.status,
  });
}
