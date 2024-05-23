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
      label: `Clients (${clientPercentage}%)`,
    },
    {
      id: 2,
      value: parseFloat(servicePercentage),
      label: `Services (${servicePercentage}%)`,
    },
  ];
  const data1 = [
    { id: 0, value: 10, label: "series A" },
    { id: 1, value: 15, label: "series B" },
    { id: 2, value: 20, label: "series C" },
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
    <div className="flex flex-col bg-blue-200 items-center h-full w-[90%]">
      <div className="flex w-[100%] items-center py-2 px-5 bg-[#F5F5DC] text-[#13334C] font-medium">
        <span>Analytical Data:</span>
      </div>
      <div className="w-full bg-blue-200 shadow-md p-5" ref={componentRef}>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <div className="w-full flex items-center">
            <div className="mb-4">
              <h1 className="text-[#13334C] font-medium">
                Total Number of Users:
              </h1>
              <PieChart
                series={[
                  {
                    data: data,
                    highlightScope: { faded: "global", highlighted: "item" },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },
                  },
                ]}
                height={300}
              />
            </div>
            <div className="mb-4">
              <h1 className="text-[#13334C] font-medium">
                Total Number of Reported Accounts:
              </h1>
              <PieChart
                series={[
                  {
                    data: data1,
                    highlightScope: { faded: "global", highlighted: "item" },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },
                  },
                ]}
                height={300}
              />
            </div>
          </div>
        </Box>
      </div>
      <button
        onClick={handlePrint}
        className="w-1/4 h-1/6 mt-4 mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Print
      </button>
    </div>
  );
};

export default LoA;
