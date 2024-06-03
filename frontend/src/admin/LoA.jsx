import React, { useState, useEffect, useRef } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import Loader from "../assets/quircomloading.gif"; // Assuming you have a loading gif
import WithAuthAdmin from "../auth/WithAuthAdmin";

const LoA = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);
  const [request, setRequest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ongoing, setOngoing] = useState([]);
  const [pending, setPending] = useState([]);
  const [complete, setComplete] = useState([]);

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

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const response = await axios.get(
          `https://quircom.onrender.com/api/request`,
          { headers }
        );
        if (response.status === 200) {
          const filteredRequests = response.data.filter(
            (request) =>
              request?.report?.status === true
          );
          setRequest(filteredRequests);

          if (response.status === 200) {
            const filteredO = response.data.filter(
              (request) =>
                request?.status === "Ongoing"
            );
            setOngoing(filteredO);
          }
          if (response.status === 200) {
            const filteredP = response.data.filter(
              (request) =>
                request?.status === "Pending"
            );
            setPending(filteredP);
          }
          if (response.status === 200) {
            const filteredC = response.data.filter(
              (request) =>
                request?.status === "Complete"
            );
            setComplete(filteredC);
          }
        } else {
          console.error(
            "Error fetching requests: Unexpected status code",
            response.status
          );
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
        setError("Error fetching freelancer data");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const total = freelancers.length + clients.length + services.length;
  const freelancerPercentage = ((freelancers.length / total) * 100).toFixed(2);
  const clientPercentage = ((clients.length / total) * 100).toFixed(2);
  const servicePercentage = ((services.length / total) * 100).toFixed(2);
  const reportPercentage = ((request.length / total) * 100).toFixed(2);

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

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
  ];
  const data1 = [
    { id: 0, value: parseFloat(servicePercentage), label: "Service" },
    { id: 2, value: parseFloat(reportPercentage) , label: "Reported" },
    
  ];

  const datatable = [
    {
      id: 0,
      name: "Freelancers",
      count: freelancers.length,
    },
    {
      id: 1,
      name: "Clients",
      count: clients.length,
    },
    {
      id: 2,
      name: "Services",
      count: services.length,
    },
    {
      id: 3,
      name: "Reported",
      count: request.length,
    },
    {
      id: 4,
      name: "Completed",
      count: complete.length,
    },
    {
      id: 5,
      name: "Requested",
      count: pending.length,
    },
    {
      id: 6,
      name: "Ongoing",
      count: ongoing.length,
    },
  ];

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
      <div className="flex w-full h-14 items-center py-3 px-5 bg-[#F5F5DC] text-[#13334C] font-medium border-b-[1px] border-gray-500">
        <button
          onClick={handlePrint}
          className="px-4 py-1 bg-[#1D5B79] hover:bg-blue-200 hover:text-[#13334C] hover:border-2 border-[#13334C] text-white font-bold rounded"
        >
          Print Analytics
        </button>
      </div>
      <div ref={printRef} className="w-[100%]">
      <div
        className="flex flex-col lg:flex-row w-full p-5"
      >
        <div className="w-full overflow-x-auto">
          <h1 className="text-[#13334C] font-medium">Accounts Analytics:</h1>
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
          <h1 className="text-[#13334C] font-medium">Service Analytics:</h1>
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
      <div className="flex justify-center items-center w-full my-5">
        <table className="w-[60%] rounded-md shadow-md">
          <thead className="bg-[#13334C] font-medium">
            <tr className="w-full ">
              <td colSpan={2} className="text-center text-white mx-auto py-2 uppercase font-bold rounded-t-lg">
                Breakdown
              </td>
            </tr>
          </thead>
          <tbody className="text-[#13334C] font-medium">
            {datatable.map((item, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-orange-200" : "bg-blue-300"}
              >
                <td className="text-center">{item.name}</td>
                <td className="text-center">{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};

export default WithAuthAdmin(LoA);
