import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NotFoundAuth from '../auth/NotFoundAuthVerify';

const VerifySuccess = () => {
  const { userId } = useParams();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const token = queryParams.get('token');

  const navigate = useNavigate();

  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedToken = localStorage.getItem("verifyToken");
        const headers = {
          Authorization: `Bearer ${storedToken}`, // Use the token from localStorage
          "Content-Type": "application/json",
        };

        const [responseClient, responseFreelancer] = await Promise.all([
          axios.get(`https://quircom.onrender.com/api/client`, { headers }),
          axios.get(`https://quircom.onrender.com/api/freelancer`, { headers }),
        ]);

        if (responseClient.status === 200 && responseFreelancer.status === 200) {
          const combinedUsers = [...responseClient.data, ...responseFreelancer.data];
          const user = combinedUsers.find(user => user._id === userId);
          setUserData(user);
        } else {
          console.error("Failed to fetch users from one or both endpoints");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    const updateVerification = async () => {
      if (userData) {
        try {
          const storedToken = localStorage.getItem("verifyToken");
          const headers = {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "multipart/form-data",
          };

          const updateResponse = await axios.patch(
            `https://quircom.onrender.com/api/${userData.accType}/verify/${userId}`,
            { headers }
          );
          
          if (updateResponse.status === 200) {
            localStorage.removeItem('verifyToken'); 
            navigate(`/verify-success/${userId}`, { replace: true });
          }
        } catch (error) {
          console.error("Error during patch:", error);
        }
      }
    };

    updateVerification();
  }, [userData]);

  const handleBackToLogin = () => {
    localStorage.removeItem("verifyToken");
    navigate(`/verify-success/${userId}`, { replace: true });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 z-50 overflow-auto ease-in-out duration-1000 flex justify-center items-center">
      <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-8 rounded-lg shadow-lg" style={{ backgroundColor: '#F5F5DC' }}>
        <h2 className="text-center text-2xl font-bold text-[#1D5B79] mb-4">Email Verified</h2>
        <p className="text-center text-lg text-green-700 mb-4">Your email has been successfully verified.</p>
        <div className="mt-4 text-center">
          <a href="/" className="text-blue-700 hover:underline" onClick={handleBackToLogin}>Go back</a>
        </div>
      </div>
    </div>
  );
};

export default NotFoundAuth(VerifySuccess);
