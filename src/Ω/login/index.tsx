"use client";

import { FC } from "react";
import { Input } from "@/libs/components/input";
import { className } from "@/libs/helpers";
import { useForm } from "react-hook-form";
import { useLogin } from "./api";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email({ message: "Please, enter email" }),
  password: z.string().min(6, { message: "Please, enter password" }),
});

export const Login: FC = () => {
  const form = useForm({ resolver: zodResolver(schema) });
  const login = useLogin();

  const signin = form.handleSubmit(
    (data) => {
      login.mutate(data);
    },
    (err) => {
      console.error(err);
    }
  );

  return (
    <div {...styles.root}>
      <div {...styles.cont}>
        <h1 {...styles.h1}>Login</h1>
        <Input
          $top="Email"
          $div="mb-5"
          $err={form.formState.errors.email}
          {...form.register("email")}
        />
        <Input
          $top="Password"
          $err={form.formState.errors.password}
          {...form.register("password")}
        />
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
