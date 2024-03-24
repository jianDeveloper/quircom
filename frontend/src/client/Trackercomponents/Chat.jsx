import React from "react";
import { Box, Stack, Typography, InputBase, Divider } from "@mui/material/";
import { styled, alpha } from "@mui/material/styles";
import { FaSearch } from "react-icons/fa";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 20,
  backgroundColor: alpha("#709CE6", 0.15),
  marginRight: "auto",
  marginLeft: 0,
  width: "100%",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}));

const ChatElement = () => {
  return <Box sx={{ p: 2, backgroundColor: "#f5f5f5" }}></Box>;
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
            backgroundColor: "#f5f5f5",
            borderLeft: "5px solid #1D5B79",
            boxShadow: "0px 2px 2px rgba(0,0,0,0.25)",
          }}
        >
          <Stack p={1} spacing={2}>
            <Typography variant="font-poppins font-bold text-lg">
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
