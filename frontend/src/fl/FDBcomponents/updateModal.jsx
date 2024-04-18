import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const UpdateServiceModal = ({ setUpdateModal, serviceID, serviceName, serviceType, serviceInfo, price }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const [userData, setUsers] = useState();
  const [thumbNail, setThumbnail] = useState();
  const [invalidFields, setInvalidFields] = useState({});

  const [formData, setFormData] = useState({
    serviceName: "",
    serviceType: "",
    serviceInfo: "",
    price: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/service/${serviceID}`
        );
        if (response.status === 200) {
          setUsers(response.data);
          // setFormData({ requestId: response.data.requestId });
          // setFormData({ freelancerId: response.data.serviceId });
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [serviceID]);

  console.log("userId._id of the first user:", Number(serviceID).length > 0 ? serviceID : "No users available");

  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" style={{background: "rgba(0,0,0,0.2)"}}>
        <div className="relative w-2/4 my-6 mx-auto">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flexitems-start justify-between p-5 bg-[#1d5b79] border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl text-white text-center font-semibold">
                Add Services
              </h3>
            </div>
            {/* Creating Form */}
            <div className="relative flex flex-col overflow-y-auto max-h-[400px] px-6 py-4">
              <div className="space-y-6">
                <label
                  htmlFor="title"
                  className="block text-left text-md font-extrabold text-gray-700 pb-1 border-b border-gray-300"
                >
                  Service Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="mt-1 relative rounded-md shadow-sm border border-gray-300 px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
                  placeholder={serviceName}
                />
                <label
                  htmlFor="type"
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
                      <option value="">{serviceType}</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Software Development">Software Development</option>
                      <option value="Graphic Design">Graphic Design</option>
                      <option value="Animation">Animation</option>
                      <option value="Graphic Motion">Graphic Motion</option>
                    </select>
                  
                </div>
                <label
                  htmlFor="description"
                  className="block text-left mt-4 text-md font-extrabold text-gray-700 pb-1 border-b border-gray-300"
                >
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 px-3 py-2"
                    placeholder={serviceInfo}
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
                        pattern="[0-9]*"
                        inputMode="numeric"
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-r-md sm:text-sm p-2 shadow-sm border border-gray-300"
                        placeholder={price}
                      />
                    </div>
                  </div>
                  <div className="w-[50%]">
                    <label
                      htmlFor="sampleProduct"
                      className="block text-left mt-4 text-md font-extrabold text-gray-700 pb-1 border-b border-gray-300"
                    >
                      Add Sample Product
                    </label>
                    <div className="relative mt-1">
                      <input
                        type="file"
                        id="sampleProduct"
                        name="sampleProduct"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full border border-gray-300 px-3 py-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>


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
                type="button"
                onClick={() => setUpdateModal(false)}
              >
                Add Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateServiceModal;
