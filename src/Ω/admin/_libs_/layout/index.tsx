// in src/MyLayout.js
import * as React from "react";
import ExitIcon from "@mui/icons-material/PowerSettingsNew";
import { AppBar, Layout, UserMenu } from "react-admin";
import { MenuItem } from "@mui/material";
import { forwardRef } from "react";

// It's important to pass the ref to allow Material UI to manage the keyboard navigation
const MyLogoutButton = forwardRef((props, ref) => {
  const handleClick = () => {};
  return (
    <MenuItem
      onClick={handleClick}
      ref={ref}
      // It's important to pass the props to allow Material UI to manage the keyboard navigation
      {...props}
    >
      <ExitIcon /> Logout
    </MenuItem>
  );
});

const MyUserMenu = () => <MyLogoutButton />;

const MyAppBar = () => <AppBar userMenu={<MyUserMenu />} />;

const MyLayout = ({ children }) => <Layout appBar={MyAppBar}>{children}</Layout>;

export default MyLayout;
