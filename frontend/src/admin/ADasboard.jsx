import React, { useState } from "react";
import AMainNav from "./AMainNav";
import { MdDesignServices } from "react-icons/md";

const ADasboard = () => {
  const [activeTab, setActiveTab] = useState("freelancers");

  const handleTab = (freelancers) => {
    setActiveTab(freelancers);
  };

  return (
    <div className="flex flex-col h-screen text-white bg-gradient-to-b to-[#13334C] from-[#1D5B79]">
      <AMainNav />
      <div className="flex align-center justify-center mx-[100px]">
        <div className="flex flex-col container my-10">
          <div className="grid grid-cols-4 gap-[20px] my-[15px]">
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
          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-between w-[90%] items-center my-[50px]">
              <button className={
                  activeTab === "freelnacers"
                    ? "active-tab py-3 px-4 w-full text-orange-500 font-bold rounded-t-lg bg-[#F5F5DC] border-[1px] border-[#f5f5dc] shadow-md"
                    : "py-3 px-4 w-full rounded-t-lg bg-[#13334C] border-[1px] border-[#13334C] hover:border-[1px] hover:bg-[#13334C] hover:border-orange-500 hover:text-white"}
                    onClick={() => handleTab("freelnacers")}>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ADasboard;
