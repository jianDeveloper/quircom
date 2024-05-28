import React, { useState, useEffect, useMemo } from "react";
import { MdFileDownload, MdFileOpen } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const ProjectFiles = (requestInfos) => {
  const [activeTab, setActiveTab] = useState("image");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState([]);

  console.log(requestInfos.requestInfos._id);

  const handleTab = (Tabs) => {
    setActiveTab(Tabs);
  };

  useEffect(() => {
    if (!requestInfos) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const response = await axios.get(
          `https://quircom.onrender.com/api/chat/message`,
          { headers }
        );

        const filteredMessage = response.data.filter(
          (msg) => msg.requestId?._id === requestInfos._id
        );
        setMessage(filteredMessage);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    const intervalId = setInterval(() => {
      fetchMessages();
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [requestInfos]);

  const messagesWithDate = useMemo(() => {
    if (!requestInfos || !message.length) return [];

    let currentDate = "";
    return message.map((chat) => {
      const messageDate = new Date(chat.createdAt).toLocaleDateString();
      const isFirstMessageOfDate = messageDate !== currentDate;
      currentDate = messageDate;

      return { ...chat, messageDate, isFirstMessageOfDate };
    });
  }, [requestInfos, message]);

  const handleDownload = async (fileId, fileName) => {
    try {
      const token = localStorage.getItem("authToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(
        `https://quircom.onrender.com/api/chat/download/${fileId}`,
        {
          headers,
          responseType: "blob",
        }
      );

      // Create a temporary URL for the downloaded file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
      // Handle error
    }
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
      {activeTab === "docx" && (
        <>
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
        </>
      )}
      {activeTab === "image" && (
        <div className="h-full bg-white rounded-b-lg">
          {messagesWithDate.map((chat, index) => (
            <div key={index} className="flex flex-col px-6">
              {chat.isFirstMessageOfDate && (
                <div className="flex w-full text-center justify-center mb-2">
                  <h1 className="text-xs font-medium text-gray-500">
                    {chat.messageDate}
                  </h1>
                </div>
              )}
              <div
                className={`flex items-center mb-2 ${
                  chat.senderType === "client" ? "justify-end" : ""
                }`}
              >
                {chat.senderType === "freelancer" && (
                  <img
                    className="w-8 h-8 rounded-full mr-2 shadow-md"
                    src={chat.sender.profilePic.link}
                    alt="Profile"
                  />
                )}
                <p className="p-2 text-sm font-bold text-left">
                  {chat.sender.firstName}
                </p>
                {chat.senderType === "client" && (
                  <img
                    className="w-8 h-8 rounded-full ml-2 shadow-md"
                    src={chat.sender.profilePic.link}
                    alt="Profile"
                  />
                )}
              </div>
              <div
                className={`flex flex-col mb-3 rounded-lg ${
                  chat.senderType === "client"
                    ? "bg-blue-200 ml-auto"
                    : "bg-gray-200 mr-auto"
                }`}
                style={{
                  maxWidth: "60%",
                  minWidth: "12%",
                  textAlign: chat.senderType === "client" ? "left" : "right",
                }}
              >
                <p
                  className={`p-2 text-sm text-left`}
                  style={{
                    overflowWrap: "break-word",
                    wordBreak: "break-all",
                    textAlign: chat.senderType === "client" ? "right" : "left",
                  }}
                >
                  {chat.message}
                </p>
                {chat.attachment &&
                  chat.attachment.link &&
                  chat.attachment.type === "image" && (
                    <div>
                      <img
                        src={chat.attachment.link}
                        alt="Attachment"
                        className="w-full"
                        onClick={() =>
                          window.open(chat.attachment.link, "_blank")
                        }
                        style={{ cursor: "pointer" }}
                      />
                      <span
                        onClick={() =>
                          window.open(chat.attachment.link, "_blank")
                        }
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        View Image
                      </span>
                    </div>
                  )}
                <p
                  className={`px-2 pb-1 text-xs text-gray-500 ${
                    chat.senderType === "freelancer"
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  {new Date(chat.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectFiles;
