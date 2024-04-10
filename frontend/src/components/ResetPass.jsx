import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const [passWord, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(5); // Initial countdown time in seconds
  const { userId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (passWord.trim() === '') {
        toast.error('Please enter your new password.');
      } else {
        const response = await axios.patch(`http://localhost:8800/api/auth/resetpass/${userId}`, { passWord });
        toast.success(response.data.message);
        setIsButtonDisabled(true);
        setTimeout(() => {
          window.location.replace('/'); // Redirect to "/" after 5 seconds
        }, countdown * 1000); // Multiply by 1000 to convert seconds to milliseconds
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error('No user found.');
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000); // Update countdown every second

    // Cleanup function to clear the interval when component unmounts or countdown reaches 0
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    // Block history after redirection
    if (isButtonDisabled) {
      window.history.replaceState(null, '', '/');
    }
  }, [isButtonDisabled]);

  return (
    <>
      <ToastContainer />
      <div className="fixed inset-0 bg-black bg-opacity-20 z-50 overflow-auto ease-in-out duration-1000 flex justify-center items-center">
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-8 rounded-lg shadow-lg" style={{ backgroundColor: '#F5F5DC' }}>
          <h2 className="text-center text-2xl font-bold text-[#1D5B79] mb-4">Reset Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="passWord" className="block text-gray-700">Enter New Password</label>
              <input
                type="password"
                id="passWord"
                value={passWord}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-700"
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full py-2 rounded-lg transition duration-300 ${isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-700 text-white hover:bg-orange-500'}`}
              disabled={isButtonDisabled}
            >
              {isButtonDisabled ? `Redirecting in ${countdown} seconds...` : 'Confirm New Password'}
            </button>
          </form>
          <div className="mt-4 text-center">
            <a href="/" className="text-blue-700 hover:underline">Back to Login</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
