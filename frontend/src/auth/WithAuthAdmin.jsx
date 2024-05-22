import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WithAuthAdmin = (WrappedComponent) => {
  const WithAuthWrapper = (props) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/');

      } else {
        const decodedToken = decodeToken(token);
        const isExpired = isTokenExpired(decodedToken.exp);

        if (isExpired) {
          localStorage.removeItem('adminToken');
          navigate('/');

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
        {isLoading ? console.clear() : (
          <WrappedComponent {...props} />
        )}
      </>
    );
  };

  return WithAuthWrapper;
};

export default WithAuthAdmin;
