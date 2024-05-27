import React, { useEffect, useState, useRef } from "react";
import { FaFileImport } from "react-icons/fa6";
import WithAuth from "../../auth/WithAuth";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const chatModal = ({requestInfos}) => {
  const [message, setMessage] = useState([]);
  const [formData, setFormData] = useState({
    requestId: requestInfos._id,
    sender: requestInfos.clientId._id,
    senderType: requestInfos.clientId.accType,
    receiver: requestInfos.serviceId.freelancerId._id,
    receiverType: requestInfos.serviceId.freelancerId.accType,
    message: "",
    createdAt: new Date().toISOString(),
  });

  const [loading, setLoading] = useState(true); // Add loading state

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.get(
        `https://quircom.onrender.com/api/chat/message`,
        {
          headers,
        }
      );
      const filteredMessage = response.data.filter(
        (msg) => msg.requestId._id === requestInfos._id
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

  return (
    <div>
      <ToastContainer />
      <div className="fixed inset-0 z-50 flex justify-center items-center overflow-x-hidden overflow-y-auto bg-black bg-opacity-[0.30]">
        <div className="relative w-2/3 my-6 mx-auto">
          <div className="border-0 rounded-lg relative flex flex-col w-full bg-white">
            <div className="flex flex-col bg-white border-2 rounded-t-lg">
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200">
                <h3 className="text-3xl text-blueGray-700 text-center font-semibold">
                  Conversation History
                </h3>
              </div>
              {loading ? (
                <div className="animate-pulse flex flex-col bg-white border-0 rounded-lg relative w-2/3 mx-auto my-6 p-5 max-h-[450px] border-blueGray-200">
                  <div className="h-8 bg-gray-200 rounded-full mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded-full mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded-full mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded-full mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded-full mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded-full mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded-full mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded-full mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded-full mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded-full mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded-full mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded-full mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded-full mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded-full mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded-full mb-2"></div>
                </div>
              ) : (
                <div className="flex flex-col overflow-y-auto max-h-[500px]">
                  {/* Render actual chat messages here */}
                  {message.length === 0 ? (
                    <div className="flex items-center justify-center min-h-[500px]">
                      No messages yet
                    </div>
                  ) : (
                    message
                      .sort(
                        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
                      )
                      .map((chat, index) => (
                        <div key={index} className="flex flex-col px-6">
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
                              {chat.sender.firstName +
                                " " +
                                chat.sender.surName}
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
              )}

              <form
                onSubmit={handleSubmit}
                className="flex flex-row border-t p-2 gap-3"
              >
                <div className="flex justify-center items-center border rounded-lg">
                  <label className="flex items-center justify-center px-2 rounded-lg cursor-pointer">
                    <FaFileImport size={20} color="gray" />
                    <input
                      type="file"
                      id="attachment"
                      onChange={handleAttachment}
                      className="hidden"
                    />
                  </label>
                </div>

                <input
                  className="w-full p-2 rounded-lg outline-none border border-blueGray-300"
                  type="text"
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type message"
                />
                <button
                  className="px-4 py-2 bg-[#1d7a8c] rounded-lg ml-2 text-white"
                  type="submit"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithAuth(chatModal);
