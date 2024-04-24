import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  BsFillArchiveFill,
  BsPeopleFill,
  BsClipboard2DataFill,
} from "react-icons/bs";
import axios from "axios"; // Import axios for making HTTP requests
import UserContext from "../context/UserContext";

import CFooter from "./CFooter";
import TaskList from "./Dashcomponents/TaskList";
import TrackerModal from "./Dashcomponents/Tracker";
import { Link } from 'react-router-dom';

import BG1 from "../assets/bg1.png";
import BGmark from "../assets/ser.png";
import BGtrack from "../assets/tra.png";
import BGsubs from "../assets/sub.png";
import CMainNav from "./CMainNav";

function CDashboard() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null); // State to store user data
  const[trackModal, settrackModal] = React.useState(false);

  useEffect(() => {
    // Fetch user data using the user ID
    axios
      .get(`https://quircom.onrender.com/api/client/${userId}`)
      .then((response) => {
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
          <div className="grid grid-cols-3 gap-[20px] my-[15px]">
            <div className="card">
              <div className="card-inner">
                <h3 className="font-bold text-[#1D5B79]">On-Going Contracts</h3>
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
            <div className="card">
              <div className="card-inner">
                <h3 className="font-bold text-[#1D5B79]">Total Projects</h3>
                <BsClipboard2DataFill className="card_icon" />
              </div>
              <h1 className="font-medium text-[#1D5B79]">300</h1>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-[20px] my-[15px] md:grid-cols-3">
            <Link to={`/client/browse-service/${userId}`}>
              <div
                className="flex flex-col justify-around rounded-lg"
                style={{
                  background: `url(${BGmark})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover", // Ensure the image covers the entire div
                }}
              >
                <div className="flex justify-center items-center py-14">
                  <h3 className="font-extrabold text-xl text-[#F5F5DC]">Marketplace</h3>
                </div>
              </div>
            </Link>
            
              <div
                className="flex flex-col justify-around rounded-lg"
                style={{
                  background: `url(${BGtrack})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover", // Ensure the image covers the entire div
                }}
              >
                <div className="flex justify-center items-center py-14">
                  <button type='button' className='font-extrabold text-xl text-[#F5F5DC]' onClick={() => settrackModal (true)}>Progress Tracker</button>
                    {trackModal ? <TrackerModal settrackModal={settrackModal} /> : null}
                </div>
              </div>
            
            <Link to={`/client/subscribe/${userId}`}>
              <div
                className="flex flex-col justify-around rounded-lg"
                style={{
                  background: `url(${BGsubs})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover", // Ensure the image covers the entire div
                }}
              >
                <div className="flex justify-center items-center py-14">
                  <h3 className="font-extrabold text-xl text-[#F5F5DC]">Subscription</h3>
                </div>
              </div>
            </Link>
          </div>
          <div>
            
              <h2 className="text-2xl justify-center place-content-center font-semibold text-[#F5F5DC]">Current Projects</h2>
              
            
            <TaskList />
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
