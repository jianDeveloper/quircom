import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import WithAuth from "../../auth/WithAuth";

const AddServiceModal = ({ setaddModal }) => {
  const { userId } = useParams();
  const [userData, setUsers] = useState();
  const [thumbNail, setThumbnail] = useState();
  const [invalidFields, setInvalidFields] = useState({});

  const [formData, setFormData] = useState({
    serviceName: "",
    serviceType: "",
    serviceInfo: "",
    serviceSubCat: [],
    price: "",
    requestId: [],
    freelancerId: userId,
    dateUploaded: new Date().toISOString(),
  });

  const subcategories = {
    Animation: [
      "2D Animation",
      "3D Animation",
      "Motion Graphics",
      "Whiteboard Animation",
      "Stop Motion",
      "Character Animation",
      "Explainer Videos",
      "Logo Animation",
      "Product Animation",
      "Visual Effects",
    ],
    "Graphic Design": [
      "Logo Design",
      "Illustration",
      "UI/UX Design",
      "Banner Design",
      "Brochure Design",
      "Business Card Design",
      "Flyer Design",
      "Infographic Design",
      "Packaging Design",
      "Print Design",
    ],
    "Graphic Motion": [
      "Animated Logos",
      "Title Sequences",
      "Promotional Videos",
      "Social Media Videos",
      "Corporate Videos",
      "Event Videos",
      "Training Videos",
      "Demo Videos",
      "Music Videos",
    ],
    "Software Development": [
      "Web Apps",
      "Mobile Apps",
      "Desktop Apps",
      "Game Development",
      "API Development",
      "Database Design",
      "E-commerce Development",
      "Software Testing",
      "DevOps",
      "System Integration",
    ],
    "Web Development": [
      "Frontend Development",
      "Backend Development",
      "Full Stack Development",
      "WordPress Development",
      "Shopify Development",
      "Web Optimization",
      "Web Maintenance",
      "Web Security",
    ],
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const response = await axios.get(
          `https://quircom.onrender.com/api/freelancer/${userId}`,
          { headers }
        );
        if (response.status === 200) {
          setUsers(response.data);
          setFormData((prevData) => ({
            ...prevData,
            requestId: response.data.requestId,
            freelancerId: response.data._id,
          }));
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
      errors.serviceInfo = "Please input at least 20 characters";
    }
    if (formData.price.length === 0) {
      errors.price = "Please input your price";
    }
    if (!thumbNail || !thumbNail.type.startsWith("image/")) {
      errors.thumbNail = "Please upload a thumbnail";
    }
    if (formData.serviceSubCat.length === 0) {
      errors.serviceSubCat = "Please select at least one subcategory";
    }

    setInvalidFields(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      const formObj = new FormData();
      formObj.append("service", JSON.stringify(formData));
      formObj.append("file", thumbNail);
      formObj.append("dateUpdated", null);

      const response = await axios.post(
        `https://quircom.onrender.com/api/service/create/`,
        formObj,
        { headers }
      );

      if (response && response.data) {
        console.log(response.data);
        toast.success("Service uploaded successfully", {
          autoClose: 2000,
          onClose: () => {
            setTimeout(() => {
              setaddModal(false);
            }, 2000);
          },
        });
      } else {
        toast.error("Failed to upload Service");
      }
    } catch (error) {
      toast.error("Failed to upload Service");
    }
  };

  const handleImage = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "serviceType") {
      setFormData({ ...formData, [name]: value, serviceSubCat: [] });
    } else if (name === "serviceSubCat") {
      const updatedSubCats = checked
        ? [...formData.serviceSubCat, value]
        : formData.serviceSubCat.filter((subcat) => subcat !== value);
      setFormData({ ...formData, serviceSubCat: updatedSubCats });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
                Add Services
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
                    htmlFor="serviceType"
                    className={`block mt-4 text-md font-extrabold text-gray-700 pb-1 border-b border-gray-300`}
                  >
                    Service Type
                  </label>
                  <div className="mt-1 relative">
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className={`block w-full px-3 py-2 pr-10 text-base leading-6 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                        invalidFields.serviceType ? "border-red-500" : ""
                      }`}
                    >
                      <option value="">Select Account Type</option>
                      <option value="Animation">Animation</option>
                      <option value="Graphic Design">Graphic Design</option>
                      <option value="Graphic Motion">Graphic Motion</option>
                      <option value="Software Development">
                        Software Development
                      </option>
                      <option value="Web Development">Web Development</option>
                    </select>
                    {invalidFields.serviceType && (
                      <p className="text-red-500 text-[12px]">
                        {invalidFields.serviceType}
                      </p>
                    )}
                  </div>

                  {/* Render Subcategories */}
                  {formData.serviceType &&
                    subcategories[formData.serviceType] && (
                      <div className="mt-4">
                        <label
                          className={`block text-md font-extrabold text-gray-700 pb-1 border-b border-gray-300`}
                        >
                          Service Subcategories
                        </label>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          {subcategories[formData.serviceType].map((subcat) => (
                            <label
                              key={subcat}
                              className="inline-flex items-center"
                            >
                              <input
                                type="checkbox"
                                name="serviceSubCat"
                                value={subcat}
                                checked={formData.serviceSubCat.includes(
                                  subcat
                                )}
                                onChange={handleChange}
                                className="form-checkbox"
                              />
                              <span className="ml-2">{subcat}</span>
                            </label>
                          ))}
                        </div>
                        {invalidFields.serviceSubCat && (
                          <p className="text-red-500 text-[12px]">
                            {invalidFields.serviceSubCat}
                          </p>
                        )}
                      </div>
                    )}
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
                    onChange={handleChange}
                    className={`mt-1 relative rounded-md shadow-sm border border-gray-300 px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm  ${
                      invalidFields.serviceName ? "border-red-500" : ""
                    }`}
                  />
                  {invalidFields.serviceName && (
                    <p className="text-red-500 text-[12px]">
                      {invalidFields.serviceName}
                    </p>
                  )}
                  <label
                    htmlFor="serviceInfo"
                    className={`block mt-4 text-md font-extrabold text-gray-700 pb-1 border-b border-gray-300`}
                  >
                    Service Info
                  </label>
                  <textarea
                    id="serviceInfo"
                    name="serviceInfo"
                    value={formData.serviceInfo}
                    onChange={handleChange}
                    rows="3"
                    placeholder={`Input the Information of the service here. Such as Self Introduction, Specialized In & etc...`}
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 px-3 py-2 ${
                      invalidFields.serviceInfo ? "border-red-500" : ""
                    }`}
                  />
                  {invalidFields.serviceInfo && (
                    <p className="text-red-500 text-[12px]">
                      {invalidFields.serviceInfo}
                    </p>
                  )}
                  <div className="flex flex-row justify-between gap-12">
                    <div className="w-[50%]">
                      <label
                        htmlFor="price"
                        className={`block mt-4 text-md font-extrabold text-gray-700 pb-1 border-b border-gray-300`}
                      >
                        Price
                      </label>
                      <div className="mt-1 flex px-3 py-2">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                          PHP
                        </span>
                        <input
                          type="number"
                          id="price"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          className={` focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-r-md sm:text-sm p-2 shadow-sm border border-gray-300 ${
                            invalidFields.price ? "border-red-500" : ""
                          }`}
                          pattern="\d*"
                          onInput={(e) => {
                            e.target.value = e.target.value.replace(
                              /[^\d]/g,
                              ""
                            ); // Ensure only numbers are input
                          }}
                        />
                      </div>
                      {invalidFields.price && (
                        <p className="text-red-500 ml-2 text-[12px]">
                          {invalidFields.price}
                        </p>
                      )}
                    </div>
                    <div className="w-[50%]">
                      <label
                        htmlFor="sampleProduct"
                        className="block mt-4 text-md font-extrabold text-gray-700 pb-1 border-b border-gray-300"
                      >
                        Add Thumbnail
                      </label>
                      <div className="relative mt-1">
                        <input
                          type="file"
                          id="thumbNail"
                          name="thumbNail"
                          onChange={handleImage}
                          accept="image/*"
                          className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md border border-gray-300 px-3 py-2 ${
                            invalidFields.thumbNail ? "border-red-500" : ""
                          }`}
                        />
                        {invalidFields.thumbNail && (
                          <p className="text-red-500 ml-2 text-[12px]">
                            {invalidFields.thumbNail}
                          </p>
                        )}
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
                          value={`${userData?.firstName || ""} ${
                            userData?.surName || ""
                          }`}
                          readOnly
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm p-2 shadow-sm border border-gray-300"
                        />
                      </div>
                    </div>
                    <div className="w-[50%]">
                      <label
                        htmlFor="dateUploaded"
                        className="block mt-4 text-md font-extrabold text-gray-700 pb-1 border-b border-gray-300"
                      >
                        Date Submission
                      </label>
                      <div className="mt-1 flex px-3 py-2">
                        <input
                          type="text"
                          id="dateUploaded"
                          name="dateUploaded"
                          value={new Date(
                            formData.dateUploaded
                          ).toLocaleString()}
                          readOnly
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm p-2 shadow-sm border border-gray-300"
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
                  onClick={() => setaddModal(false)}
                >
                  Close
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                >
                  Add Service
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

export default WithAuth(AddServiceModal);
