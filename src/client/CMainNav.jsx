import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import { AiOutlineClose } from "react-icons/ai";
import { TiThMenu } from "react-icons/ti";

import logo1 from '../assets/Icon1.png';

/**
 * CNav component function
 */
const CMainNav = () => {
  const [nav, setNav] = useState(false);
  const [openLogin, setLogin] = useState(false);
  const [current, setActive] = useState(false);

  return (
    <div className='headerC bg-orange-600 shadow-md'>
      <Link to='/client/dashboard'><img className='h-[50px] rounded-full bg-[#f5f5dc] my-[-5px] py-[-5px]' src={logo1} /></Link>
      <ul className='hidden md:flex bg-[#f5f5dc] rounded-xl px-8'>
        <li onClick={() => setNav(false)} className='pt-2 pb-2 pl-3 pr-3 text-center font-bold text-[#303030]'><Link to={"/client/dashboard"} className='text-[#1D5B79]'>Dashboard</Link></li>
        <li onClick={() => setNav(false)} className='pt-2 pb-2 pl-3 pr-3 text-center font-bold text-[#303030]'><Link to={"/client/browse-service"}>Marketplace</Link></li>
        <li onClick={() => setNav(false)} className='pt-2 pb-2 pl-3 pr-3 text-center font-bold text-[#303030]'><Link to={"/client/tracker"}>Tracker</Link></li>
        <li onClick={() => setNav(false)} className='pt-2 pb-2 pl-3 pr-3 text-center font-bold text-[#303030]'><Link to={"/client/settings"}>Settings</Link></li>
      </ul>

      {/* Log-Reg */}
      <div className='hidden md:flex '>
        <button onClick={() => setNav(false)} className='pt-2 pb-2 pl-3 pr-3 text-center font-bold'>
          <Link to={'/registration'} className='text-[#163646] bg-[#f5f5dc] rounded-[15px] cursor-pointer pl-[10px] pr-[10px] pt-[3px] pb-[5px]'>Log Out</Link>
        </button>
      </div>

      {/* Minimized NavBar */}
      <div onClick={() => setNav(!nav)} className='block md:hidden'>
        {!nav ? <TiThMenu color='beige' size={22} /> : <AiOutlineClose size={22} color='beige' />}
      </div>
      <div className={nav ? 'fixed md:hidden left-0 top-0 w-[300px] z-[5] h-full border-l-solid border-l-[15px] border-l-orange-600 bg-white ease-in-out duration-500' : 'fixed left-[-100%]'}>
        <img className='h-[70px] m-[10px] pt-[9px]' src={logo1} />
        <ul>
          <li onClick={() => setNav(false)} className='p-4 border-b-2 ml-6 mr-6 border-[#1D5B79]'><Link to='/client/dashboard'>Dashboard</Link></li>
          <li onClick={() => setNav(false)} className='p-4 border-b-2 ml-6 mr-6 border-[#1D5B79]'><Link to='/client/browse-service'>Marketplace</Link></li>
          <li onClick={() => setNav(false)} className='p-4 border-b-2 ml-6 mr-6 border-[#1D5B79]'><Link to='/client/tracker'>Tracker</Link></li>
          <li onClick={() => setNav(false)} className='p-4 border-b-2 ml-6 mr-6 border-[#1D5B79]'><Link to='client/settings'>Settings</Link></li>
        </ul>
        <div className='flex-inline justify-center items-center mt-[50px]'> {/* Log-out */}
          <button onClick={() => setNav(false)} className='flex mx-auto pt-2 pb-2 pl-3 pr-3 text-center font-bold'>
            <Link to={'/registration'} className='text-white bg-[#1d5b79] rounded-[15px] cursor-pointer pl-[10px] pr-[10px] pt-[3px] pb-[5px]'>Log Out</Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CMainNav