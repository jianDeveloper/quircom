import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import Login from './Login.jsx';

import { FaXmark, FaBars} from "react-icons/fa6";
import Logo from '../assets/Icon1.png'


const Navbar = () => {
  const[isMenuOpen, setIsMenuOpen] = useState(false);
  const[isSticky, setIsSticky] = useState(false);
  
  // set toggle Menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.addEventListener('scroll', handleScroll);
    }
  });
  
  // Navitems array
  const navItems = [
    {link: 'Home', path: 'home'},
    {link: 'Service', path: 'service'},
    {link: 'About', path: 'about'},
    {link: 'Product', path: 'product'},
    {link: 'Testimonial', path: 'testimonial'},
    {link: 'FAQ', path: 'faq'},
  ];

  return (
    <header className='w-full bg-white md:bg-transparent fixed top-0 left-0 right-0'>
      <nav className={`py-4 lg:px-14 px-4 ${isSticky ? 'sticky top-0 left-0 right-0 border-b bg-white duration-300' : ''}`}>
        <div className='flex justify-between items-center text-base gap-8'>
          <a href="/" className='text-2xl font-semibold flex items-center space-x-3'>
            <img src={Logo} alt="Logo" className='w-48 inline-block' />
          </a>
          
          {/* NAV ITEM FOR LARGE DEVICES */}
          <ul className='md:flex space-x-12 hidden'>
            {navItems.map(({ link, path }) => (
              <Link
                to={path}
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                key={path}
                className="block text-base text-gray-900 hover:text-[#1D5B79] first:font-medium cursor-pointer transition-colors duration-300"
              >
                {link}
              </Link>
            ))}
          </ul>

          {/* BUTTONS FOR LARGE DEVICES */}
          <div className='space-x-12 hidden lg:flex items-center'>
            <Link to={Login}>
              <a href="frontend\src\components\Login.jsx" className='hidden lg:flex items-center text-[#1D5B79] hover:text-gray-900 transition-colors duration-300'>Login</a>
            </Link>
            <button className='bg-[#1D5B79] text-white py-2 px-4 transition-all duration-300 rounded hover:bg-[#F67012] cursor-pointer'>Sign Up</button>
          </div>

          {/* MENU BTN FOR MOBILE DEVICES */}
          <div className='md:hidden'>
            <button 
              onClick={toggleMenu} 
              className='text-gray-900 focus:outline-none focus:text-gray=500 items-center transition duration-300'> 
              {isMenuOpen ? <FaXmark className='h-6 w-6' /> : <FaBars className='h-6 w-6' />}
            </button>
          </div>
        </div>

        {/* NAV ITEMS FOR MOBILE DEVICES */}
        <div className={`space-y-4 px-4 mt-[108px] py-17 bg-[#F67012] ${isMenuOpen ? 'block fixed top-0 left-0 right-0 transition duration-300' : 'hidden'}`}>
          {navItems.map(({ link, path }) => (
            <Link
              to={path}
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              key={path}
              className="block text-base text-white hover:text-[#1D5B79] first:font-medium cursor-pointer transition-colors duration-300"
            >
              {link}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Navbar