import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "axios";

import ReviewModal from "./reviewmodal";

const ProjectCompleteList = ({setReq}) => {
  const { userId } = useParams();
  const [requestInfos, setRequestInfos] = useState([]);
  const [requestDetails, setRequest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewModal, setreviewModal] = useState(false);

  const handleTableRowClick = (request) => {
    setRequestInfos(request);
  };

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
              request?.clientId?._id === userId &&
              request?.status === "Complete"
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

  return (
    <div className="bg-white min-h-[500px] rounded-lg">
      <ToastContainer/>
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
              Review
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
                  onClick={() =>setReq(request)}
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
                    <button
                      onClick={() => {
                        handleTableRowClick(request);
                        setreviewModal(true);                       
                      }}
                      className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Rate
                    </button>
                    {reviewModal && (
                      <ReviewModal requestInfos={requestInfos} setreviewModal={setreviewModal} />
                    )}
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectCompleteList;
