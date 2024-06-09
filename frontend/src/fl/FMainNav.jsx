import {
  Box,
  Stack,
  Typography,
  ButtonBase,
  Divider,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Chip,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/Icon1.png";
import Dboard from "../assets/dboard.png";
import Settings from "../assets/settings.png";
import LBoard from "../assets/crown.png";
import User from "../assets/user.png";
import Service from "../assets/service.png";

import WithAuth from "../auth/WithAuth";
import { TiThMenu } from "react-icons/ti";
import { AiOutlineClose } from "react-icons/ai";

const FMainNav = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [userData, setUser] = useState(null);
  const [requestDetails, setRequest] = useState([]);
  const [nav, setNav] = useState(false);
  const { userId } = useParams();
  const [averageFeedback, setAverageFeedback] = useState();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .get(`https://quircom.onrender.com/api/freelancer/${userId}`, { headers })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userId]);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const response = await axios.get(
          `https://quircom.onrender.com/api/request/`,
          { headers }
        );
        if (response.status === 200) {
          const filteredServices = response.data.filter(
            (request) =>
              request.serviceId &&
              request.serviceId.freelancerId &&
              request.serviceId.freelancerId._id &&
              request.serviceId.freelancerId._id === userId &&
              request.feedbackNum !== null
          );
          setRequest(filteredServices);

          const feedbackNums = filteredServices.map(
            (request) => request.feedbackNum
          );
          const totalFeedback = feedbackNums.reduce(
            (acc, curr) => acc + curr,
            0
          );
          const average = feedbackNums.length
            ? totalFeedback / feedbackNums.length
            : 0;
          setAverageFeedback(average);
        } else {
          console.error(
            "Error fetching services: Unexpected status code",
            response.status
          );
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchRequest();
  }, [userId]);

  useEffect(() => {
    if (averageFeedback > 0) {
      const saveRating = async () => {
        try {
          const token = localStorage.getItem("authToken");
          const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          };

          const response = await axios.patch(
            `https://quircom.onrender.com/api/freelancer/rating/${userId}`,
            { ratings: averageFeedback },
            { headers }
          );
        } catch (error) {
          console.error("Error updating rating:", error);
        }
      };

      saveRating();
    }
  }, [averageFeedback, userId]);

  const icons = [
    {
      icon: Dboard,
      component: `/freelancer/dashboard/${userId}`,
      text: "Dashboard",
      index: 0,
    },
    {
      icon: Service,
      component: `/freelancer/browse-commission/${userId}`,
      text: "Commission",
      index: 1,
    },
    {
      icon: LBoard,
      component: `/freelancer/leaderboard/${userId}`,
      text: "Leaderboard",
      index: 2,
    },
  ];

  const handleIconClick = (index) => {
    setSelectedIcon(index);
    console.log(icons[index].path);
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.clear();
    localStorage.clear();
  };

  return (
    <Box
      px={2}
      sx={{
        width: "full",
        backgroundColor: "#F5F5DC",
        height: "8vh",
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
          <Box sx={{ height: "full", width: 180 }}>
            <div className="sm:flex">
              <img src={Logo} alt="Logo" />
            </div>
          </Box>
          <Divider
            orientation="vertical"
            sx={{
              height: 40,
              "@media (max-width: 958px)": {
                display: "none", // Hide the icon buttons on medium screens
              },
            }}
          />
          <Stack
            direction={"row"}
            spacing={2}
            sx={{
              "@media (max-width: 958px)": {
                display: "none", // Hide the icon buttons on medium screens
              },
            }}
          >
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
                  className="w-6 h-6"
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
          {/* <div>
            <IconButton onClick={handleNotifClick}>
              <img
                className="w-8 h-6 hover:scale-150 duration-300"
                src={Notifs}
                alt="Notifs"
              />
            </IconButton>
            <Popover
              open={Boolean(anchorEl2)}
              anchorEl={anchorEl2}
              onClose={handleCloseMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Typography sx={{ p: 2 }}>Notification 1</Typography>
              <Typography sx={{ p: 2 }}>Notification 2</Typography>
              <Typography sx={{ p: 2 }}>Notification 3</Typography>
            </Popover>
          </div> */}

          {userData && (
            <div className="lg:flex items-center justify-center hidden ">
              <p className="text-[#1d5b79] font-bold px-2 my-2 text-nowrap">
                {userData.firstName}
              </p>
              <Divider orientation="vertical" sx={{ height: 40 }} />
              <IconButton onClick={handleAvatarClick}>
                {userData.profilePic && userData.profilePic.link !== "" ? (
                  <Avatar
                    sx={{ boxShadow: 3 }}
                    src={userData.profilePic.link}
                    alt="User"
                  />
                ) : (
                  <Avatar sx={{ boxShadow: 3 }} src={User} alt="User" />
                )}
              </IconButton>
            </div>
          )}

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem
              onClick={handleCloseMenu}
              component={Link}
              to={`/freelancer/profile/${userId}`}
            >
              <Stack direction={"row"} spacing={1}>
                <img className="w-6 h-6 " src={User} alt="Profile" />
                <Typography variant="body1">Profile</Typography>
              </Stack>
            </MenuItem>
            <MenuItem
              onClick={handleCloseMenu}
              component={Link}
              to={`/freelancer/settings/${userId}`}
            >
              <Stack direction={"row"} spacing={1}>
                <img className="w-6 h-6" src={Settings} alt="Settings" />
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
          <div onClick={() => setNav(!nav)} className="block lg:hidden">
            {!nav ? (
              <TiThMenu size={22} color="#133C55" />
            ) : (
              <AiOutlineClose size={22} />
            )}
          </div>
          <div
            className={
              nav
                ? "fixed lg:hidden left-[-20px] top-0 w-[300px] z-[5] h-full border-l-solid border-l-[15px] border-l-[#1D5B79] bg-white ease-in-out duration-500"
                : "fixed left-[-100%]"
            }
          >
            <img className="h-[70px] m-[10px] pt-[9px]" src={Logo} />
            <ul>
              <li
                onClick={() => setNav(false)}
                className="flex items-center justify-items-start py-4 border-b-2 ml-6 mr-6 border-orange-600"
              >
                <IconButton>
                  <Link to={`/freelancer/profile/${userId}`}>
                    {userData?.profilePic &&
                    userData?.profilePic.link !== "" ? (
                      <Avatar
                        sx={{ boxShadow: 3 }}
                        src={userData?.profilePic?.link}
                        alt="User"
                      />
                    ) : (
                      <Avatar sx={{ boxShadow: 3 }} src={User} alt="User" />
                    )}{" "}
                  </Link>
                </IconButton>
                <p className="font-medium cursor-pointer">
                  <Link to={`/freelancer/profile/${userId}`}>
                    {userData?.firstName + " " + userData?.surName || ""}
                  </Link>
                </p>
              </li>
              <li
                onClick={() => setNav(false)}
                className="p-4 border-b-2 ml-6 mr-6 border-orange-600 hover:bg-orange-300"
              >
                <Link to={"/freelancer/dashboard/" + userId || ""}>
                  Dashboard
                </Link>
              </li>
              <li
                onClick={() => setNav(false)}
                className="p-4 border-b-2 ml-6 mr-6 border-orange-600 hover:bg-orange-300"
              >
                <a href="#">Leaderboards</a>
              </li>
              <li
                onClick={() => setNav(false)}
                className="p-4 border-b-2 ml-6 mr-6 border-orange-600 hover:bg-orange-300"
              >
                <a href="#">Settings</a>
              </li>
            </ul>
            <div className="flex-inline justify-center items-center mt-[50px]">
              {" "}
              <button
                onClick={() => setNav(false)}
                className="flex mx-auto pt-2 pb-2 pl-3 pr-3 text-center font-bold"
              >
                <Link
                  to={"/"}
                  className="text-white bg-red-600 rounded-[15px] cursor-pointer pl-[10px] pr-[10px] pt-[3px] pb-[5px]"
                >
                  Log out
                </Link>
              </button>
            </div>
          </div>
        </Stack>
      </Stack>
    </Box>
  );
};

export default WithAuth(FMainNav);
