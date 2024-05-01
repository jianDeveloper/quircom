import React, { useEffect, useState, useRef } from "react";
import WithAuth from "../../auth/WithAuth";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Avatar } from "@mui/material";
import { FaFileImport, FaInfoCircle } from "react-icons/fa";

const ProjectChat = ({ requestInfos }) => {
  const [message, setMessage] = useState([]);
  const [formData, setFormData] = useState({
    requestId: requestInfos?._id,
    sender: requestInfos?.clientId?._id,
    senderType: requestInfos?.clientId?.accType,
    receiver: requestInfos?.serviceId?.freelancerId?._id,
    receiverType: requestInfos?.serviceId?.freelancerId?.accType,
    message: "",
    createdAt: new Date().toISOString(),
  });

  const [loading, setLoading] = useState(true); // Add loading state

  const messagesEndRef = useRef(null);

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
      setLoading(false); // Set loading to false after fetching messages
    } catch (error) {
      console.error("Error fetching messages:", error);
      setLoading(false); // Set loading to false if there's an error
    }
  };

  useEffect(() => {
    fetchMessages(); // Fetch messages initially

    const intervalId = setInterval(() => {
      fetchMessages(); // Fetch messages at intervals
    }, 3000); // Polling interval: every 3 seconds

    return () => {
      clearInterval(intervalId); // Cleanup interval on component unmount
    };
  }, []);

  //   useEffect(() => {
  //     scrollToBottom(); // Scroll to bottom when message updates
  //   }, [message]);

  // const scrollToBottom = () => {
  //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  //   };

  const [attachment, setAttachment] = useState();

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
          requestId: requestInfos?._id,
          sender: requestInfos?.clientId?._id,
          senderType: requestInfos?.clientId?.accType,
          receiver: requestInfos?.serviceId?.freelancerId?._id,
          receiverType: requestInfos?.serviceId?.freelancerId?.accType,
          message: "",
          createdAt: new Date().toISOString(),
        });
        setAttachment(null);
      } else {
        toast.error("Failed to send chat");
      }
    } catch (error) {
      console.error("Error during patch ", error.response);
      console.log(error.message);
      toast.error("Failed to send chat");
    }
  };

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
        <div className="items-center py-1 px-2 justify-center bg-[#1D5B79] rounded-t-md">
          <h1 className="font-extrabold text-sm uppercase text-white text-center">
            Task Title
          </h1>
        </div>
        <div className=" bg-blue-100 flex flex-row justify-between items-center h-16 px-4 shadow-md">
          <div className="flex gap-4">
            <Avatar src={""} sx={{ width: 35, height: 35 }} />
            <h1 className="text-lg font-bold text-[#1D5B79] flex items-center">
              Freelancer Name
            </h1>
          </div>
          <div className="">
            {/* Icons Insert */}
            <FaInfoCircle size={20} color="#1D5B79" />
          </div>
        </div>
        {/* =========== Body Section =========== */}
        <div className="bg-white h-full">
          <div className="flex flex-col overflow-y-auto h-full">
            {/* Render actual chat messages here */}
            {message.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <h1 className="font-bold text-md text-gray-400">No Message</h1>
              </div>
            ) : (
              message
                .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                .map((chat, index) => (
                  <div key={index} className="flex flex-col px-6 h-full">
                    <div
                      className={`flex items-center mb-2 ${
                        chat.senderType === "client" ? "justify-end" : ""
                      }`}
                    >
                      {/* Container for profile pic and username */}
                      {chat.senderType === "freelancer" && (
                        <img
                          className="w-8 h-8 rounded-full mr-2"
                          src={chat.sender.profilePic.link}
                          alt="Profile"
                        />
                      )}
                      <p className="p-2 text-sm font-bold text-left">
                        {chat.sender.firstName + " " + chat.sender.surName}
                      </p>
                      {chat.senderType === "client" && (
                        <img
                          className="w-8 h-8 rounded-full ml-2"
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
                        textAlign:
                          chat.senderType === "client" ? "left" : "right",
                      }}
                    >
                      <p
                        className={`p-2 text-sm text-left`}
                        style={{
                          overflowWrap: "break-word",
                          wordBreak: "break-all",
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
                        className={`px-2 pb-1 text-xs ${
                          chat.senderType === "freelancer"
                            ? "text-right"
                            : "text-left"
                        }`}
                      >
                        {new Date(chat.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
      {/* =========== Footer Section =========== */}
      <div className="bg-[#1D5B79] h-16 rounded-b-md flex items-center">
        <form
          // onSubmit={handleSubmit}
          className="flex flex-row py-1 px-2 gap-3 w-full"
        >
          <div className="flex justify-center items-center border rounded-lg bg-blue-100 text-[#1D5B79] hover:text-white hover:bg-orange-500">
            <label className="flex items-center justify-center px-2 rounded-lg cursor-pointe ">
              <FaFileImport size={18} />
              <input
                type="file"
                id="attachment"
                // onChange={handleAttachment}
                className="hidden"
              />
            </label>
          </div>

          <input
            className="w-full py-1 px-2 rounded-lg outline-none border border-blueGray-300"
            type="text"
            id="message"
            name="message"
            // value={formData.message}
            // onChange={handleChange}
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
  );
};

export default WithAuth(ProjectChat);
