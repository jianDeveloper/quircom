import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { FaPersonDotsFromLine } from "react-icons/fa6";
import WithAuthAdmin from "../auth/WithAuthAdmin";
import Loader from "../assets/quircomloading.gif"; // Assuming you have a loading gif
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoFL = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
  };

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const response = await axios.get(
          `https://quircom.onrender.com/api/freelancer`,
          { headers }
        );
        setFreelancers(response.data);
        console.log(response.data);
      } catch (error) {
        setError("Error fetching user data");
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFreelancers();
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

  const handlePortfolioClick = (link) => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    } else {
      toast.error("Portfolio is not available");
    }
  };

  return (
    <div className="flex flex-col bg-blue-200 items-center h-full w-[90%]">
      <ToastContainer />
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
                Freelancer Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold">
                Username
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold">Email</th>
              <th className="px-6 py-3 text-left text-sm font-bold">Contact</th>
              <th className="px-6 py-3 text-left text-sm font-bold">
                Portfolio
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold">Action</th>
            </tr>
          </thead>
          <tbody className="">
            {freelancers.slice(0, rowsPerPage).map((freelancer) => (
              <tr
                key={freelancer._id}
                className="border-b bg-blue-200 text-[#13334C]"
              >
                <td className="px-6 py-4 text-left">
                  {freelancer.firstName + " " + freelancer.surName}
                </td>
                <td className="px-6 py-4 text-left">{freelancer.userName}</td>
                <td className="px-6 py-4 text-left">{freelancer.eMail}</td>
                <td className="px-6 py-4 text-left">{freelancer.contactNum}</td>
                <td className="px-6 py-4 text-left">
                  <button
                    onClick={() =>
                      handlePortfolioClick(
                        freelancer.portFolio ? freelancer.portFolio.link : null
                      )
                    }
                    className="text-blue-500 underline"
                  >
                    View Portfolio
                  </button>
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

export default WithAuthAdmin(LoFL);
