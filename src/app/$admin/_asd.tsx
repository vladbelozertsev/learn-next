"use client";

import "@refinedev/antd/dist/reset.css";
import routerProvider from "@refinedev/nextjs-router";
import { App as AntdApp, ConfigProvider } from "antd";
import { Refine, ResourceProps } from "@refinedev/core";
import { RefineThemes, ThemedLayoutV2 } from "@refinedev/antd";
import { isAuthAtom } from "@/libs/state/auth";
import { useAtom } from "jotai";
import { useDataProvider } from "./_libs_/hooks/use-data-provider";

const resources: ResourceProps[] = [
  { name: "products", list: "/$admin/products" },
  { name: "flowers", list: "/$admin/flowers" },
];

export default function AdminLayout(props: { children: React.ReactNode }) {
  const isAuth = useAtom(isAuthAtom)[0];
  const dataProvider = useDataProvider();

  return (
    <ConfigProvider theme={RefineThemes.Blue}>
      <AntdApp>
        <Refine routerProvider={routerProvider} dataProvider={dataProvider} resources={resources}>
          <ThemedLayoutV2>{props.children}</ThemedLayoutV2>
        </Refine>
      </AntdApp>
    </ConfigProvider>
  );
}
