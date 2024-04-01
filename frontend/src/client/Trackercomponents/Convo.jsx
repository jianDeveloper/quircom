import { Avatar, Box, Stack, Badge, Typography, IconButton, Divider, Icon, TextField } from "@mui/material";
import React from "react";
import { styled, alpha } from "@mui/material/styles";

import { FaChevronDown, FaFileContract } from "react-icons/fa";
import { GoInbox } from "react-icons/go";
import { BsSendFill } from "react-icons/bs";
import { PiLinkSimpleBold } from "react-icons/pi";

const StyledInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
        paddingTop:"10px",
        paddingBottom:"10px",
        color: "white"
    }
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
const Convo = () => {
  return (
    <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
      {/* chat head */}
      <Box
        p={3}
        sx={{
          width: "full",
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          backgroundColor: alpha("#134e6f", 0.55),
        }}
      >
        <Stack
          alignItems={"center"}
          direction={"row"}
          justifyContent={"space-between"}
          sx={{ height: "100%", width: "100%" }}
        >
          <Stack direction={"row"} spacing={2}>
            <Box>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar src={""} />
              </StyledBadge>
            </Box>
            <Stack spacing={0.2}>
              <Typography sx={{color:"white", fontFamily: "Poppins", fontWeight: 500 }}
                variant="subtitle2">NAME</Typography>    
              <Typography sx={{color:"white", fontFamily: "Poppins", fontWeight: 500 }}
                variant="caption">Online</Typography>   
            </Stack>
          </Stack>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
        <IconButton>
            <FaFileContract color="white" />
        </IconButton>
        <IconButton>
            <GoInbox color="white" />
        </IconButton>
        <Divider orientation="vertical" flexItem />
        <IconButton>
            <FaChevronDown color="white" />
        </IconButton>
          </Stack>
        </Stack>
      </Box>
      {/* chat body */}
      <Box
        width={"100%"}
        sx={{ flexGrow: 1, backgroundColor: alpha("#344F65", 0.95) }}
      >
        <Stack></Stack>
      </Box>
      {/* chat box */}
      <Box
        p={3}
        sx={{

          width: "100%",
          backgroundColor: alpha("#134e6f", 0.55),
        }}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <StyledInput
            fullWidth
            placeholder="Type here..."
            variant="filled"
            color="warning"
            InputProps={{
            disableUnderline: true,
            startAdornment:
            <>
              <IconButton>
                <PiLinkSimpleBold color="#FD5F00" />
              </IconButton>
              <Divider orientation="vertical" variant="middle" color="#134e6f" flexItem sx={{mr:2}} />
            </>}}
          />
          <Box sx={{height:48, width:48}}>
               <Stack alignItems={"center"} justifyContent={"center"} sx={{height:48, width:48, backgroundColor: "#FD5F00", borderRadius: 2}}> 
                <IconButton><BsSendFill size={24} color="white" /></IconButton>
                </Stack>
          </Box>
        </Stack>
      </Box>

    </Stack>
  );
};

export default Convo;
