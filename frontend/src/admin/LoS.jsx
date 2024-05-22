import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { FaPersonDotsFromLine } from "react-icons/fa6";
import WithAuthAdmin from "../auth/WithAuthAdmin";
import Loader from "../assets/quircomloading.gif"; // Assuming you have a loading gif

const LoS = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
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
          `https://quircom.onrender.com/api/service`,
          { headers }
        );
        setServices(response.data);
        console.log(response.data[0])
      } catch (error) {
        setError("Error fetching user data");
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src={Loader} className="w-[80px]" alt="Loading..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

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
      <div className="w-full bg-white shadow-md overflow-y-auto h-[400px]">
        <table className="min-w-full">
          <thead className="bg-[#1d5b79] text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-bold">
                Service Owner
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold">
                Service Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold">Service Type</th>
              <th className="px-6 py-3 text-left text-sm font-bold">Service Info</th>
              <th className="px-6 py-3 text-left text-sm font-bold">
                Service Price
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold">Action</th>
            </tr>
          </thead>
          <tbody className="">
            {services.slice(0, rowsPerPage).map((service) => (
              <tr
                key={service._id}
                className="border-b bg-blue-200 text-[#13334C]"
              >
                <td className="px-6 py-4 text-left">
                {service.freelancerId ? service.freelancerId.firstName : 'N/A'}
                </td>
                <td className="px-6 py-4 text-left">{service.serviceName}</td>
                <td className="px-6 py-4 text-left">{service.serviceType}</td>
                <td className="px-6 py-4 text-left">{service.serviceInfo}</td>
                <td className="px-6 py-4 text-left">
                {service.price}
                </td>
                <td className="px-6 py-4 text-left">
                  
                  <button
                    type="button"
                    className="px-2 py-1 bg-red-500 rounded text-white"
                  >
                    <FaTrash className="inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WithAuthAdmin(LoS);
