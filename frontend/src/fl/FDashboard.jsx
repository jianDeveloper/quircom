import { useEffect, useState, useContext } from "react";
import React from "react";
import axios from "axios"; // Import axios for making HTTP requests
import UserContext from "../context/UserContext";
import { useParams } from "react-router-dom";

import BG1 from "../assets/bg1.png";
import {
  MdAdd,
  MdDesignServices,
  MdPendingActions,
  MdPlusOne,
} from "react-icons/md";
import { FaFileCircleCheck } from "react-icons/fa6";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableCell,
  Stack,
} from "@mui/material/";
import FMainNav from "./FMainNav";
import FFooter from "./FFooter";
import { Button } from "@material-tailwind/react";
import { AiFillPlusCircle } from "react-icons/ai";

const column = [
  { id: "ticketID", label: "Ticket ID", minWidth: 100, align: "center" },
  { id: "cName", label: "Client Name", minWidth: 170 },
  {
    id: "availedService",
    label: "Availed Service",
    minWidth: 100,
    align: "center",
  },
  {
    id: "task",
    label: "Task Details",
    minWidth: 200,
    align: "left",
  },
  {
    id: "deadline",
    label: "Deadline",
    minWidth: 100,
    align: "center",
    format: (value) => new Date(value).toLocaleString("en-GB"),
  },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
    align: "center",
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 100,
    align: "center",
    format: (value) => (
      <div>
        <button
          type="button"
          className="mr-2 px-2 py-1 bg-blue-500 rounded text-white"
        >
          <MdDesignServices className="inline" />
        </button>
        <button
          type="button"
          className="px-2 py-1 bg-orange-500 rounded text-white"
        >
          <FaFileCircleCheck className="inline" />
        </button>
      </div>
    ),
  },
];

const serviceColumns = [
  { id: "serviceID", label: "Service ID", minWidth: 100, align: "center" },
  { id: "serviceTitle", label: "Service Title", minWidth: 170 },
  {
    id: "serviceDetails",
    label: "Details",
    minWidth: 200,
    align: "left",
  },
  {
    id: "servicePrice",
    label: "Service Price",
    minWidth: 100,
    align: "center",
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 100,
    align: "center",
    format: (value) => (
      <div>
        <button
          type="button"
          className="mr-2 px-2 py-1 bg-blue-500 rounded text-white"
        >
          <MdDesignServices className="inline" />
        </button>
        <button
          type="button"
          className="px-2 py-1 bg-orange-500 rounded text-white"
        >
          <FaFileCircleCheck className="inline" />
        </button>
      </div>
    ),
  },
];

function trackerData(ticketID, cName, availedService, task, deadline, status) {
  return { ticketID, cName, availedService, task, deadline, status };
}

const trackerRows = [
  trackerData(
    "123456789",
    "John Nicole Bergantinos",
    "Graphics Design",
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione quam dicta vel natus odit. Tenetur officia, nam voluptate sint a eveniet minima in, dolore quaerat amet magni consectetur ea. Quisquam!",
    "2024-02-11",
    "Open"
  ),
  trackerData("12345", "CN", "IN", 1403500365, "2024-05-09", "Open"),
  trackerData("12345", "IT", "IN", 60483973, "2024-02-15", "Open"),
  trackerData("12345", "US", "IN", 327167434, "2024-08-09", "Open"),
  trackerData("12345", "CA", "IN", 37602103, "2024-01-12", "Open"),
  trackerData("12345", "AU", "IN", 25475400, "2024-04-25", "Open"),
  trackerData("12345", "DE", "IN", 83019200, "2024-07-28", "Open"),
  trackerData("12345", "IE", "IN", 4857000, "2024-01-10", "Open"),
  trackerData("12345", "MX", "IN", 126577691, "2024-06-09", "Open"),
  trackerData("12345", "JP", "IN", 126317000, "2024-01-09", "Open"),
  trackerData("12345", "FR", "IN", 67022000, "2024-02-22", "Open"),
  trackerData("12345", "GB", "IN", 67545757, "2024-05-10", "Open"),
  trackerData("12345", "RU", "IN", 146793744, "2024-09-11", "Open"),
  trackerData("12345", "NG", "IN", 200962417, "2024-04-09", "Open"),
  trackerData("12345", "BR", "IN", 210147125, "2024-03-19", "Open"),
];

function serviceData(serviceID, serviceTitle, serviceDetails, servicePrice) {
  return { serviceID, serviceTitle, serviceDetails, servicePrice };
}

const serviceRows = [
  serviceData("12345", "Video Editing", "lorem ipsum dolor sit amet...", 5000),
];

function FDashboard() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null); // State to store user data

  const [activeTab, setActiveTab] = useState("track");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleTab = (track) => {
    setActiveTab(track);
  };

  const { userIdLink } = useContext(UserContext);
  console.log("User ID in Dashboard:", userIdLink);

  useEffect(() => {
    // Fetch user data using the user ID
    axios
      .get(`http://localhost:8800/api/users/${userId}`)
      .then((response) => {
        console.log("User data:", response.data);
        setUserData(response.data); // Set the user data in state
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userId]); // Fetch user data whenever userId changes

  return (
    <div
      className="flex flex-col h-[100vh]"
      style={{
        background: `url(${BG1})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <FMainNav />
      <div className="flex align-center justify-center mx-[100px]">
        <div className="flex flex-col container my-10">
          {/*formatting navbar & body -j*/}
          {/* Box Analytics */}
          <div className="grid grid-cols-3 gap-[20px] my-[15px]">
            <div className="flex flex-col justify-around px-4 py-4 border-[#1D5B79] border-[3px] border-solid bg-white hover:shadow-lg rounded-md">
              <div className="flex items-center justify-between">
                <h1 className="text-[20px] text-[#13334C] font-bold">
                  My Services
                </h1>
                <MdDesignServices size={30} color="#1d5b79" />
              </div>
              <h1 className="font-medium text-[#1D5B79]">100</h1>
            </div>
            <div className="flex flex-col justify-around px-4 py-4 border-[#1D5B79] border-[3px] border-solid bg-white hover:shadow-lg rounded-md">
              <div className="flex items-center justify-between">
                <h1 className="text-[20px] text-[#13334C] font-bold">
                  Pending Projects
                </h1>
                <MdPendingActions size={30} color="#1d5b79" />
              </div>
              <h1 className="font-medium text-[#1D5B79]">33</h1>
            </div>
            <div className="flex flex-col justify-around px-4 py-4 border-[#1D5B79] border-[3px] border-solid bg-white hover:shadow-lg rounded-md">
              <div className="flex items-center justify-between">
                <h1 className="text-[20px] text-[#13334C] font-bold">
                  Finished Projects
                </h1>
                <FaFileCircleCheck size={27} color="#1d5b79" />
              </div>
              <h1 className="font-medium text-[#1D5B79]">12</h1>
            </div>
          </div>
          {/* Box Analytics */}
          {/* Menu Tabs */}
          <div className="flex flex-col justify-center items-center">
            {/* outside container */}
            <div className="flex justify-between items-center w-[100%] h-[100px] my-5">
              <button
                className={
                  activeTab === "track"
                    ? "active-tab border-[#1D5B79] text-white bg-[#13334C] py-8 w-[49%] border-[3px] rounded-md"
                    : "border-[#1D5B79] py-4 w-[48%] border-[3px] rounded-md hover:w-[49%] hover:py-8 hover:bg-[#13334C] hover:text-white"
                }
                onClick={() => handleTab("track")}
              >
                <h1 className=" text-lg font-extrabold">Ticket Tracker</h1>
              </button>
              <button
                className={
                  activeTab === "manage"
                    ? "active-tab border-[#1D5B79] text-white bg-[#13334C] py-8 w-[49%] border-[3px] rounded-md"
                    : "border-[#1D5B79] py-4 w-[48%] border-[3px] rounded-md hover:w-[49%] hover:py-8 hover:bg-[#13334C] hover:text-white"
                }
                onClick={() => handleTab("manage")}
              >
                <h1 className=" text-lg font-extrabold">Manage Services</h1>
              </button>
            </div>
            {/* inside container */}
            <div className="flex flex-col justify-center items-center w-[90%]">
              {activeTab === "track" && (
                <div className="flex flex-col justify-center items-center w-[100%]">
                  <Paper sx={{ width: "100%" }}>
                    <TableContainer
                      sx={{
                        height: 500,
                        width: "100%",
                        backgroundColor: "white",
                        boxShadow: "0 12px 24px 0 rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            {column.map((column) => (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{
                                  minWidth: column.minWidth,
                                  backgroundColor: "#1d5b79",
                                  color: "white",
                                }}
                              >
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {trackerRows
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((row, rowIndex) => {
                              return (
                                <TableRow
                                  hover
                                  role="checkbox"
                                  tabIndex={-1}
                                  key={rowIndex}
                                >
                                  {column.map((column) => {
                                    const value = row[column.id];
                                    return (
                                      <TableCell
                                        key={column.id}
                                        align={column.align}
                                      >
                                        {column.id === "actions"
                                          ? column.format(value)
                                          : column.format &&
                                            typeof value === "number"
                                          ? column.format(value)
                                          : value}
                                      </TableCell>
                                    );
                                  })}
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      sx={{
                        backgroundColor: "#13334C",
                        color: "white",
                        ".MuiSelect-root": { color: "white" },
                        ".MuiSelect-icon": { color: "white" },
                        ".MuiSelect-iconFilled": { color: "white" },
                        ".MuiSelect-iconOutlined": { color: "white" },
                      }}
                      rowsPerPageOptions={[5, 10, 20]}
                      component="div"
                      count={trackerRows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Paper>
                </div>
              )}
              {activeTab === "manage" && (
                <div className="flex flex-col justify-center items-center w-[100%]">
                  <Paper sx={{ width: "100%" }}>
                    <div className="flex justify-end items-center p-2 bg-[#13334C] ">
                      <Button className="bg-[#1d5b79] p-4 mx-2">
                        <div className="flex flex-row items-center justify-center gap-2">
                          <AiFillPlusCircle size={20} color="white" />
                          <h1>Add Service</h1>
                        </div>
                      </Button>
                    </div>
                    <TableContainer
                      sx={{
                        height: 500,
                        width: "100%",
                        backgroundColor: "white",
                        boxShadow: "0 12px 24px 0 rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            {serviceColumns.map((serviceColumns) => (
                              <TableCell
                                key={serviceColumns.id}
                                align={serviceColumns.align}
                                style={{
                                  minWidth: serviceColumns.minWidth,
                                  backgroundColor: "#1d5b79",
                                  color: "white",
                                }}
                              >
                                {serviceColumns.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {serviceRows
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((row, rowIndex) => {
                              return (
                                <TableRow
                                  hover
                                  role="checkbox"
                                  tabIndex={-1}
                                  key={rowIndex}
                                >
                                  {serviceColumns.map((serviceColumns) => {
                                    const value = row[serviceColumns.id];
                                    return (
                                      <TableCell
                                        key={serviceColumns.id}
                                        align={serviceColumns.align}
                                      >
                                        {serviceColumns.id === "actions"
                                          ? serviceColumns.format(value)
                                          : serviceColumns.format &&
                                            typeof value === "number"
                                          ? serviceColumns.format(value)
                                          : value}
                                      </TableCell>
                                    );
                                  })}
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      sx={{
                        backgroundColor: "#13334C",
                        color: "white",
                        ".MuiSelect-root": { color: "white" },
                        ".MuiSelect-icon": { color: "white" },
                        ".MuiSelect-iconFilled": { color: "white" },
                        ".MuiSelect-iconOutlined": { color: "white" },
                      }}
                      rowsPerPageOptions={[5, 10, 20]}
                      component="div"
                      count={serviceRows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Paper>
                </div>
              )}
            </div>
          </div>
          {/* Menu Tabs */}
        </div>
      </div>
      <FFooter />
    </div>
  );
}

export default FDashboard;
