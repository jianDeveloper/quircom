import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


import AMainNav from "./AMainNav";
import { MdDesignServices } from "react-icons/md";
import AFooter from "./AFooter";
import LoFL from "./LoFL";
import LoC from "./LoC";
import LoS from "./LoS";
import LoRepAcc from "./LoRepAcc";

const ADasboard = () => {
  const [activeTab, setActiveTab] = useState("freelancers");
  
  const handleTab = (freelancers) => {
    setActiveTab(freelancers);
  };

  const { userId } = useParams();

  useEffect(() => {
      const token = localStorage.getItem("authToken");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      axios
        .get(`https://quircom.onrender.com/api/admin/${userId}`, {headers})
        .then((response) => {
          setUserData(response.data); // Set the user data in state
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }, [userId]);

  return (
    <div className="flex flex-col h-full text-white bg-gradient-to-b to-[#13334C] from-[#1D5B79]">
      <AMainNav />
      <div className="flex align-center justify-center mx-[100px] h-[100vh]">
        <div className="flex flex-col container my-10">
          <div className="grid grid-cols-2 gap-[20px] my-[15px] bg-wihte">
          
            <div class="col-span-2 -mx-4 bg-gradient-to-t from-indigo-500 to-blue-500 px-4 py-8 sm:col-span-1 sm:mx-0 sm:rounded-xl sm:py-4">
              <p class="mb-4 font-medium text-indigo-100">Cases in pipeline</p>
              <div class="mb-6 flex max-w-xs">
                <div class="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-400 sm:mr-3 sm:mb-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <div class="px-4">
                  <p class="mb-1 text-2xl font-black text-white">1844</p>
                  <p class="font-medium text-indigo-100">$192,234.00</p>  
                </div>
              </div>
              <div class="flex flex-wrap justify-between">
                <div class="flex flex-col items-center px-4 py-1">
                  <p class="text-lg font-medium text-white">232</p>
                  <p class="text-xs font-medium text-indigo-100">Quote</p>
                </div>
                <div class="mb-1 flex flex-col items-center px-4 py-1 sm:mr-1 sm:mb-0">
                  <p class="text-lg font-medium text-white">$140</p>
                  <p class="text-xs font-medium text-indigo-100">CAC</p>
                </div>
                <div class="mb-1 flex flex-col items-center rounded-2xl bg-white px-4 py-1 sm:mr-1 sm:mb-0">
                  <p class="text-lg font-medium text-indigo-500">21</p>
                  <p class="text-xs font-medium text-indigo-500">Refunds</p>
                </div>
                <div class="flex flex-col items-center px-4 py-1">
                  <p class="text-lg font-medium text-white">$44</p>
                  <p class="text-xs font-medium text-indigo-100">PPC</p>
                </div>
              </div>
            </div>
            <div class="col-span-2 grid grid-cols-2 gap-4 py-4 sm:col-span-1 sm:gap-8 sm:px-4">
              <div class="">
                <p class="text-lg font-bold">32</p>
                <p class="text-slate-400 mb-2 font-medium">$230,000</p>
                <span class="bg-slate-200 text-slate-600 rounded-full px-2 py-0.5 text-xs font-medium">Drafts</span>
              </div>
              <div class="">
                <p class="text-lg font-bold">621</p>
                <p class="text-slate-400 mb-2 font-medium">$230,000</p>
                <span class="rounded-full bg-indigo-200 px-2 py-0.5 text-xs font-medium text-indigo-600">Prending Approval</span>
              </div>
              <div class="">
                <p class="text-lg font-bold">68</p>
                <p class="text-slate-400 mb-2 font-medium">$230,000</p>
                <span class="rounded-full bg-yellow-200 px-2 py-0.5 text-xs font-medium text-yellow-700">Sent to Clients</span>
              </div>
              <div class="">
                <p class="text-lg font-bold">970</p>
                <p class="text-slate-400 mb-2 font-medium">$230,000</p>
                <span class="rounded-full bg-green-200 px-2 py-0.5 text-xs font-medium text-green-600">Signing</span>
              </div>
            </div>
            <div class="col-span-2 col-start-1 grid grid-cols-2 gap-6 border-t py-4 sm:grid-cols-4 sm:px-4 sm:py-8">
            
              
            </div>
            <div className="flex flex-col justify-around px-4 py-4 bg-gradient-to-bl from-orange-400 to-orange-600 hover:shadow-lg rounded-md">
              <div className="flex items-center justify-between">
                <h1 className="text-[20px] text-[#13334C] font-bold">
                  Total Freelancers
                </h1>
                <MdDesignServices size={30} color="#13334C" />
              </div>
              <h1 className="font-medium text-black">11</h1>
            </div>
            <div className="flex flex-col justify-around px-4 py-4 bg-gradient-to-bl from-orange-400 to-orange-600 hover:shadow-lg rounded-md">
              <div className="flex items-center justify-between">
                <h1 className="text-[20px] text-[#13334C] font-bold">
                  Total Clients
                </h1>
                <MdDesignServices size={30} color="#13334C" />
              </div>
              <h1 className="font-medium text-black">11</h1>
            </div>
            <div className="flex flex-col justify-around px-4 py-4 bg-gradient-to-bl from-orange-400 to-orange-600 hover:shadow-lg rounded-md">
              <div className="flex items-center justify-between">
                <h1 className="text-[20px] text-[#13334C] font-bold">
                  Total Services
                </h1>
                <MdDesignServices size={30} color="#13334C" />
              </div>
              <h1 className="font-medium text-black">11</h1>
            </div>
            <div className="flex flex-col justify-around px-4 py-4 bg-gradient-to-bl from-orange-400 to-orange-600 hover:shadow-lg rounded-md">
              <div className="flex items-center justify-between">
                <h1 className="text-[20px] text-[#13334C] font-bold">
                  Reported
                </h1>
                <MdDesignServices size={30} color="#13334C" />
              </div>
              <h1 className="font-medium text-black">11</h1>
            </div>
          </div>
          <div className="flex flex-col items-center h-full">
            <div className="flex justify-between w-[90%] items-center mt-[50px] gap-1">
              <button className={
                  activeTab === "freelancers"
                    ? "active-tab py-3 px-4 w-full text-orange-500 font-bold rounded-t-lg bg-[#F5F5DC] border-[1px] border-[#f5f5dc] shadow-md"
                    : "py-3 px-4 w-full rounded-t-lg bg-[#13334C] border-[1px] border-[#13334C] hover:border-[1px] hover:bg-[#13334C] hover:border-orange-500 hover:text-white"}
                    onClick={() => handleTab("freelancers")}>
                    List of Freelancers
              </button>
              <button className={
                  activeTab === "clients"
                    ? "active-tab py-3 px-4 w-full text-orange-500 font-bold rounded-t-lg bg-[#F5F5DC] border-[1px] border-[#f5f5dc] shadow-md"
                    : "py-3 px-4 w-full rounded-t-lg bg-[#13334C] border-[1px] border-[#13334C] hover:border-[1px] hover:bg-[#13334C] hover:border-orange-500 hover:text-white"}  
                    onClick={() => handleTab("clients")}>
                    List of Clients
              </button>
              <button className={
                  activeTab === "services"
                  ? "active-tab py-3 px-4 w-full text-orange-500 font-bold rounded-t-lg bg-[#F5F5DC] border-[1px] border-[#f5f5dc] shadow-md"
                  : "py-3 px-4 w-full rounded-t-lg bg-[#13334C] border-[1px] border-[#13334C] hover:border-[1px] hover:bg-[#13334C] hover:border-orange-500 hover:text-white"}  
                    onClick={() => handleTab("services")}>
                    List of Services
              </button>
              <button className={
                  activeTab === "reported"
                  ? "active-tab py-3 px-4 w-full text-orange-500 font-bold rounded-t-lg bg-[#F5F5DC] border-[1px] border-[#f5f5dc] shadow-md"
                  : "py-3 px-4 w-full rounded-t-lg bg-[#13334C] border-[1px] border-[#13334C] hover:border-[1px] hover:bg-[#13334C] hover:border-orange-500 hover:text-white"}  
                    onClick={() => handleTab("reported")}>
                    Reported Accounts
              </button>
            </div>
            {activeTab === "freelancers" && <LoFL />}
            {activeTab === "clients" && <LoC />}
            {activeTab === "services" && <LoS />}
            {activeTab === "reported" && <LoRepAcc />}
          </div>
        </div>
      </div>
      <AFooter />
    </div>
  );
};

export default ADasboard;
