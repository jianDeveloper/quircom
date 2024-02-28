import React from 'react'
import {Link} from 'react-router-dom'

import BGreg from '../assets/bgreg.png';
import logo2 from '../assets/Icon2.png';

const Reg = () => {
  return (
    <section className="">
      <div className="h-screen" style={{background: `url(${BGreg})`, backgroundRepeat:'no-repeat', backgroundSize:'cover'}}>
        <div className='absolute mt-[50px] left-[50%] translate-x-[-50%] xl:translate-x-[-100%] md:w-[600px] bg-[beige] w-[450px] px-[20px] py-[30px] rounded-[10px] shadow-[2px_2px_5px_5px_rgba(0,0,0,0.15)] border-solid border-[1px] border-black'>
        <h2 className='text-center mx-[20px] mt-[10px] text-[30px] text-[#1D5B79] font-extrabold drop-shadow-xl'>Create Account</h2>
          <div className="container mx-auto mt-8">
            <form className="w-full max-w-screen-ss mx-auto">
              <div className="flex flex-col md:flex-row md:justify-center -mx-3">
                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label htmlFor="firstName" className="block text-[#1D5B79] text-sm font-bold mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full text-[12px] p-3 border rounded"
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label htmlFor="lastName" className="block text-[#1D5B79] text-sm font-bold mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full text-[12px] p-3 border rounded"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:justify-center -mx-3">
                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label htmlFor="Username" className="block text-[#1D5B79] text-sm font-bold mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="w-full text-[12px] p-3 border rounded"
                    placeholder="Enter your username"
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label htmlFor="password" className="block text-[#1D5B79] text-sm font-bold mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full p-2 border rounded"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:justify-center -mx-3">
                <div className="w-full md:w-1/2 px-3 mb-4">
                <label htmlFor="contactNumber" className="block text-[#1D5B79] text-sm font-bold mb-2">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    id="contactNumber"
                    name="contactNumber"
                    className="w-full text-[14px] p-2.5 border rounded"
                    placeholder="Enter your contact number"
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label htmlFor="country" className="block text-[#1D5B79] text-sm font-bold mb-2">
                    Coountry
                  </label>
                  <select
                    id="country"
                    name="country"
                    className="w-full p-2 border rounded"
                  >
                    
                    <option value=" "> </option>
        
                  </select>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:justify-center -mx-3">
                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label htmlFor="email" className="block text-[#1D5B79] text-sm font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full text-[12px] p-3  border rounded"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-3">
                  <label htmlFor="accountType" className="block text-[#1D5B79] text-sm font-bold mb-2">
                    Account Type
                  </label>
                  <select
                    id="accountType"
                    name="accountType"
                    className="w-full p-2 border rounded"
                  >
                    <option value="freelancer">Freelancer</option>
                    <option value="client">Client</option>
                  </select>
                </div>
              </div>
              <div className="mb-6">
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    id="agree"
                    name="agreement"
                    className="mr-2"
                  />
                  <label htmlFor="agree" className='text-[14px]'>
                    I agree to the <Link className='text-[#1D5B79] font-medium'><u>terms and conditions</u></Link>
                  </label>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-[#FE6D30] w-[150px] text-white p-2 rounded-full hover:bg-[#EA580C] hover:w-[155px] focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                  Get Started
                </button>
              </div>
            </form>
          </div>
        </div>
        <div>
          <img className='hidden top-[25%] xl:flex absolute left-[62%] h-[400px] translate-x-[-0%] mx-auto' src={logo2}/>
        </div>
      </div>
    </section>
    
  )
}

export default Reg
