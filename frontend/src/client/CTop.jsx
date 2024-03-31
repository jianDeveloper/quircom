import React from 'react'
import Profile from '../assets/profile.jpg'

function CTop() {
  return (
    <div className='ml-3 mb-10 bg-gradient-to-t from-cyan-900 to-blue-500 hover:from-blue-700 hover:to-orange-300 rounded-2xl '> 
    <div className='mr-[5px] mt-[55px]'>
        <strong className='ml-[50px] text-white text-2xl'>Top Freelancers</strong>
        <div className='fle flex-row w-[100%] h-full'>
            <div className='grid grid-cols-5 gap-4'>
                <div >
                    <div class="relative mx-2 mt-7 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-full h-50">
                        <img src="https://docs.material-tailwind.com/img/team-3.jpg" alt="profile-picture" />
                    </div>
                    <div class="p-6 text-center">
                        <strong class=" mb-[-5px] font-sans font-semibold leading-snug text-slate-50 text-left text-wrap ">
                        Paisley
                        </strong>
                        <p className='mb-[-5px] font-sans font-semibold leading-snug text-slate-50 text-center text-wrap'>
                        CEO 
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
                <div class="relative mx-2 mt-7 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-full h-50">
                        <img src="https://docs.material-tailwind.com/img/team-3.jpg" alt="profile-picture" />
                    </div>
                    <div class="p-6 text-center">
                        <strong class=" mb-[-5px] font-sans font-semibold leading-snug text-slate-50 text-left text-wrap ">
                        Paisley
                        </strong>
                        <p className='mb-[-5px] font-sans font-semibold leading-snug text-slate-50 text-center text-wrap'>
                        CEO 
                        </p>
                    </div>
                </div>
                <div>
                <div class="relative mx-2 mt-7 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-full h-50">
                        <img src="https://docs.material-tailwind.com/img/team-3.jpg" alt="profile-picture" />
                    </div>
                    <div class="p-6 text-center">
                        <strong class=" mb-[-5px] font-sans font-semibold leading-snug text-slate-50 text-left text-wrap ">
                        Paisley
                        </strong>
                        <p className='mb-[-5px] font-sans font-semibold leading-snug text-slate-50 text-center text-wrap'>
                        CEO 
                        </p>
                    </div>
                </div>
                <div>
                <div class="relative mx-2 mt-7 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-full h-50">
                        <img src="https://docs.material-tailwind.com/img/team-3.jpg" alt="profile-picture" />
                    </div>
                    <div class="p-6 text-center">
                        <strong class=" mb-[-5px] font-sans font-semibold leading-snug text-slate-50 text-left text-wrap ">
                        Paisley
                        </strong>
                        <p className='mb-[-5px] font-sans font-semibold leading-snug text-slate-50 text-center text-wrap'>
                        CEO 
                        </p>
                    </div>
                </div>
                <div>
                <div class="relative mx-2 mt-7 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-full h-50">
                        <img src="https://docs.material-tailwind.com/img/team-3.jpg" alt="profile-picture" />
                    </div>
                    <div class="p-6 text-center">
                        <strong class=" mb-[-5px] font-sans font-semibold leading-snug text-slate-50 text-left text-wrap ">
                        Paisley
                        </strong>
                        <p className='mb-[-5px] font-sans font-semibold leading-snug text-slate-50 text-center text-wrap'>
                        CEO 
                        </p>
                    </div>
                </div>
            </div>
        </div>
        
        <strong className='ml-[50px] text-white text-2xl'>Match with more Expertise</strong>
        
        <div class="flex flex-wrap sm:flex-no-wrap items-center border-2 justify-between w-full">
                    <div class="w-full sm:w-1/3 h-64 rounded-t sm:rounded-l sm:rounded-t-none shadow bg-white dark:bg-gray-800"></div>
                    <div class="w-full sm:w-1/3 h-64 shadow bg-white dark:bg-gray-800"></div>
                    <div class="w-full sm:w-1/3 h-64 rounded-b sm:rounded-b-none shadow bg-white dark:bg-gray-800"></div>
                </div>
            
    </div>
    </div>
  )
}
export default CTop