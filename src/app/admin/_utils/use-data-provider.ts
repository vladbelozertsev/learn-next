"use client";

import { DataProvider } from "react-admin";
import { tokenAtom } from "@/libs/state/auth";
import { useAtom } from "jotai";
import { useAuthFetch } from "@/libs/hooks/use-auth-fetch";
import { useMemo, useState } from "react";

export const useDataProvider = (): DataProvider => {
  const [asd, setAsd] = useState(0);
  const authFetch = useAuthFetch();

  return useMemo(
    () => ({
      getList: async (resourse, params) => {
        setAsd((ddd) => ddd + 1);
        console.log(asd);
        const res = await authFetch(`http://localhost:3000/api/${resourse}`);
        return { data: res.json, total: 11 };
      },
      // getOne: async (resource, params) => {
      //   return {};
      // },
      // getMany: (resource, params) => {},
      // getManyReference: (resource, params) => {},
      // create: async (resource, params) => {},
      // // update a record based on a patch
      // update: (resource, params) => {},
      // // update a list of records based on an array of ids and a common patch
      // updateMany: async (resource, params) => {},
      // // delete a record by id
      // delete: async (resource, params) => {},
      // // delete a list of records based on an array of ids
      // deleteMany: async (resource, params) => {},
    }),
    [authFetch, asd, setAsd]
  );
};
