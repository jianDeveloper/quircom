import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import axios from "axios"; // Import axios for making HTTP requests
import UserContext from "../context/UserContext";

import CFooter from "./CFooter";
import TaskList from "./Dashcomponents/TaskList";

import BG1 from "../assets/bg1.png";
import BGmark from "../assets/ser.jpg";
import BGtrack from "../assets/tra.jpg";
import BGsubs from "../assets/sub.jpg";
import CMainNav from "./CMainNav";
import CTop from "./CTop";

function CDashboard() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null); // State to store user data

  const { userIdLink } = useContext(UserContext);
  console.log("User ID in Dashboard:", userIdLink);

  useEffect(() => {
    // Fetch user data using the user ID
    axios
      .get(`https://quircom.onrender.com/api/client/${userId}`)
      .then((response) => {
        console.log("User data:", response.data);
        setUserData(response.data); // Set the user data in state
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userId]); // Fetch user data whenever userId changes

  return (
    <div
      className="flex flex-col"
      style={{
        background: `url(${BG1})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <CMainNav />
      <div className="flex align-center justify-center">
        <div className="flex flex-col container mx-10 my-10">
          {" "}
          {/*formatting navbar & body -j*/}
          <div className="flex">
            <h1 className="font-extrabold text-[30px] text-[#1D5B79]">
              DASHBOARD
            </h1>
          </div>
          {/*fixing headbox on dashboard -j*/}
          <div className="grid grid-cols-2 gap-[20px] my-[15px]">
            <div className="card">
              <div className="card-inner">
                <h3 className="font-bold text-[#1D5B79]">On-Going Projects</h3>
                <BsFillArchiveFill className="card_icon" />
              </div>
              <h1 className="font-medium text-[#1D5B79]">300</h1>
            </div>
            <div className="card">
              <div className="card-inner">
                <h3 className="font-bold text-[#1D5B79]">Completed Contracts</h3>
                <BsPeopleFill className="card_icon" />
              </div>
              <h1 className="font-medium text-[#1D5B79]">33</h1>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-[20px] my-[15px] md:grid-cols-3">
            <div
              className="flex flex-col justify-around rounded-lg "
              style={{
                background: `url(${BGmark})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <div className="flex justify-center items-center py-14">
                <h3 className="font-extrabold text-xl text-orange-600">
                  Marketplace
                </h3>
              </div>
            </div>
            <div
              className="flex flex-col justify-around rounded-lg"
              style={{
                background: `url(${BGtrack})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <div className="flex justify-center items-center py-14">
                <h3 className="font-extrabold text-xl text-orange-600">
                  Progress Tracker
                </h3>
              </div>
            </div>
            <div
              className="flex flex-col justify-around rounded-lg"
              style={{
                background: `url(${BGsubs})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <div className="flex justify-center items-center py-14">
                <h3 className="font-extrabold text-xl text-orange-600">
                  Subscription
                </h3>
              </div>
            </div>
          </div>
          <div className="flex">
            <div>
              <TaskList />
            </div>
            <div>
              <CTop />
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <CFooter />
      </div>
    </div>
  );
}

export default CDashboard;
