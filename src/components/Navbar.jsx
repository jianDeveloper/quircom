import React, {useState} from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { TiThMenu } from "react-icons/ti";

import logo1 from '../assets/Icon1.png';

const navBar = () => {
    const [nav, setNav] = useState(false);

  return (
    <div className ='header'>
      <img className='h-[60px]' src={logo1}></img>
      <ul className='hidden md:flex'>
        <li className='pt-2 pb-2 pl-3 pr-3 text-center font-bold text-[#303030]'><a href='#' className='text-[#1D5B79]'>About us</a></li>
        <li className='pt-2 pb-2 pl-3 pr-3 text-center font-bold text-[#303030]'><a href='#'>Careers</a></li>
        <li className='pt-2 pb-2 pl-3 pr-3 text-center font-bold text-[#303030]'><a href='#'>Services</a></li>
        <li className='pt-2 pb-2 pl-3 pr-3 text-center font-bold text-[#303030]'><a href='#'>Testimonials</a></li>
      </ul>
      <ul className='hidden md:flex'>
        <li className='pt-2 pb-2 pl-3 pr-3 text-center font-bold text-[#303030]'><a href='#'>Log In</a></li>
        <li className='pt-2 pb-2 pl-3 pr-3 text-center font-bold text-[#303030]'><a href='#' className='text-white bg-[#1D5B79] rounded-[15px] cursor-pointer pl-[10px] pr-[10px] pt-[3px] pb-[5px]'>Sign Up</a></li>
      </ul>
      <div onClick={() => setNav(!nav)} className='block md:hidden'>
        {!nav ? <TiThMenu size={22}/> : <AiOutlineClose size={22}/> }
      </div>
      <div className={nav ? 'fixed left-0 top-0 w-[300px] h-full border-l-solid border-l-[15px] border-l-[#1D5B79] bg-white ease-in-out duration-500' : 'fixed left-[-100%]'}>
      <img className='h-[70px] m-[10px] pt-[9px]' src={logo1}></img>
        <ul>
          <li className='p-4 border-b-2 ml-6 mr-6 border-orange-600'><a href='#' className='active2'>About us</a></li>
          <li className='p-4 border-b-2 ml-6 mr-6 border-orange-600'><a href='#'>Careers</a></li>
          <li className='p-4 border-b-2 ml-6 mr-6 border-orange-600'><a href='#'>Services</a></li>
          <li className='p-4 border-b-2 ml-6 mr-6 border-orange-600'><a href='#'>Testimonials</a></li>
        </ul>
        <ul className='mt-[50px]'>
          <li className='pt-2 pb-2 pl-3 pr-3 text-center font-bold text-[#1D5B79]'><a href='#'>Log In</a></li>
          <li className='pt-2 pb-2 pl-3 pr-3 text-center font-bold text-[#303030]'><a href='#' className='text-white bg-orange-600 rounded-[15px] cursor-pointer pl-[10px] pr-[10px] pt-[3px] pb-[5px]'>Sign Up</a></li>
        </ul>
      </div>
      <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[beige] w-[400px] px-[20px] py-[30px] rounded-[10px] shadow-[2px_2px_5px_5px_rgba(0,0,0,0.15)] border-solid border-[1px] border-black'>
        <div className='absolute top-[10px] right-[20px] cursor-pointer w-[10px] h-[10px] text-gray-800 text-center font-semibold text-[20px]'>&times;</div>
        <div className='form'>
          <h2 className='text-center mx-[20px] my-[10px] text-[22px] font-extrabold drop-shadow-xl'>Welcome to</h2>
          <div className='mt-[10px]'>
            <label form='email' className='text-[16px] font-medium'>Email</label>
            <input className= 'block mt-[5px] w-[100%] p-[10px] outline-none border-solid-[1px] rounded-[5px]' type='text' id='email' placeholder='Enter email'></input>
          </div>
          <div className='mt-[10px]'>
            <label form='password'className='text-[16px] font-medium'>Password</label>
            <input className= 'block mt-[5px] w-[100%] p-[10px] outline-none border-solid-[1px] rounded-[5px]' type='password' id='password' placeholder='Enter password'></input>
          </div>
          <div className='mt-[10px]'>
            <input className='mr-[10px]' type='checkbox' id='remember-me' placeholder='Enter password'></input>
            <label form='remember-me' className='text-[16px] font-medium'>Remember me</label>
          </div>
          <div className='mt-[10px]'>
            <button className='font-bold w-[150px] h-[30px] boreder-none outline-none text-[16px] bg-orange-600 text-white rounded-full'>Sign in</button>
          </div>
          <div className='mt-[10px]'>
            <a href='#'>Forgot password?</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default navBar