import React from "react";
import {
  Box,
  Stack,
  Typography,
  InputBase,
  Divider,
  Avatar,
  Badge,
} from "@mui/material/";
import { styled, alpha } from "@mui/material/styles";
import { FaInbox, FaSearch, FaStar } from "react-icons/fa";
import { ChatList } from "./Data";


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 20,
  backgroundColor: alpha("#f1f1f1", 0.15),
  marginRight: "auto",
  marginLeft: 0,
  width: "100%",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#E0E0E0",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
const ChatElement = ({ id, name, img, ticket, time, unread, online }) => {
  return (
    <Box
      sx={{ width:"full", borderRadius: 1, backgroundColor: "#FB6D3A" }}
      p={2}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} spacing={1}>
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar src={img} />
            </StyledBadge>
          ) : (
            <Avatar src={img} />
          )}

          <Stack>
            <Typography
              color="white"
              sx={{ font: "font-poppins", fontWeight: "bold" }}
            >
              {name}
            </Typography>
            <Typography color="#E0E0E0" variant="caption">
              ID# {ticket}
            </Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} alignItems={"center"}>
          <Typography
            sx={{ fontWeight: 600, color: "#E0E0E0" }}
            variant="caption"
          >
            {time}
          </Typography>
          <Badge color="primary" badgeContent={unread} />
        </Stack>
      </Stack>
    </Box>
  );
};

const Chat = () => {
  return (
    <div>
      <Stack>
        <Box
          width={300}
          sx={{
            p: 2,
            backgroundColor: "#13334C",
            borderLeft: "5px solid #FD5F00",
            boxShadow: "2px 0 4px rgba(0,0,0,.25)",
          }}
        >
          <Stack p={1} spacing={2} sx={{ height: "90vh" }}>
            <Typography variant="font-poppins font-bold text-lg text-white">
              Chat
            </Typography>
            <Stack sx={{ width: "100%", marginTop: "10px" }}>
              <Search>
                <FaSearch
                  className="flex alignitems-center justify-center absolute m-3 "
                  color="#709CE6"
                />
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ Poppins: "search" }}
                />
              </Search>
            </Stack>
            <Divider sx={{ marginTop: "10px" }} />
            <Stack
              direction={"column"}
              sx={{
                flexGrow: 1,
                height: "100%",
                overflow: "auto",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": {
                  width: "0.1em",
                  transition: "opacity 0.3s ease-in-out",
                  borderRadius: "10px",
                },
                "&:hover::-webkit-scrollbar": {
                  opacity: 1,
                },
                "&:not(:hover)::-webkit-scrollbar": {
                  opacity: 0,
                  transitionDelay: "0.3s",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#888",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#555",
                  borderRadius: "10px",
                },
              }}
            >
              <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={1}
                marginBottom={1}
              >
                <Typography color="#E0E0E0">Favorites</Typography>
                <FaStar color="#FD5F00" />
              </Stack>
              <Stack spacing={2}>
                {ChatList.filter((el) => el.pinned).map((el) => {
                  return <ChatElement {...el} />;
                })}
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={1}
                marginBottom={1}
                marginTop={2}
              >
                <Typography color="#E0E0E0">Messages</Typography>
                <FaInbox color="#FD5F00" />
              </Stack>
              <Stack spacing={2}>
                {ChatList.filter((el) => !el.pinned).map((el) => {
                  return <ChatElement {...el} />;
                })}
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </div>
  );
};

export default Chat;
