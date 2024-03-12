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


const CNav = () => {
  const [controller, setcontroller] = useState(false)

  return (
    <aside className='flex items-center'>
      <div class={`hidden flex-col justify-center items-center float-left ${controller ? 'w-72': 'w-20'} h-[100vh] md:flex p-3 pt-5 bg-orange-600 relative `}>
        <img className={`flex absolute p-[5px] bg-[#1D5B79] cursor-pointer -right-3 top-[250px] h-6 w-6 border-2 border-orange-600 rounded-full ${!controller && 'rotate-180'}`} 
        src={minCD}
        onClick={()=> setcontroller(!controller)}
        />
        <div className='flex gap-x-4 p-2 items-center'>
          <img src={logoCD} className={`w-[40px] cursor-pointer duration-500 ${controller && 'rotate-[360deg]'}`}/>
          <img src= {logoHead} className={`${!controller && 'scale-0'} h-[70px] ml-[-15px] duration-300`}/> 
        </div>
        <ul className={`flex flex-col ${!controller && 'items-center'} justify-between my-10 py-4 rounded-xl bg-[#F5F5DC] h-full w-full `}>
        <Link to="/client/profile">
            <div className={`text-[#163646] ${!controller && 'px-2 py-2 my-2 hover:rotate-[360deg]'} p-4 font-medium flex items-center gap-x-4 cursor-pointer hover:bg-blue-200 rounded-md duration-500`}>
              <img src={userL} className={`h-6 w-6 `} />
              <span className={`${!controller && 'hidden'} origin-left duration-200`}>Profile</span>
            </div>
          </Link>

          <Link to="/client/dashboard">
            <li className={`text-[#163646] ${!controller && 'px-2 py-2 my-2 hover:rotate-[360deg]'} p-4 font-medium flex items-center gap-x-4 cursor-pointer hover:bg-blue-200 rounded-md duration-500 mt-20`}>
              <img src={dboardL} className='h-6 w-6' />
              <span className={`${!controller && 'hidden'} origin-left duration-200`}>Dashboard</span>
            </li>
          </Link>

          <Link to="/client/browse-service">
            <li className={`text-[#163646] ${!controller && 'px-2 py-2 my-2 hover:rotate-[360deg]'} p-4 font-medium flex items-center gap-x-4 cursor-pointer hover:bg-blue-200 rounded-md duration-500`}>
              <img src={serviceL} className='h-6 w-6' />
              <span className={`${!controller && 'hidden'} origin-left duration-200`}>Browse Service</span>
            </li>
          </Link>

          <Link to="/client/tracker">
            <li className={`text-[#163646] ${!controller && 'px-2 py-2 my-2 hover:rotate-[360deg]'} p-4 font-medium flex items-center gap-x-4 cursor-pointer hover:bg-blue-200 rounded-md duration-500 mb-20`}>
              <img src={trackerL} className='h-6 w-6' />
              <span className={`${!controller && 'hidden'} origin-left duration-200`}>Tracker</span>
            </li>
          </Link>

          <Link to="/client/settings">
            <li className={`text-[#163646] ${!controller && 'px-2 py-2 my-2 hover:rotate-[360deg]'} p-4 font-medium flex items-center gap-x-4 cursor-pointer hover:bg-blue-200 rounded-md duration-500`}>
              <img src={settingsL} className='h-6 w-6' />
              <span className={`${!controller && 'hidden'} origin-left duration-200`}>Settings</span>
            </li>
          </Link>
        </ul>
      </div>
    </aside>
  )
}

export default CNav