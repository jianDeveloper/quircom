import React, { useState, useEffect } from "react";
import { FaTrash } from 'react-icons/fa';
import axios from "axios";
import { FaPersonDotsFromLine } from 'react-icons/fa6';
import Loader from "../assets/quircomloading.gif"; // Assuming you have a loading gif

const LoRepAcc = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleNextPage = () => {
    if ((page + 1) * rowsPerPage < freelancers.length) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
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
        if (response.status === 200) {
          const filteredRequests = response.data.filter(
            (freelancer) =>
              freelancer?.reported === true
          );
          setFreelancers(filteredRequests);
        }
        else {
          console.error(
            "Error fetching requests: Unexpected status code",
            response.status
          );
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
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
    <div className="flex flex-col bg-blue-200 items-center h-auto w-[90%]">
      <div className="flex flex-row w-[100%] bg-[#F5F5DC] justify-between  ">
      <div className="flex items-center py-2 px-5  text-[#13334C] font-medium">
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
      <div className="flex justify-between items-center py-2 px-5 bg-[#F5F5DC] text-[#13334C] font-medium gap-3">
          <button
            onClick={handlePreviousPage}
            disabled={page === 0}
            className="px-2 bg-blue-100 rounded text-[#13334C] border-[2px] border-[#13334C] disabled:opacity-50"
          >
            <p>{`<`}</p>
          </button>
          <span>
            Page {page + 1} of {Math.ceil(freelancers.length / rowsPerPage)}
          </span>
          <button
            onClick={handleNextPage}
            disabled={(page + 1) * rowsPerPage >= freelancers.length}
            className="px-2 bg-blue-100 rounded text-[#13334C] border-[2px] border-[#13334C] disabled:opacity-50"
          >
            {`>`}
          </button>
        </div>
      </div>
      <div className="w-full bg-white shadow-md h-auto">
        <table className="min-w-full">
          <thead className="bg-[#1d5b79] text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-bold">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold">
                Report Details
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold">Email</th>
              <th className="px-6 py-3 text-left text-sm font-bold">Contact</th>
              <th className="px-6 py-3 text-left text-sm font-bold">Action</th>
            </tr>
          </thead>
          <tbody>
          {freelancers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((freelancer, index) => (
              <tr
                key={freelancer._id}
                className={`${
                  index % 2 === 0 ? "bg-blue-200" : "bg-blue-100"
                } border-b text-[#13334C]`}
              >
                <td className="px-6 py-2 text-left">
                  {freelancer.firstName + " " + freelancer.surName}
                </td>
                <td className="px-6 py-2 text-left">{freelancer.userName}</td>
                <td className="px-6 py-2 text-left">{freelancer.eMail}</td>
                <td className="px-6 py-2 text-left">{freelancer.contactNum}</td>
                <td className="px-6 py-2 text-left">
                <button
                  type="button"
                  //   onClick={() => handleSubmit(row._id, "approve")}
                  className="mr-2 px-2 py-1 bg-blue-500 rounded text-white"
                >
                  <FaPersonDotsFromLine cl3assName="inline" />
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LoRepAcc