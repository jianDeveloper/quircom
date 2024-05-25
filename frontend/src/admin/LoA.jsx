import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { PieChart } from "@mui/x-charts/PieChart";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import Loader from "../assets/quircomloading.gif"; // Assuming you have a loading gif

const LoA = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const response = await axios.get(
          `https://quircom.onrender.com/api/freelancer`,
          { headers }
        );
        setFreelancers(response.data);
      } catch (error) {
        setError("Error fetching freelancer data");
        console.error("Error fetching freelancer data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchClients = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const response = await axios.get(
          `https://quircom.onrender.com/api/client`,
          { headers }
        );
        setClients(response.data);
      } catch (error) {
        setError("Error fetching client data");
        console.error("Error fetching client data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchServices = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const response = await axios.get(
          `https://quircom.onrender.com/api/service`,
          { headers }
        );
        setServices(response.data);
      } catch (error) {
        setError("Error fetching service data");
        console.error("Error fetching service data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFreelancers();
    fetchClients();
    fetchServices();
  }, []);

  const total = freelancers.length + clients.length + services.length;
  const freelancerPercentage = ((freelancers.length / total) * 100).toFixed(2);
  const clientPercentage = ((clients.length / total) * 100).toFixed(2);
  const servicePercentage = ((services.length / total) * 100).toFixed(2);

  const data = [
    {
      id: 0,
      value: parseFloat(freelancerPercentage),
      label: `Freelancers (${freelancerPercentage}%)`,
    },
    {
      id: 1,
      value: parseFloat(clientPercentage),
      label: `Clients  (${clientPercentage}%)`,
    },
  ];
  const data1 = [
    { id: 0, value: 10, label: "Service" },
    { id: 1, value: 15, label: "series B" },
    { id: 2, value: 20, label: "Reported" },
  ];

  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src={Loader} className="w-[80px]" alt="Loading..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-blue-200 items-center h-auto w-[90%]">
      <div className="flex w-[100%] h-14 items-center py-3 px-5 bg-[#F5F5DC] text-[#13334C] font-medium border-b-[1px] border-gray-500">
      <button
        onClick={handlePrint}
        className="px-4 py-1 bg-[#1D5B79] hover:bg-blue-200 hover:text-[#13334C] hover:border-2 border-[#13334C] text-white font-bold rounded"
      >
        Print Analytics
      </button>
      </div>
      <div className="flex flex-col md:flex-row w-full bg-blue-200 shadow-md p-5" ref={componentRef}>
        <div className="w-full">
        <h1 className="text-[#13334C] font-medium">
                Accounts Analytics:
          </h1>
              <PieChart
                series={[
                  {
                    data: data,
      innerRadius: 30,
      outerRadius: 90,
      paddingAngle: 2,
      cornerRadius: 5,
      startAngle: -360,
      endAngle: 0,
      cx: 180,
                  },
                ]}
                height={200}
              />
        </div>
      <div className="w-full gap-2">
        <h1 className="text-[#13334C] font-medium">
                Service Analytics:
              </h1>
              <PieChart
                series={[
                  {
                    data: data1,
      innerRadius: 30,
      outerRadius: 90,
      paddingAngle: 2,
      cornerRadius: 5,
      startAngle: -180,
      endAngle: 180,
      cx: 180,
                    },
                ]}
                height={200}
              />
        </div>
      </div>
    </div>
  );
};

export default LoA;