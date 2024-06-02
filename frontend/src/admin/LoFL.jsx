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
        setFreelancers(response.data);
        //console.log(response.data);
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

  const deleteUser = async (freelancerId) => {
    try {
      const token = localStorage.getItem("adminToken");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.delete(
        `https://quircom.onrender.com/api/freelancer/delete/${freelancerId}`,
        { headers }
      );

      if (response.status === 200) {
        setFreelancers((prevFreelancers) =>
          prevFreelancers.filter((freelancer) => freelancer._id !== freelancerId)
        );
        toast.success("User deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user");
    }
  };

  const confirmDeleteUser = (freelancerId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(freelancerId);
    }
  };

  return (
    <div className="flex flex-col items-center h-auto w-[90%]">
      <ToastContainer />
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
      <div className="w-full bg-blue-200 shadow-md overflow-y-auto h-auto">
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
            {freelancers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((freelancer, index) => (
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
                  <td className="px-6 py-2 text-left">
                    {freelancer.contactNum}
                  </td>
                  <td className="px-6 py-2 text-left">
                    <button
                      onClick={() =>
                        handlePortfolioClick(
                          freelancer.portFolio
                            ? freelancer.portFolio.link
                            : null
                        )
                      }
                      className="text-blue-500 underline"
                    >
                      View Portfolio
                    </button>
                  </td>
                  <td className="px-6 py-2 text-left">
                    <button
                      type="button"
                      onClick={() => confirmDeleteUser(freelancer._id)}
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
