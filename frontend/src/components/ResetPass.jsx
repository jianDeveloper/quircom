import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const [passWord, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { userId } = useParams();
  const history = useHistory();

  useEffect(() => {
    validateToken();
  }, []);

  const validateToken = async () => {
    try {
      // This API should be implemented to check if the token is valid or not
      const response = await axios.get(`http://localhost:8800/api/auth/validateToken/${userId}`);
      if (response.status !== 200) {
        throw new Error('Token validation failed');
      }
    } catch (error) {
      toast.error('Your session has expired. Please request a new password reset.');
      history.push('/expired'); // Redirect to a route that handles expired sessions
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passWord.trim() === '') {
      toast.error('Please enter your new password.');
    } else {
      try {
        const response = await axios.patch(`http://localhost:8800/api/auth/resetpass/${userId}`, { passWord });
        toast.success(response.data.message);
        setIsButtonDisabled(true);
        localStorage.clear(); // Clear localStorage after successful password reset
      } catch (error) {
        if (error.response && error.response.status === 404) {
          toast.error('No user found.');
        } else {
          toast.error(`Error: ${error.message}`);
        }
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="fixed inset-0 bg-black bg-opacity-20 z-50 overflow-auto ease-in-out duration-1000 flex justify-center items-center">
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-8 rounded-lg shadow-lg" style={{ backgroundColor: '#F5F5DC' }}>
          <h2 className="text-center text-2xl font-bold text-[#1D5B79] mb-4">Reset Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <input
                type={showPassword ? 'text' : 'password'}
                id="passWord"
                value={passWord}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-700"
                required
              />
              <button
                type="button"
                tabIndex="-1"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <button
              type="submit"
              className={`w-full py-2 rounded-lg transition duration-300 ${isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-700 text-white hover:bg-orange-500'}`}
              disabled={isButtonDisabled}
            >
              {isButtonDisabled ? 'You can now close this window' : 'Confirm New Password'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
