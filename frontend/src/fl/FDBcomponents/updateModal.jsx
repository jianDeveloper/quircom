import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const UpdateServiceModal = ({ setUpdateModal, serviceInfos }) => {
  
  const [userData, setUsers] = useState();
  const [thumbNail, setThumbnail] = useState();
  const [invalidFields, setInvalidFields] = useState({});

  const [formData, setFormData] = useState({
    serviceName: "",
    serviceType: "",
    serviceInfo: "",
    price: "",
    dateUpdated: new Date().toISOString,
  });

  const handleImage = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `https://quircom.onrender.com/api/service/${serviceInfos._id}`
        );
        if (response.status === 200) {
          setUsers(response.data);
          setFormData({
            serviceName: response.data.serviceName,
            serviceType: response.data.serviceType,
            serviceInfo: response.data.serviceInfo,
            price: response.data.price,
          });
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    setInvalidFields({});

    const isFormDataChanged =
    formData.serviceName !== userData.serviceName ||
    formData.serviceType !== userData.serviceType ||
    formData.serviceInfo !== userData.serviceInfo ||
    formData.price !== userData.price;

    const errors = {};
    if (!isFormDataChanged) {
      toast.error('No changes have been made');
      setDisabled(false);
      return;
    }
    if (formData.serviceName.length === 0) {
      errors.serviceName = "Please input your Title";
    }
    if (!formData.serviceType) {
      errors.serviceType = "Please select a Service type";
    }
    if (formData.serviceInfo.length <= 20) {
      errors.serviceInfo = "Please input atleast 20 characters";
    }
    if (formData.price.length === 0) {
      errors.price = "Please input your price";
    }

    setInvalidFields(errors);

    try {
      const formObj = new FormData();
      formObj.append("service", JSON.stringify(formData));
      formObj.append("file", thumbNail);

      const response = await axios.post(
        `https://quircom.onrender.com/api/service/edit/${serviceInfos._id}`,
        formObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response && response.data) {
        console.log(response.data);
        toast.success("Service updated successfully");
      } else {
        console.log("Response data not available");
        toast.error("Failed to update Service");
      }
    } catch (error) {
      console.error("Error during patch ", error.response);
      console.log(error.message);
      toast.error("Failed to update Service");
    }
  };

  console.log(formData)
  console.log(serviceInfos)

  // console.log("ito yun",serviceInfos._id)

  return (
    <div>
      <ToastContainer/>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" style={{background: "rgba(0,0,0,0.2)"}}>
        <div className="relative w-2/4 my-6 mx-auto">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flexitems-start justify-between p-5 bg-[#1d5b79] border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl text-white text-center font-semibold">
                Update Services
              </h3>
            </div>
            {/* Creating Form */}
            <form className="w-full max-w-screen-ss mx-auto" onSubmit={handleSubmit}>
              <div className="relative flex flex-col overflow-y-auto max-h-[400px] px-6 py-4">
                <div className="space-y-6">
                  <label
                    htmlFor="serviceName"
                    className="block text-left text-md font-extrabold text-gray-700 pb-1 border-b border-gray-300"
                  >
                    Service Title
                  </label>
                  <input
                    type="text"
                    id="serviceName"
                    name="serviceName"
                    value={formData.serviceName}
                    onChange={handleChange}
                    className="mt-1 relative rounded-md shadow-sm border border-gray-300 px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"             
                  />
                  <label
                    htmlFor="serviceType"
                    className="block text-left mt-4 text-md font-extrabold text-gray-700 pb-1 border-b border-gray-300"
                  >
                    Service Type
                  </label>
                  <div className="mt-1 relative">
                  <select
                        id="serviceType"
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                        className={`block w-full px-3 py-2 pr-10 text-base leading-6 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${invalidFields.serviceType ? "border-red-500" : ""}`}
                      >
                        <option value="">Set Account Type</option>
                        <option value="Animation">Animation</option>
                        <option value="Graphic Design">Graphic Design</option>
                        <option value="Graphic Motion">Graphic Motion</option>
                        <option value="Software Development">Software Development</option>
                        <option value="Web Development">Web Development</option>                                  
                      </select>
                    
                  </div>
                  <label
                    htmlFor="serviceInfo"
                    className="block text-left mt-4 text-md font-extrabold text-gray-700 pb-1 border-b border-gray-300"
                  >
                    Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="serviceInfo"
                      name="serviceInfo"
                      rows={4}
                      value={formData.serviceInfo}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 px-3 py-2"                      
                    />
                  </div>
                  <div className="flex flex-row justify-between gap-12">
                    <div className="w-[50%]">
                      <label
                        htmlFor="price"
                        className="block text-left mt-4 text-md font-extrabold text-gray-700 pb-1 border-b border-gray-300"
                      >
                        Price
                      </label>
                      <div className="mt-1 flex px-3 py-2">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                          PHP
                        </span>
                        <input
                          type="text"
                          id="price"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          inputMode="numeric"
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-r-md sm:text-sm p-2 shadow-sm border border-gray-300"
                        />
                      </div>
                    </div>
                    <div className="w-[50%]">
                      <label
                        htmlFor="sampleProduct"
                        className="block text-left mt-4 text-md font-extrabold text-gray-700 pb-1 border-b border-gray-300"
                      >
                        Update Thumbnail
                      </label>
                      <div className="relative mt-1">
                        <input
                          type="file"
                          id="sampleProduct"
                          name="sampleProduct"
                          onChange={handleImage}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full border border-gray-300 px-3 py-2"
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
                        Creator
                      </label>
                      <div className="mt-1 flex px-3 py-2">
                        <input
                          type="text"
                          id="freelancerId"
                          name="freelancerId"
                          value={`${serviceInfos.freelancerId.firstName || ""} ${
                            serviceInfos.freelancerId.surName || ""
                          }`}
                          readOnly
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-r-md sm:text-sm p-2 shadow-sm border border-gray-300"
                        />
                      </div>
                    </div>
                    <div className="w-[50%]">
                      <label
                        htmlFor="dateUpdated"
                        className="block mt-4 text-md font-extrabold text-gray-700 pb-1 border-b border-gray-300"
                      >
                        Date Updated
                      </label>
                      <div className="mt-1 flex px-3 py-2">
                        <input
                          type="text"
                          id="dateUpdated"
                          name="dateUpdated"
                          value={new Date(formData.dateUpdated).toLocaleString()}
                          readOnly
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-r-md sm:text-sm p-2 shadow-sm border border-gray-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            {/* Add Close Button and Add Button */}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setUpdateModal(false)}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
                onClick={() => setUpdateModal(false)}
              >
                Update Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateServiceModal;
