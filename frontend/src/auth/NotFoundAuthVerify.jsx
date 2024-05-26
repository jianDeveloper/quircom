import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../assets/quircomloading.gif';

const NotFoundAuth = (WrappedComponent) => {
  const NotFoundAuthWrapper = (props) => {
    const navigate = useNavigate();
    const { token } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      console.log("Token from URL:", token);

      const tokenFromLocalStorage = localStorage.getItem('verifyToken');
      console.log("Token from localStorage:", tokenFromLocalStorage);

      const finalToken = token || tokenFromLocalStorage;

      if (!finalToken) {
        navigate('/page-not-found');
      } else {
        const decodedToken = decodeToken(finalToken);
        const isExpired = isTokenExpired(decodedToken.exp);

        if (isExpired) {
          localStorage.removeItem('verifyToken');
          navigate('/page-not-found');
        } else {
          setIsLoading(false);
        }
      }
    }, [navigate, token]);

    const decodeToken = (token) => {
      try {
        return JSON.parse(atob(token.split('.')[1]));
      } catch (error) {
        return null;
      }
    };

    const isTokenExpired = (exp) => {
      const currentTime = Date.now() / 1000;
      return currentTime > exp;
    };

    return (
      <>
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <img src={Loader} alt="Loading..." />
          </div>
        ) : (
          <WrappedComponent {...props} />
        )}
      </>
    );
  };

  return NotFoundAuthWrapper;
};

export default NotFoundAuth;
