import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AddModal from "./addServiceModal";
import Deletion from "./deleteModal";
import UpdateModal from "./updateModal";
import Loader from "../../assets/quircomloading.gif";

import { MdDesignServices } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import { AiFillPlusCircle } from "react-icons/ai";
import WithAuth from "../../auth/WithAuth";

const serviceColumns = [
  { id: "serviceID", label: "Service ID", minWidth: 100, align: "center" },
  { id: "serviceTitle", label: "Service Title", minWidth: 170 },
  {
    id: "serviceDetails",
    label: "Details",
    minWidth: 200,
    align: "left",
  },
  {
    id: "servicePrice",
    label: "Service Price",
    minWidth: 100,
    align: "center",
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 100,
    align: "center",
  },
];

const ServiceTable = () => {
  // ============================= USESTATE DECLARATION =============================
  const [addModal, setaddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { userId } = useParams();
  const [serviceDetails, setService] = useState([]);
  const [serviceInfos, setServiceInfos] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem("authToken");
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
          setLoading(false);
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
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-full">
        <div className="flex justify-between items-center p-2 bg-[#13334C] text-white">
          <button
            type="button"
            onClick={() => setaddModal(true)}
            className="px-4 py-2 bg-blue-500 rounded text-white"
          >
            <div className="flex flex-row items-center justify-center space-x-2">
              <AiFillPlusCircle size={20} />
              <h1>Add Service</h1>
            </div>
          </button>
          {addModal && <AddModal setaddModal={setaddModal} />}
          <div className="text-white">
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
        </div>
        <div className="w-full bg-white shadow-md overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-[#1d5b79] text-white">
              <tr>
                {serviceColumns.map((column) => (
                  <th
                    key={column.id}
                    className={`px-6 py-3 text-left text-sm font-bold ${
                      column.align === "center" ? "text-center" : "text-left"
                    }`}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr className="w-full">
                  <td colSpan="5" className="py-11">
                    <img className="mx-auto w-16 h-16"
                    src={Loader}
                    alt="Loading..."
                  />
                  </td>
                </tr>
              ) : serviceDetails.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-11 text-center">
                    No service at the moment, try adding one
                  </td>
                </tr>
              ) : (
                serviceDetails
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((service, rowIndex) => {
                    return (
                      <tr key={rowIndex} className="border-b">
                        <td className="px-6 py-4 text-center">
                          {service?.serviceId}
                        </td>
                        <td className="px-6 py-4">{service?.serviceName}</td>
                        <td className="px-6 py-4 overflow-hidden max-w-[25rem]">
                          <div
                            className={`whitespace-pre-wrap ${
                              service?.serviceInfo?.length > 20
                                ? "break-words"
                                : ""
                            }`}
                          >
                            {service?.serviceInfo}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          ₱ {Number(service.price).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="space-x-2">
                            <button
                              type="button"
                              onClick={() => {
                                setUpdateModal(true);
                                handleView({ ...service });
                              }}
                              className="px-2 py-1 bg-blue-500 rounded text-white"
                            >
                              <MdDesignServices className="inline" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setDeleteModal(true);
                                handleView({ ...service });
                              }}
                              className="px-2 py-1 bg-red-500 rounded text-white"
                            >
                              <FaTrashCan className="inline" />
                            </button>
                          </div>
                          {deleteModal && (
                            <Deletion
                              serviceInfos={serviceInfos}
                              setDeleteModal={setDeleteModal}
                            />
                          )}
                          {updateModal && (
                            <UpdateModal
                              serviceInfos={serviceInfos}
                              setUpdateModal={setUpdateModal}
                            />
                          )}
                        </td>
                      </tr>
                    );
                  })
              )}
            </tbody>
          </table>
        </div>
        {/* <Modal/> */}
      </div>
    </div>
  );
};

export default WithAuth(ServiceTable);
