import React from "react";
import { MdFileDownload, MdFileOpen } from "react-icons/md";

const ProjectFiles = () => {
  return (
    <div className="bg-white min-h-[500px] rounded-lg">
      <div className="text-white font-medium text-sm bg-orange-500 rounded-t-lg">
        <button className="rounded-t-lg py-1 w-[50%] h-full bg-[#1D5B79]">
          Image
        </button>
        <button className="rounded-t-lg py-1 w-[50%] bg-[#204355]">
          Documents
        </button>
      </div>
      <table className="min-w-full shadow-md bg-white">
        <tbody>
          {/* {loading ? (
            <>
              <tr>
                <td className="px-2 py-1 text-left text-sm font-bold">
                  <div className="animate-pulse h-5 bg-gray-200 rounded-full"></div>
                </td>
                <td className="px-2 py-1 text-left text-sm font-bold">
                  <div className="animate-pulse h-5 bg-gray-200 rounded-full"></div>
                </td>
                <td className="px-2 py-1 text-left text-sm font-bold">
                  <div className="animate-pulse h-5 bg-gray-200 rounded-full"></div>
                </td>
              </tr>
              <tr>
                <td className="px-2 py-1 text-left text-sm font-bold">
                  <div className="animate-pulse h-5 bg-gray-200 rounded-full"></div>
                </td>
                <td className="px-2 py-1 text-left text-sm font-bold">
                  <div className="animate-pulse h-5 bg-gray-200 rounded-full"></div>
                </td>
                <td className="px-2 py-1 text-left text-sm font-bold">
                  <div className="animate-pulse h-5 bg-gray-200 rounded-full"></div>
                </td>
              </tr>
              <tr>
                <td className="px-2 py-1 text-left text-sm font-bold">
                  <div className="animate-pulse h-5 bg-gray-200 rounded-full"></div>
                </td>
                <td className="px-2 py-1 text-left text-sm font-bold">
                  <div className="animate-pulse h-5 bg-gray-200 rounded-full"></div>
                </td>
                <td className="px-2 py-1 text-left text-sm font-bold">
                  <div className="animate-pulse h-5 bg-gray-200 rounded-full"></div>
                </td>
              </tr>
            </>
          ) : ( */}
          <>
            {/* {requestDetails.map((request, index) => ( */}
            <tr
            //   key={index}
            //   className={`${
            //     index % 2 === 0 ? "bg-blue-100" : "bg-white"
            //   } hover:bg-orange-100 border-l border-r border-gray-200 cursor-pointer`}
            >
              <td className="pl-16 pr-8 py-2 text-left text-sm font-bold">
                <span className="flex flex-row items-center text-xl text-gray-500 gap-2"><MdFileOpen />
                <span className="text-[16px] pt-1 text-black whitespace-nowrap overflow-hidden text-ellipsis">
                  file name
                </span>
                </span>
                
              </td>
              <td className="pr-16 w-[70px] py-1 text-left text-sm font-bold">
                <button className="rounded-full px-2 border-solid border-[1px] border-gray-600 hover:bg-blue-100">
                <span className="flex flex-row items-center text-lg text-gray-500 gap-1"><MdFileDownload />
                <span className="text-[14px] text-black">Download</span></span></button>
              </td>
            </tr>
            {/* ))} */}
          </>
          {/* )} */}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectFiles;
