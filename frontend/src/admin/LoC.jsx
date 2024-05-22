import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { FaPersonDotsFromLine } from "react-icons/fa6";
import WithAuthAdmin from "../auth/WithAuthAdmin";
import Loader from "../assets/quircomloading.gif"; // Assuming you have a loading gif

const LoC = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const response = await axios.get(
          `https://quircom.onrender.com/api/client`,
          { headers }
        );
        setClients(response.data);
      } catch (error) {
        setError("Error fetching user data");
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
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
                Clients Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold">
                Username
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold">Email</th>
              <th className="px-6 py-3 text-left text-sm font-bold">Contact</th>
              <th className="px-6 py-3 text-left text-sm font-bold">
                Subscription
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold">Action</th>
            </tr>
          </thead>
          <tbody className="">
            {clients.slice(0, rowsPerPage).map((client) => (
              <tr
                key={client._id}
                className="border-b bg-blue-200 text-[#13334C]"
              >
                <td className="px-6 py-4 text-left">
                  {client.firstName + " " + client.surName}
                </td>
                <td className="px-6 py-4 text-left">{client.userName}</td>
                <td className="px-6 py-4 text-left">{client.eMail}</td>
                <td className="px-6 py-4 text-left">{client.contactNum}</td>
                <td className="px-6 py-4 text-left">
                  {client.subs.status ? "Subscribed" : "Not Subscribed"}{" "}
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

export default WithAuthAdmin(LoC);
