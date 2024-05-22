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

import Banner from "../assets/banner.jpg";

const ADasboard = () => {
  const [activeTab, setActiveTab] = useState("freelancers");

  const handleTab = (freelancers) => {
    setActiveTab(freelancers);
  };

  const { userId } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .get(`https://quircom.onrender.com/api/admin/${userId}`, { headers })
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
          <div className="w-full h-[250px] relative rounded-lg overflow-hidden">
            <img
              src={Banner}
              alt="Banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-2">
              <h1 className="text-[50px] font-bold">Administrator</h1>
              <p className="text-[20px]">Make it better.</p>
            </div>
          </div>
          <hr className="mt-6 mb-3 border-t-2 border-white"></hr>
          <div className="grid grid-cols-4 gap-[20px] sm:grid-cols-2 md:grid-cols-4 my-[15px] bg-wihte">
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
              <button
                className={
                  activeTab === "freelancers"
                    ? "active-tab py-3 px-4 w-full text-orange-500 font-bold rounded-t-lg bg-[#F5F5DC] border-[1px] border-[#f5f5dc] shadow-md"
                    : "py-3 px-4 w-full rounded-t-lg bg-[#13334C] border-[1px] border-[#13334C] hover:border-[1px] hover:bg-[#13334C] hover:border-orange-500 hover:text-white"
                }
                onClick={() => handleTab("freelancers")}
              >
                List of Freelancers
              </button>
              <button
                className={
                  activeTab === "clients"
                    ? "active-tab py-3 px-4 w-full text-orange-500 font-bold rounded-t-lg bg-[#F5F5DC] border-[1px] border-[#f5f5dc] shadow-md"
                    : "py-3 px-4 w-full rounded-t-lg bg-[#13334C] border-[1px] border-[#13334C] hover:border-[1px] hover:bg-[#13334C] hover:border-orange-500 hover:text-white"
                }
                onClick={() => handleTab("clients")}
              >
                List of Clients
              </button>
              <button
                className={
                  activeTab === "services"
                    ? "active-tab py-3 px-4 w-full text-orange-500 font-bold rounded-t-lg bg-[#F5F5DC] border-[1px] border-[#f5f5dc] shadow-md"
                    : "py-3 px-4 w-full rounded-t-lg bg-[#13334C] border-[1px] border-[#13334C] hover:border-[1px] hover:bg-[#13334C] hover:border-orange-500 hover:text-white"
                }
                onClick={() => handleTab("services")}
              >
                List of Services
              </button>
              <button
                className={
                  activeTab === "reported"
                    ? "active-tab py-3 px-4 w-full text-orange-500 font-bold rounded-t-lg bg-[#F5F5DC] border-[1px] border-[#f5f5dc] shadow-md"
                    : "py-3 px-4 w-full rounded-t-lg bg-[#13334C] border-[1px] border-[#13334C] hover:border-[1px] hover:bg-[#13334C] hover:border-orange-500 hover:text-white"
                }
                onClick={() => handleTab("reported")}
              >
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
