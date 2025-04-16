"use client";

import Link from "next/link";
import { FC } from "react";
import { className } from "@/libs/helpers";
import { useAtom } from "jotai";
import { userAtom } from "@/libs/state/auth";

export const Home: FC = () => {
  const user = useAtom(userAtom)[0];

  console.log(user);

  return (
    <div>
      <Link href="/yookassa">YooKassa</Link>
      <h1 {...styles.h1}>HOME123, hello {user?.name}!</h1>
    </div>
  );
};

const styles = className({
  h1: "text-amber-700",
});
