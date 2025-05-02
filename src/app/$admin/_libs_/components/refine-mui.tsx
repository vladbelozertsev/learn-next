"use client";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerProvider from "@refinedev/nextjs-router";
import { Box } from "@mui/material";
import { FC } from "react";
import { Refine, ResourceProps, useResource } from "@refinedev/core";
import { RefineSnackbarProvider, RefineThemes, ThemedLayoutV2 } from "@refinedev/mui";
import { ThemeProvider } from "@mui/material";
import { useDataProvider } from "../hooks/use-data-provider";

export type RefineMUIProps = {
  children: React.ReactNode;
  resources: ResourceProps[];
};

export const RefineMUI: FC<RefineMUIProps> = ({ children, resources }) => {
  const dataProvider = useDataProvider();

  return (
    <ThemeProvider theme={RefineThemes.Blue}>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <Refine routerProvider={routerProvider} dataProvider={dataProvider} resources={resources}>
          <ThemedLayoutV2 Header={Header} Title={Title}>
            {children}
          </ThemedLayoutV2>
        </Refine>
      </RefineSnackbarProvider>
    </ThemeProvider>
  );
};

const Header = () => {
  const { resource } = useResource();

  const boxStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "64px",
    backgroundColor: "primary.main",
  };

  return (
    <Box sx={boxStyle}>
      <h2 className="text-white font-bold capitalize">{resource?.name || "Главная"}</h2>
    </Box>
  );
};

const Title = () => {
  return <h1>MY pRoject </h1>;
};
