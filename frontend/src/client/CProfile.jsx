import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import phil from 'phil-reg-prov-mun-brgy';

import NavHeader from './CMainNav'
import CFooter from './CFooter'

import './profile.css'
import 'tailwindcss/tailwind.css';
import avatar from '../assets/avatar.png';

import BG1 from '../assets/bg1.png';


function CProfile() {

  const { userId } = useParams();
  const [ userData, setUsers] = useState();

  console.log(userId)
  console.log('Display User:', userData)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://quircom.onrender.com/api/client/${userId}`);
        if (response.status === 200) {
          setUsers(response.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className='' style={{ background: `url(${BG1})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
      <NavHeader />
      <div className='flex' >
        <main className='flex-inline mx-10 my-10 w-[100%] md:mx-[300px]'>
          <div className="userInfo">
            <div className='pictureBorder p-5'>
              {userData && userData.hasOwnProperty("profilePic") ? (
                <img className="profilePicture" src={userData.profilePic.link} alt="Profile Picture"/>
              ) : (
                <img className="profilePicture" src={avatar} alt="Profile Picture"/> // Render a default avatar if profilePic is not available
              )}
            </div>
            <div className='profileDetail w-[500px] '>
              <div className=''>
              {userData && (
                  <>
                  <h4 className='font-extrabold text-[30px] text-[#1D5B79] my-1'>{userData.firstName} {userData.surName}</h4>
                  <strong className='text-[15px] text-[#1D5B79] my-1'>@{userData.userName}</strong>
                  </>
              )}
              </div>
            </div>
            <div className='profileSettings'>
              <button onClick={() => setNav(false)} className='py-2 px-3 m-auto text-center font-bold'>
                <Link to={`/client/settings/${userId}`} className='buttonSettings text-white bg-[#1D5B79]'>Manage Profile</Link>
              </button>
              <button onClick={() => setNav(false)} className='py-2 px-3 m-auto text-center font-bold'>
                <Link to={`/client/billing/${userId}`} className='buttonSettings text-[#1D5B79] bg-[#F5F5DC]'>Subscription</Link>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 p-10 bg-[#F5F5DC] rounded-md border-2 border-orange-600">
            {userData && (
              <>
              <div className='text-inline border-r-2 border-gray-300 p-10'>
                <strong className='mx-9 text-[#13334c] text-[23px]'>Personal Information</strong>
              
                <p className='mx-9 my-2 text-[#13334c] text-[15px]'>Email: {userData.eMail} </p>
                <p className='mx-9 my-2 text-[#13334c] text-[15px]'>Contact Number: {userData.contactNum} </p>
                <p className='mx-9 my-2 text-[#13334c] text-[15px]'>Address: {phil.city_mun.find(city => city.mun_code === userData.city)?.name}, {phil.provinces.find(province => province.prov_code === userData.province)?.name},  {phil.regions.find(region => region.reg_code === userData.region)?.name} </p>
                
              </div>
              <div className='text-inline border-l-2 border-gray-300 p-10'>
                <strong className='mx-9 text-[#13334c] text-[23px]'> About </strong>
                <p className='mx-9 my-2 text-[#13334c] text-[15px]'>Hi,</p>
                
              </div>
              </>
            )}
          </div>
        </main>
      </div>
      <div className="flex">
        <CFooter />
      </div>
    </div>
  )
}

export default CProfile

