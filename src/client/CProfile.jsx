import React from 'react'
import { Link } from 'react-router-dom';

import Header from './Header'
import CNav from './CNav'

import '../client/profile.css'

import profile from '../assets/profile.jpg'

function CProfile() {

  return (
    <div className=''>
      <Header />
      <div className='flex'>
        <CNav />
        <main className='flex-inline mx-10 my-10 w-[100%]'>
          <div className="userInfo">
            <div className='pictureBorder p-5'>
                <img className="profilePicture" src={profile} alt="Profile Picture" />
            </div>
            <div className='profileDetail w-2/5 '>
              <div className=''>
                <h4 className='font-extrabold text-[23px] text-[#1D5B79] my-1'>Jose Protacio Rizal Mercado y Alonzo Realonda</h4>
              </div>
              <div className='flex flex-row text-center items-center w-auto'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                  className="h-[25px] w-[60px] pr-2 text-[#FB6D3A]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <p className='text-[15px] text-[black] my-1 text-justify '>Phase 11B, Block 73, Lot 12, Wellington Place, Pasong Camachille 2, General Trias, Cavite, Philippines</p>
              </div>
            </div>
            <div className='profileSettings'>
              <button onClick={() => setNav(false)} className='py-2 px-3 m-auto text-center font-bold'>
                <Link to={'/registration'} className='buttonSettings text-white bg-[#1D5B79]'>Manage Profile</Link>
              </button>
              <button onClick={() => setNav(false)} className='py-2 px-3 m-auto text-center font-bold'>
                <Link to={'/registration'} className='buttonSettings text-white bg-[#FB6D3A]'>View Portfolio</Link>
              </button>
            </div>
        </div>
        <div className="profileContent">
          <div className='profileInfo '>
            <p className=' mx-9 my-5 text-black text-[23px] font-extrabold'>Information</p>
            <p className=' mx-9 my-2 text-black text-[15px] text-justify'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed porta turpis. In cursus libero et sem sagittis aliquet. </p>
            <p className=' mx-9 my-2 text-black text-[15px] text-justify'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed porta turpis. In cursus libero et sem sagittis aliquet. </p>
            <p className=' mx-9 my-2 text-black text-[15px] text-justify'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed porta turpis. In cursus libero et sem sagittis aliquet. </p>
            <p className=' mx-9 my-5 text-black text-[23px] font-extrabold'>Skills</p>
            <p className=' mx-9 my-2 text-black text-[15px] text-justify'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed porta turpis. In cursus libero et sem sagittis aliquet. </p>
            <p className=' mx-9 my-2 text-black text-[15px] text-justify'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed porta turpis. In cursus libero et sem sagittis aliquet. </p>
            <p className=' mx-9 my-2 text-black text-[15px] text-justify'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed porta turpis. In cursus libero et sem sagittis aliquet. </p>
          </div>
          <div className='profileSummary'>
          <p className=' mx-9 my-5 text-black text-[23px] font-extrabold'>Summary</p>
            <p className=' mx-9 my-2 text-black text-[15px] text-justify'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed porta turpis. In cursus libero et sem sagittis aliquet. </p>
            <p className=' mx-9 my-2 text-black text-[15px] text-justify'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed porta turpis. In cursus libero et sem sagittis aliquet. </p>
            <p className=' mx-9 my-2 text-black text-[15px] text-justify'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed porta turpis. In cursus libero et sem sagittis aliquet. </p>
            <p className=' mx-9 my-5 text-black text-[23px] font-extrabold'>Skills</p>
            <p className=' mx-9 my-2 text-black text-[15px] text-justify'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed porta turpis. In cursus libero et sem sagittis aliquet. </p>
            <p className=' mx-9 my-2 text-black text-[15px] text-justify'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed porta turpis. In cursus libero et sem sagittis aliquet. </p>
            <p className=' mx-9 my-2 text-black text-[15px] text-justify'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed porta turpis. In cursus libero et sem sagittis aliquet. </p>
          </div>
        </div>
        </main>
      </div>
      <div className="flex justify-center h-8 z-[5] bg-[#163646] text-gray-300 font-bolds">
        <h1 className='py-1'>QUIRCOM © 2024 | All Rights Reserved</h1>
      </div>
    </div>
  )
}

export default CProfile

