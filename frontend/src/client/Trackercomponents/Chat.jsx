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
import { FaSearch } from "react-icons/fa";

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
  }
}));
const ChatElement = () => {
  return (
    <Box
      sx={{ width: "100%", borderRadius: 1, backgroundColor: "#FB6D3A" }}
      p={2}
    >
      <StyledBadge overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }} variant="dot">
      <Avatar />
      </StyledBadge>
      
    </Box>
  );
};

const Chat = () => {
  return (
    <div>
      <Stack>
        <Box
          width={300}
          height={"90vh"}
          sx={{
            p: 2,
            backgroundColor: "#13334C",
            borderLeft: "5px solid #FD5F00",
            boxShadow: "0px 2px 2px rgba(0,0,0,0.25)",
          }}
        >
          <Stack p={1} spacing={2}>
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
            <Stack>
              <ChatElement />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </div>
  );
};

export default Chat;
