import React, {useState} from 'react'
import { Link } from 'react-router-dom';

import minCD from '../assets/controllerCD.png';
import logoCD from '../assets/clientNav.png';
import logoHead from '../assets/clientHead.png';
import userL from '../assets/user.png';
import dboardL from '../assets/dboard.png';
import serviceL from '../assets/service.png';
import trackerL from '../assets/tracker.png';
import settingsL from '../assets/settings.png';


/**
 * CNav component function
 */
const CNav = () => {
  const [controller, setcontroller] = useState(false)

  return (
    <aside className='flex items-center'>
      <div class={`hidden flex-col justify-center items-center ${controller ? 'w-72': 'w-20'} h-full md:flex p-3 pt-5 bg-orange-600 relative `}>
        <div className='flex justify-center items-center absolute -right-3 h-20 bg-[#1D5B79] border-2 border-orange-600 rounded-full cursor-pointer' onClick={()=> setcontroller(!controller)}>
          <img className={` p-[2px] bg-[#1D5B79] h-5 w-5 rounded-full ${!controller && 'rotate-180'}`} 
          src={minCD}
          />
        </div>
        <div className='flex gap-x-4 p-2 items-center'>
          <img src={logoCD} className={`w-[40px] cursor-pointer duration-500 ${controller && 'rotate-[360deg]'}`}/>
          <img src= {logoHead} className={`${!controller && 'scale-0'} h-[70px] ml-[-15px] duration-300`}/> 
        </div>
        <div className={`flex flex-col ${!controller && 'items-center'} justify-between my-10 py-4 rounded-xl bg-[#F5F5DC] h-full w-full `}>
        <Link to="/client/profile">
            <div className={`text-[#163646] ${!controller && 'px-2 py-2 my-2 hover:rotate-[360deg] duration-500'} p-4 font-medium flex items-center gap-x-4 cursor-pointer hover:bg-blue-200 rounded-md`}>
              <img src={userL} className={`h-6 w-6`} />
              <span className={`${!controller && 'hidden'} origin-left duration-200`}>Profile</span>
            </div>
          </Link>
          
          <ul className='flex flex-col justify-between gap-y-6'>      
          <Link to="/client/dashboard">
            <li className={`text-[#163646] ${!controller && 'px-2 py-2 my-2 hover:rotate-[360deg] duration-500'} p-4 font-medium flex items-center gap-x-4 cursor-pointer hover:bg-blue-200 rounded-md`}>
              <img src={dboardL} className='h-6 w-6' />
              <span className={`${!controller && 'hidden'} origin-left duration-200`}>Dashboard</span>
            </li>
          </Link>

          <Link to="/client/browse-service">
            <li className={`text-[#163646] ${!controller && 'px-2 py-2 my-2 hover:rotate-[360deg] duration-500'} p-4 font-medium flex items-center gap-x-4 cursor-pointer hover:bg-blue-200 rounded-md `}>
              <img src={serviceL} className='h-6 w-6' />
              <span className={`${!controller && 'hidden'} origin-left duration-200`}>Browse Service</span>
            </li>
          </Link>

          <Link to="/client/tracker">
            <li className={`text-[#163646] ${!controller && 'px-2 py-2 my-2 hover:rotate-[360deg] duration-500'} p-4 font-medium flex items-center gap-x-4 cursor-pointer hover:bg-blue-200 rounded-md`}>
              <img src={trackerL} className='h-6 w-6' />
              <span className={`${!controller && 'hidden'} origin-left duration-200`}>Tracker</span>
            </li>
          </Link>
          </ul>
          <Link to="/client/settings">
            <div className={`text-[#163646] ${!controller && 'px-2 py-2 my-2 hover:rotate-[360deg] duration-500'} p-4 font-medium flex items-center gap-x-4 cursor-pointer hover:bg-blue-200 rounded-md`}>
              <img src={settingsL} className='h-6 w-6' />
              <span className={`${!controller && 'hidden'} origin-left duration-200`}>Settings</span>
            </div>
          </Link>
        </div>
      </div>
    </aside>
  )
}

export default CNav