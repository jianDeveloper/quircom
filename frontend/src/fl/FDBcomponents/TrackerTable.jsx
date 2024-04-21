import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Confirmation from "./confirmModal";
import Convo from "./convoModal";

import { MdDesignServices } from "react-icons/md";
import { FaFileCircleCheck } from "react-icons/fa6";

const FTable = () => {
  const { userId } = useParams();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [confirmModal, setConfirmModal] = useState(false);
  const [convoModal, setConvoModal] = useState(false);
  const [requestDetails, setRequest] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`https://quircom.onrender.com/api/request/`);
        if (response.status === 200) {
          const filteredRequests = response.data.filter(
            (request) => request.serviceId.freelancerId._id === userId
          );
          setRequest(filteredRequests);
        } else {
          console.error("Error fetching requests: Unexpected status code", response.status);
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, [userId]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleView = (request) => {
    setServiceInfos(request);
  };
console.log("asdaw",requestDetails)
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
      <div className="w-full bg-white shadow-md">
        <table className="min-w-full">
          <thead className="bg-[#1d5b79] text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-bold">Ticket ID</th>
              <th className="px-6 py-3 text-left text-sm font-bold">Client Name</th>
              <th className="px-6 py-3 text-left text-sm font-bold">Availed Service</th>
              <th className="px-6 py-3 text-left text-sm font-bold">Task Details</th>
              <th className="px-6 py-3 text-left text-sm font-bold">Deadline</th>
              <th className="px-6 py-3 text-left text-sm font-bold">Status</th>
              <th className="px-6 py-3 text-left text-sm font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requestDetails.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-11 text-center">
                    No client request at the moment...
                  </td>
                </tr>
              ) :requestDetails
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => {
                return (
                  <tr key={rowIndex} className="border-b">
                    <td className="px-6 py-4 text-left">{row.requestId}</td>
                    <td className="px-6 py-4 text-left">{row.clientId.firstName + " " + row.clientId.surName}</td>
                    <td className="px-6 py-4 text-left">{row.serviceId.serviceType}</td>
                    <td className="px-6 py-4 text-left">{row.taskDetails}</td>
                    <td className="px-6 py-4 text-left">
                      {new Date(row.deadLine).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-left">{row.status}</td>
                    <td className="px-6 py-4 text-left">
                      <button
                        type="button"
                        onClick={() => setConvoModal(true)}
                        className="mr-2 px-2 py-1 bg-blue-500 rounded text-white"
                      >
                        <MdDesignServices className="inline" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmModal(true)}
                        className="px-2 py-1 bg-orange-500 rounded text-white"
                      >
                        <FaFileCircleCheck className="inline" />
                      </button>
                      {confirmModal && <Confirmation setConfirmModal={setConfirmModal} />}
                      {convoModal && <Convo setConvoModal={setConvoModal} />}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {/* Pagination can be added here */}
      </div>
    </div>
  );
};

export default FTable;
