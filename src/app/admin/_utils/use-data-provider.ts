"use client";

import { DataProvider } from "react-admin";
import { tokenAtom } from "@/libs/state/auth";
import { useAtom } from "jotai";
import { useMemo } from "react";

export const useDataProvider = (): DataProvider => {
  const token = useAtom(tokenAtom);

  return useMemo(
    () => ({
      getList: async (resourse, params) => {},
    }),
    []
  );
};
