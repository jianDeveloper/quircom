import React from 'react'
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { TiThMenu } from "react-icons/ti";

import logo1 from '../assets/Icon1.png';

const navBar = () => {
  return (
    <div className='header'>
      <img className='mainlogo' src={logo1}></img>
      <ul className='menu'>
        <li><a href='#' className='active2'>About us</a></li>
        <li><a href='#'>Careers</a></li>
        <li><a href='#'>Services</a></li>
        <li><a href='#'>Testimonials</a></li>
      </ul>
      <ul className='menu'>
        <li><a href='#'>Log In</a></li>
        <li><a href='#' className='active1'>Sign Up</a></li>
      </ul>
      <div>
        <TiThMenu size={22}/> 
      </div>
      <div className='smallmenu'>
      <img className='mainlogo1' src={logo1}></img>
        <ul>
          <li><a href='#' className='active2'>About us</a></li>
          <li><a href='#'>Careers</a></li>
          <li><a href='#'>Services</a></li>
          <li><a href='#'>Testimonials</a></li>
        </ul>
      </div>
    </div>
  )
}

export default navBar