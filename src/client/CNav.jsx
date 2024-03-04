import React, {useState} from 'react'
import { Link } from 'react-router-dom';

import minCD from '../assets/controllerCD.png';
import logoCD from '../assets/clientNav.png';
import logoHead from '../assets/clientHead.png';


const CNav = () => {
  const [controller, setcontroller] = useState(false)
  const Menus = [
    { title:'Profile', src:"user"},
    { title:'Dashbord', src:"dboard", gap: true  },
    { title:'Browse Service', src:"service" },
    { title:'Tracker', src:"tracker" },
    { title:'Settings', src:"settings", gap: true }
  ]

  return (
    <div className='sticky flex'>
      <div class={`${controller ? 'w-72': 'w-20'} h-screen p-3 pt-5 bg-orange-600 relative`}>
        <img className={`hidden md:flex absolute p-[5px] bg-[#1D5B79] cursor-pointer -right-3 top-10 h-6 w-6 border-2 border-orange-600 rounded-full ${!controller && 'rotate-180'}`} 
        src={minCD}
        onClick={()=> setcontroller(!controller)}
        />
        <div className='flex gap-x-4 p-2 items-center'>
          <img src={logoCD} className={`w-[40px] cursor-pointer duration-500 ${controller && 'rotate-[360deg]'}`}/>
          <img src= {logoHead} className={`${!controller && 'scale-0'} h-[70px] ml-[-15px] duration-300`}/> 
        </div>
        <ul className='my-10 py-2 rounded-xl bg-[#F5F5DC] '>
          {Menus.map((menu, index) => (
            <li key={index} className={`text-[#163646] p-4 my-4 font-medium flex items-center gap-x-4 cursor-pointer hover:bg-blue-100 rounded-md ${menu.gap ? 'mt-12' : 'mt-2'}`}>
              <img src={`./src/assets/${menu.src}.png`} className='h-6 w-6' />
              <span className={`${!controller && 'hidden'} origin-left duration-200`}>{menu.title}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className='p-7 text-2xl font-semibold'>
        <h1 className='font-extrabold text-[30px] text-[#1D5B79]'>Dashboard</h1>
        
      </div>
    </div>
  )
}

export default CNav