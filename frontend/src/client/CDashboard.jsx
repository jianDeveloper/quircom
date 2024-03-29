import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import axios from 'axios'; // Import axios for making HTTP requests
import UserContext from '../context/UserContext';

import Header from './Header';
import CNav from './CNav';
import CFooter from './CFooter';
import TaskList from './Dashcomponents/TaskList';

import BG1 from '../assets/bg1.png';
import BGmark from '../assets/service.jpg';
import BGtrack from '../assets/track.jpg';
import BGsubs from '../assets/subs.jpg';

function CDashboard() {
  const { userId } = useParams();
  const [ userData, setUserData] = useState(null); // State to store user data
  
  const { userIdLink } = useContext(UserContext);
  console.log('User ID in Dashboard:', userIdLink);

  useEffect(() => {
    // Fetch user data using the user ID
    axios.get(`http://localhost:8800/api/users/${userId}`)
      .then(response => {
        console.log('User data:', response.data);
        setUserData(response.data); // Set the user data in state
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [userId]); // Fetch user data whenever userId changes

  return (
    <div className='flex flex-col' style={{ background: `url(${BG1})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
      <Header />
      <div className='flex '>
        <CNav />
        <div className='flex flex-col container mx-10 my-10'> {/*formatting navbar & body -j*/}
          <div className='flex'>
            <h1 className='font-extrabold text-[30px] text-[#1D5B79]'>DASHBOARD</h1>
          </div>

          {/*fixing headbox on dashboard -j*/}
          <div className='grid grid-cols-2 gap-[20px] my-[15px] lg:grid-cols-4 '>
            <div className='card'>
              <div className='card-inner'>
                <h3 className='font-bold text-[#1D5B79]'>SERVICES</h3>
                <BsFillArchiveFill className='card_icon' />
              </div>
              <h1 className='font-medium'>300</h1>
            </div>
            <div className='card'>
              <div className='card-inner'>
                <h3 className='font-bold text-[#1D5B79]'>TASK</h3>
                <BsFillGrid3X3GapFill className='card_icon' />
              </div>
              <h1 className='font-medium'>12</h1>
            </div>
            <div className='card'>
              <div className='card-inner'>
                <h3 className='font-bold t ext-[#1D5B79]'>FREELANCERS</h3>
                <BsPeopleFill className='card_icon' />
              </div>
              <h1 className='font-medium'>33</h1>
            </div>
            <div className='card'>
              <div className='card-inner'>
                <h3 className='font-bold text-[#1D5B79]'>NOTIFICATION</h3>
                <BsFillBellFill className='card_icon' />
              </div>
              <h1 className='font-medium'>42</h1>
            </div>
          </div>
          <div className='grid grid-cols-1 gap-[20px] my-[15px] md:grid-cols-3'>
            <div className='flex flex-col justify-around rounded-lg' style={{ background: `url(${BGmark})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
              <div className='flex justify-center items-center py-14'>
                <h3 className='font-extrabold text-xl text-white'>Marketplace</h3>
              </div>
            </div>
            <div className='flex flex-col justify-around rounded-lg' style={{ background: `url(${BGtrack})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
              <div className='flex justify-center items-center py-14'>
                <h3 className='font-extrabold text-xl text-white'>Progress Tracker</h3>
              </div>
            </div>
            <div className='flex flex-col justify-around rounded-lg' style={{ background: `url(${BGsubs})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
              <div className='flex justify-center items-center py-14'>
                <h3 className='font-extrabold text-xl text-white'>Subscription</h3>
              </div>
            </div>
          </div>
          <div className='flex'>
            <div>
              <TaskList/>
            </div>
            <div className='flex ml-16 bg-white'>
              <h1 className='mt-6 text-2xl font-semibold leading-tight text-[#1D5B79]'>Leaderboards</h1>
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <div className=''>
        <CFooter />
      </div>
    </div>
  );
}

export default CDashboard;