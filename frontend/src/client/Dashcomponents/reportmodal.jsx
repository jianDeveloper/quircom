import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const reportmodal = ({ requestInfos, setreportModal }) => {
  const [invalidFields, setInvalidFields] = useState({});
  const [formData, setFormData] = useState({
    details: "",
    reportType: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!formData.reportType) {
      toast.error("Please input report type");
      return;
    }
    if(formData.reportType === "Other"){
      if (formData.details.length <= 5) {
        toast.error("Please input atleast 5 characters");
        return;
      }
    }

    try {
      const token = localStorage.getItem("authToken");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const requestBody = {
        report: {
          reportType: formData.reportType,
          details: formData.details
        },
      };

      const response = await axios.patch(
        `https://quircom.onrender.com/api/request/report/${requestInfos._id}`,
          requestBody,
        { headers }
      );

      if (response && response.data) {
        toast.success("Report has been submitted", {
          autoClose: 1000,
          onClose: () => {
            setTimeout(() => {
              setreportModal(false);
            }, 1000);
          },
        });
      } else {
        // console.log("Response data not available");
        toast.error("Failed to submit report");
      }
    } catch (error) {
      console.error("Error during patch ", error.response);
      // console.log(error.message);
      toast.error("Failed to submit report");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        style={{ background: "rgba(0,0,0,0.2)" }}
      >
        <div className="relative w-2/4 my-6 mx-auto">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full text-black bg-white outline-none focus:outline-none">
            <div className="flexitems-start justify-between p-5 bg-red-500 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl text-white text-center font-semibold">
                Report
              </h3>
            </div>
            {/* Creating Form */}
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
                    Project
                  </label>
                  <input
                    type="text"
                    value={requestInfos.taskTitle}
                    disabled
                    className={`mt-1 relative rounded-md shadow-sm border border-gray-300 px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm  ${
                      invalidFields.serviceName ? "border-red-500" : ""
                    }`}
                  />
                  <label
                    htmlFor="reportType"
                    className="block text-md font-extrabold text-gray-700 pb-1 border-b border-gray-300"
                  >
                    Report Type
                  </label>
                  <select
                    id="reportType"
                    name="reportType"
                    value={formData.reportType}
                    onChange={handleChange}
                    className={`mt-1 relative rounded-md shadow-sm border border-gray-300 px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm  ${
                      invalidFields.serviceName ? "border-red-500" : ""
                    }`}
                  >
                    <option value="">Select Report Type</option>
                    <option value="Scammer">Scammer</option>
                    <option value="Violation of Contract">Violation of Contract</option>
                    <option value="Inappropriate Speech">Inappropriate Speech</option>
                    <option value="Project Delay">
                      Project Delay
                    </option>
                    <option value="Other">
                      Other
                    </option>
                  </select>
                  <label
                    htmlFor="taskDetails"
                    className={`block mt-4 text-md font-extrabold text-gray-700 pb-1 border-b border-gray-300`}
                  >
                    If others, please specify:
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="details"
                      name="details"
                      value={formData.details}
                      onChange={handleChange}
                      rows={4}
                      disabled={formData.reportType !== "Other"}
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 px-3 py-2 ${
                        invalidFields.serviceInfo ? "border-red-500" : ""
                      }`}
                    />

                  </div>

                  <div className="flex flex-row justify-between gap-12">
                    <div className="w-[50%]">
                      <label
                        htmlFor="freelancerId"
                        className="block mt-4 text-md font-extrabold text-gray-700 pb-1 border-b border-gray-300"
                      >
                        Reported By
                      </label>
                      <div className="mt-1 flex px-3 py-2">
                        <input
                          type="text"
                          id="freelancerId"
                          name="freelancerId"
                          value={
                            requestInfos.clientId.firstName +
                            " " +
                            requestInfos.clientId.surName
                          }
                          disabled
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
                  className="text-emerald-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setreportModal(false)

                  }
                >
                  Cancel
                </button>
                <button
                  className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                >
                  Report
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

export default reportmodal;
