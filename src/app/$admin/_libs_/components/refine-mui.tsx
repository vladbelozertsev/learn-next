"use client";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerProvider from "@refinedev/nextjs-router";
import { FC, useEffect, useState } from "react";
import { Refine, ResourceProps, TitleProps, useResource } from "@refinedev/core";
import { RefineMUIHeader } from "./refine-mui-header";
import { RefineSnackbarProvider, RefineThemes, ThemedLayoutV2 } from "@refinedev/mui";
import { ThemeProvider } from "@mui/material";
import { useDataProvider } from "../hooks/use-data-provider";

export type RefineMUIProps = {
  children: React.ReactNode;
  resources: ResourceProps[];
};

export const RefineMUI: FC<RefineMUIProps> = ({ children, resources }) => {
  const [theme, setTheme] = useState<string>();
  const dataProvider = useDataProvider();

  const Header = () => {
    return <RefineMUIHeader theme={theme} setTheme={setTheme} />;
  };

  const Title: FC<TitleProps> = (props) => {
    if (props.collapsed) return <h1>...</h1>;
    return <h1>MY pRoject </h1>;
  };

  useEffect(() => {
    const lsTheme = localStorage.getItem("adminTheme");
    const sysTheme = window?.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    setTheme(lsTheme !== null ? lsTheme : sysTheme);
  }, [setTheme]);

  if (theme === undefined) return null;

  return (
    <ThemeProvider theme={theme === "dark" ? RefineThemes.BlueDark : RefineThemes.Blue}>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <Refine routerProvider={routerProvider} dataProvider={dataProvider} resources={resources}>
          <ThemedLayoutV2 Title={Title} Header={Header}>
            {children}
          </ThemedLayoutV2>
        </Refine>
      </RefineSnackbarProvider>
    </ThemeProvider>
  );
};
