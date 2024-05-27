import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import WithAuth from "../../auth/WithAuth";

const detailsModal = ({ setdetailsModal, requestInfos }) => {
  const { userId } = useParams();
  const [serviceData, serService] = useState();
  const [thumbNail, setThumbnail] = useState();
  const [invalidFields, setInvalidFields] = useState({});

  const [formData, setFormData] = useState({
    serviceName: "",
    serviceType: "",
    serviceInfo: "",
    price: "",
    requestId: [],
    freelancerId: userId,
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
          `https://quircom.onrender.com/api/service/${requestInfos.serviceId._id}`,
          { headers }
        );
        if (response.status === 200) {
          serService(response.data);
          // setFormData({ requestId: response.data.requestId });
          // setFormData({ freelancerId: response.data._id });
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    setInvalidFields({});

    const errors = {};
    if (formData.serviceName.length === 0) {
      errors.serviceName = "Please input your title";
    }
    if (!formData.serviceType) {
      errors.serviceType = "Please select a service type";
    }
    if (formData.serviceInfo.length <= 20) {
      errors.serviceInfo = "Please input atleast 20 characters";
    }
    if (formData.price.length === 0) {
      errors.price = "Please input your price";
    }
    if (!thumbNail) {
      errors.thumbNail = "Please upload a thumbnail";
    }

    setInvalidFields(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const formObj = new FormData();
      formObj.append("service", JSON.stringify(formData));
      formObj.append("file", thumbNail);
      formObj.append("dateUpdated", null);

      const token = localStorage.getItem("authToken");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };
      const response = await axios.post(
        `https://quircom.onrender.com/api/service/create/`,
        formObj,
        {
          headers,
        }
      );

      if (response && response.data) {
        //console.log(response.data);
        toast.success("Service uploaded successfully");
        setaddModal(false);
      } else {
        // console.log("Response data not available");
        toast.error("Failed to upload Service");
      }
    } catch (error) {
      console.error("Error during patch ", error.response);
      // console.log(error.message);
      toast.error("Failed to upload Service");
    }
  };

  const handleImage = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

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
            <div className="flexitems-start justify-between p-5 bg-[#1d5b79] border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl text-white text-center font-semibold">
                Details of Service
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
                    htmlFor="serviceName"
                    className="block text-md font-extrabold text-gray-700 pb-1 border-b border-gray-300"
                  >
                    Service Title
                  </label>
                  <input
                    type="text"
                    id="serviceName"
                    name="serviceName"
                    value={formData.serviceName}
                    disabled // Set disabled here
                    className={`mt-1 relative rounded-md shadow-sm border border-gray-300 px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm`}
                  />
                  <label
                    htmlFor="serviceType"
                    className={`block mt-4 text-md font-extrabold text-gray-700 pb-1 border-b border-gray-300`}
                  >
                    Service Type
                  </label>

                  <div className="mt-1 relative">
                    <input
                      type="text"
                      id="serviceName"
                      name="serviceName"
                      value={formData.serviceType}
                      disabled // Set disabled here
                      className={`mt-1 relative rounded-md shadow-sm border border-gray-300 px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm`}
                    />
                  </div>
                  <label
                    htmlFor="serviceInfo"
                    className={`block mt-4 text-md font-extrabold text-gray-700 pb-1 border-b border-gray-300`}
                  >
                    Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="serviceInfo"
                      name="serviceInfo"
                      value={formData.serviceInfo}
                      disabled // Set disabled here
                      rows={4}
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 px-3 py-2`}
                    />
                  </div>
                </div>
              </div>

              {/* Add Close Button and Add Button */}
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-white bg-red-500 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 rounded-md ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setdetailsModal(false)}
                >
                  Close
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

export default WithAuth(detailsModal);
