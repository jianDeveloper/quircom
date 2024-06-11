import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BsFillArchiveFill,
  BsPeopleFill,
  BsClipboard2DataFill,
} from "react-icons/bs";
import axios from "axios";
import TaskList from "./Dashcomponents/TaskList";
import CFooter from "./CFooter";

import { Link } from "react-router-dom";
import BG1 from "../assets/bg1.png";
import BGmark from "../assets/ser.png";
import BGtrack from "../assets/tra.png";
import BGsubs from "../assets/sub.png";
import BGfl from "../assets/BGfl.png";
import BGcoms from "../assets/BGcoms.png";
import CMainNav from "./CMainNav";
import WithAuth from "../auth/WithAuth";
import AddModal from "./Dashcomponents/addComsModal";

function CDashboard() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [addModal, setaddModal] = useState(false);
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
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error.message);
      });
  }, [userId]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `https://quircom.onrender.com/api/request/`,
          { headers }
        );
        if (response.status === 200) {
          const filteredRequest = (response.data || []).filter(
            (request) =>
              request.clientId && // Ensure clientId exists
              request.clientId._id === userId &&
              request.status === "Ongoing"
          );
          const filteredFinished = (response.data || []).filter(
            (request) =>
              request.clientId && // Ensure clientId exists
              request.clientId._id === userId &&
              request.status === "Complete"
          );
          setRequest(filteredRequest);
          setFinish(filteredFinished);
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

    fetchServices();
  }, [userId]);

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
              <h1 className="font-medium text-[#1D5B79]">
                {finishDetails.length + requestDetails.length}
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-[20px] my-[15px] md:grid-cols-2">
            <button
              onClick={() => setaddModal(true)}
              className="flex justify-around rounded-lg"
              style={{
                background: `url(${BGcoms})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <div className="flex justify-center items-center py-10">
                <h3 className="flex font-extrabold text-xl text-[#F5F5DC] gap-2">
                  Post <p>a</p>
                  <p>Commission</p>
                </h3>
              </div>
            </button>
            {addModal && <AddModal setaddModal={setaddModal} />}
            <Link to={`/client/browse-service/${userId}`}>
              <div
                className="flex justify-around rounded-lg"
                style={{
                  background: `url(${BGfl})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                <div className="flex justify-center items-center py-10">
                  <h3 className="flex font-extrabold text-xl text-[#F5F5DC] gap-2">
                    List <p>of</p>
                    <p>Applicants</p>
                  </h3>
                </div>
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-[20px] my-[15px] md:grid-cols-3">
            <Link to={`/client/browse-service/${userId}`}>
              <div
                className="flex flex-col justify-around rounded-lg"
                style={{
                  background: `url(${BGmark})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
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
                backgroundSize: "cover",
              }}
            >
              <Link to={`/client/projects/${userId}`}>
                <div className="flex justify-center items-center py-14">
                  <button
                    type="button"
                    className="font-extrabold text-xl text-[#F5F5DC]"
                  >
                    Projects
                  </button>
                </div>
              </Link>
            </div>
            <Link to={`/client/leaderboard/${userId}`}>
              <div
                className="flex flex-col justify-around rounded-lg"
                style={{
                  background: `url(${BGsubs})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
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
