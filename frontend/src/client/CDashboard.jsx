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
import { Link } from "react-router-dom";

import BG1 from "../assets/bg1.png";
import BGmark from "../assets/ser.png";
import BGtrack from "../assets/tra.png";
import BGsubs from "../assets/sub.png";
import CMainNav from "./CMainNav";
import WithAuth from "../auth/WithAuth";

function CDashboard() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null); // State to store user data
  const [pendingDetails, setPending] = useState([]);
  const [requestDetails, setRequest] = useState([]);
  const [finishDetails, setFinish] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .get(`https://quircom.onrender.com/api/client/${userId}`, { headers })
      .then((response) => {
        setUserData(response.data); // Set the user data in state
      })
      .catch((error) => {
        console.error("Error fetching user data:", error.message);
      });
  }, [userId]); // Fetch user data whenever userId changes

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const fetchServices = async () => {
      const response2 = await axios.get(
        `https://quircom.onrender.com/api/request/`,
        { headers }
      );
      try {
        if (response2.status === 200) {
          // Ensure response.data is not null or undefined
          if (response2.data) {
            // Filter services only if response.data is not null or undefined
            const filteredRequest = response2.data.filter(
              (request) =>
                request.clientId._id === userId && request.status === "Ongoing"
            );
            const filteredFinished = response2.data.filter(
              (request) =>
                request.clientId._id === userId && request.status === "Complete"
            );
            setRequest(filteredRequest);
            setFinish(filteredFinished);
          } else {
            console.error(
              "Error fetching services: response data is null or undefined"
            );
          }
        } else {
          console.error(
            "Error fetching services: Unexpected status code",
            response2.status
          );
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="flex flex-col">
      <CMainNav />
      <div
        className="flex align-center justify-center"
        style={{
          background: `url(${BG1})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="flex flex-col container mx-10 sm:my-10 p-10 sm:p-4">
          {" "}
          {/*fixing headbox on dashboard -j*/}
          <div className="grid md:grid-cols-3 gap-[20px] my-[15px]">
            <div className="card">
              <div className="card-inner">
                <h3 className="font-bold text-[#1D5B79]">On-Going Contracts</h3>
                <BsFillArchiveFill className="card_icon" />
              </div>
              <h1 className="font-medium text-[#1D5B79]">
                {requestDetails.length}
              </h1>
            </div>
            <div className="card">
              <div className="card-inner">
                <h3 className="font-bold text-[#1D5B79]">
                  Completed Contracts
                </h3>
                <BsPeopleFill className="card_icon" />
              </div>
              <h1 className="font-medium text-[#1D5B79]">
                {finishDetails.length}
              </h1>
            </div>
            <div className="card">
              <div className="card-inner">
                <h3 className="font-bold text-[#1D5B79]">Total Projects</h3>
                <BsClipboard2DataFill className="card_icon" />
              </div>
              <h1 className="font-medium text-[#1D5B79]">{finishDetails.length + requestDetails.length}</h1>
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
                  <h3 className="font-extrabold text-xl text-[#F5F5DC]">
                    Marketplace
                  </h3>
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
                <Link to={`/client/projects/${userId}`}>
                  <button
                    type="button"
                    className="font-extrabold text-xl text-[#F5F5DC]"
                  >
                    Projects
                  </button>
                </Link>
              </div>
            </div>

            <Link to={`/client/leaderboard/${userId}`}>
              <div
                className="flex flex-col justify-around rounded-lg"
                style={{
                  background: `url(${BGsubs})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover", // Ensure the image covers the entire div
                }}
              >
                <div className="flex justify-center items-center py-14">
                  <h3 className="font-extrabold text-xl text-[#F5F5DC]">
                    Leaderboards
                  </h3>
                </div>
              </div>
            </Link>
          </div>
          <div>
            <h2 className="text-2xl justify-center place-content-center font-semibold text-[#F5F5DC]">
              Pending Contracts
            </h2>
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

export default WithAuth(CDashboard);
