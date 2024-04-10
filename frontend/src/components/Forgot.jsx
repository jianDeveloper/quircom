import React, { useState } from 'react';
import {Link} from 'react-router-dom'

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to send reset password link goes here
    // This is just a placeholder, you need to replace it with your actual logic
    if (email.trim() === '') {
      setMessage('Please enter your email address.');
    } else {
      // Assume you have a function sendPasswordResetEmail implemented elsewhere
      // This is just a placeholder, you need to replace it with your actual function
      sendPasswordResetEmail(email)
        .then(() => {
          setMessage('Password reset link sent successfully.');
        })
        .catch((error) => {
          setMessage(`Error: ${error.message}`);
        });
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm z-[5] overflow-auto ease-in-out duration-1000'>
    <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[beige] w-[700px] px-[20px] py-[30px] rounded-[10px] shadow-[2px_2px_5px_5px_rgba(0,0,0,0.15)] border-solid border-[1px] border-black'>
    <div className='flex-inline justify-center h-full items-center w-full'>
    <div>
        <div className='mb-20'>
      <h2 className='text-center mx-[20px] mt-[10px] text-[20px] text-[#1D5B79] font-extrabold drop-shadow-xl'>Forgot Password</h2>
      {message && <div>{message}</div>}</div>
      <form method='method="POST" action="#" class="mx-2 my-12 max-w-xl sm:rounded-full sm:border sm:border-gray-100 sm:bg-white sm:p-2 sm:shadow' onSubmit={handleSubmit}>
      <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
    <div class="relative text-gray-500 sm:w-7/12">
      
      <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" class=""></path>
        </svg>
      </div>
      <input type="email" name="email" id="email" placeholder="Enter email address" class="w-full cursor-text rounded-full border-2 py-4 pr-4 pl-10 text-base outline-none transition-all duration-200 ease-in-out sm:border-0 focus:border-transparent focus:ring" required="" />
    </div>

    <button type="submit" class="group flex items-center justify-center rounded-full bg-blue-700 hover:bg-orange-500 px-6 py-4 text-white transition">
      <span class="group flex w-full items-center justify-center whitespace-nowrap rounded text-center font-medium"> Send Reset Link </span>
      <svg class="shrink-0 group-hover:ml-8 ml-4 h-4 w-4 transition-all" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </button>
  </div>
      </form>
    </div>
    </div>
    </div>
    </div>
    
  );
};

export default ForgotPassword;