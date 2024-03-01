import React from 'react'
import Laptop from '../assets/laptop.png'
import Star from '../assets/star.png'
import Shield from '../assets/sec.png'
import Plane from '../assets/plane.png'

const Services = () => {
  return (
    <div className='w-full bg-[#F5F5DC] py-16 px-4'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
        <img className='w-[500px] mx-auto my-4' src={Laptop} alt="" />
        <div className='flex flex-col justify-center'>
          <p className='text-[#1D5B79] font-bold'>IT and Graphic Designs</p>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2 text-orange-600'>Let's work together</h1>
          <p className='md:text-1xl text-xl font-normal text-[#1D5B79]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
          </p>
          <button className='bg-[#1D5B79] w-[200px] rounded-3xl font-medium my-6 mx-auto md:mx-0 py-3 text-white'>Get Started</button>
        </div>
      </div>
      <div className='flex-col'>
          <div className='flex-1 flex-col md:ml-10 ml-0 md:mt-0 mt-10 p-6 rounded-[20px] bg-gradient-to-r from-cyan-900 to-sky-800'>
            <div className='flex flex-row items-center m-3 shadow hover:shadow-lg p-2 rounded-[20px] bg-gradient-to-r from-red-500 to-orange-500'>
              <img src={Star} alt="icon" className='w-[60px] h-[60px] object-contain p-2 rounded-full' />
              <div className='mr-10 ml-3'>
                <h4 className='font-semibold text-[#F5F5DC] text-[18px] leading-[23px] ml-1'>Freelancers Showcasing</h4>
                <p className='font-normal text-[#F5F5DC] text-[16px] leading-[24px] ml-1'>Hire with confidence. Work with the best freelance professionals in the field.</p>
              </div>
            </div>
            <div className='flex flex-row items-center m-3 shadow hover:shadow-lg p-2 rounded-[20px] bg-gradient-to-r from-red-500 to-orange-500'>
              <img src={Shield} alt="icon" className='w-[60px] h-[60px] object-contain p-2' />
              <div className='mr-10 ml-3'>
                <h4 className='font-semibold text-[#F5F5DC] text-[18px] leading-[23px] ml-1'>Best Quality Work</h4>
                <p className='font-normal text-[#F5F5DC] text-[16px] leading-[24px] ml-1'>Make informed decisions. Choose a freelancer whose previous work resonates with your project goals and expectations.</p>
              </div>
            </div>
            <div className='flex flex-row items-center m-3 shadow hover:shadow-lg p-2 rounded-[20px] bg-gradient-to-r from-red-500 to-orange-500'>
              <img src={Plane} alt="icon" className='w-[60px] h-[60px] object-contain p-2' />
              <div className='mr-10 ml-3'>
                <h4 className='font-semibold text-[#F5F5DC] text-[18px] leading-[23px] ml-1'>Ticket System</h4>
                <p className='font-normal text-[#F5F5DC] text-[16px] leading-[24px] ml-1'>Experience clear and transparent communication. Ensure every project detail is documented and easily accessible.</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  )

}

export default Services