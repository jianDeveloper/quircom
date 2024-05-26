import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const WithAuth = (WrappedComponent) => {
  const WithAuthWrapper = (props) => {
    const [userId] = useParams();
    const [userData, setUserData] = useState();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const token = localStorage.getItem("verifyToken");
          const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          };

          const [responseClient, responseFreelancer] = await Promise.all([
            axios.get(`https://quircom.onrender.com/api/client`, { headers }),
            axios.get(`https://quircom.onrender.com/api/freelancer`, {
              headers,
            }),
          ]);

          if (
            responseClient.status === 200 &&
            responseFreelancer.status === 200
          ) {
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
          console.error("Error fetching users:", error);
        }
      };

      fetchUser();
    }, [userId]);

    useEffect(() => {
      if (userData.verify === false) {
        navigate(`/verify/${userData._id}`);
      } else {
        const token = localStorage.getItem("authToken");
        if (!token) {
          navigate("/");
        } else {
          const decodedToken = decodeToken(token);
          const isExpired = isTokenExpired(decodedToken.exp);

          if (isExpired) {
            localStorage.removeItem("authToken");
            navigate("/");
          } else {
            setIsLoading(false);
          }
        }
      }
    }, []);

    const decodeToken = (token) => {
      try {
        return JSON.parse(atob(token.split(".")[1]));
      } catch (error) {
        return null;
      }
    };

    const isTokenExpired = (exp) => {
      const currentTime = Date.now() / 1000;
      return currentTime > exp;
    };

    return <>{isLoading ? console.clear() : <WrappedComponent {...props} />}</>;
  };

  return WithAuthWrapper;
};

export default WithAuth;
