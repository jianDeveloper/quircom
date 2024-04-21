import React, { useState } from "react";
import { FaFileImport, FaUpload } from "react-icons/fa6";

const chatModal = ({ setchatModal }) => {
  const [clientChat, setClientChat] = useState([
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setClientChat([
      ...clientChat,
      {
        name: "Client Name",
        message: e.target.reply.value,
        time: "12:07 PM",
      },
    ]);
    
    e.target.reply.value = "";
  };

  const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            // Condition to check the file type
            if (selectedFile.type === "application/pdf") {
                setFile(selectedFile);
                console.log("File uploaded:", selectedFile.name);
            } else {
                alert("Please upload only PDF files.");
            }
        }
    };

    const handleClick = () => {
        document.getElementById('fileInput').click();
    };

  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-md">
        <div className="relative w-1/3 my-6 mx-auto">
          <div className="border-0 rounded-lg relative flex flex-col w-full bg-white">
            <div className="relative flex flex-col bg-white border-2 rounded-t-lg ">
              <div className="flexitems-start justify-between p-5 border-b border-solid border-blueGray-200">
                <h3 className="text-3xl text-blueGray-700 text-center font-semibold">
                  Conversation History
                </h3>
              </div>
              <div className="flex flex-col overflow-y-auto max-h-[300px]">
                {agentChat.map((chat, index) => {
                  return (
                    <div key={index} className="flex flex-col px-6">
                      <p className="p-2 text-sm font-bold text-left">{chat.name}</p>
                      <div className="flex flex-col border mb-3 rounded-lg">
                        <p className="p-2 text-sm text-left">{chat.message}</p>
                        <p className="px-2 pb-1 text-xs text-right">{chat.time}</p>
                      </div>
                    </div>
                  );
                })}

                {clientChat.map((chat, index) => {
                  return (
                    <div key={index} className="flex flex-col px-6">
                      <p className="p-2 text-sm font-bold text-right">{chat.name}</p>
                      <div className="flex flex-col border mb-3 rounded-lg">
                        <p className="p-2 text-sm text-right">{chat.message}</p>
                        <p className="px-2 pb-1 text-xs text-left">{chat.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <form onSubmit={handleSubmit} className="flex flex-row border-t p-2 gap-3">
                <div className="place-content-center">
                    <input 
                        type="file" 
                        id="fileInput" 
                        style={{ display: 'none' }} 
                        onChange={handleFileChange}
                    />
                    <button
                        className="flex items-center justify-center px-2 rounded-lg ml-2"
                        type="button"
                        onClick={handleClick}
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
                  className="px-4 py-2 bg-[#1d7a8c] rounded-lg ml-2 "
                  type="submit"
                >
                  <h1 className="text-white">Send</h1>
                </button>
              </form>
            </div>
            <div className="bg-red-500 w-[100%] text-white rounded-b-md">
              <button className="w-[100%]" onClick={() => setchatModal(false)}>close</button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default chatModal;

