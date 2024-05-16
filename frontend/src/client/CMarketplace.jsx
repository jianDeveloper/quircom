import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import NavHeader from "./CMainNav";
import CFooter from "./CFooter";

import mpTop from "../assets/mpTop.jpg";
import CCards from "./Marketcomponents/CCards";
import WithAuth from "../auth/WithAuth";

import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

const CMarketplace = () => {
  const { serviceId } = useParams();
  const [services, setServices] = useState([]);
  const [selectedServiceType, setSelectedServiceType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const response = await axios.get(
          `https://quircom.onrender.com/api/service/`,
          { headers }
        );
        if (response.status === 200) {
          setServices(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchServices();
  }, [serviceId]);

  const filteredServices = selectedServiceType
    ? services.filter((service) => service.serviceType === selectedServiceType)
    : services;

  const handleFilter = (type) => {
    setSelectedServiceType(type);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavHeader />
      <div className="flex items-center ">
        <div className="flex-col mx-10 my-10 w-[100%]">
          <h1 className="font-extrabold text-[30px] text-[#1D5B79]">
            MARKETPLACE
          </h1>
          <div
            className="w-full h-[300px] relative rounded-lg"
            style={{
              background: `url(${mpTop})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <div className="absolute bottom-10 left-10 text-white p-2">
              <h1 className="text-[50px] font-bold mb-5">
                Freelancing Services
              </h1>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col w-[100%] mt-10 px-[20rem]">
              <form className="">
                <div className="relative w-full flex border border-[#1d5b79] items-center justify-between rounded-md">
                  <svg
                    className="absolute left-2 block h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" className=""></circle>
                    <line
                      x1="21"
                      y1="21"
                      x2="16.65"
                      y2="16.65"
                      className=""
                    ></line>
                  </svg>
                  <input
                    type="name"
                    name="search"
                    className="h-12 w-full cursor-text rounded-md border border-gray-100 bg-gray-100 py-4 pr-40 pl-12 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    placeholder="Search by services..."
                  />
                </div>
              </form>
              <div className="flex mt-6 space-x-3 justify-center">
                {" "}
                {/*div for Category */}
                <button
                  onClick={() => handleFilter("")}
                  className="px-4 py-1 bg-[#1D5B79] hover:bg-[#2069A3] text-white rounded-md"
                >
                  All
                </button>
                <button
                  onClick={() => handleFilter("Software Development")}
                  className="px-4 py-1 bg-[#1D5B79] hover:bg-[#2069A3] text-white rounded-md"
                >
                  Software Development
                </button>
                <button
                  onClick={() => handleFilter("Web Development")}
                  className="px-4 py-1 bg-[#1D5B79] hover:bg-[#2069A3] text-white rounded-md"
                >
                  Web Development
                </button>
                <button
                  onClick={() => handleFilter("Animation")}
                  className="px-4 py-1 bg-[#1D5B79] hover:bg-[#2069A3] text-white rounded-md"
                >
                  Animation
                </button>
                <button
                  onClick={() => handleFilter("Graphic Design")}
                  className="px-4 py-1 bg-[#1D5B79] hover:bg-[#2069A3] text-white rounded-md"
                >
                  Graphic Design
                </button>
                <button
                  onClick={() => handleFilter("Marketing")}
                  className="px-4 py-1 bg-[#1D5B79] hover:bg-[#2069A3] text-white rounded-md"
                >
                  Marketing
                </button>
              </div>
            </div>
          </div>
          <div className="flex-grow">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <Card className="mt-6 min-w-sm max-w-96 max-h-[30rem] pt-6">
                      <CardHeader className="relative h-[400px] bg-gray-200 rounded-md"></CardHeader>
                      <CardBody className="flex flex-col justify-between items-start h-full">
                        <div className="flex flex-col">
                          <Typography className="mb-2 text-gray-400">
                            <div className="h-5 w-24 bg-gray-200 rounded-full"></div>
                          </Typography>
                          <Typography className="mb-2 text-gray-400 font-bold text-3xl">
                            <div className="h-8 w-44 bg-gray-200 rounded-full"></div>
                          </Typography>
                          <Typography className="text-gray-400">
                            <div className="h-5 w-32 bg-gray-200 rounded-full"></div>
                          </Typography>
                        </div>
                        <div className="align-bottom mt-10 w-full flex justify-center bg-gray-200 rounded-md hover:bg-gray-300 active:bg-gray-400">
                          <div className="h-10 w-24 bg-gray-200 rounded-md"></div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {filteredServices.length === 0 ? (
                  <p className="text-center my-28 text-[32px] font-extrabold text-gray-800">
                    No Available Service at the moment ...
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredServices.map((item, index) => (
                      <CCards
                        key={index}
                        serviceId={item?._id}
                        image={item?.thumbNail?.link}
                        subtitle={item.serviceType}
                        title={item.serviceName}
                        author={
                          (item?.freelancerId?.firstName || "") +
                          " " +
                          (item?.freelancerId?.surName || "")
                        }
                        button="Avail"
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <CFooter />
      </div>
    </div>
  );
};

export default WithAuth(CMarketplace);
