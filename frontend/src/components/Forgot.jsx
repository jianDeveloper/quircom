import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const [eMail, setEmail] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timer, setTimer] = useState(null);
  const [remainingTime, setRemainingTime] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (eMail.trim() === '') {
        toast.error('Please enter your email address.');
      } else {
        const response = await axios.post('https://quircom.onrender.com/api/auth/forgotpass', { eMail });
        const { message, emailToken } = response.data;
        localStorage.setItem('resetToken', emailToken);
        toast.success(message);
        setIsButtonDisabled(true);
        startTimer();
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error('No user found.');
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  const startTimer = () => {
    const timerId = setTimeout(() => {
      setIsButtonDisabled(false);
      clearTimeout(timerId);
    }, 30000); // One minute timer
    setTimer(timerId);
  };

  useEffect(() => {
    if (isButtonDisabled) {
      const intervalId = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1000);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isButtonDisabled]);

  useEffect(() => {
    if (isButtonDisabled) {
      setRemainingTime(30000);
    }
  }, [isButtonDisabled]);

  return (
    <>
      <ToastContainer />
      <div className="fixed inset-0 bg-black bg-opacity-20 z-50 overflow-auto ease-in-out duration-1000 flex justify-center items-center">
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-8 rounded-lg shadow-lg" style={{ backgroundColor: '#F5F5DC' }}>
          <h2 className="text-center text-2xl font-bold text-[#1D5B79] mb-4">Forgot Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="eMail" className="block text-gray-700">Email Address</label>
              <input
                type="eMail"
                id="eMail"
                value={eMail}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-700"
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full py-2 rounded-lg transition duration-300 ${isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-700 hover:bg-orange-500 text-white'}`}
              disabled={isButtonDisabled}
            >
              {isButtonDisabled ? `Resend Email (${Math.ceil(remainingTime / 1000)}s)` : 'Send Reset Link'}
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

export default ForgotPassword;
