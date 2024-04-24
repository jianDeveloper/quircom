import React from 'react'
import WithoutAuth from '../auth/WithoutAuth'

const Newsletter = () => {
    return (
        <div className='w-full py-16 mx-3 text-[#1D5B79]'>
            <div className='max-w-[1240px] mx-auto grid lg:grid-cols-3'>
                <div className='lg:col-span-2 my-4'>
                    <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Want latest jobs & projects to <span className='text-orange-600'>work together?</span></h1>
                    <p>Sign up to our news letter and stay up to date.</p>
                </div>
                <div className="my-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between w-full">
                        <input className='p-3 flex w-full rounded-md text-black' type='email' placeholder='Coming Soon...' />
                        <button className='bg-[#1D5B79] text-white rounded-md font-meduim w-[200px] ml-4 my-6 px-6 py-3'>Notify Me</button>
                    </div>
                    <p>We care bout the your projects. Read our <span className='text-orange-600 '>Privacy Policy</span></p>
                </div>
            </div>
        </div>
    )
}

export default WithoutAuth(Newsletter)