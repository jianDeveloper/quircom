import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../assets/quircomloading.gif';

const NotFoundAuth = (WrappedComponent) => {
  const NotFoundAuthWrapper = (props) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem('resetToken');
      if (!token) {
        navigate('/page-not-found');

      } else {
        const decodedToken = decodeToken(token);
        const isExpired = isTokenExpired(decodedToken.exp);

        if (isExpired) {
          localStorage.removeItem('resetToken');
          navigate('/page-not-found');

        } else {
          setIsLoading(false);

        }
      }
    }, []);

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
