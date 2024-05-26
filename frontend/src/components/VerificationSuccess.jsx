import React, { useEffect } from 'react';
import NotFoundAuth from '../auth/NotFoundAuthVerify';

const VerifySuccess = () => {

  useEffect(() => {
    // Function to delete the verifyToken from localStorage
    const removeVerifyToken = () => {
      localStorage.removeItem('verifyToken');
    };

    // Call the function when the component mounts
    removeVerifyToken();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 z-50 overflow-auto ease-in-out duration-1000 flex justify-center items-center">
      <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-8 rounded-lg shadow-lg" style={{ backgroundColor: '#F5F5DC' }}>
        <h2 className="text-center text-2xl font-bold text-[#1D5B79] mb-4">Email Verified</h2>
        <p className="text-center text-lg text-green-700 mb-4">Your email has been successfully verified.</p>
        <div className="mt-4 text-center">
          <a href="/" className="text-blue-700 hover:underline">Back to Login</a>
        </div>
      </div>
    </div>
  );
};

export default NotFoundAuth(VerifySuccess);
