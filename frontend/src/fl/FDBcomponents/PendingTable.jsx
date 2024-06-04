import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import WithAuth from "../../auth/WithAuth";
import Loader from "../../assets/quircomloading.gif";
import { FaCheck, FaXmark } from "react-icons/fa6";

const PendingTable = () => {
  const { userId } = useParams();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [requestDetails, setRequest] = useState([]);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setToken(localStorage.getItem("authToken"));
  }, []);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
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
              request.serviceId && 
              request.serviceId.freelancerId &&
              request.serviceId.freelancerId._id === userId &&
              request.status === "Pending"
          );
          setRequest(filteredRequests);
          setLoading(false);
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

    if (token) {
      fetchRequests();
    }
  }, [userId, token]);

  const handleApprove = async (id) => {
    if (!id) {
      toast.error("Error Approval");
      return;
    }
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      await axios.patch(
        `https://quircom.onrender.com/api/request/verify/${id}`,
        {
          status: "Ongoing",
        },
        { headers }
      );
      // Refresh requests after approval
    } catch (error) {
      console.error("Error during approval: ", error.response);
    }
  };

  const handleReject = async (id) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      await axios.patch(
        `https://quircom.onrender.com/api/request/verify/${id}`,
        {
          status: "Declined",
        },
        { headers }
      );
      // Refresh requests after rejection
      fetchRequests();
    } catch (error) {
      console.error("Error during rejection: ", error.response);
    }
  };

  const handleSubmit = async (id, action) => {
    if (action === "approve") {
      handleApprove(id);
    } else if (action === "reject") {
      handleReject(id);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="flex flex-col justify-center items-center w-[100%]">
      <ToastContainer />
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
                Client Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold">
                Availed Service
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold">
                Task Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold">
                Task Details
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold">
                Deadline
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold">
                Approval
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr className="w-full">
                <td colSpan="7" className="py-11">
                  <img
                    className="mx-auto w-16 h-16"
                    src={Loader}
                    alt="Loading..."
                  />
                </td>
              </tr>
            ) : requestDetails.length === 0 ? (
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
                        {row.clientId.firstName + " " + row.clientId.surName}
                      </td>
                      <td className="px-6 py-4 text-left">
                        {row.serviceId.serviceType}
                      </td>
                      <td className="px-6 py-4 text-left">{row.taskTitle}</td>
                      <td className="px-6 py-4 text-left">{row.taskDetails}</td>
                      <td className="px-6 py-4 text-left">
                        {new Date(row.deadLine).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-left">
                        <div className="flex">
                        <button
                          type="button"
                          onClick={() => handleSubmit(row._id, "approve")}
                          className="mr-2 px-2 py-1 bg-green-500 rounded text-white"
                        >
                          <FaCheck className="inline" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSubmit(row._id, "reject")}
                          className="px-2 py-1 bg-red-500 rounded text-white"
                        >
                          <FaXmark className="inline" />
                        </button>
                        </div>
                      </td>
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

export default WithAuth(PendingTable);
