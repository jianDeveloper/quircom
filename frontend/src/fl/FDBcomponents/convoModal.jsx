import React, { useEffect, useState } from "react";
import { FaFileImport } from "react-icons/fa6";
import WithAuth from "../../auth/WithAuth";
import axios from "axios"

const ConvoModal = ({ setConvoModal, requestInfos }) => {
  const [message, setMessage] = useState([]);
  const [formData, setFormData] = useState({
    requestId: requestInfos._id,
    sender: requestInfos.serviceId.freelancerId._id,
    senderType: requestInfos.serviceId.freelancerId.accType,
    receiver: requestInfos.clientId._id,
    receiverType: requestInfos.clientId.accType,
    message: "",
    createdAt: new Date().toISOString(),
  }); 

  useEffect(() => {
    axios.get(`http://localhost:8800/api/chat/`)
        .then(response => {
          const filteredMessage = response.data.filter(
            (message) => message.requestId._id === requestInfos._id
          );
            setMessage(filteredMessage);
        })
        .catch(error => console.error('Error fetching messages:', error));
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      console.log("File uploaded:", selectedFile.name);
    } else {
      alert("Please upload only PDF files.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setDisabled(true);

    if (
      !profilePic ||
      !(
        profilePic.type.startsWith("image/jpeg") ||
        profilePic.type.startsWith("image/jpg") ||
        profilePic.type.startsWith("image/png")
      )
    ) {
      toast.error("Please select a valid profile picture");
      setDisabled(false);
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      const formObj = new FormData();
      formObj.append("client", JSON.stringify(userData));
      formObj.append("file", profilePic);

      const response = await axios.patch(
        `https://quircom.onrender.com/api/client/update/${userId}`,
        formObj,
        {
          headers,
        }
      );

      if (response && response.data) {
        setUsers({ ...userData, profilePic: response.data.profilePic });
        setProfile({});
        toast.success("Profile picture uploaded successfully");
        setDisabled(false);
      } else {
        console.log("Response data not available");
        toast.error("Failed to upload profile picture");
        setDisabled(false);
      }
    } catch (error) {
      console.error("Error during patch ", error.response);
      console.log(error.message);
      toast.error("Failed to upload profile picture");
      setDisabled(false);
    }
  };

  return (
    <div>
      <div className="fixed inset-0 z-50 flex justify-center items-center overflow-x-hidden overflow-y-auto bg-black bg-opacity-[0.30]">
        <div className="relative w-1/3 my-6 mx-auto">
          <div className="border-0 rounded-lg relative flex flex-col w-full bg-white">
            <div className="flex flex-col bg-white border-2 rounded-t-lg">
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200">
                <h3 className="text-3xl text-blueGray-700 text-center font-semibold">
                  Conversation History
                </h3>
              </div>
              <div className="flex flex-col overflow-y-auto max-h-[300px]">
              {message.map((chat, index) => (
                chat.senderType === 'client' && (
                  <div key={index} className="flex flex-col px-6">
                    <p className="p-2 text-sm font-bold text-left">
                      {chat.sender.userName}
                    </p>
                    <div className="flex flex-col border mb-3 rounded-lg">
                      <p className="p-2 text-sm text-left">{chat.message}</p>
                      <p className="px-2 pb-1 text-xs text-right">{new Date(chat.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                )
              ))}
              {message.map((chat, index) => (
                chat.senderType === 'freelancer' && (
                <div key={index} className="flex flex-col px-6">
                  <p className="p-2 text-sm font-bold text-right">
                    {chat.sender.userName}
                  </p>
                  <div className="flex flex-col border mb-3 rounded-lg">
                    <p className="p-2 text-sm text-right">{chat.message}</p>
                    <p className="px-2 pb-1 text-xs text-left">{new Date(chat.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                )
              ))}
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex flex-row border-t p-2 gap-3"
              >
                <div className="flex justify-center items-center border rounded-lg">
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <button
                    className="flex items-center justify-center px-2 rounded-lg"
                    type="button"
                    onClick={() => document.getElementById("fileInput").click()}
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
              <button className="w-full" onClick={() => setConvoModal(false)}>
                close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithAuth(ConvoModal);
