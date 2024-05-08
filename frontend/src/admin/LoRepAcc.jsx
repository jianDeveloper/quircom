import React, { useState } from "react";
import { FaTrash } from 'react-icons/fa';
import { FaPersonDotsFromLine } from 'react-icons/fa6';

const LoRepAcc = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div className="flex flex-col bg-red-500 items-center h-full w-[90%]">
      <div className="flex w-[100%] items-center py-2 px-5 bg-[#F5F5DC] text-[#13334C] font-medium">
        <span>Rows per page:</span>
        <select
          value={rowsPerPage}
          onChange={(e) => handleChangeRowsPerPage(e)}
          className="mx-2 px-2 py-1 bg-blue-100 rounded text-[#13334C] border-[2px] border-[#13334C]"
        >
          {[5, 10, 20].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full bg-white shadow-md">
        <table className="min-w-full">
          <thead className="bg-[#1d5b79] text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-bold">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold">
                Report Details
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold">Email</th>
              <th className="px-6 py-3 text-left text-sm font-bold">Contact</th>
              <th className="px-6 py-3 text-left text-sm font-bold">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b bg-blue-200 text-[#13334C]">
              <td className="px-6 py-4 text-left">dfdf</td>
              <td className="px-6 py-4 text-left">dfdfdf dfdfdf</td>
              <td className="px-6 py-4 text-left">dfdf</td>
              <td className="px-6 py-4 text-left">dfdf</td>
              <td className="px-6 py-4 text-left">dfdf</td>
              <td className="px-6 py-4 text-left">
                <button
                  type="button"
                  //   onClick={() => handleSubmit(row._id, "approve")}
                  className="mr-2 px-2 py-1 bg-blue-500 rounded text-white"
                >
                  <FaPersonDotsFromLine className="inline" />
                </button>
                <button
                  type="button"
                  //   onClick={() => handleSubmit(row._id, "reject")}
                  className="px-2 py-1 bg-red-500 rounded text-white"
                >
                  <FaTrash className="inline" />
                </button>
              </td>
            </tr>
            <tr className="border-b bg-blue-100 text-[#13334C]">
              <td className="px-6 py-4 text-left">dfdf</td>
              <td className="px-6 py-4 text-left">dfdfdf dfdfdf</td>
              <td className="px-6 py-4 text-left">dfdf</td>
              <td className="px-6 py-4 text-left">dfdf</td>
              <td className="px-6 py-4 text-left">dfdf</td>
              <td className="px-6 py-4 text-left">
                <button
                  type="button"
                  //   onClick={() => handleSubmit(row._id, "approve")}
                  className="mr-2 px-2 py-1 bg-blue-500 rounded text-white"
                >
                  <FaPersonDotsFromLine className="inline" />
                </button>
                <button
                  type="button"
                  //   onClick={() => handleSubmit(row._id, "reject")}
                  className="px-2 py-1 bg-red-500 rounded text-white"
                >
                  <FaTrash className="inline" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LoRepAcc