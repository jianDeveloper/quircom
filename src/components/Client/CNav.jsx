import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const CNav = () => {
  return (
    <div>
        <div class="sticky w-[60px] mt-[10%]">
            <nav class="flex flex-col justify-center items-center px-2 py-8 bg-[white] rounded-r-2xl shadow-md border-solid  border-2">
                <FontAwesomeIcon icon="fa-solid fa-circle-user" className='mb-8 px-2 py-4' style={{color: "#163646"}} />
                <FontAwesomeIcon icon="fa-solid fa-chart-simple" className='px-2 py-4' style={{color: "#163646"}} />
                <FontAwesomeIcon icon="fa-solid fa-briefcase" className='px-2 py-4' style={{color: "#163646"}} />
                <FontAwesomeIcon icon="fa-solid fa-bars-progress" className=' px-2 py-4' style={{color: "#163646"}} />
                <FontAwesomeIcon icon="fa-solid fa-bell" className=' mt-[100px] px-2 py-4' style={{color: "#163646"}} />
                <FontAwesomeIcon icon="fa-solid fa-gear" className=' px-2 py-4' style={{color: "#163646"}} />
            </nav>
        </div>
    </div>
  )
}

export default CNav