import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WithAuth = (WrappedComponent) => {
  const WithAuthWrapper = (props) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        // Redirect to 404 page if token is not found
        navigate('/');
      } else {
        // Decode the token to get user data (assuming the token contains user information)
        const decodedToken = decodeToken(token);

        // Check if the token is expired
        const isExpired = isTokenExpired(decodedToken.exp);

        if (isExpired) {
          // Remove expired token from localStorage
          localStorage.removeItem('authToken');
          // Redirect to 404 page if token is expired
          navigate('/');
        } else {
          // Token is valid, allow access to the wrapped component
          setIsLoading(false);
        }
      }
    }, []);

    // Decode JWT token
    const decodeToken = (token) => {
      try {
        return JSON.parse(atob(token.split('.')[1]));
      } catch (error) {
        return null;
      }
    };

    // Check if token is expired
    const isTokenExpired = (exp) => {
      const currentTime = Date.now() / 1000;
      return currentTime > exp;
    };

    // Render the wrapped component if not loading
    return isLoading ? null : <WrappedComponent {...props} />;
  };

  return WithAuthWrapper;
};

export default WithAuth;
