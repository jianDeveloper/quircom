import React, {useState} from 'react'
import { Link } from 'react-router-dom';

import minCD from '../assets/controllerCD.png';
import logoCD from '../assets/clientNav.png';
import logoHead from '../assets/clientHead.png';


const CNav = () => {
  const [controller, setcontroller] = useState(false)
  return (
    <div className='sticky flex'>
      <div class={`${controller ? 'w-72': 'w-20'} h-screen p-5 pt-5 bg-orange-600 relative`}>
        <img className={`absolute p-[5px] bg-[#1D5B79] cursor-pointer -right-3 top-10 h-6 w-6 border-2 border-orange-600 rounded-full ${!controller && 'rotate-180'}`} 
        src={minCD}
        onClick={()=> setcontroller(!controller)}
        />
        <div className='flex gap-x-4 items-center'>
          <img src={logoCD} className='w-[40px] cursor-pointer duration-500'/>
          <img src= {logoHead} className={`${!controller && 'scale-0'} h-[70px] ml-[-15px] duration-300`}/> 
        </div>
      </div>
      <div className='p-7 text-2xl font-semibold'>
        <h1>Client</h1>
      </div>
    </div>
  )
}

export default CNav