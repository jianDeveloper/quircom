import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AddModal from "./addServiceModal";
import Deletion from "./deleteModal";
import UpdateModal from "./updateModal";

import { MdDesignServices } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import { AiFillPlusCircle } from "react-icons/ai";

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
    format: (setDeleteModal, setUpdateModal) => (
      <div className="space-x-2">
        <button
          type="button"
          onClick={() => setUpdateModal(true)}
          className="px-2 py-1 bg-blue-500 rounded text-white"
        >
          <MdDesignServices className="inline" />
        </button>
        <button
          type="button"
          onClick={() => setDeleteModal(true)}
          className="px-2 py-1 bg-red-500 rounded text-white"
        >
          <FaTrashCan className="inline" />
        </button>
      </div>
    ),
  },
];

function serviceData(serviceID, serviceTitle, serviceDetails, servicePrice) {
  const formattedPrice = `₱ ${Number(servicePrice).toLocaleString()}`;
  return {
    serviceID,
    serviceTitle,
    serviceDetails,
    servicePrice: formattedPrice,
  };
}

const ServiceTable = () => {
  // ============================= USESTATE DECLARATION =============================
  const [addModal, setaddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { userId } = useParams();
  const [serviceDetails, setService] = useState([]);
  const [serviceInfos, setServiceInfos] = useState([]);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `https://quircom.onrender.com/api/service/`
        );
        if (response.status === 200) {
          const filteredServices = response.data.filter(
            (service) => service.freelancerId._id === userId
          );
          setService(filteredServices);
        } else {
          console.error(
            "Error fetching services: Unexpected status code",
            response.status
          );
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [userId]);

  const handleView = (service) => {
    setServiceInfos(service);
    console.log("Service Infos:", service);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-full">
        <div className="flex justify-between items-center p-2 bg-[#13334C] text-white">
          <button
            type="button"
            onClick={() => setaddModal(true)}
            className="px-4 py-2 bg-blue-500 rounded text-white"
          >
            <div className="flex flex-row items-center justify-center space-x-2">
              <AiFillPlusCircle size={20} />
              <h1>Add Service</h1>
            </div>
          </button>
          {addModal && <AddModal setaddModal={setaddModal} />}
          <div className="text-white">
            <span>Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => handleChangeRowsPerPage(e)}
              className="mx-2 px-2 py-1 bg-[#1d5b79] rounded text-white"
            >
              {[5, 10, 20].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-full bg-white shadow-md">
          <table className="min-w-full">
            <thead className="bg-[#1d5b79] text-white">
              <tr>
                {serviceColumns.map((column) => (
                  <th
                    key={column.id}
                    className={`px-6 py-3 text-left text-sm font-bold ${
                      column.align === "center" ? "text-center" : "text-left"
                    }`}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {serviceDetails
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((service, rowIndex) => {
                  return (
                    <tr key={rowIndex} className="border-b">
                      <td className="px-6 py-4 text-center">
                        {service?._id}
                      </td>
                      <td className="px-6 py-4">{service?.serviceName}</td>
                      <td className="px-6 py-4">{service?.serviceInfo}</td>
                      <td className="px-6 py-4 text-center">
                        ₱ {Number(service.price).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="space-x-2">
                          <button
                            type="button"
                            onClick={() => {
                              setUpdateModal(true);
                              handleView({ ...service });
                            }}
                            className="px-2 py-1 bg-blue-500 rounded text-white"
                          >
                            <MdDesignServices className="inline" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setDeleteModal(true);
                            }}
                            className="px-2 py-1 bg-red-500 rounded text-white"
                          >
                            <FaTrashCan className="inline" />
                          </button>
                        </div>
                        {deleteModal && (
                          <Deletion 
                            serviceInfos={serviceInfos} 
                            setDeleteModal={setDeleteModal} 
                          />
                        )}
                        {updateModal && (
                          <UpdateModal
                            // serviceID={service?._id}
                            // serviceName={service?.serviceName}
                            // serviceType={service?.serviceType}
                            // serviceInfo={service?.serviceInfo}
                            // price={service?.price}
                            serviceInfos={serviceInfos}
                            setUpdateModal={setUpdateModal}
                          />
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        {/* <Modal/> */}
      </div>
    </div>
  );
};

export default ServiceTable;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import {
//   Paper,
//   Table,
//   TableBody,
//   TableContainer,
//   TableHead,
//   TablePagination,
//   TableRow,
//   TableCell,
// } from "@mui/material/";

// import AddModal from "./addServiceModal";
// import Deletion from "./deleteModal";
// import UpdateModal from "./updateModal";

// import { MdDesignServices } from "react-icons/md";
// import { FaTrashCan } from "react-icons/fa6";
// import { AiFillPlusCircle } from "react-icons/ai";

// const serviceColumns = [
//   { id: "serviceID", label: "Service ID", minWidth: 100, align: "center" },
//   { id: "serviceTitle", label: "Service Title", minWidth: 170 },
//   {
//     id: "serviceDetails",
//     label: "Details",
//     minWidth: 200,
//     align: "left",
//   },
//   {
//     id: "servicePrice",
//     label: "Service Price",
//     minWidth: 100,
//     align: "center",
//   },
//   {
//     id: "actions",
//     label: "Actions",
//     minWidth: 100,
//     align: "center",
//     format: (setDeleteModal, setUpdateModal) => (
//       <div>
//         <button
//           type="button"
//           onClick={() => setUpdateModal(true)}
//           className="mr-2 px-2 py-1 bg-blue-500 rounded text-white"
//         >
//           <MdDesignServices className="inline" />
//         </button>

//         <button
//           type="button"
//           onClick={() => setDeleteModal(true)}
//           className="px-2 py-1 bg-red-500 rounded text-white"
//         >
//           <FaTrashCan className="inline" />
//         </button>
//       </div>
//     ),
//   },
// ];

// function serviceData(serviceID, serviceTitle, serviceDetails, servicePrice) {
//   const formattedPrice = `₱ ${Number(servicePrice).toLocaleString()}`;
//   return {
//     serviceID,
//     serviceTitle,
//     serviceDetails,
//     servicePrice: formattedPrice,
//   };
// }

// const ServiceTable = () => {
//   const [addModal, setaddModal] = React.useState(false);
//   const [deleteModal, setDeleteModal] = React.useState(false);
//   const [updateModal, setUpdateModal] = React.useState(false);

//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const { userId } = useParams();
//   const [serviceDetails, setService] = useState([]);

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const response = await axios.get(`https://quircom.onrender.com/api/service/`);
//         if (response.status === 200) {
//           const filteredServices = response.data.filter(
//             (service) => service.freelancerId._id === userId
//           );
//           setService(filteredServices);
//         } else {
//           console.error(
//             "Error fetching services: Unexpected status code",
//             response.status
//           );
//         }
//       } catch (error) {
//         console.error("Error fetching services:", error);
//       }
//     };

//     fetchServices();
//   }, [userId]);

//   const serviceRows = serviceDetails.map((service) => {
//     return serviceData(
//       service.serviceId,
//       service.serviceName,
//       service.serviceInfo,
//       service.price
//     );
//   });

//   console.log(serviceDetails);

//   return (
//     <div className="flex flex-col justify-center items-center w-[100%]">
//       <Paper sx={{ width: "100%" }}>
//         <div className="flex justify-between items-center p-2 bg-[#13334C] ">
//           <button
//             type="button"
//             onClick={() => setaddModal(true)}
//             className="bg-blue-500 py-2 px-3 mx-4 rounded text-white"
//           >
//             <div className="flex flex-row items-center justify-center gap-2">
//               <AiFillPlusCircle size={20} color="white" />
//               <h1>Add Service</h1>
//             </div>
//           </button>
//           {addModal ? <AddModal setaddModal={setaddModal} /> : null}
//           <TablePagination
//             sx={{
//               backgroundColor: "#13334C",
//               color: "white",
//               ".MuiSelect-root": { color: "white" },
//               ".MuiSelect-icon": { color: "white" },
//               ".MuiSelect-iconFilled": { color: "white" },
//               ".MuiSelect-iconOutlined": { color: "white" },
//             }}
//             rowsPerPageOptions={[5, 10, 20]}
//             component="div"
//             count={serviceRows.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </div>
//         <TableContainer
//           sx={{
//             height: 485,
//             width: "100%",
//             backgroundColor: "white",
//             boxShadow: "0 12px 24px 0 rgba(0, 0, 0, 0.2)",
//           }}
//         >
//           <Table stickyHeader aria-label="sticky table">
//             <TableHead>
//               <TableRow>
//                 {serviceColumns.map((serviceColumns) => (
//                   <TableCell
//                     key={serviceColumns.id}
//                     align={serviceColumns.align}
//                     style={{
//                       minWidth: serviceColumns.minWidth,
//                       backgroundColor: "#1d5b79",
//                       color: "white",
//                     }}
//                   >
//                     {serviceColumns.label}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {serviceRows
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row, rowIndex) => {
//                   const currentServiceDetail = serviceDetails[rowIndex]; // Accessing the current serviceDetail
//                   return (
//                     <TableRow
//                       hover
//                       role="checkbox"
//                       tabIndex={-1}
//                       key={rowIndex}
//                     >
//                       {serviceColumns.map((serviceColumn) => {
//                         const value = row[serviceColumn.id];
//                         return (
//                           <TableCell
//                             key={serviceColumn.id}
//                             align={serviceColumn.align}
//                           >
//                             {serviceColumn.id === "actions"
//                               ? serviceColumn.format(
//                                   setDeleteModal,
//                                   setUpdateModal
//                                 )
//                               : serviceColumn.format &&
//                                 typeof value === "number"
//                               ? serviceColumn.format(
//                                   setDeleteModal,
//                                   setUpdateModal
//                                 )
//                               : value}
//                             {deleteModal ? (
//                               <Deletion setDeleteModal={setDeleteModal} />
//                             ) : null}
//                             {updateModal ? (
//                               <UpdateModal
//                                 key={rowIndex}
//                                 serviceID={currentServiceDetail?._id} // Accessing _id directly from currentServiceDetail
//                                 serviceName={row.serviceTitle}
//                                 serviceType={currentServiceDetail?.serviceType}
//                                 serviceInfo={row.serviceDetails}
//                                 price={row.servicePrice}
//                                 setUpdateModal={setUpdateModal}
//                               />
//                             ) : null}
//                           </TableCell>
//                         );
//                       })}
//                     </TableRow>
//                   );
//                 })}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Paper>
//       {/* <Modal/>    */}
//     </div>
//   );
// };

// export default ServiceTable;
