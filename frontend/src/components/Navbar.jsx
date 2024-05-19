import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import { AiOutlineClose } from "react-icons/ai";
import { TiThMenu } from "react-icons/ti";

import logo1 from '../assets/Icon1.png';
import Modal from './Login';
import WithoutAuth from '../auth/WithoutAuth';


const navBar = () => {
    const [nav, setNav] = useState(false);
    const [openLogin, setLogin] = useState(false);

  return (
    <div className ='header'>
      <Link to='/'><img className='h-[60px]' src={logo1}/></Link>
      <ul className='hidden md:flex text-[#303030]'>
        <li onClick={() => setNav(false)} className='pt-2 pb-2 pl-3 pr-3 text-center font-bold'><Link to={"/"} className='text-[#1D5B79]'>Home</Link></li>
        <li onClick={() => setNav(false)} className='pt-2 pb-2 pl-3 pr-3 text-center font-bold '><a href="#services">Services</a></li>
        <li onClick={() => setNav(false)} className='pt-2 pb-2 pl-3 pr-3 text-center font-bold '><a href='#statistics'>Statistics</a></li>
        <li onClick={() => setNav(false)} className='pt-2 pb-2 pl-3 pr-3 text-center font-bold '><a href='#subscription'>Plans</a></li>
      </ul>

      {/* Log-Reg */}
      <div className='hidden md:flex'>
      <button onClick={() => setLogin(true)} className=' pt-2 pb-2 pl-3 pr-3 text-center font-bold text-[#303030]'>Log In</button>
      <Modal open={openLogin} onClose={() => setLogin(false)}/>
      <button onClick={() => setNav(false)} className='pt-2 pb-2 pl-3 pr-3 text-center font-bold'>
        <Link to={'/registration'} className='text-white bg-[#1D5B79] rounded-[15px] cursor-pointer pl-[10px] pr-[10px] pt-[3px] pb-[5px]'>Sign Up</Link>
      </button>
      </div>

      {/* Minimized NavBar */}
      <div onClick={() => setNav(!nav)} className='block md:hidden'>
        {!nav ? <TiThMenu size={22} color='#133C55'/> : <AiOutlineClose size={22}/> }
      </div>
      <div className={nav ? 'fixed md:hidden left-0 top-0 w-[300px] z-[5] h-full border-l-solid border-l-[15px] border-l-[#1D5B79] bg-white ease-in-out duration-500' : 'fixed left-[-100%]'}>
      <img className='h-[70px] m-[10px] pt-[9px]' src={logo1} />
        <ul>
          <li onClick={() => setNav(false)} className='p-4 border-b-2 ml-6 mr-6 border-orange-600'><a href='#'>About us</a></li>
          <li onClick={() => setNav(false)} className='p-4 border-b-2 ml-6 mr-6 border-orange-600'><a href='#'>Careers</a></li>
          <li onClick={() => setNav(false)} className='p-4 border-b-2 ml-6 mr-6 border-orange-600'><a href='#'>Services</a></li>
          <li onClick={() => setNav(false)} className='p-4 border-b-2 ml-6 mr-6 border-orange-600'><a href='#'>Plans</a></li>
        </ul>
        <div className='flex-inline justify-center items-center mt-[50px]'> {/* Log-Reg */}
          <button onClick={() => setLogin(true)} className='flex mx-auto pt-2 pb-2 pl-3 pr-3 text-center font-bold text-[#1D5B79]'>Log In</button>
          <Modal open={openLogin} onClose={() => setLogin(false)}/>
          <button onClick={() => setNav(false)} className='flex mx-auto pt-2 pb-2 pl-3 pr-3 text-center font-bold'>
            <Link to={'/registration'} className='text-white bg-orange-600 rounded-[15px] cursor-pointer pl-[10px] pr-[10px] pt-[3px] pb-[5px]'>Sign Up</Link>
          </button> 
        </div>
      </div>
    </div>
  )
}

export default WithoutAuth(navBar)