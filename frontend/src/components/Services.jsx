import React from 'react'
import { Link } from 'react-router-dom';

import Laptop from '../assets/service.svg'
import WithoutAuth from '../auth/WithoutAuth';

const Services = () => {
  return (
    <section id='services' className='flex flex-col w-full bg-[#F5F5DC] py-16 px-4'>
      <div className='max-w-[1240px] grid md:grid-cols-2 mx-5'>
        <img className='w-[500px] mx-auto my-4' src={Laptop} alt="" />
        <div className='flex flex-col justify-center'>
          <p className='text-[#1D5B79] font-bold'>IT and Graphic Designs</p>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2 text-orange-600'>Let's work together</h1>
          <p className='md:text-xl text-lg font-normal text-[#1D5B79]'>🖥️💡 IT meets Quircom! Let's collaborate and blend the power of technology with the finesse of graphic design. Together, we can create stunning visuals, seamless user experiences, and innovative solutions. Let's bring ideas to life IT and Graphic Design, a perfect synergy! 🎨✨ #Quircom #Freelance #IT #GraphicDesign 
          </p>
          <button  className='transition ease-in-out delay-150 bg-[#1D5B79] hover:-translate-y-1 hover:scale-110 hover:bg-orange-600 duration-300 w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3 text-white'><Link to={'/registration'}> Get Started </Link></button> 
        </div>
      </div>
      <div className='grid md:grid-cols-3 gap-4 mt-[50px] h-auto lg:p-10 p-2'>
            <div className='flex flex-col items-center min-h-60 justify-center m-3 px-4 rounded-[20px] bg-gradient-to-r from-red-500 to-orange-500 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] hover:scale-105 duration-300'>
                <h4 className='font-bold text-[#F5F5DC] text-[30px] leading-[23px] text-center mb-5 sm:text-[25px]'>Freelancers Showcasing</h4>
                <p className='font-normal text-[#F5F5DC] text-[16px] leading-[24px] text-center'>Hire with confidence. Work with the best freelance professionals in the field.</p>
            </div>
            <div className='flex flex-col items-center min-h-[400px] justify-center m-3 px-4 rounded-[20px] bg-gradient-to-r from-red-500 to-orange-500 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] hover:scale-105 duration-300'>
                <h4 className='font-bold text-[#F5F5DC] text-[30px] leading-[23px] text-center mb-5 sm:text-[25px]'>Best Quality Work</h4>
                <p className='font-normal text-[#F5F5DC] text-[16px] leading-[24px] ml-1 text-center'>Make informed decisions. Choose a freelancer whose previous work resonates with your project goals and expectations.</p>
            </div>
            <div className='flex flex-col items-center min-h-[400px] justify-center m-3 px-4 rounded-[20px] bg-gradient-to-r from-red-500 to-orange-500 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] hover:scale-105 duration-300'>
                <h4 className='font-bold text-[#F5F5DC] text-[30px] leading-[23px] text-center mb-5 sm:text-[25px]'>Ticket System</h4>
                <p className='font-normal text-[#F5F5DC] text-[16px] leading-[24px] ml-1 text-center'>Experience clear and transparent communication. Ensure every project detail is documented and easily accessible.</p>
            </div>
        </div>
    </section>
  )

}

export default WithoutAuth(Services)