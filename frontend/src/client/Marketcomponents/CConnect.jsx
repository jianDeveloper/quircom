import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import NavHeader from "../CMainNav";

import Connect from "../../assets/link.png";
import addReqModal from "../Trackercomponents/addReqModal";

function CConnect() {
  const [userData, setUsers] = useState();
  const [userServices, setServices] = useState();
  const { userId } = useParams();
  const { serviceId } = useParams();
  const [activeTab, setActiveTab] = useState("view");

  const handleTab = (view) => {
    setActiveTab(view);
  };

  console.log(userId);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `https://quircom.onrender.com/api/client/${userId}`
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
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `https://quircom.onrender.com/api/service/${serviceId}`
        );
        if (response.status === 200) {
          setServices(response.data);
          console.log("asdfsadfa", response.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchServices();
  }, [serviceId]);

  return (
    <section className="mt-[-1px]">
      <div>
        <NavHeader />
      </div>
      <div className="container mx-auto px-4">
        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3 lg:row-end-1">
            <div className="lg:flex lg:items-start">
              <div className="lg:order-2 lg:ml-5">
                <div className="max-w-xl overflow-hidden rounded-lg">
                  <img
                    className="h-full w-full max-w-[600px] max-h-[500px] object-cover"
                    src={userServices?.thumbNail?.link}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h1 className="sm: text-2xl font-bold text-[#1D5B79] sm:text-3xl">
              {userServices?.serviceName}
            </h1>
            <p className="sm: text-xl font-itallic text-[#1D5B79] sm:text-xl">
              {userServices?.freelancerId?.firstName +
                " " +
                userServices?.freelancerId?.surName}
            </p>
            <p className="sm: text-sm font-itallic text-[#1D5B79] sm:text-sm">
              Date Created: {userServices?.dateUploaded ? new Date(userServices.dateUploaded).toLocaleString() : 'No Date Provided'}
            </p>
            <p className="sm: text-sm font-itallic text-[#1D5B79] sm:text-sm">
              Date Updated: {userServices?.dateUpdated ? new Date(userServices.dateUpdated).toLocaleString() : ''}
            </p>

            <div className="mt-5 flex items-center">
              <div className="flex items-center">
                <svg
                  className="block h-4 w-4 align-middle text-yellow-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    className=""
                  ></path>
                </svg>
                <svg
                  className="block h-4 w-4 align-middle text-yellow-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    className=""
                  ></path>
                </svg>
                <svg
                  className="block h-4 w-4 align-middle text-yellow-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    className=""
                  ></path>
                </svg>
                <svg
                  className="block h-4 w-4 align-middle text-yellow-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    className=""
                  ></path>
                </svg>
                <svg
                  className="block h-4 w-4 align-middle text-gray-200"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    className=""
                  ></path>
                </svg>
              </div>
              <p className="ml-2 text-sm font-medium text-gray-500">
                1,209 Reviews
              </p>
            </div>

            <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0 text-[#1D5B79]">
              <div className="flex items-end">
                <h1 className="text-3xl font-bold">
                  ₱ {Number(userServices?.price).toLocaleString()}.00
                </h1>
              </div>

              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-[#FE6D30] bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-[#1D5B79]"
              >
                <img
                  className="mr-2 block h-5 w-5 align-middle "
                  src={Connect}
                  alt=""
                />
                Request
                {/* <addReqModal /> */}
              </button>
            </div>

            <ul className="mt-8 space-y-2">
              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                <svg
                  className="mr-2 block h-5 w-5 align-middle text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    className=""
                  ></path>
                </svg>
                Quircom Philippines Services
              </li>

              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                <svg
                  className="mr-2 block h-5 w-5 align-middle text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    className=""
                  ></path>
                </svg>
                Cancel Anytime
              </li>
            </ul>
          </div>
          {/* Menu Tabs */}
          <div className="lg:col-span-3">
            {/* outside tabs */}
            <div className="border-b border-gray-300">
              <nav className="flex gap-4">
                <button
                  className={
                    activeTab === "view"
                      ? "active-tab border-b-2 border-gray-900 py-4 text-sm font-medium text-[#1D5B79] "
                      : "border-b-2 border-transparent py-4 text-sm font-medium text-gray-600 hover:border-gray-400 hover:text-gray-80"
                  }
                  onClick={() => handleTab("view")}
                >
                  Description
                </button>
                <button
                  className={
                    activeTab === "review"
                      ? "active-tab inline-flex items-center border-b-2 border-gray-900 py-4 text-sm font-medium text-[#1D5B79]"
                      : "inline-flex items-center border-b-2 border-transparent py-4 text-sm font-medium text-gray-600 hover:border-gray-400 hover:text-gray-80"
                  }
                  onClick={() => handleTab("review")}
                >
                  Reviews
                </button>
              </nav>
            </div>

            {/* inside tabs */}
            <div className="flex flex-col w-[90%]">
              {activeTab === "view" && (
                <div className=" lg:col-span-3 ">
                  <div className="flex flex-col justify-start mt-8 sm:mt-12 mb-8 sm:mb-12 text-[#1D5B79]">
                    <h1 className="text-3xl font-bold">About The Service</h1>
                    <p className="mt-4 text-left">
                      {userServices?.serviceInfo}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "review" && (
                <>
                  <div className="w-full">
                    <div className=" mx-auto max-w-screen-md px-10 py-16">
                      <div className="flex w-full flex-col">
                        <div className="flex flex-col sm:flex-row">
                          <h1 className="max-w-sm text-3xl font-bold text-sky-800">
                            The Service <br />
                            We Want for YOU
                          </h1>
                          <div className="my-4 rounded-xl  py-2 px-4 shadow sm:my-0 sm:ml-auto">
                            <div className="flex h-16 items-center text-2xl font-bold text-[#1D5B79]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12 text-yellow-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              4.7
                            </div>
                            <p className="text-sm text-gray-500">
                              Average User Rating
                            </p>
                          </div>
                        </div>
                        <div className="text-[#1D5B79]">
                          <p className="font-medium">Reviews</p>
                          <ul className="mb-6 mt-2 space-y-2">
                            <li className="flex items-center text-sm font-medium">
                              <span className="w-3">5</span>
                              <span className="mr-4 text-yellow-400">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              </span>
                              <div className="mr-4 h-2 w-96 overflow-hidden rounded-full bg-gray-300">
                                <div className="h-full w-10/12 bg-yellow-400"></div>
                              </div>
                              <span className="w-3">56</span>
                            </li>
                            <li className="flex items-center text-sm font-medium">
                              <span className="w-3">4</span>
                              <span className="mr-4 text-yellow-400">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              </span>
                              <div className="mr-4 h-2 w-96 overflow-hidden rounded-full bg-gray-300">
                                <div className="h-full w-8/12 bg-yellow-400"></div>
                              </div>
                              <span className="w-3">12</span>
                            </li>
                            <li className="flex items-center text-sm font-medium">
                              <span className="w-3">3</span>
                              <span className="mr-4 text-yellow-400">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              </span>
                              <div className="mr-4 h-2 w-96 overflow-hidden rounded-full bg-gray-300">
                                <div className="h-full w-1/12 bg-yellow-400"></div>
                              </div>
                              <span className="w-3">4</span>
                            </li>
                            <li className="flex items-center text-sm font-medium">
                              <span className="w-3">2</span>
                              <span className="mr-4 text-yellow-400">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              </span>
                              <div className="mr-4 h-2 w-96 overflow-hidden rounded-full bg-gray-300">
                                <div className="h-full w-0 bg-yellow-400"></div>
                              </div>
                              <span className="w-3">0</span>
                            </li>
                            <li className="flex items-center text-sm font-medium">
                              <span className="w-3">1</span>
                              <span className="mr-4 text-yellow-400">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              </span>
                              <div className="mr-4 h-2 w-96 overflow-hidden rounded-full bg-gray-300">
                                <div className="h-full w-1/12 bg-yellow-400"></div>
                              </div>
                              <span className="w-3">4</span>
                            </li>
                          </ul>
                        </div>
                        <button className="w-36 rounded-md bg-[#1D5B79] py-3 text-white font-medium">
                          Write a review
                        </button>
                      </div>
                    </div>
                    <div className="text-[#1D5B79]">
                      <p className="font-medium">Reviews</p>
                      <ul className="mb-6 mt-2 space-y-4">
                        {userServices.requestId.length > 0 ? (
                          userServices.requestId.map((service) => {
                            const maxRating = 5;
                            const rating = service.feedbackNum;
                            const feedbackNum = Math.ceil((rating / maxRating) * 5);
                            
                            return (
                              <li
                                className="border border-gray-200 rounded p-4 bg-white"
                                key={service.requestId}
                              >
                                <div className="flex flex-col sm:flex-row items-center">
                                  {/* Rating */}
                                  <div className="flex items-center">
                                    <span className="w-3">{feedbackNum}</span>
                                    <div className="mr-4 h-2 w-48 overflow-hidden rounded-full bg-gray-300">
                                      <div
                                        className="h-full bg-yellow-400"
                                        style={{
                                          width: `${(rating / maxRating) * 100}%`
                                        }}
                                      ></div>
                                    </div>
                                    <span className="text-gray-500">({rating}/5)</span>
                                    <span className="ml-auto mr-4 text-yellow-400">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                      </svg>
                                    </span>
                                  </div>
                                  {/* Profile Name */}
                                  <div className="mt-2 sm:mt-0 text-[#1D5B79]">
                                    <div className="flex items-center mb-2">
                                      <img
                                        className="w-8 h-8 rounded-full mr-2"
                                        src={service.clientId.profilePic.link}
                                        alt="Profile"
                                      />
                                      <span>{service.clientId.firstName + " " + service.clientId.surName}</span>
                                    </div>
                                    {/* Feedback Info */}
                                    <p>Review: {service.feedbackInfo}</p>
                                  </div>
                                </div>
                              </li>
                            );
                          })
                        ) : (
                          <li>No feedback yet</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          {/* Menu Tabs */}
        </div>
      </div>
    </section>
  );
}

export default CConnect;
