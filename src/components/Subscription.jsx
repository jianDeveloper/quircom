import React from 'react'
import QRM1 from '../assets/QRM1.png'

const Subscription = () => {
    return (
        <div className='w-full h-screen py-[10rem] px-4 mt-2'>
            <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
                <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
                    <img className='w-20 mx-auto mt-[-3rem] bg-white' src={QRM1} alt="" />
                    <h2 className='text-2xl font-bold text-center py-8 '>Trial</h2>
                    <p className='text-center text-4xl font-bold'>₱0.00</p>
                    <div className='text-center font-medium'>
                        <p className='py-2 border-b mx-8 mt-8'>Access to essential features</p>
                        <p className='py-2 border-b mx-8'>Generate analytical reports</p>
                        <p className='py-2 border-b mx-8'>Two projects</p>
                    </div>
                    <button className='bg- w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-white'>Free Trial</button>
                </div>
            </div>
        </div>
    )
}
export default Subscription