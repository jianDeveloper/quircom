import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userIdLink, setUserIdLink] = useState(null); 

  useEffect(() => {
    const storedData = localStorage.getItem('userIdLink'); // Change variable name here
    if (storedData) {
        setUserIdLink(storedData);
    }
  }, []);

  const login = (userId) => {
    localStorage.setItem('userIdLink', userId); // Change variable name here
    setUserIdLink(userId);
  };

  const logout = () => {
    localStorage.removeItem('userIdLink'); // Change variable name here
    setUserIdLink(null);
  };

  return (
    <UserContext.Provider value={{ userIdLink, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;