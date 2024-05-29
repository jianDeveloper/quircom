import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'; 
import Loader from '../assets/quircomloading.gif';

const WithAuth = (WrappedComponent) => {
  const WithAuthWrapper = (props) => {
    const navigate = useNavigate();

    // useParams must be used directly inside the component body.
    const { userId } = useParams(); // Corrected from [userId] to { userId } if userId is the parameter name.
    const [userData, setUserData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const token = localStorage.getItem("authToken");
          const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          };

          const [responseClient, responseFreelancer] = await Promise.all([
            axios.get(`https://quircom.onrender.com/api/client`, { headers }),
            axios.get(`https://quircom.onrender.com/api/freelancer`, { headers }),
          ]);

          if (responseClient.status === 200 && responseFreelancer.status === 200) {
            const combinedUsers = [
              ...responseClient.data,
              ...responseFreelancer.data,
            ];
            const user = combinedUsers.find((user) => user._id === userId);
            setUserData(user);
          } else {
            console.error("Failed to fetch users from one or both endpoints");
          }
        } catch (error) {
          console.error("Error fetching users");
        }
      };

      fetchUser();
    }, [userId]);

    useEffect(() => {
      const token = localStorage.getItem("authToken");
      if (!userData) {
        return;
      }
    
      if (userData.verify === false) {
        navigate(`/verify/${userData._id}`);
      } else {      
        if (!token) {
          navigate("/");
        } else {
          const decodedToken = decodeToken(token);
          const isExpired = isTokenExpired(decodedToken.exp);
    
          if (isExpired) {
            localStorage.clear();
            navigate("/");
          } else {
            setIsLoading(false);
          }
        }
      }
    }, [userData, navigate]);

    useEffect(() => {
      const token = localStorage.getItem("emailToken");
    
      if (token) {
        const decodedToken = decodeToken(token);
        const isExpired = isTokenExpired(decodedToken.exp);
        if (isExpired) {
          localStorage.removeItem("emailToken");
        }
      }
    }, []);
    

    const decodeToken = (token) => {
      try {
        return JSON.parse(atob(token.split(".")[1]));
      } catch (error) {
        console.error("Error decoding token:");
        return null;
      }
    };

    const isTokenExpired = (exp) => {
      const currentTime = Date.now() / 1000;
      return currentTime > exp;
    };

    // Render the wrapped component if not loading
    return <>  <WrappedComponent {...props} /></>;
  };

  return WithAuthWrapper;
};

export default WithAuth;
