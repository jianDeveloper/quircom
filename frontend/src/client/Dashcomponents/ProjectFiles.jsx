import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../assets/quircomloading.gif";
import WithAuth from "../../auth/WithAuth";

const ProjectFiles = ({ requestInfos }) => {
  const [activeTab, setActiveTab] = useState("image");
  const [loading, setLoading] = useState(true);
  const [attachments, setAttachments] = useState([]);

  const handleTab = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (!requestInfos || !requestInfos._id) {
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

        const filteredAttachments = response.data
          .filter((msg) => msg.requestId?._id === requestInfos._id && msg.attachment && msg.attachment.link)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setAttachments(filteredAttachments);
      } catch (error) {
        console.error("Error fetching messages:", error);
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

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();

      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const isImage = (fileName) => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
    const fileExtension = fileName.split(".").pop().toLowerCase();
    return imageExtensions.includes(fileExtension);
  };

  const isDocument = (fileName) => {
    const documentExtensions = ["pdf", "doc", "docx", "zip", "rar"];
    const fileExtension = fileName.split(".").pop().toLowerCase();
    return documentExtensions.includes(fileExtension);
  };

  return (
    <div className="flex flex-col h-full rounded-lg">
      <div className="text-white font-medium text-sm rounded-t-lg flex">
        <button
          className={`rounded-t-lg py-1 w-1/2 ${activeTab === "image" ? "bg-[#1D5B79]" : "bg-[#204355]"}`}
          onClick={() => handleTab("image")}
        >
          Image
        </button>
        <button
          className={`rounded-t-lg py-1 w-1/2 ${activeTab === "docx" ? "bg-[#1D5B79]" : "bg-[#204355]"}`}
          onClick={() => handleTab("docx")}
        >
          Documents
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-full bg-white">
          <img src={Loader} alt="Loading..." className="w-16 h-16" />
        </div>
      ) : (
        <>
          {activeTab === "image" && (
            <div className="h-full bg-white rounded-b-lg overflow-y-auto p-4">
              <div className="flex flex-wrap">
                {attachments.filter(att => isImage(att.attachment.name)).map((att, index) => (
                  <div key={index} className="w-1/4 p-2">
                    <img
                      src={att.attachment.link}
                      alt="Attachment"
                      className="w-full h-auto max-h-48 object-cover rounded-md"
                      onClick={() => window.open(att.attachment.link, "_blank")}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "docx" && (
            <div className="h-full bg-white rounded-b-lg overflow-y-auto p-4">
              {attachments.filter(att => isDocument(att.attachment.name)).map((att, index) => (
                <div key={index} className="flex items-center justify-between p-2 border-b border-gray-200">
                  <span className="text-gray-800">{att.attachment.name}</span>
                  <button
                    className="text-blue-600 underline"
                    onClick={() => handleDownload(att.attachment.id, att.attachment.name)}
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WithAuth(ProjectFiles);
