"use client";

import { FC } from "react";
import { className } from "@/libs/helpers";

export const Home: FC = () => {
  return (
    <div>
      <h1 {...styles.h1}>HOME123</h1>
    </div>
  );
};

const styles = className({
  h1: "text-amber-700",
});
