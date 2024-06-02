import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { FaPersonDotsFromLine } from "react-icons/fa6";
import WithAuthAdmin from "../auth/WithAuthAdmin";
import Loader from "../assets/quircomloading.gif"; // Assuming you have a loading gif
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoS = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleNextPage = () => {
    if ((page + 1) * rowsPerPage < services.length) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
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
      } catch (error) {
        setError("Error fetching service data");
        console.error("Error fetching service data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const deleteService = async (serviceId) => {
    try {
      const token = localStorage.getItem("adminToken");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.delete(
        `https://quircom.onrender.com/api/service/delete/${serviceId}`,
        { headers }
      );

      if (response.status === 200) {
        setServices((prevServices) =>
          prevServices.filter((service) => service._id !== serviceId)
        );
        toast.success("Service deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Error deleting service");
    }
  };

  const confirmDeleteService = (serviceId) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      deleteService(serviceId);
    }
  };

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
    <div className="flex flex-col bg-blue-200 items-center h-auto w-[90%]">
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
            Page {page + 1} of {Math.ceil(services.length / rowsPerPage)}
          </span>
          <button
            onClick={handleNextPage}
            disabled={(page + 1) * rowsPerPage >= services.length}
            className="px-2 bg-blue-100 rounded text-[#13334C] border-[2px] border-[#13334C] disabled:opacity-50"
          >
            {`>`}
          </button>
        </div>
      </div>
      <div className="w-full bg-white shadow-md overflow-y-auto h-auto">
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
            {services.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((service, index) => (
              <tr
                key={service._id}
                className={`${
                  index % 2 === 0 ? "bg-blue-200" : "bg-blue-100"
                } border-b text-[#13334C]`}
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
                    onClick={() => confirmDeleteService(service._id)}
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
