import React, { useEffect, useState } from "react";
import mpCard1 from '../../assets/pic1.png'
import Connect from '../../assets/link.png'
import axios from "axios"; // Import axios for making HTTP requests
import { useParams } from "react-router-dom";
import NavHeader from '../CMainNav'

function CConnect () {
    const [ userData, setUsers] = useState();
    const [ userServices, setServices] = useState();
    const { userId } = useParams();
    const { serviceId } = useParams();
    const [activeTab, setActiveTab] = useState("view");

    const handleTab = (view) => {
      setActiveTab(view);
    };

    console.log(userId)

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await axios.get(`https://quircom.onrender.com/api/client/${userId}`);
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
            const response = await axios.get(`https://quircom.onrender.com/api/service/${serviceId}`);
            if (response.status === 200) {
              setServices(response.data);
              console.log(response.data);
            }
          } catch (error) {
            console.error("Error fetching users:", error);
          }
        };
    
        fetchServices();
      }, [serviceId]);
    
      console.log("ADWA",serviceId);

  return (
    <section class="mt-[-1px]"> 
      <div>
        <NavHeader />
      </div>
      <div class="container mx-auto px-4">
        <div class="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
          <div class="lg:col-span-3 lg:row-end-1">
            <div class="lg:flex lg:items-start">
              <div class="lg:order-2 lg:ml-5">
                <div class="max-w-xl overflow-hidden rounded-lg">
                  <img class="h-full w-full max-w-[600px] max-h-[500px] object-cover" src={userServices?.thumbNail?.link} alt="" />
                </div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h1 class="sm: text-2xl font-bold text-[#1D5B79] sm:text-3xl">{userServices?.serviceName}</h1>
            <p class="sm: text-xl font-itallic text-[#1D5B79] sm:text-xl">{userServices?.freelancerId?.firstName + " " + userServices?.freelancerId?.surName }</p>

            <div class="mt-5 flex items-center">
              <div class="flex items-center">
                <svg class="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" class=""></path>
                </svg>
                <svg class="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" class=""></path>
                </svg>
                <svg class="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" class=""></path>
                </svg>
                <svg class="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" class=""></path>
                </svg>
                <svg class="block h-4 w-4 align-middle text-gray-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" class=""></path>
                </svg>
              </div>
              <p class="ml-2 text-sm font-medium text-gray-500">1,209 Reviews</p>
            </div>

            <div class="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0 text-[#1D5B79]">
              <div class="flex items-end">
                <h1 class="text-3xl font-bold">₱ {userServices?.price}.00</h1>
              </div>

              <button type="button" class="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-[#FE6D30] bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-[#1D5B79]">
                <img className="mr-2 block h-5 w-5 align-middle " src={Connect} alt=''/>
                Request
              </button>
            </div>

            <ul class="mt-8 space-y-2">
              <li class="flex items-center text-left text-sm font-medium text-gray-600">
                <svg class="mr-2 block h-5 w-5 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" class=""></path>
                </svg>
                Quircom Philippines Services 
              </li>

              <li class="flex items-center text-left text-sm font-medium text-gray-600">
                <svg class="mr-2 block h-5 w-5 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" class=""></path>
                </svg>
                Cancel Anytime
              </li>
            </ul>
          </div>
          {/* Menu Tabs */}
          <div className="lg:col-span-3">
            {/* outside tabs */}
            <div class="border-b border-gray-300">
                  <nav class="flex gap-4">
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
                <div class=" lg:col-span-3 ">
                  <div class="flex flex-col justify-start mt-8 sm:mt-12 mb-8 sm:mb-12 text-[#1D5B79]">
                    <h1 class="text-3xl font-bold">About The Service</h1>
                    <p class="mt-4 text-left">{userServices?.serviceInfo}</p>
                  </div>
                </div>
              )}

              {activeTab === "review" && (
                <>
                <div class="w-full">
                
                <div class=" mx-auto max-w-screen-md px-10 py-16">
                  <div class="flex w-full flex-col">
                    <div class="flex flex-col sm:flex-row">
                      <h1 class="max-w-sm text-3xl font-bold text-sky-800">
                        The Service <br />
                        We Want for YOU
                      </h1>
                      <div class="my-4 rounded-xl  py-2 px-4 shadow sm:my-0 sm:ml-auto">
                        <div class="flex h-16 items-center text-2xl font-bold text-[#1D5B79]">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          4.7
                        </div>
                        <p class="text-sm text-gray-500">Average User Rating</p>
                      </div>
                    </div>
                    <div class="text-[#1D5B79]">
                      <p class="font-medium">Reviews</p>
                      <ul class="mb-6 mt-2 space-y-2">
                        <li class="flex items-center text-sm font-medium">
                          <span class="w-3">5</span>
                          <span class="mr-4 text-yellow-400">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                          </span>
                          <div class="mr-4 h-2 w-96 overflow-hidden rounded-full bg-gray-300">
                            <div class="h-full w-10/12 bg-yellow-400"></div>
                          </div>
                          <span class="w-3">56</span>
                        </li>
                        <li class="flex items-center text-sm font-medium">
                          <span class="w-3">4</span>
                          <span class="mr-4 text-yellow-400">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                          </span>
                          <div class="mr-4 h-2 w-96 overflow-hidden rounded-full bg-gray-300">
                            <div class="h-full w-8/12 bg-yellow-400"></div>
                          </div>
                          <span class="w-3">12</span>
                        </li>
                        <li class="flex items-center text-sm font-medium">
                          <span class="w-3">3</span>
                          <span class="mr-4 text-yellow-400">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                          </span>
                          <div class="mr-4 h-2 w-96 overflow-hidden rounded-full bg-gray-300">
                            <div class="h-full w-1/12 bg-yellow-400"></div>
                          </div>
                          <span class="w-3">4</span>
                        </li>
                        <li class="flex items-center text-sm font-medium">
                          <span class="w-3">2</span>
                          <span class="mr-4 text-yellow-400">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                          </span>
                          <div class="mr-4 h-2 w-96 overflow-hidden rounded-full bg-gray-300">
                            <div class="h-full w-0 bg-yellow-400"></div>
                          </div>
                          <span class="w-3">0</span>
                        </li>
                        <li class="flex items-center text-sm font-medium">
                          <span class="w-3">1</span>
                          <span class="mr-4 text-yellow-400">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                          </span>
                          <div class="mr-4 h-2 w-96 overflow-hidden rounded-full bg-gray-300">
                            <div class="h-full w-1/12 bg-yellow-400"></div>
                          </div>
                          <span class="w-3">5</span>
                        </li>
                      </ul>
                    </div>
                    <button class="w-36 rounded-md bg-[#1D5B79] py-3 text-white font-medium">Write a review</button>
                  </div>
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

  )
}

export default CConnect