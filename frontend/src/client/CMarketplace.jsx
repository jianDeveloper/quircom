import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from "react-router-dom";

import NavHeader from './CMainNav'
import CFooter from './CFooter'

import mpTop from '../assets/mpTop.jpg'
import CCards from './Marketcomponents/CCards'


const BASE_URI = import.meta.env.RENDER_BASEURI;

const CMarketplace = () => {
  const { serviceId } = useParams();
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`https://quircom.onrender.com/api/service/`);
        if (response.status === 200) {
          setServices(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchServices();
  }, [serviceId]);


  return (
    <div className='flex flex-col min-h-screen'>
      <NavHeader />
      <div className='flex'>
        <div className='flex-col mx-10 my-10 w-[100%]'>
          <h1 className='font-extrabold text-[30px] text-[#1D5B79]' >MARKETPLACE</h1>
          <div className="w-full h-[300px] relative rounded-lg" style={{background: `url(${mpTop})`, backgroundRepeat:'no-repeat', backgroundSize:'cover'}}>
            <div className="absolute bottom-10 left-10 text-white p-2">
              <h1 className='text-[50px] font-bold mb-5'>Freelancing Services</h1>
              
            </div>
          </div>
          <h1 className='mt-10 font-extrabold text-[30px] text-[#1D5B79]'>Top Services</h1>
          <div className="m-[10px] w-[50%]">
            <form className="">
              <div className="relative w-full flex  items-center justify-between rounded-md">
                <svg className="absolute left-2 block h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" className=""></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65" className=""></line>
                </svg>
                <input type="name" name="search" className="h-12 w-full cursor-text rounded-md border border-gray-100 bg-gray-100 py-4 pr-40 pl-12 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" placeholder="Search by services..." />
              </div>
            </form>
            <div className="flex mt-2 space-x-3"> {/*div for Category */}
              <button className="px-4 py-2 bg-[#1D5B79] hover:bg-[#2069A3] text-white rounded-md" >Software Development</button>
              <button className="px-4 py-2 bg-[#1D5B79] hover:bg-[#2069A3] text-white rounded-md" >Web Development</button>
              <button className="px-4 py-2 bg-[#1D5B79] hover:bg-[#2069A3] text-white rounded-md" >Animation</button>
              <button className="px-4 py-2 bg-[#1D5B79] hover:bg-[#2069A3] text-white rounded-md" >Graphic Design</button>
              <button className="px-4 py-2 bg-[#1D5B79] hover:bg-[#2069A3] text-white rounded-md" >Marketing</button>

            </div>
          </div>
          <div className="flex-grow"> {/* This div will make the cards fill the available space */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              {services?.map((item, index) => (
                <CCards key={index} serviceId={item?._id} image={item?.thumbNail?.link} subtitle={item.serviceType} title={item.serviceName} author={item?.freelancer?.firstName}  button='Avail'/>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <CFooter />
      </div>
    </div>
  )
}

export default CMarketplace