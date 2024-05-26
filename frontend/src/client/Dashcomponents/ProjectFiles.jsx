import React, { useState } from "react";
import { MdFileDownload, MdFileOpen } from "react-icons/md";

const ProjectFiles = () => {
  const [activeTab, setActiveTab] = useState("image");

  const handleTab = (Tabs) => {
    setActiveTab(Tabs);
  };

  return (
    <div className="flex flex-col h-full rounded-lg">
      <div className="text-white font-medium text-sm  rounded-t-lg">
        <button
          className="rounded-t-lg py-1 w-[50%] h-full bg-[#1D5B79]"
          onClick={() => handleTab("image")}
        >
          Image
        </button>
        <button
          className="rounded-t-lg py-1 w-[50%] bg-[#204355]"
          onClick={() => handleTab("docx")}
        >
          Documents
        </button>
      </div>
      {activeTab === "docx" && <>
      <div className="h-full bg-white rounded-b-lg">
        <table className="min-w-full shadow-md overflow-y-auto">
          <tbody>
            <tr>
              <td className="pl-16 pr-8 py-2 text-left text-sm font-bold">
                <span className="flex flex-row items-center text-xl text-gray-500 gap-2">
                  <MdFileOpen />
                  <span className="text-[16px] pt-1 text-black whitespace-nowrap overflow-hidden text-ellipsis">
                    file name
                  </span>
                </span>
              </td>
              <td className="pr-16 w-[70px] py-1 text-left text-sm font-bold">
                <button className="rounded-full px-2 border-solid border-[1px] border-gray-600 hover:bg-blue-100">
                  <span className="flex flex-row items-center text-lg text-gray-500 gap-1">
                    <MdFileDownload />
                    <span className="text-[14px] text-black">Download</span>
                  </span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </>}
      {activeTab === "image" && <>
      <div className="h-full bg-white rounded-b-lg">
        
      </div>
      </>}
    </div>
  );
};

export default ProjectFiles;
