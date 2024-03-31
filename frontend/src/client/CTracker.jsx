import React from "react";

import NavHeader from "./CMainNav";
import CFooter from "./CFooter";
import Chat from "./Trackercomponents/Chat";
import { Box, Stack } from "@mui/material";
import { BsLadder } from "react-icons/bs";
import Convo from "./Trackercomponents/Convo";

function CTracker() {
  return (
    <div className="">
      <NavHeader />
      <div className="flex-inline mx-10 my-10">
        <h1 className="font-extrabold text-[30px] text-[#1D5B79]">
          Task Tracker
        </h1>
        <Stack direction={"row"} sx={{ width:"100%"}}>
          <Chat /> {/*render commission chats */}
          <Box sx={{height:"full", width:"calc(100vw - 300px)",backgroundColor:"black"}}>
            <Convo />
          </Box>
        </Stack>
      </div>
      <CFooter />
    </div>
  );
}

export default CTracker;
