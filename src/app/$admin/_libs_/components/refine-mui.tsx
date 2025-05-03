"use client";

import Cloud from "@mui/icons-material/Cloud";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentPaste from "@mui/icons-material/ContentPaste";
import CssBaseline from "@mui/material/CssBaseline";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import GlobalStyles from "@mui/material/GlobalStyles";
import LightModeIcon from "@mui/icons-material/LightMode";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import routerProvider from "@refinedev/nextjs-router";
import { Box, Divider, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Paper, Typography } from "@mui/material";
import { FC, useState } from "react";
import { HamburgerMenu, RefineSnackbarProvider, RefineThemes, ThemedLayoutV2 } from "@refinedev/mui";
import { Refine, ResourceProps, TitleProps, useResource } from "@refinedev/core";
import { ThemeProvider } from "@mui/material";
import { useDataProvider } from "../hooks/use-data-provider";

export type RefineMUIProps = {
  children: React.ReactNode;
  resources: ResourceProps[];
};

export const RefineMUI: FC<RefineMUIProps> = ({ children, resources }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [open, setOpen] = useState(false);
  const dataProvider = useDataProvider();
  const handleClose = () => setOpen((o) => !o);

  const Header: FC = () => {
    const boxStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      height: "64px",
      backgroundColor: "primary.main",
      color: "#FFF",
      paddingRight: "35px",
      paddingLeft: "35px",
    };

    <Menu id="demo-customized-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
      <MenuItem onClick={handleClose} disableRipple>
        <LightModeIcon />
        Light
      </MenuItem>
      <Divider sx={{ my: 0.5 }} />
      <MenuItem onClick={handleClose} disableRipple>
        <DarkModeIcon />
        Dark
      </MenuItem>
      <Divider sx={{ my: 0.5 }} />
      <MenuItem onClick={handleClose} disableRipple>
        <PowerSettingsNewIcon />
        Logout
      </MenuItem>
      <Divider sx={{ my: 0.5 }} />
    </Menu>;

    return (
      <Box sx={boxStyle}>
        <HamburgerMenu />
        <h2 className="text-white font-bold capitalize text-center flex-1 text-sm">Админ панель</h2>
        <div className="flex">
          <button onClick={() => setDarkMode((dm) => !dm)} className="mr-3 cursor-pointer">
            {darkMode && <LightModeIcon />}
            {!darkMode && <DarkModeIcon />}
          </button>
          <button className="flex flex-col items-center cursor-pointer">
            <PowerSettingsNewIcon />
            {/* <span className="text-white font-bold capitalize text-center text-xs">Выйти</span> */}
          </button>
        </div>
      </Box>
    );
  };

  const Title: FC<TitleProps> = (props) => {
    console.log(props.collapsed);
    if (props.collapsed) return <h1>...</h1>;
    return <h1>MY pRoject </h1>;
  };

  return (
    <ThemeProvider theme={darkMode ? RefineThemes.BlueDark : RefineThemes.Blue}>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <Refine routerProvider={routerProvider} dataProvider={dataProvider} resources={resources}>
          <ThemedLayoutV2
            Title={Title}
            Header={Header}
            onSiderCollapsed={() => {
              console.log("asasas");
            }}
          >
            {children}
          </ThemedLayoutV2>
        </Refine>
      </RefineSnackbarProvider>
    </ThemeProvider>
  );
};
