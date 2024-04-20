import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableCell,
} from "@mui/material/";
import Confirmation from "./confirmModal";
import Convo from "./convoModal";

import { MdDesignServices } from "react-icons/md";
import { FaFileCircleCheck } from "react-icons/fa6";

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
    format: (setConfirmModal,setConvoModal) => (
      <div>
        <button
          type="button"
          onClick={() => setConvoModal(true)}
          className="mr-2 px-2 py-1 bg-blue-500 rounded text-white"
        >
          <MdDesignServices className="inline" />
        </button>
        <button
          type="button"
          onClick={() => setConfirmModal(true)}
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

const FTable = () => {
  const { userId } = useParams();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [confirmModal, setConfirmModal] = React.useState(false);
  const [convoModal, setConvoModal] = React.useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`https://quircom.onrender.com/api/request/`);
        if (response.status === 200) {
          const filteredRequests = response.data.filter(
            (request) => request.serviceId._id === userId
          );
          setService(filteredRequests);
        } else {
          console.error(
            "Error fetching requests: Unexpected status code",
            response.status
          );
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
  
  fetchRequests();
  }, [userId]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
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
                      backgroundColor: "#13334C",
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
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "actions"
                              ? column.format(setConfirmModal,setConvoModal)
                              : column.format && typeof value === "number"
                              ? column.format(setConfirmModal,setConvoModal)
                              : value}
                            {confirmModal ? <Confirmation setConfirmModal={setConfirmModal} /> : null}
                          {convoModal ? <Convo setConvoModal={setConvoModal} /> : null}
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
  );
};

export default FTable;
