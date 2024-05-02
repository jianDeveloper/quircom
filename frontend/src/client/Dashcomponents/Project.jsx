import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { ToastContainer } from "react-toastify";

import CMainNav from "../CMainNav";
import CFooter from "../CFooter";

import BG1 from "../../assets/bg1.png";

import ProjectCompleteList from "./ProjectCompleteList";
import ProjectChat from "./ProjectChat";

const Project = () => {
  const { userId } = useParams();
  const [requestInfos, setRequestInfos] = useState([]);
  const [requestDetails, setRequest] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const response = await axios.get(
          `https://quircom.onrender.com/api/request/`,
          { headers }
        );
        if (response.status === 200) {
          const filteredRequests = response.data.filter(
            (request) =>
              request?.clientId?._id === userId && request?.status === "Ongoing"
          );
          setRequest(filteredRequests);
          setLoading(false);
        } else {
          console.error(
            "Error fetching requests: Unexpected status code",
            response.status
          );
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
        setLoading(false);
      }
    };

    fetchRequests();
  }, [userId]);

  const handleTableRowClick = (request) => {
    setRequestInfos(request);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date
      .getDate()
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
    return formattedDate;
  };

  console.log("current:", requestInfos);
  return (
    <div>
      <ToastContainer />
      <CMainNav />
      <div
        className="flex flex-col"
        style={{
          background: `url(${BG1})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="grid grid-cols-5 justify-center py-10 px-14 gap-10">
          {/* 1st column Grid - List Projects */}
          <div className="col-span-2 mr-2 ">
            <div className="flex gap-4 items-baseline w-auto">
              <h1 className="font-extrabold text-sm uppercase border-b-2 border-[#1D5B79] mb-3 text-[#1D5B79]">
                List of Projects
              </h1>
              <h1 className="font-extrabold rounded-md text-xs uppercase text-[#1D5B79] px-1 cursor-pointer hover:bg-blue-100">
                Completed
              </h1>
            </div>
            <div className="bg-white min-h-[500px] rounded-lg">
              <table className="min-w-full rounded-t-lg shadow-md">
                <thead className="bg-[#1d5b79] text-white">
                  <tr>
                    <th className="px-2 py-1 text-left text-sm font-bold rounded-tl-lg">
                      ID
                    </th>
                    <th className="px-2 py-1 text-left text-sm font-bold">
                      Availed Service
                    </th>
                    <th className="px-2 py-1 text-left text-sm font-bold rounded-tr-lg">
                      Deadline
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <>
                      <tr>
                        <td className="px-2 py-1 text-left text-sm font-bold">
                          <div className="animate-pulse h-5 bg-gray-200 rounded-full"></div>
                        </td>
                        <td className="px-2 py-1 text-left text-sm font-bold">
                          <div className="animate-pulse h-5 bg-gray-200 rounded-full"></div>
                        </td>
                        <td className="px-2 py-1 text-left text-sm font-bold">
                          <div className="animate-pulse h-5 bg-gray-200 rounded-full"></div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-2 py-1 text-left text-sm font-bold">
                          <div className="animate-pulse h-5 bg-gray-200 rounded-full"></div>
                        </td>
                        <td className="px-2 py-1 text-left text-sm font-bold">
                          <div className="animate-pulse h-5 bg-gray-200 rounded-full"></div>
                        </td>
                        <td className="px-2 py-1 text-left text-sm font-bold">
                          <div className="animate-pulse h-5 bg-gray-200 rounded-full"></div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-2 py-1 text-left text-sm font-bold">
                          <div className="animate-pulse h-5 bg-gray-200 rounded-full"></div>
                        </td>
                        <td className="px-2 py-1 text-left text-sm font-bold">
                          <div className="animate-pulse h-5 bg-gray-200 rounded-full"></div>
                        </td>
                        <td className="px-2 py-1 text-left text-sm font-bold">
                          <div className="animate-pulse h-5 bg-gray-200 rounded-full"></div>
                        </td>
                      </tr>
                    </>
                  ) : (
                    <>
                      {requestDetails.map((request, index) => (
                        <tr
                          key={index}
                          className={`${
                            index % 2 === 0 ? "bg-blue-100" : "bg-white"
                          } hover:bg-orange-100 border-l border-r border-gray-200 cursor-pointer`}
                          onClick={() => handleTableRowClick(request)}
                        >
                          <td className="px-2 py-1 text-left text-sm font-bold">
                            {request.requestId}
                          </td>
                          <td className="px-2 py-1 text-left text-sm font-bold">
                            <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                              {request.taskTitle}
                            </span>
                          </td>
                          <td className="px-2 py-1 text-left text-sm font-bold ">
                            {formatDate(request.deadLine)}
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {/* 2nd column Grid - Chat */}
          <div className="col-span-3 flex flex-col h-full">
            <ProjectChat requestInfos={requestInfos} />
          </div>
          {/* End of 2nd column */}
        </div>
      </div>
      <CFooter />
    </div>
  );
};

export default Project;
