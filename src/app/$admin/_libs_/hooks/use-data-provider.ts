"use client";

import { DataProvider } from "@refinedev/core";
import { btoaURL } from "@/libs/utils";
import { useAuthFetch } from "@/libs/hooks/use-auth-fetch";
import { useMemo } from "react";

const url = "http://localhost:3000/api";

export const useDataProvider = (): DataProvider => {
  const authFetch = useAuthFetch();

  return useMemo(
    () => ({
      getApiUrl: () => url,

      getList: async (params) => {
        const { current, pageSize } = params.pagination || {};
        const sort = (params.sorters || []).map((el) => [el.field, el.order.toUpperCase()]);

        console.log(params.resource);

        const res = await authFetch<any>(
          `${url}/${params.resource}?${new URLSearchParams({
            limit: (pageSize || 10) + "",
            offset: (((current || 1) - 1) * (pageSize || 10) || "") + "",
            order: btoaURL(JSON.stringify(sort)),
            count: "1",
          })}`
        );

        const total = +(res.res.headers.get("X-Count") || 0);
        return { data: res.data, total };
      },

      getOne: async ({ resource, id }) => {
        const res = await authFetch<any>(`${url}/${resource}/${id}`);
        return { data: res.data };
      },

      update: async ({ resource, id, variables }) => {
        const res = await authFetch<any>(`${url}/${resource}/${id}`, {
          method: "PUT",
          body: JSON.stringify(variables),
        });
        return { data: res.data };
      },

      getMany: async ({ resource, ids }) => {
        const idsArr = ids.map((id) => JSON.stringify([resource, "=", id]));
        if (!idsArr.length) return { data: [] };

        const res = await authFetch<any>(`
          http://localhost:3000/api/${resource}?
          filter=${btoaURL(JSON.stringify(idsArr))}&nopages=1
        `);

        return { data: res.data };
      },

      create: async ({ resource, variables }) => {
        const res = await authFetch<any>(`http://localhost:3000/api/${resource}`, {
          method: "POST",
          body: JSON.stringify(variables),
        });

        return { data: res.data };
      },

      deleteOne: async ({ resource, id }) => {
        const res = await authFetch<any>(`http://localhost:3000/api/${resource}?id=${id}`, {
          method: "DELETE",
        });

        return { data: res.data };
      },

      deleteMany: async ({ resource, ids }) => {
        const res = await authFetch<any>(`
          http://localhost:3000/api/${resource}?
          ${ids.map((id) => `&id=${id}`)}
        `);

        return { data: res.data };
      },

      updateMany: async ({ resource, variables }) => {
        const res = await authFetch<any>(`http://localhost:3000/api/${resource}`, {
          method: "PUT",
          body: JSON.stringify(variables),
        });
        return { data: res.data };
      },
    }),
    [authFetch]
  );
};
