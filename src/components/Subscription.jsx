import React from 'react'
import QRM1 from '../assets/QRM1.png'
import {Link} from 'react-router-dom'

const Subscription = () => {
    return (
        <div className='w-full py-[10rem] px-4 mt-2'>
            <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
                <div className='w-full shadow-xl flex flex-col p-4 my-8 rounded-lg text-white hover:scale-105 duration-300 bg-gradient-to-r from-cyan-900 to-sky-800'>
                    <img className='w-20 mx-auto mt-[-3rem]' src={QRM1} alt="" />
                    <h2 className='text-2xl font-bold text-center py-8 '>TRIAL</h2>
                    <p className='text-center text-4xl font-bold'>₱0.00<span className='text-[#13334C] text-lg flex flex-col'>7 DAYS</span></p>
                    <div className='text-center font-medium'>
                        <p className='py-2 border-b mx-8 mt-8'>Limited access</p>
                        <p className='py-2 border-b mx-8'>Trial ticketing system</p>
                        <p className='py-2 border-b mx-8'>Sample projects</p>
                    </div>
                    <button className='bg-w-[600px] bg-gradient-to-r from-red-500 to-orange-500 rounded-md font-medium my-6 mx-auto p-3'>Free Trial</button>
                </div>
                <div className='w-full shadow-xl flex flex-col p-4 md:my-0 my-4 rounded-lg text-white hover:scale-105 duration-300 bg-gradient-to-r from-cyan-900 to-sky-800'>
                    <img className='w-20 mx-auto mt-[-3rem]' src={QRM1} alt="" />
                    <h2 className='text-2xl font-bold text-center py-8 '>BASIC</h2>
                    <p className='text-center text-4xl font-bold'>₱399.00 <span className='text-[#13334C] text-lg flex flex-col'>3 MONTHS</span></p>
                    <div className='text-center font-medium'>
                        <p className='py-2 border-b mx-8 mt-8'>Access on freelancer's profile</p>
                        <p className='py-2 border-b mx-8'>Ticketing system</p>
                        <p className='py-2 border-b mx-8'>Two projects</p>
                    </div>
                    <button className='bg-w-[600px] bg-gradient-to-r from-red-500 to-orange-500 rounded-md font-medium my-6 mx-auto p-3'>Basic Plan</button>
                </div>
                <div className='w-full shadow-xl flex flex-col p-4 my-8 rounded-lg text-white hover:scale-105 duration-300 bg-gradient-to-r from-cyan-900 to-sky-800'>
                    <img className='w-20 mx-auto mt-[-3rem]' src={QRM1} alt="" />
                    <h2 className='text-2xl font-bold text-center py-8 '>PREMIUM</h2>
                    <p className='text-center text-4xl font-bold'>₱999.00<span className='text-[#13334C] text-lg flex flex-col'>1 YEAR</span></p>
                    <div className='text-center font-medium'>
                        <p className='py-2 border-b mx-8 mt-8'>Access all the Features</p>
                        <p className='py-2 border-b mx-8'>Generate analytical reports</p>
                        <p className='py-2 border-b mx-8'>Priority Ticketing System</p>
                    </div>
                    <button className='bg-w-[600px] bg-gradient-to-r from-red-500 to-orange-500 rounded-md font-medium my-6 mx-auto p-3'>Premium Plan</button>
                </div>
            </div>
        </div>
    )
}
export default Subscription