import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import WithAuth from "../../auth/WithAuth";

const addReqModal = ({ setReqModal }) => {
  const { userId } = useParams();
  const { serviceId } = useParams();
  const [userData, setUsers] = useState();
  const [serviceData, setService] = useState();
  const [invalidFields, setInvalidFields] = useState({});

  const [formData, setFormData] = useState({
    clientId: userId,
    serviceId: serviceId,
    taskTitle: "",
    taskDetails: "",
    deadLine: "",
    dateUploaded: new Date().toISOString(),
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
        const response = await axios.get(
          `https://quircom.onrender.com/api/client/${userId}`,
          { headers }
        );
        if (response.status === 200) {
          setUsers(response.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [userId]);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
        const response = await axios.get(
          `https://quircom.onrender.com/api/service/${serviceId}`,
          { headers }
        );
        if (response.status === 200) {
          setService(response.data);
        }
      } catch (error) {
        console.error("Error fetching service:", error);
      }
    };

    fetchService();
  }, [serviceId]);

  useEffect(() => {
    if (serviceData?.serviceType) {
      const currentDate = new Date();
      let offsetDays = 0;

      if (["Animation", "Graphic Design", "Graphic Motion"].includes(serviceData.serviceType)) {
        offsetDays = 14; // 2 weeks
      } else if (["Software Development", "Web Development"].includes(serviceData.serviceType)) {
        offsetDays = 30; // 1 month
      }

      const minDate = new Date(currentDate.setDate(currentDate.getDate() + offsetDays))
        .toISOString()
        .slice(0, 10);

      setFormData((prevFormData) => ({
        ...prevFormData,
        deadLine: minDate,
      }));
    }
  }, [serviceData]);

  console.log(serviceData?.serviceType);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    setInvalidFields({});

    const errors = {};
    if (formData.taskTitle.length === 0) {
      errors.taskTitle = "Please input your title";
    }
    if (formData.taskDetails.length <= 20) {
      errors.taskDetails = "Please input at least 20 characters";
    }
    if (!formData.deadLine) {
      // If deadline is not provided
      errors.deadLine = "Deadline is required";
    } else if (new Date(formData.deadLine) - new Date() <= 3 * 24 * 60 * 60 * 1000) {
      // If deadline is less than 3 days from now
      errors.deadLine = "Deadline must be at least 3 days from now";
    }

    setInvalidFields(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `https://quircom.onrender.com/api/request/create`,
        formData,
        { headers }
      );

      if (response && response.data) {
        toast.success("Request uploaded successfully", {
          autoClose: 1000,
          onClose: () => {
            setTimeout(() => {
              setReqModal(false);
            }, 1000);
          },
        });
      } else {
        toast.error("Failed to upload request");
      }
    } catch (error) {
      console.error("Error during patch ", error.response);
      toast.error("Failed to upload request");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <ToastContainer />
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        style={{ background: "rgba(0,0,0,0.2)" }}
      >
        <div className="relative w-2/4 my-6 mx-auto">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full text-black bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 bg-[#1d5b79] border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl text-white text-center font-semibold">
                Request Form
              </h3>
            </div>
            <form
              className="w-full max-w-screen-ss mx-auto"
              onSubmit={handleSubmit}
            >
              <div className="relative flex flex-col overflow-y-auto max-h-[400px] px-6 py-4">
                <div className="space-y-6">
                  <label
                    htmlFor="taskTitle"
                    className="block text-md font-extrabold text-gray-700 pb-1 border-b border-gray-300"
                  >
                    Task Title
                  </label>
                  <input
                    type="text"
                    id="taskTitle"
                    name="taskTitle"
                    value={formData.taskTitle}
                    onChange={handleChange}
                    className={`mt-1 relative rounded-md shadow-sm border border-gray-300 px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm  ${
                      invalidFields.taskTitle ? "border-red-500" : ""
                    }`}
                  />
                  {invalidFields.taskTitle && (
                    <p className="text-red-500 text-[12px]">
                      {invalidFields.taskTitle}
                    </p>
                  )}

                  <label
                    htmlFor="taskDetails"
                    className={`block mt-4 text-md font-extrabold text-gray-700 pb-1 border-b border-gray-300`}
                  >
                    Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="taskDetails"
                      name="taskDetails"
                      value={formData.taskDetails}
                      onChange={handleChange}
                      rows={4}
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 px-3 py-2 ${
                        invalidFields.taskDetails ? "border-red-500" : ""
                      }`}
                    />
                    {invalidFields.taskDetails && (
                      <p className="text-red-500 text-[12px]">
                        {invalidFields.taskDetails}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-row justify-between gap-12">
                    <div className="w-[50%]">
                      <label
                        htmlFor="deadLine"
                        className={`block mt-4 text-md font-extrabold text-gray-700 pb-1 border-b border-gray-300`}
                      >
                        Estimated Deadline
                      </label>
                      <div className="mt-1 flex px-3 py-2">
                        <input
                          type="date"
                          id="deadLine"
                          name="deadLine"
                          min={formData.deadLine}
                          value={formData.deadLine}
                          onChange={handleChange}
                          className={`focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm p-2 shadow-sm border border-gray-300 ${
                            invalidFields.deadLine ? "border-red-500" : ""
                          }`}
                        />
                      </div>
                      {invalidFields.deadLine && (
                        <p className="text-red-500 ml-2 text-[12px]">
                          {invalidFields.deadLine}
                        </p>
                      )}
                    </div>
                    <div className="w-[50%]">
                      <label
                        htmlFor="dateUploaded"
                        className="block mt-4 text-md font-extrabold text-gray-700 pb-1 border-b border-gray-300"
                      >
                        Request Date
                      </label>
                      <div className="mt-1 flex px-3 py-2">
                        <input
                          type="text"
                          id="dateUploaded"
                          name="dateUploaded"
                          value={new Date(formData.dateUploaded).toLocaleString()}
                          readOnly
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm p-2 shadow-sm border border-gray-300"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between gap-12">
                    <div className="w-[50%]">
                      <label
                        htmlFor="freelancerId"
                        className="block mt-4 text-md font-extrabold text-gray-700 pb-1 border-b border-gray-300"
                      >
                        Tasked By
                      </label>
                      <div className="mt-1 flex px-3 py-2">
                        <input
                          type="text"
                          id="freelancerId"
                          name="freelancerId"
                          value={`${userData?.firstName || ""} ${
                            userData?.surName || ""
                          }`}
                          readOnly
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm p-2 shadow-sm border border-gray-300"
                        />
                      </div>
                    </div>
                    <div className="w-[50%]"></div>
                  </div>
                </div>
              </div>

              {/* Add Close Button and Add Button */}
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setReqModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                >
                  Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default WithAuth(addReqModal);
