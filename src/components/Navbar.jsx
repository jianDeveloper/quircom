import React, {useState} from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { TiThMenu } from "react-icons/ti";

import logo1 from '../assets/Icon1.png';
import Modal from './Login';
import RegPage from './Reg';

const navBar = () => {
    const [nav, setNav] = useState(false);
    const [openLogin, setLogin] = useState(false);

  return (
    <div className ='header'>
      <img className='h-[60px]' src={logo1}></img>
      <ul className='hidden md:flex'>
        <li className='pt-2 pb-2 pl-3 pr-3 text-center font-bold text-[#303030]'><a href='#' className='text-[#1D5B79]'>About us</a></li>
        <li className='pt-2 pb-2 pl-3 pr-3 text-center font-bold text-[#303030]'><a href='#'>Careers</a></li>
        <li className='pt-2 pb-2 pl-3 pr-3 text-center font-bold text-[#303030]'><a href='#'>Services</a></li>
        <li className='pt-2 pb-2 pl-3 pr-3 text-center font-bold text-[#303030]'><a href='#'>Testimonials</a></li>
      </ul>
      <div className='hidden md:flex '>
      <button onClick={() => setLogin(true)} className=' pt-2 pb-2 pl-3 pr-3 text-center font-bold text-[#303030]'>Log In</button>
      <Modal open={openLogin} onClose={() => setLogin(false)}/>
      <button className='pt-2 pb-2 pl-3 pr-3 text-center font-bold'>
        <link to="./Reg.jsx" className='text-white bg-[#1D5B79] rounded-[15px] cursor-pointer pl-[10px] pr-[10px] pt-[3px] pb-[5px]'>Sign Up</link>
      </button>
      </div>
      <div onClick={() => setNav(!nav)} className='block md:hidden'>
        {!nav ? <TiThMenu size={22}/> : <AiOutlineClose size={22}/> }
      </div>
      <div className={nav ? 'fixed md:hidden left-0 top-0 w-[300px] h-full border-l-solid border-l-[15px] border-l-[#1D5B79] bg-white ease-in-out duration-500' : 'fixed left-[-100%]'}>
      <img className='h-[70px] m-[10px] pt-[9px]' src={logo1} />
        <ul>
          <li className='p-4 border-b-2 ml-6 mr-6 border-orange-600'>About us</li>
          <li className='p-4 border-b-2 ml-6 mr-6 border-orange-600'><a href='#'>Careers</a></li>
          <li className='p-4 border-b-2 ml-6 mr-6 border-orange-600'><a href='#'>Services</a></li>
          <li className='p-4 border-b-2 ml-6 mr-6 border-orange-600'><a href='#'>Testimonials</a></li>
        </ul>
        <div className='flex-inline justify-center items-center mt-[50px]'>
          <button onClick={() => setLogin(true)} className='flex mx-auto pt-2 pb-2 pl-3 pr-3 text-center font-bold text-[#1D5B79]'>Log In</button>
          <Modal open={openLogin} onClose={() => setLogin(false)}/>
          <button className='flex mx-auto pt-2 pb-2 pl-3 pr-3 text-center font-bold'><a href='#' className='text-white bg-orange-600 rounded-[15px] cursor-pointer pl-[10px] pr-[10px] pt-[3px] pb-[5px]'>Sign Up</a></button>
        </div>
      </div>
    </div>
  )
}

export default navBar