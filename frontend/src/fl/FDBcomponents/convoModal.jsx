import React, { useState } from "react";
import { FaFileImport } from "react-icons/fa6";

const ConvoModal = ({ setConvoModal }) => {
  const [clientChat] = useState([
    {
      name: "Client Name",
      message: "Hello",
      time: "12:00 PM",
    },
  ]);
  const [agentChat, setAgentChat] = useState([
    {
      name: "Freelancer Name",
      message: "Hi there",
      time: "12:05 PM",
    },
  ]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      console.log("File uploaded:", selectedFile.name);
    } else {
      alert("Please upload only PDF files.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const replyMessage = e.target.reply.value;
    if (replyMessage.trim()) {
      setAgentChat([
        ...agentChat,
        {
          name: "Freelancer Name",
          message: replyMessage,
          time: new Date().toLocaleTimeString(),
        },
      ]);
      e.target.reply.value = "";
    }
  };

  return (
    <div>
      <div className="fixed inset-0 z-50 flex justify-center items-center overflow-x-hidden overflow-y-auto bg-black bg-opacity-[0.01]" >
        <div className="relative w-1/3 my-6 mx-auto" >
          <div className="border-0 rounded-lg relative flex flex-col w-full bg-white">
            <div className="flex flex-col bg-white border-2 rounded-t-lg">
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200">
                <h3 className="text-3xl text-blueGray-700 text-center font-semibold">
                  Conversation History
                </h3>
              </div>
              <div className="flex flex-col overflow-y-auto max-h-[300px]">
              {clientChat.map((chat, index) => (
                  <div key={index} className="flex flex-col px-6">
                    <p className="p-2 text-sm font-bold text-left">{chat.name}</p>
                    <div className="flex flex-col border mb-3 rounded-lg">
                      <p className="p-2 text-sm text-left">{chat.message}</p>
                      <p className="px-2 pb-1 text-xs text-right">{chat.time}</p>
                    </div>
                  </div>
                ))}
                {agentChat.map((chat, index) => (
                  <div key={index} className="flex flex-col px-6">
                    <p className="p-2 text-sm font-bold text-right">{chat.name}</p>
                    <div className="flex flex-col border mb-3 rounded-lg">
                      <p className="p-2 text-sm text-right">{chat.message}</p>
                      <p className="px-2 pb-1 text-xs text-left">{chat.time}</p>
                    </div>
                  </div>
                ))}

                
              </div>

              <form onSubmit={handleSubmit} className="flex flex-row border-t p-2 gap-3">
                <div className="flex justify-center items-center border rounded-lg">
                  <input 
                    type="file" 
                    id="fileInput" 
                    style={{ display: 'none' }} 
                    onChange={handleFileChange}
                  />
                  <button
                    className="flex items-center justify-center px-2 rounded-lg"
                    type="button"
                    onClick={() => document.getElementById('fileInput').click()}
                  >
                    <FaFileImport size={20} color="gray" />
                  </button>
                </div>
                <input
                  className="w-full p-2 rounded-lg outline-none border border-blueGray-300"
                  type="text"
                  name="reply"
                  placeholder="Type reply"
                />
                <button
                  className="px-4 py-2 bg-[#1d7a8c] rounded-lg ml-2 text-white"
                  type="submit"
                >
                  Send
                </button>
              </form>
            </div>
            <div className="bg-red-500 w-full text-white rounded-b-md">
              <button className="w-full" onClick={() => setConvoModal(false)}>close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConvoModal;
