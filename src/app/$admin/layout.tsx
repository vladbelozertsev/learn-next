"use client";

import type { RefineMUIProps } from "./_libs_/components/refine-mui";
import type { ResourceProps } from "@refinedev/core";
import dynamic from "next/dynamic";
import { isAuthAtom } from "@/libs/state/auth";
import { notFound } from "next/navigation";
import { useAtom } from "jotai";

const resources: ResourceProps[] = [
  { name: "flowers" },
  { name: "flowers2", meta: { parent: "flowers" } },
  {
    name: "flowers",
    list: "/$admin/flowers",
    show: "/$admin/flowers/:id",
    create: "/$admin/flowers/add",
    meta: { parent: "flowers2" },
  },
  {
    name: "flowers/varieties",
    identifier: "asasa",
    clone: "sdsdsds",
    list: "/$admin/flowers-varieties",
    show: "/$admin/flowers-varieties/:id",
    create: "/$admin/flowers-varieties/add",
    meta: { parent: "flowers2" },
  },
];

const RefineMUI = dynamic<RefineMUIProps>(() => import("./_libs_/components/refine-mui").then((mod) => mod.RefineMUI), {
  ssr: true,
});

export default function AdminLayout(props: { children: React.ReactNode }) {
  const isAuth = useAtom(isAuthAtom)[0] || true;
  if (!isAuth) return notFound();
  return <RefineMUI resources={resources}>{props.children}</RefineMUI>;
}
