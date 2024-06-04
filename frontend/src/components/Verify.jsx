import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFoundAuth from "../auth/NotFoundAuthVerify";
import { useParams } from "react-router-dom";

const Verify = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setIsButtonDisabled(true)
      try {
        const token = localStorage.getItem("verifyToken");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const [responseClient, responseFreelancer] = await Promise.all([
          axios.get(`https://quircom.onrender.com/api/client`, { headers }),
          axios.get(`https://quircom.onrender.com/api/freelancer`, { headers }),
        ]);

        if (responseClient.status === 200 && responseFreelancer.status === 200) {
          const combinedUsers = [...responseClient.data, ...responseFreelancer.data];
          const user = combinedUsers.find((user) => user._id === userId);
          setUserData(user);
          setIsButtonDisabled(false)
        } else {
          console.error("Failed to fetch users from one or both endpoints");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("verifyToken");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        "https://quircom.onrender.com/api/auth/verify",
        { eMail: userData.eMail },
        { headers }
      );

      const { message, emailToken } = response.data;
      localStorage.setItem("verifyToken", emailToken)
      toast.success(message);
      setIsButtonDisabled(true);
      startTimer();
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("No user found.");
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  const startTimer = () => {
    setRemainingTime(30);
    const timerId = setTimeout(() => {
      setIsButtonDisabled(false);
    }, 30000);
    setTimer(timerId);
  };

  useEffect(() => {
    if (remainingTime > 0) {
      const intervalId = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [remainingTime]);

  const handleBackToLogin = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <ToastContainer />
      <div className="fixed inset-0 bg-black bg-opacity-20 z-50 overflow-auto ease-in-out duration-1000 flex justify-center items-center">
        <div
          className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-8 rounded-lg shadow-lg"
          style={{ backgroundColor: "#F5F5DC" }}
        >
          <h2 className="text-center text-2xl font-bold text-[#1D5B79] mb-4">
            Email Verification
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <p>A verification link has been sent to {userData?.eMail}.</p>
            </div>
            <button
              type="submit"
              className={`w-full py-2 rounded-lg transition duration-300 ${
                isButtonDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-700 hover:bg-orange-500 text-white"
              }`}
              disabled={isButtonDisabled}
            >
              {isButtonDisabled
                ? `Send Verification (${remainingTime}s)`
                : "Send Verification Link"}
            </button>
          </form>
          <div className="mt-4 text-center">
            <a href="/" className="text-blue-700 hover:underline" onClick={handleBackToLogin}>
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundAuth(Verify);
