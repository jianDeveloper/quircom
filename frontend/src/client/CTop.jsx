import React from 'react'
import Profile from '../assets/profile.jpg'

function CTop() {
  return (
    <div className='ml-[50px] mt-[20px]'>
        <strong className=''>Top Freelancers</strong>
        <div className='fle flex-row w-[100%] h-full'>
            <div className='grid grid-cols-5 gap-4'>
                <div class="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-36">
                    <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl h-5">
                        <img src="https://docs.material-tailwind.com/img/team-3.jpg" alt="profile-picture" />
                    </div>
                    <div class="p-6 text-center">
                        <strong class="block mb-2 font-sans antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                        Natalie Paisley
                        </strong>
                        <p
                        class="block font-sans text-base antialiased font-medium leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-blue-gray-600 to-blue-gray-400">
                        CEO / Co-Founder
                        </p>
                    </div>
                    <div class="flex justify-center p-6 pt-2 gap-7">
                        <a href="#facebook"
                        class="block font-sans text-xl antialiased font-normal leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-blue-600 to-blue-400">
                        <i class="fab fa-facebook" aria-hidden="true"></i>
                        </a>
                        <a href="#twitter"
                        class="block font-sans text-xl antialiased font-normal leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-light-blue-600 to-light-blue-400">
                        <i
                            class="fab fa-twitter" aria-hidden="true">
                        </i>
                        </a>
                        <a href="#instagram"
                        class="block font-sans text-xl antialiased font-normal leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-purple-600 to-purple-400"><i
                            class="fab fa-instagram" aria-hidden="true">
                        </i>
                        </a>
                    </div>
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