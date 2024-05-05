import {
  Avatar,
  Box,
  ButtonBase,
  Chip,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import Logo from "../assets/icon00.png";
import Logo2 from "../assets/clientNav.png";
import Dboard from "../assets/dboard.png";
import LBoard from "../assets/crown.png";
import { Link } from "react-router-dom";

const AMainNav = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const getLogo = () => {
    if (window.innerWidth >= 600) {
      return <img src={Logo} alt="Logo" />;
    } else {
      return <img src={Logo2} alt="Logo 2" />;
    }
  };

  const icons = [
    {
      icon: Dboard,
      component: ``,
      text: "Dashboard",
      index: 0,
    },
    {
      icon: LBoard,
      component: ``,
      text: "Manage Accounts",
      index: 1,
    },
  ];

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setAnchorEl2(null);
  };

  return (
    <Box
      px={2}
      sx={{
        width: "full",
        backgroundColor: "#1d5b79",
        height: "auto",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        sx={{ height: "100%", width: "100%" }}
        justifyContent={"space-between"}
      >
        <Stack
          spacing={2}
          sx={{ width: "100%", height: "100%" }}
          direction="row"
          alignItems="center"
        >
          <Box sx={{ height: "full", width: 200 }}>
            <div className="hidden h-14 my-1 sm:flex sm-justify-center sm-items-center sm:gap-2">{getLogo()} <h1 className="flex flex-row justify-center items-center text-lg font-extrabold uppercase text-center text-white">management</h1></div>
            <div className="flex h-14 sm:hidden">{getLogo()}</div>
          </Box>
          <Divider orientation="vertical" sx={{ height: 40 }} />
          <Stack direction={"row"} spacing={2}>
            {icons.map((icon, index) => (
              <ButtonBase
                key={index}
                component={Link} // Use Link component instead of button
                to={icon.component}
                onClick={() => handleIconClick(index)}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor:
                    selectedIcon === index ? "#fff" : "transparent",
                  borderRadius: 1,
                  boxShadow:
                    selectedIcon === index
                      ? "0px 2px 4px rgba(0, 0, 0, 0.25)"
                      : "none", // add shadow if selected
                  p: 1,
                  gap: 1, // add spacing between icon and typography
                }}
              >
                <img
                  className="w-8 h-8 border-[2px] bg-[#F5F5DC] border-orange-500 rounded-full p-1"
                  src={icon.icon}
                  alt={`Icon ${index}`}
                />
                <Typography variant="body1">{icon.text}</Typography>
              </ButtonBase>
            ))}
          </Stack>
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          spacing={1}
        >
          <div className="flex items-center justify-center">
            <p className="text-[#1d5b79] font-bold px-2 my-2 text-nowrap">
              NAME ADMIN
            </p>
            <Divider orientation="vertical" sx={{ height: 40 }} />
            <IconButton onClick={handleAvatarClick}>
              <Avatar sx={{ boxShadow: 3 }} src={""} alt="User" />
            </IconButton>
          </div>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem
              onClick={handleCloseMenu}
              component={Link}
              to={``}
            >
              <Stack direction={"row"} spacing={1}>
                <img className="w-6 h-6 " src={""} alt="Profile" />
                <Typography variant="body1">Profile</Typography>
              </Stack>
            </MenuItem>
            <MenuItem
              onClick={handleCloseMenu}
              component={Link}
              to={``}
            >
              <Stack direction={"row"} spacing={1}>
                <img className="w-6 h-6" src={""} alt="Settings" />
                <Typography variant="body1">Settings</Typography>
              </Stack>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseMenu();
                handleLogout();
              }}
              onAuxClick={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
            >
              <Stack direction={"row"} spacing={1} alignItems={"center"}>
                <Chip
                  label="Logout"
                  sx={{ width: "13vh" }}
                  variant={isHovered ? "filled" : "outlined"}
                  color="error"
                  onMouseOver={() => setIsHovered(true)}
                  onMouseOut={() => setIsHovered(false)}
                  component={Link}
                  to="/"
                />
              </Stack>
            </MenuItem>
          </Menu>
        </Stack>
      </Stack>
    </Box>
  );
};

export default AMainNav;
