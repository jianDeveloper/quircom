import React from 'react'
import Profile from '../assets/profile.jpg'

function CTop() {
  return (
    <div className='ml-[50px] mt-[20px]'>
        <strong className=''>Top Freelancers</strong>
        <div className='fle flex-row'>
            <div className='grid grid-cols-5 gap-4'>
                <div>
                    <img src={Profile} alt="" className='w-[100px] h-full rounded-md'/>
                </div>
                <div>
                    <img src={Profile} alt="" className='w-[100px] h-full rounded-md'/>
                </div>
                <div>
                    <img src={Profile} alt="" className='w-[100px] h-full rounded-md'/>
                </div>
                <div>
                    <img src={Profile} alt="" className='w-[100px] h-full rounded-md'/>
                </div>
                <div>
                    <img src={Profile} alt="" className='w-[100px] h-full rounded-md'/>
                </div>
            </div>
        </div>
        
        <strong>Match with more Expertise</strong>
    </div>
  )
}
export default CTop