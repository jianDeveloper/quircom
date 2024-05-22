import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Loader from '../assets/quircomloading.gif';

const WithoutAuthAdmin = (WrappedComponent) => {
  const WrapperComponent = (props) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const token = localStorage.getItem("adminToken");
          if (token) {
            const headers = {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            };
            const decodedToken = decodeToken(token);
            if (decodedToken) {
              const { _id } = decodedToken;

              // Fetch data from the admin endpoint
              const adminResponse = await axios.get(`https://quircom.onrender.com/api/admin`, { headers });

              if (adminResponse.status === 200) {
                const allUsers = adminResponse.data;
                const foundUser = allUsers.find((user) => user._id === _id);
                if (foundUser) {
                  navigate(`/admin/dashboard/${_id}`);
                } else {
                  setIsLoading(false);
                }
              } else {
                setIsLoading(false);
              }
            } else {
              setIsLoading(false);
            }
          } else {
            setIsLoading(false);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setIsLoading(false);
        }
      };
      fetchUserData();
    }, [navigate]);

    // Decode JWT token
    const decodeToken = (token) => {
      try {
        return JSON.parse(atob(token.split(".")[1]));
      } catch (error) {
        return null;
      }
    };

    // Render loading spinner while waiting for data
    if (isLoading) {
      return (
        <div className='flex justify-center items-center h-screen'>
          <img src={Loader} className="w-[80px]" alt="Loading..." />
        </div>
      );
    }

    // Render the wrapped component if not loading
    return <WrappedComponent {...props} />;
  };

  return WrapperComponent;
};

export default WithoutAuthAdmin;
