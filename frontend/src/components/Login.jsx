import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../context/UserContext';

import logo1 from '../assets/Icon1.png';

const Login = ({ open, onClose }) => {
  const [userName, setUserName] = useState('');
  const [passWord, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { login } = useContext(UserContext);

  const handleLogin = async (req, res) => {
    const { userName, passWord } = req.body;
  
    try {
      // Attempt to find user in the client collection
      const clientUser = await Client.findOne({ userName, passWord });
  
      // If user not found in client collection, attempt to find user in freelancer collection
      if (!clientUser) {
        const freelancerUser = await Freelancer.findOne({ userName, passWord });
  
        // If user found in freelancer collection, return freelancer user data
        if (freelancerUser) {
          return res.status(200).json({
            message: 'Login successful',
            user: {
              _id: freelancerUser._id,
              accType: freelancerUser.accType,
            },
          });
        }
      } else {
        // If user found in client collection, return client user data
        return res.status(200).json({
          message: 'Login successful',
          user: {
            _id: clientUser._id,
            accType: clientUser.accType,
          },
        });
      }
  
      // If user not found in both collections, return error
      return res.status(404).json({ message: 'User not found' });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  };

  if (!open) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm z-[5] ease-in-out duration-1000'>
      <div>
        <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[beige] w-[400px] px-[20px] py-[30px] rounded-[10px] shadow-[2px_2px_5px_5px_rgba(0,0,0,0.15)] border-solid border-[1px] border-black'>
          <div
            onClick={onClose}
            className='absolute top-[10px] right-[20px] cursor-pointer w-[10px] h-[10px] text-gray-800 text-center font-semibold text-[20px] ease-in-out duration-1000'
          >
            &times;
          </div>
          <div className='flex-inline justify-center items-center w-full'>
            <h2 className='text-center mx-[20px] mt-[10px] text-[30px] text-[#1D5B79] font-extrabold drop-shadow-xl'>
              Welcome to
            </h2>
            <img className='h-[70px] mx-auto' src={logo1} alt='Logo' />
            <div className='mt-[10px]'>
              <label htmlFor='userName' className='text-[16px] font-medium'>
                Username
              </label>
              <input
                className='block mt-[5px] w-[100%] px-[20px] py-[10px] outline-none rounded-[20px] bg-[#163646] text-white'
                type='text'
                id='userName'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder='Enter Username'
              ></input>
            </div>
            <div className='mt-[10px]'>
              <label htmlFor='password' className='text-[16px] font-medium'>
                Password
              </label>
              <input
                className='block mt-[5px] w-[100%] px-[20px] py-[10px] outline-none rounded-[20px] bg-[#163646] text-white'
                type='password'
                id='password'
                value={passWord}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder='Enter password'
              ></input>
            </div>
            {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
            <div className='text-right mr-2'>
              <Link to='#' className='text-[12px] font-medium'>
                Forgot password?
              </Link>
            </div>
            <div className='mt-[30px] text-center'>
              <button
                onClick={handleLogin}
                className='font-bold px-[30px] py-[10px] boreder-none outline-none text-[16px] bg-orange-600 text-white rounded-full'>
                Login
              </button>
            </div>
            <div className='mt-[60px]'>
              <hr className='border-1 border-gray-400' />
              <span className='text-[12px] font-medium'>
                Don't have an account
                ?{' '}
                <Link
                  to={'/registration'}
                  onClick={onClose}
                  className='pl-2 text-[#1D5B79]'
                >
                  Sign up
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
