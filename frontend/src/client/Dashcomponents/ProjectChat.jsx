import React, { useEffect, useState, useRef, useMemo } from "react";
import WithAuth from "../../auth/WithAuth";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Avatar, IconButton } from "@mui/material";
import { FaFileImport, FaInfoCircle } from "react-icons/fa";

const ProjectChat = ({ requestInfos }) => {
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!requestInfos) {
      setLoading(false);
      return;
    }

    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        };

        const response = await axios.get(
          `https://quircom.onrender.com/api/chat/message`,
          {
            headers,
          }
        );
        const filteredMessage = response.data.filter(
          (msg) => msg.requestId?._id === requestInfos?._id
        );
        setMessage(filteredMessage);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching messages:", error);
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
    if (!message.length) return [];

    let currentDate = "";
    return message.map((chat) => {
      const messageDate = new Date(chat.createdAt).toLocaleDateString();
      const isFirstMessageOfDate = messageDate !== currentDate;
      currentDate = messageDate;

      return { ...chat, messageDate, isFirstMessageOfDate };
    });
  }, [message]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-4 items-baseline">
        <h1 className="font-extrabold text-sm uppercase border-b-2 border-[#1D5B79] mb-3 text-[#1D5B79]">
          Chat
        </h1>
        <h1 className="font-extrabold rounded-md text-xs uppercase text-[#1D5B79] px-1 cursor-pointer hover:bg-blue-100">
          File storage
        </h1>
      </div>
      <div className="flex flex-col shadow-md h-full">
        {requestInfos ? (
          <>
            <div className="items-center py-1 px-2 justify-center bg-[#1D5B79] rounded-t-md">
              <h1 className="font-extrabold text-sm uppercase text-white text-center">
                {requestInfos?.serviceId?.serviceType}
                {requestInfos?.taskTitle ? ": " : ""}
                {requestInfos?.taskTitle || ""}
              </h1>
            </div>
            <div className="bg-blue-100 flex flex-row justify-between items-center h-16 px-4 shadow-md">
              <div className="flex gap-4 items-center justify-center">
                <Avatar
                  src={requestInfos?.serviceId?.freelancerId?.profilePic.link || ""}
                  className="w-10 h-10 shadow-md border-2 border-orange-500"
                />
                <h1 className="text-lg font-bold text-[#1D5B79] flex items-center">
                  {(requestInfos?.serviceId?.freelancerId?.firstName || "") +
                    " " +
                    (requestInfos?.serviceId?.freelancerId?.surName || "")}
                </h1>
              </div>
              <IconButton>
                <FaInfoCircle size={20} color="#1D5B79" />
              </IconButton>
            </div>
            <div className="bg-white h-full overflow-auto">
              {loading ? (
                <div className="animate-pulse flex flex-col bg-white border-0 rounded-lg relative w-2/3 mx-auto my-6 p-5 max-h-[450px] border-blueGray-200">
                  <div className="h-8 bg-gray-200 rounded-full mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded-full mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded-full mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded-full mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded-full mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded-full mb-2"></div>
                </div>
              ) : (
                <div className="flex flex-col max-h-[340px]">
                  {messagesWithDate.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <h1 className="font-bold text-md text-gray-400">
                        No Message
                      </h1>
                    </div>
                  ) : (
                    messagesWithDate.map((chat, index) => (
                      <div key={index} className="flex flex-col px-6">
                        {chat.isFirstMessageOfDate && (
                          <div className="flex w-full text-center justify-center mb-2">
                            <h1 className="text-xs font-medium text-gray-500">{chat.messageDate}</h1>
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
                            textAlign:
                              chat.senderType === "client" ? "left" : "right",
                          }}
                        >
                          <p
                            className={`p-2 text-sm text-left`}
                            style={{
                              overflowWrap: "break-word",
                              wordBreak: "break-all",
                              textAlign:
                              chat.senderType === "client" ? "right" : "left",
                            }}
                          >
                            {chat.message}
                          </p>
                          {chat.attachment && chat.attachment.link && (
                            <>
                              {["pdf", "doc", "docx"].includes(
                                chat.attachment.name.split(".").pop()
                              ) ? (
                                <a
                                  href={chat.attachment.link}
                                  className={`p-2 text-sm text-right text-blue-600 underline ${
                                    chat.senderType === "freelancer"
                                      ? ""
                                      : "text-left"
                                  }`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {chat.attachment.name}
                                </a>
                              ) : (
                                <img
                                  src={chat.attachment.link}
                                  alt="Attachment"
                                  className="w-full"
                                />
                              )}
                            </>
                          )}
                          <p
                            className={`px-2 pb-1 text-xs text-gray-500 ${
                              chat.senderType === "freelancer"
                                ? "text-right"
                                : "text-left"
                            }`}
                          >
                            {new Date(chat.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <h1 className="font-bold text-md text-gray-400">Select Chat</h1>
          </div>
        )}
        <div className="bg-[#1D5B79] h-16 rounded-b-md flex items-center">
          <form className="flex flex-row py-1 px-2 gap-3 w-full">
            <div className="flex justify-center items-center border rounded-lg bg-blue-100 text-[#1D5B79] hover:text-white hover:bg-orange-500">
              <label className="flex items-center justify-center px-2 rounded-lg cursor-pointer">
                <FaFileImport size={18} />
                <input
                  type="file"
                  id="attachment"
                  className="hidden"
                />
              </label>
            </div>

            <input
              className="w-full py-1 px-2 rounded-lg outline-none border border-blueGray-300"
              type="text"
              id="message"
              name="message"
              placeholder="Type message"
            />
            <button
              className="px-4 py-1 bg-blue-100 rounded-lg ml-2 text-[#1D5B79] hover:bg-orange-500 hover:text-white"
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WithAuth(ProjectChat);
