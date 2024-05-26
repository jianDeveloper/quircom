import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { IoEyeSharp } from "react-icons/io5";
import { IoChatboxEllipses } from "react-icons/io5";
import { FaFolder } from "react-icons/fa";

import CchatModal from "./chatModal";
import CdetailsModal from "./detailsModal";
import CfilesModal from "./filesModal";
import WithAuth from "../../auth/WithAuth";
import Loader from "../../assets/quircomloading.gif";

const TaskList = () => {
  const { userId } = useParams();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [requestDetails, setRequest] = useState([]);
  const [chatModal, setchatModal] = React.useState(false);
  const [detailsModal, setdetailsModal] = React.useState(false);
  const [filesModal, setfilesModal] = React.useState(false);
  const [requestInfos, setRequestInfos] = useState([]);
    const [loading, setLoading] = useState(true);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  //console.log(userId);
  //console.log(requestDetails);
  //console.log(requestInfos);
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
            (request) => request.clientId._id === userId && request.status === "Pending"
          );
          setRequest(filteredRequests);
        } else {
          console.error(
            "Error fetching requests: Unexpected status code",
            response.status
          );
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, [userId]);

  

  return (
    <div className="flex flex-col justify-center items-center w-[100%]">
      <div className="flex w-[100%] justify-end items-center p-2 bg-[#13334C] text-white">
        <span>Rows per page:</span>
        <select
          value={rowsPerPage}
          onChange={(e) => handleChangeRowsPerPage(e)}
          className="mx-2 px-2 py-1 bg-[#1d5b79] rounded text-white"
        >
          {[5, 10, 20].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full bg-white shadow-md overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-[#1d5b79] text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-bold">
                Ticket ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold">
                Freelancer Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold">
                Availed request
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold">
                Task Details
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold">
                Deadline
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
                <tr className="w-full">
                  <td colSpan="7" className="py-11">
                    <img className="mx-auto w-16 h-16"
                    src={Loader}
                    alt="Loading..."
                  />
                  </td>
                </tr>
              ) :requestDetails.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-11 text-center">
                  No client request at the moment...
                </td>
              </tr>
            ) : (
              requestDetails
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, rowIndex) => {
                  return (
                    <tr key={rowIndex} className="border-b">
                      <td className="px-6 py-4 text-left">{row.requestId}</td>
                      <td className="px-6 py-4 text-left">
                        {row.serviceId.freelancerId.firstName +
                          " " +
                          row.serviceId.freelancerId.surName}
                      </td>
                      <td className="px-6 py-4 text-left">
                        {row.serviceId.serviceType}
                      </td>
                      <td className="px-6 py-4 text-left">{row.taskDetails}</td>
                      <td className="px-6 py-4 text-left">
                        {new Date(row.deadLine).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-left">{row.status}</td>
                      
                    </tr>
                  );
                })
            )}
          </tbody>
        </table>
        {/* Pagination can be added here */}
      </div>
    </div>
  );
};

export default WithAuth(TaskList);
