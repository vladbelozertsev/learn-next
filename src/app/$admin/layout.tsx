"use client";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerProvider from "@refinedev/nextjs-router";
import { Refine, ResourceProps } from "@refinedev/core";
import { RefineSnackbarProvider, RefineThemes, ThemedLayoutV2 } from "@refinedev/mui";
import { ThemeProvider } from "@mui/material/styles";
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
    <ThemeProvider theme={RefineThemes.Blue}>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <Refine routerProvider={routerProvider} dataProvider={dataProvider} resources={resources}>
          <ThemedLayoutV2>{props.children}</ThemedLayoutV2>
        </Refine>
      </RefineSnackbarProvider>
    </ThemeProvider>
  );
}
