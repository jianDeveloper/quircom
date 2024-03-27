import React from "react";

import NavHeader from "./CMainNav";
import CFooter from "./CFooter";
import Chat from "./Trackercomponents/Chat";


function CTracker() {
  return (
    <div className="">
      <NavHeader />
      <div className="flex-inline mx-10 my-10">
        <h1 className="font-extrabold text-[30px] text-[#1D5B79]">
          Task Tracker
        </h1>
        <Chat />
      </div>
      <CFooter />
    </div>
  );
}

export default CTracker;
