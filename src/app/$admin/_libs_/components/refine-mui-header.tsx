import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { Box, Divider, Menu, MenuItem } from "@mui/material";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { HamburgerMenu } from "@refinedev/mui";

type Props = {
  darkMode?: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
};

export const RefineMUIHeader: FC<Props> = (props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDarkMode = () => {
    props.setDarkMode((dm) => !dm);
    handleClose();
  };

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

  return (
    <Box sx={boxStyle}>
      <HamburgerMenu />
      <h2 className="text-white font-bold capitalize text-center flex-1 text-sm">Админ панель</h2>
      <div>
        <button onClick={(e) => setAnchorEl(e.currentTarget)}>
          <ManageAccountsIcon sx={{ fontSize: "30px" }} />
        </button>
        <Menu
          id="demo-customized-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={toggleDarkMode} disableRipple>
            {props.darkMode && <LightModeIcon />}
            {props.darkMode && "Light Mode"}
            {!props.darkMode && <DarkModeIcon />}
            {!props.darkMode && "Dark Mode"}
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />
          <MenuItem onClick={handleClose} disableRipple>
            <PowerSettingsNewIcon />
            Logout
          </MenuItem>
        </Menu>
      </div>
    </Box>
  );
};
