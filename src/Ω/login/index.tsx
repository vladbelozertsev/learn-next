"use client";

import ExampleToast from "@/libs/components/toast";
import { FC } from "react";
import { Input } from "@/libs/components/input";
import { Popover } from "@/libs/components/popover";
import { Toast } from "./toast";
import { className } from "@/libs/helpers";
import { useAuthFetch } from "@/libs/hooks/use-auth-fetch";
import { useForm } from "react-hook-form";
import { useLogin, useLoginGoogle } from "./api";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email({ message: "Please, enter email" }),
  password: z.string().min(6, { message: "Please, enter password" }),
});

export const Login: FC = () => {
  const form = useForm({ resolver: zodResolver(schema) });
  const loginGoogle = useLoginGoogle();
  const login = useLogin();
  const authFetch = useAuthFetch();

  const signin = form.handleSubmit(
    () => {
      loginGoogle.mutate();
    },
    (err) => {
      console.error(err);
    }
  );

  const varieties = useQuery({
    queryKey: ["admin", "flowers/varieties", "nopages=1"],
    queryFn: async () => {
      const res = await authFetch(`http://localhost:3000/api/flowers/varieties?nopages=1`);
      console.log("res - ", res, !!window);
      return { data: res.data };
    },
  });

  console.log(varieties.data);

  if (varieties.data) return <div>asdadasd {JSON.stringify(varieties.data)}</div>;

  return (
    <div {...styles.root}>
      <div {...styles.cont}>
        <h1 {...styles.h1}>Login</h1>
        <Toast />
        <Input $top="Email" $div="mb-5" $err={form.formState.errors.email} {...form.register("email")} />
        <Input $top="Password" $err={form.formState.errors.password} {...form.register("password")} />
        {login.isPending && "...loading"}
        <button onClick={signin}>submit</button>
      </div>
    </div>
  );
};

const styles = className({
  root: "flex items-center justify-center h-[100vh] bg-gray-50",
  cont: "bg-white p-10 pt-5 w-[25vw]",
  h1: "text-amber-700 text-center text-xl font-medium",
});
