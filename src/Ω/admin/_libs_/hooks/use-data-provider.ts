"use client";

import { DataProvider } from "react-admin";
import { btoaURL } from "@/libs/utils";
import { useAuthFetch } from "@/libs/hooks/use-auth-fetch";
import { useMemo } from "react";

export const useDataProvider = (): DataProvider => {
  const authFetch = useAuthFetch();

  return useMemo(
    () => ({
      getList: async (resource, params) => {
        const { page, perPage } = params.pagination || {};
        const { field, order } = params.sort || {};

        const res = await authFetch<any>(
          `http://localhost:3000/api/${resource}?${new URLSearchParams({
            limit: (perPage || 10) + "",
            offset: (((page || 1) - 1) * (perPage || 10) || "") + "",
            order: btoaURL(JSON.stringify([[field, order || "ASC"]])),
            count: "1",
          })}`
        );

        const total = +(res.res.headers.get("X-Count") || 0);
        return { data: res.data, total };
      },
      getOne: async (resource, params) => {
        const res = await authFetch<any>(`
          http://localhost:3000/api/${resource}/${params.id}
        `);

        return { data: res.data };
      },
      update: async (resource, params) => {
        const res = await authFetch<any>(`http://localhost:3000/api/${resource}/${params.id}`, {
          method: "PUT",
          body: JSON.stringify(params.data),
        });

        return { data: res.data };
      },

      getMany: async (resource, params) => {
        const idsArr = params.ids.map((id) => JSON.stringify([resource, "=", id]));
        if (!idsArr.length) return { data: [] };

        const res = await authFetch<any>(`
          http://localhost:3000/api/${resource}?
          filter=${btoaURL(JSON.stringify(idsArr))}&nopages=1
        `);

        return { data: res.data };
      },

      getManyReference: async (resource, params) => {
        const { field, order } = params.sort || {};
        // params.
        // const filter = params.ids.map((id) => JSON.stringify([resource, "=", id]));

        const res = await authFetch<any>(`
          http://localhost:3000/api/${resource}?
          limit=${params.pagination?.perPage}
          offset=${params.pagination?.page}
          ${field ? `order=${btoaURL(JSON.stringify([[field, order || "ASC"]]))}` : ""}
          filter=${btoaURL(JSON.stringify([params.target, "=", params.id]))}
        `);

        return { data: res.data, total: 100 };
      },

      create: async (resource, params) => {
        const res = await authFetch<any>(`http://localhost:3000/api/${resource}`, {
          method: "POST",
          body: JSON.stringify(params.data),
        });

        return { data: res.data };
      },

      delete: async (resource, params) => {
        const res = await authFetch<any>(`http://localhost:3000/api/${resource}?id=${params.id}`, {
          method: "DELETE",
        });

        return { data: res.data };
      },

      deleteMany: async (resource, params) => {
        const res = await authFetch<any>(`
          http://localhost:3000/api/${resource}?
          ${params.ids.map((id) => `&id=${id}`)}
        `);

        return { data: res.data };
      },

      updateMany: async (resource, params) => {
        const res = await authFetch<any>(`http://localhost:3000/api/${resource}`, {
          method: "PUT",
          body: JSON.stringify(params.data),
        });
        return { data: res.data };
      },

      // // update a record based on a patch
      // update: (resource, params) => {},
      // // update a list of records based on an array of ids and a common patch
      // updateMany: async (resource, params) => {},
      // // delete a record by id
      // delete: async (resource, params) => {},
      // // delete a list of records based on an array of ids
      // deleteMany: async (resource, params) => {},
    }),
    [authFetch]
  );
};
