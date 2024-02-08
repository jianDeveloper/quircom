import React, {useState} from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { TiThMenu } from "react-icons/ti";

import logo1 from '../assets/Icon1.png';

const navBar = () => {
    const [nav, setNav] = useState(false);

  return (
    <div className ='header'>
      <img className='mainlogo' src={logo1}></img>
      <ul className='hidden md:flex'>
        <li className='pt-2 pb-2 pl-3 pr-3 text-center'><a href='#' className='active2'>About us</a></li>
        <li className='pt-2 pb-2 pl-3 pr-3 text-center'><a href='#'>Careers</a></li>
        <li className='pt-2 pb-2 pl-3 pr-3 text-center'><a href='#'>Services</a></li>
        <li className='pt-2 pb-2 pl-3 pr-3 text-center'><a href='#'>Testimonials</a></li>
      </ul>
      <ul className='hidden md:flex'>
        <li className='pt-2 pb-2 pl-3 pr-3 text-center'><a href='#'>Log In</a></li>
        <li className='pt-2 pb-2 pl-3 pr-3 text-center'><a href='#' className='active1'>Sign Up</a></li>
      </ul>
      <div onClick={() => setNav(!nav)} className='block md:hidden'>
        {!nav ? <TiThMenu size={22}/> : <AiOutlineClose size={22}/> }
      </div>
      <div className={nav ? 'fixed left-0 top-0 w-[30%] h-full border-l-solid border-l-4 border-l-blue-800 bg-white ease-in-out duration-500' : 'fixed left-[-100%]'}>
      <img className='mainlogo1' src={logo1}></img>
        <ul>
          <li className='p-4 border-b-2 ml-6 mr-6 border-orange-600'><a href='#' className='active2'>About us</a></li>
          <li className='p-4 border-b-2 ml-6 mr-6 border-orange-600'><a href='#'>Careers</a></li>
          <li className='p-4 border-b-2 ml-6 mr-6 border-orange-600'><a href='#'>Services</a></li>
          <li className='p-4 border-b-2 ml-6 mr-6 border-orange-600'><a href='#'>Testimonials</a></li>
        </ul>
      </div>
    </div>
  )
}

export default navBar