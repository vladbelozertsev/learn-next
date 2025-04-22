"use client";

import { DataProvider } from "react-admin";
import { btoaURL } from "@/libs/utils";
import { useAuthFetch } from "@/libs/hooks/use-auth-fetch";
import { useMemo, useState } from "react";

export const useDataProvider = (): DataProvider => {
  const [asd, setAsd] = useState(0);
  const authFetch = useAuthFetch();

  return useMemo(
    () => ({
      getList: async (resource, params) => {
        const { field, order } = params.sort || {};

        const res = await authFetch(`
          http://localhost:3000/api/${resource}?
          limit=${params.pagination?.perPage}
          offset=${params.pagination?.page}
          ${field ? `order=${btoaURL(JSON.stringify([[field, order || "ASC"]]))}` : ""}
        `);

        return { data: res.json, total: 11 };
      },
      getOne: async (resource, params) => {
        const res = await authFetch(`
          http://localhost:3000/api/${resource}/${params.id}
        `);

        return { data: res.json };
      },
      update: async (resource, params) => {
        const res = await authFetch(`http://localhost:3000/api/${resource}/${params.id}`, {
          method: "PUT",
          body: JSON.stringify(params.data),
        });

        return { data: res.json };
      },

      getMany: async (resource, params) => {
        const idsArr = params.ids.map((id) => JSON.stringify([resource, "=", id]));
        if (!idsArr.length) return { data: [] };

        const res = await authFetch(`
          http://localhost:3000/api/${resource}?
          filter=${btoaURL(JSON.stringify(idsArr))}&nopages=1
        `);

        return { data: res.json };
      },

      getManyReference: async (resource, params) => {
        const { field, order } = params.sort || {};
        // params.
        // const filter = params.ids.map((id) => JSON.stringify([resource, "=", id]));

        const res = await authFetch(`
          http://localhost:3000/api/${resource}?
          limit=${params.pagination?.perPage}
          offset=${params.pagination?.page}
          ${field ? `order=${btoaURL(JSON.stringify([[field, order || "ASC"]]))}` : ""}
          filter=${btoaURL(JSON.stringify([params.target, "=", params.id]))}
        `);

        return { data: res.json, total: 100 };
      },

      create: async (resource, params) => {
        const res = await authFetch(`http://localhost:3000/api/${resource}`, {
          method: "POST",
          body: JSON.stringify(params.data),
        });

        return { data: res.json };
      },

      delete: async (resource, params) => {
        const res = await authFetch(`http://localhost:3000/api/${resource}?id=${params.id}`, {
          method: "DELETE",
        });

        return { data: res.json };
      },

      deleteMany: async (resource, params) => {
        const res = await authFetch(`
          http://localhost:3000/api/${resource}?
          ${params.ids.map((id) => `&id=${id}`)}
        `);

        return { data: res.json };
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
