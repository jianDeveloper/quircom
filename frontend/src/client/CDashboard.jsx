import React from 'react'
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'

import Header from './Header'
import CNav from './CNav'
import CFooter from './CFooter';
import TaskList from './Dashcomponents/TaskList';

import BG1 from '../assets/bg1.png';
import BGmark from '../assets/service.jpg';
import BGtrack from '../assets/track.jpg';
import BGsubs from '../assets/subs.jpg';

function CDashboard() {

  return (
    <div className='flex flex-col'style={{background: `url(${BG1})`, backgroundRepeat:'no-repeat', backgroundSize:'cover'}}>
      <Header />
      <div className='flex '>
      <CNav />
      <div className='flex flex-col container mx-10 my-10'> {/*formatting navbar & body -j*/}
        <div className='flex'>
            <h1 className='font-extrabold text-[30px] text-[#1D5B79]'>DASHBOARD</h1>
        </div>
        
        {/*fixing headbox on dashboard -j*/}
        <div className='grid grid-cols-2 gap-[20px] my-[15px]
          lg:grid-cols-4 '>
            <div className='card'>
                <div className='card-inner'>
                    <h3 className='font-bold text-[#1D5B79]'>SERVICES</h3>
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                <h1 className='font-medium'>300</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3 className='font-bold text-[#1D5B79]'>TASK</h3>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                <h1 className='font-medium'>12</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3 className='font-bold text-[#1D5B79]'>FREELANCERS</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1 className='font-medium'>33</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3 className='font-bold text-[#1D5B79]'>NOTIFICATION</h3>
                    <BsFillBellFill className='card_icon'/>
                </div>
                <h1 className='font-medium'>42</h1>
            </div>
        </div>
        <div className='grid grid-cols-1 gap-[20px] my-[15px] 
          md:grid-cols-3'>
            <div className='flex flex-col justify-around rounded-lg'
            style={{background: `url(${BGmark})`, backgroundRepeat:'no-repeat', backgroundSize:'cover'}}>
                <div className='flex justify-center items-center py-14'>
                    <h3 className='font-extrabold text-xl text-white'>Marketplace</h3>
                </div>
            </div>
            <div className='flex flex-col justify-around rounded-lg'
            style={{background: `url(${BGtrack})`, backgroundRepeat:'no-repeat', backgroundSize:'cover'}}>
                <div className='flex justify-center items-center py-14'>
                    <h3 className='font-extrabold text-xl text-white'>Progress Tracker</h3>
                </div>
            </div>
            <div className='flex flex-col justify-around rounded-lg'
            style={{background: `url(${BGsubs})`, backgroundRepeat:'no-repeat', backgroundSize:'cover'}}>
                <div className='flex justify-center items-center py-14'>
                    <h3 className='font-extrabold text-xl text-white'>Subscription</h3>
                </div>
            </div>
        </div>
        <div className='flex'>
          <div>
          <TaskList />
          </div>
          <div className='flex ml-16 bg-white'>
            <h1 className='mt-6 text-2xl font-semibold leading-tight text-[#1D5B79]'>Leaderborads</h1>
            <div>

            </div>
          </div>
          
        </div>
    </div>
      </div>
      <div className="">
      <CFooter />
      </div>
    </div>
  )
}

export default CDashboard