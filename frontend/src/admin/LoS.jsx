import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


import { FaTrash } from 'react-icons/fa';
import { FaPersonDotsFromLine } from 'react-icons/fa6';

const LoS = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { userId } = useParams();
  const [serviceDetails, setService] = useState([]);
  const [serviceInfos, setServiceInfos] = useState([]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const response = await axios.get(
          `https://quircom.onrender.com/api/service/`,
          { headers }
        );
        if (response.status === 200) {
          const filteredServices = response.data.filter(
            (service) =>
              service.freelancerId && service.freelancerId._id === userId
          );
          setService(filteredServices);
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

  const handleView = (service) => {
    setServiceInfos(service);
  };

  return (
    <div className="flex flex-col bg-blue-200 items-center h-full w-[90%]">
      <div className="flex w-[100%] items-center py-2 px-5 bg-[#F5F5DC] text-[#13334C] font-medium">
        <span>Rows per page:</span>
        <select
          value={rowsPerPage}
          onChange={(e) => handleChangeRowsPerPage(e)}
          className="mx-2 px-2 py-1 bg-blue-100 rounded text-[#13334C] border-[2px] border-[#13334C]"
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
              <th className="px-6 py-3 text-left text-sm font-bold">
                Freelancer Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold">
                Service Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold">
                Service Prize
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold">
                Date Posted
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b bg-blue-200 text-[#13334C]">
              <td className="px-6 py-4 text-left">dfdf</td>
              <td className="px-6 py-4 text-left">dfdfdf dfdfdf</td>
              <td className="px-6 py-4 text-left">dfdf</td>
              <td className="px-6 py-4 text-left">dfdf</td>
              <td className="px-6 py-4 text-left">dfdf</td>
              <td className="px-6 py-4 text-left">
                <button
                  type="button"
                  //   onClick={() => handleSubmit(row._id, "approve")}
                  className="mr-2 px-2 py-1 bg-blue-500 rounded text-white"
                >
                  <FaPersonDotsFromLine className="inline" />
                </button>
                <button
                  type="button"
                  //   onClick={() => handleSubmit(row._id, "reject")}
                  className="px-2 py-1 bg-red-500 rounded text-white"
                >
                  <FaTrash className="inline" />
                </button>
              </td>
            </tr>
            <tr className="border-b bg-blue-100 text-[#13334C]">
              <td className="px-6 py-4 text-left">dfdf</td>
              <td className="px-6 py-4 text-left">dfdfdf dfdfdf</td>
              <td className="px-6 py-4 text-left">dfdf</td>
              <td className="px-6 py-4 text-left">dfdf</td>
              <td className="px-6 py-4 text-left">dfdf</td>
              <td className="px-6 py-4 text-left">
                <button
                  type="button"
                  //   onClick={() => handleSubmit(row._id, "approve")}
                  className="mr-2 px-2 py-1 bg-blue-500 rounded text-white"
                >
                  <FaPersonDotsFromLine className="inline" />
                </button>
                <button
                  type="button"
                  //   onClick={() => handleSubmit(row._id, "reject")}
                  className="px-2 py-1 bg-red-500 rounded text-white"
                >
                  <FaTrash className="inline" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LoS