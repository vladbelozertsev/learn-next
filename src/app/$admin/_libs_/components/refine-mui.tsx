"use client";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerProvider from "@refinedev/nextjs-router";
import { FC, useState } from "react";
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
  const [darkMode, setDarkMode] = useState(false);
  const dataProvider = useDataProvider();

  const Header = () => {
    return <RefineMUIHeader darkMode={darkMode} setDarkMode={setDarkMode} />;
  };

  const Title: FC<TitleProps> = (props) => {
    if (props.collapsed) return <h1>...</h1>;
    return <h1>MY pRoject </h1>;
  };

  return (
    <ThemeProvider theme={darkMode ? RefineThemes.BlueDark : RefineThemes.Blue}>
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
