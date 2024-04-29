import React from "react";

import BG1 from "../../assets/bg1.png";
import CMainNav from "../CMainNav";
import CFooter from "../CFooter";

const Project = () => {
  return (
    <div>
      <CMainNav />
      <div
        className="flex flex-col"
        style={{
          background: `url(${BG1})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="grid grid-cols-5 justify-center py-10 px-14">
          {/* 1st column Grid - List Projects */}
          <div className="col-span-2 mr-2 w-[90%]">
            <div className="flex gap-4 items-baseline">
              <h1 className="font-extrabold text-sm uppercase border-b-2 border-[#1D5B79] mb-3 text-[#1D5B79]">
                List of Projects
              </h1>
              <h1 className="font-extrabold rounded-md text-xs uppercase text-[#1D5B79] px-1 cursor-pointer hover:bg-blue-100">
                Completed
              </h1>
            </div>
            <div className="bg-white min-h-[500px] rounded-lg">
              <table className="min-w-full rounded-t-lg shadow-md">
                <thead className="bg-[#1d5b79] text-white">
                  <tr>
                    <th className="px-2 py-1 text-left text-sm font-bold rounded-tl-lg">
                      ID
                    </th>
                    <th className="px-2 py-1 text-left text-sm font-bold">
                      Availed Service
                    </th>
                    <th className="px-2 py-1 text-left text-sm font-bold">
                      Deadline
                    </th>
                    <th className="px-2 py-1 text-left text-sm font-bold rounded-tr-lg">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-blue-100 hover:bg-orange-100 border-l border-r border-gray-200 cursor-pointer">
                    <td className="px-2 py-1 text-left text-sm font-bold">1</td>
                    <td className="px-2 py-1 text-left text-sm font-bold">
                      Service 1
                    </td>
                    <td className="px-2 py-1 text-left text-sm font-bold">
                      2023-05-01
                    </td>
                    <td className="px-2 py-1 text-left text-sm font-bold">
                      Pending
                    </td>
                  </tr>
                  <tr className="bg-white hover:bg-orange-100 border-l border-r border-gray-200 cursor-pointer">
                    <td className="px-2 py-1 text-left text-sm font-bold">1</td>
                    <td className="px-2 py-1 text-left text-sm font-bold">
                      Service 1
                    </td>
                    <td className="px-2 py-1 text-left text-sm font-bold">
                      2023-05-01
                    </td>
                    <td className="px-2 py-1 text-left text-sm font-bold">
                      Pending
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* 2nd column Grid - Chat */}
          <div className="col-span-3">
            <div className="flex gap-4 items-baseline">
              <h1 className="font-extrabold text-sm uppercase border-b-2 border-[#1D5B79] mb-3 text-[#1D5B79]">
                Chat
              </h1>
            </div>
            <div className="grid grid-rows-12 bg-white">
              <div className="items-center py-1 px-2 justify-center bg-[#1D5B79] rounded-t-md">
                <h1 className="font-extrabold text-sm uppercase text-white text-center">
                  Task Title
                </h1>
              </div>
              <div className="bg-blue-100 flex">
              <div className="">
              <h1>Freelancer Name</h1>
              </div>
              <div className="">
              {/* Icons Insert */}
              </div>
              </div>
              
            </div>
          </div>
          {/* End of 2nd column */}
        </div>
      </div>
      <CFooter />
    </div>
  );
};

export default Project;
