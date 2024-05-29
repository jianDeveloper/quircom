import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Loader from '../assets/quircomloading.gif';

const WithoutAuth = (WrappedComponent) => {
  const WrapperComponent = (props) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const token = localStorage.getItem("authToken");
          const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          };
          if (token) {
            const decodedToken = decodeToken(token);
            if (decodedToken) {
              const { _id } = decodedToken;
              
              // Fetch data from both endpoints concurrently
              const [clientResponse, freelancerResponse] = await Promise.all([
                axios.get(`https://quircom.onrender.com/api/client`, { headers }),
                axios.get(`https://quircom.onrender.com/api/freelancer`, { headers })
              ]);

              if (clientResponse.status === 200 && freelancerResponse.status === 200) {
                const allUsers = [...clientResponse.data, ...freelancerResponse.data];
                const foundUser = allUsers.find((user) => user._id === _id);
                if (foundUser) {
                  setUsers([foundUser]);
                  if (foundUser.accType === "client") {
                    navigate(`/client/dashboard/${_id}`);
                  } else if (foundUser.accType === "freelancer") {
                    navigate(`/freelancer/dashboard/${_id}`);
                  }
                }
              }
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchUserData();
    }, []);

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
      console.clear()
      return (
        <div className='flex justify-center items-center h-screen'>
          <img src={Loader} className="w-[80px]" alt="Loading..." />
        </div>
      );
    }

    // Render the wrapped component if not loading
    return <> {console.clear()} <WrappedComponent {...props} /></>;
  };

  return WrapperComponent;
};

export default WithoutAuth;
