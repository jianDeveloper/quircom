import React, { useEffect, useState, useRef, useMemo } from "react";
import WithAuth from "../../auth/WithAuth";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Avatar, IconButton, Popover } from "@mui/material";
import { FaFileImport, FaFileSignature, FaInfoCircle } from "react-icons/fa";
import ProjectFiles from "./ProjectFiles";
import { Link, useParams } from "react-router-dom";
import Contract from "./contractmodal";
import Report from "./reportmodal";


const ProjectChat = ({ requestInfos }) => {
  const { userId } = useParams();
  const [message, setMessage] = useState([]);
  const [formData, setFormData] = useState({
    requestId: "",
    sender: "",
    senderType: "",
    receiver: "",
    receiverType: "",
    message: "",
    createdAt: new Date().toISOString(),
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("chat");
  const [anchorEl, setAnchorEl] = useState(null);
  const [contractModal, setContractModal] = useState(false);
  const [reportModal, setreportModal] = useState(false);
  const [sign, setSign] = useState(true);
  
  useEffect(() => {
    if (requestInfos) {
      setFormData({
        requestId: requestInfos._id || "",
        sender: requestInfos.clientId?._id || "",
        senderType: requestInfos.clientId?.accType || "",
        receiver: requestInfos.serviceId?.freelancerId?._id || "",
        receiverType: requestInfos.serviceId?.freelancerId?.accType || "",
        message: "",
        createdAt: new Date().toISOString(),
      });
    }
  }, [requestInfos]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  useEffect(() => {
    scrollToBottom(); // Scroll to bottom when message updates
  }, [message]);

  const [attachment, setAttachment] = useState();

  const handleAttachment = (e) => {
    setAttachment(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.message && !attachment) {
      toast.error("Please leave a message");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      const formObj = new FormData();
      formObj.append("chat", JSON.stringify(formData));
      formObj.append("file", attachment);

      const response = await axios.post(
        `https://quircom.onrender.com/api/chat/create`,
        formObj,
        {
          headers,
        }
      );

      if (response && response.data) {
        setFormData({
          requestId: requestInfos._id,
          sender: requestInfos.clientId._id,
          senderType: requestInfos.clientId.accType,
          receiver: requestInfos.serviceId.freelancerId._id,
          receiverType: requestInfos.serviceId.freelancerId.accType,
          message: "",
          createdAt: new Date().toISOString(),
        });
        setAttachment(null);
      } else {
        toast.error("Failed to send chat");
      }
    } catch (error) {
      console.error("Error during patch ", error.response);
      // console.log(error.message);
      toast.error("Failed to send chat");
    }
  };

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

  const handleTab = (chat) => {
    setActiveTab(chat);
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex flex-col h-full">
      <ToastContainer />
      <div className="flex gap-4 items-baseline">
        <button
          className={
            activeTab === "chat"
              ? "font-extrabold text-sm uppercase border-b-2 border-white sm:border-[#1D5B79] mb-3 text-white sm:text-[#1D5B79]"
              : "font-extrabold rounded-md text-xs uppercase text-white sm:text-[#1D5B79] px-1 cursor-pointer hover:bg-blue-100 hover:text-[#1D5B79]"
          }
          onClick={() => handleTab("chat")}
        >
          Chat
        </button>
        <button
          className={
            activeTab === "files"
              ? "font-extrabold text-sm uppercase border-b-2 border-white sm:border-[#1D5B79] mb-3 text-white sm:text-[#1D5B79]"
              : "font-extrabold rounded-md text-xs uppercase text-white sm:text-[#1D5B79] px-1 cursor-pointer hover:bg-blue-100 hover:text-[#1D5B79]"
          }
          onClick={() => handleTab("files")}
        >
          File storage
        </button>
      </div>
      {activeTab === "chat" && (
        <>
          <div className="min-h-[500px] overflow-y-auto">
            <div className="flex flex-col shadow-md h-[500px]">
              {requestInfos && Object.keys(requestInfos).length !== 0 ? (
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
                        src={
                          requestInfos?.serviceId?.freelancerId?.profilePic
                            .link || ""
                        }
                        className="w-10 h-10 shadow-md border-2 border-orange-500"
                      />
                      <h1 className="text-lg font-bold text-[#1D5B79] flex items-center">
                        {(requestInfos?.serviceId?.freelancerId?.firstName ||
                          "") +
                          " " +
                          (requestInfos?.serviceId?.freelancerId?.surName ||
                            "")}
                      </h1>
                    </div>
                    <div>
                      <IconButton onClick={() => setContractModal(true)}>
                        <FaFileSignature size={20} color="#1D5B79" />
                      </IconButton>
                      {contractModal && (
                        <Contract setContractModal={setContractModal} setSign={setSign} requestInfos={requestInfos} />
                      )}
                      <IconButton onClick={handleAvatarClick}>
                        <FaInfoCircle size={20} color="#1D5B79" />
                      </IconButton>
                      <Popover
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={handleCloseMenu}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        sx={{ p: 1 }}
                      >
                        <div className="flex flex-col">
                          <Link
                            to={`/client/view-profile/${userId}/${requestInfos?.serviceId?.freelancerId?._id}`}
                          >
                            <p className="p-2 text-sm font-medium text-[#1D5B79] cursor-pointer">
                              View Profile
                            </p>
                          </Link>
                          <button onClick={() => setreportModal(true)}><p
                            className="p-2 text-sm font-medium text-red-500 cursor-pointer"
                            
                          >
                            Report
                          </p></button>
                          {reportModal && (
                        <Report requestInfos={requestInfos} setreportModal={setreportModal} />
                      )}
                        </div>
                      </Popover>
                    </div>
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
                      <div className="flex flex-col h-full">
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
                                  <h1 className="text-xs font-medium text-gray-500">
                                    {chat.messageDate}
                                  </h1>
                                </div>
                              )}
                              <div
                                className={`flex items-center mb-2 ${
                                  chat.senderType === "client"
                                    ? "justify-end"
                                    : ""
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
                                    chat.senderType === "client"
                                      ? "left"
                                      : "right",
                                }}
                              >
                                <p
                                  className={`p-2 text-sm text-left`}
                                  style={{
                                    overflowWrap: "break-word",
                                    wordBreak: "break-all",
                                    textAlign:
                                      chat.senderType === "client"
                                        ? "right"
                                        : "left",
                                  }}
                                >
                                  {chat.message}
                                </p>
                                {chat.attachment && chat.attachment.link && (
                                  <>
                                    {[
                                      "pdf",
                                      "doc",
                                      "docx",
                                      "zip",
                                      "rar",
                                    ].includes(
                                      chat.attachment.name
                                        .split(".")
                                        .pop()
                                        .toLowerCase()
                                    ) ? (
                                      <button
                                        className={`p-2 text-sm text-right text-blue-600 underline ${
                                          chat.senderType === "freelancer"
                                            ? ""
                                            : "text-left"
                                        }`}
                                        onClick={() => {
                                          handleDownload(
                                            chat.attachment.id,
                                            chat.attachment.name
                                          );
                                        }}
                                      >
                                        {chat.attachment.name}
                                      </button>
                                    ) : (
                                      <div>
                                        <img
                                          src={chat.attachment.link}
                                          alt="Attachment"
                                          className="w-full"
                                          onClick={() =>
                                            window.open(
                                              chat.attachment.link,
                                              "_blank"
                                            )
                                          }
                                          style={{ cursor: "pointer" }}
                                        />
                                        <span
                                          onClick={() =>
                                            window.open(
                                              chat.attachment.link,
                                              "_blank"
                                            )
                                          }
                                          style={{
                                            cursor: "pointer",
                                            textDecoration: "underline",
                                          }}
                                        ></span>
                                      </div>
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
                                  {new Date(chat.createdAt).toLocaleTimeString(
                                    [],
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    }
                                  )}
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
                        src={
                          requestInfos?.serviceId?.freelancerId?.profilePic
                            .link || ""
                        }
                        className="w-10 h-10 shadow-md border-2 border-orange-500"
                      />
                      <h1 className="text-lg font-bold text-[#1D5B79] flex items-center">
                        {(requestInfos?.serviceId?.freelancerId?.firstName ||
                          "") +
                          " " +
                          (requestInfos?.serviceId?.freelancerId?.surName ||
                            "")}
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
                      <div className="flex items-center justify-center h-full">
                        <h1 className="font-bold text-md text-gray-400">
                          Select Chat
                        </h1>
                      </div>
                    )}
                  </div>
                </>
              )}

              <div className="bg-[#1D5B79] h-16 rounded-b-md flex items-center">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-row py-1 px-2 gap-3 w-full"
                >
                  <div className="flex justify-center items-center border rounded-lg bg-blue-100 text-[#1D5B79] hover:text-white hover:bg-orange-500">
                    <label className="flex items-center justify-center px-2 rounded-lg cursor-pointer">
                      <FaFileImport size={18} />
                      <input
                        type="file"
                        id="attachment"
                        onChange={handleAttachment}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <input
                    className="w-full py-1 px-2 rounded-lg outline-none border border-blueGray-300"
                    type="text"
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={!sign || requestInfos?.status === "Complete"}
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
        </>
      )}
      {activeTab === "files" && <ProjectFiles requestInfos={requestInfos} />}
    </div>
  );
};

export default WithAuth(ProjectChat);
