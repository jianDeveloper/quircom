import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import UserContext from '../context/UserContext';
import axios from 'axios';
import phil from 'phil-reg-prov-mun-brgy';

import NavHeader from './CMainNav'
import CFooter from './CFooter'

import './profile.css'
import 'tailwindcss/tailwind.css';
import avatar from '../assets/avatar.png';

import BG1 from '../assets/bg1.png';


function CProfile() {

  const [ userData, setUsers] = useState(null);
  const { userId } = useParams();
  const { userIdLink } = useContext(UserContext);

  console.log('User ID in Dashboard:', userIdLink);
  console.log(userId)
  console.log('Display User:', userData)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/users/${userId}`);
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
            <div className='profileDetail w-2/5 '>
              <div className=''>
              {userData && (
                  <h4 className='font-extrabold text-[23px] text-[#1D5B79] my-1'>{userData.firstName} {userData.surName}</h4>
              )}
              </div>
            </div>
            <div className='profileSettings'>
              <button onClick={() => setNav(false)} className='py-2 px-3 m-auto text-center font-bold'>
                <Link to={`/client/settings/${userId}`} className='buttonSettings text-white bg-[#1D5B79]'>Manage Profile</Link>
              </button>
              <button onClick={() => setNav(false)} className='py-2 px-3 m-auto text-center font-bold'>
                <Link to={`/client/settings/${userId}`} className='buttonSettings text-[#1D5B79] bg-[#F5F5DC]'>View Portfolio</Link>
              </button>
            </div>
          </div>
          <div className="profileContent">
            {userData && (
              <div className='profileInfo '>
                <p className='mx-9 my-5 text-[#13334c] text-[23px] font-extrabold'>Information</p>
                
                <p className='mx-9 my-2 text-[#13334c] text-[15px]'>Email: {userData.eMail} </p>
                <p className='mx-9 my-2 text-[#13334c] text-[15px]'>Contact Number: {userData.contactNum} </p>
                <p className='mx-9 my-2 text-[#13334c] text-[15px]'>Address: {phil.city_mun.find(city => city.mun_code === userData.city)?.name}, {phil.provinces.find(province => province.prov_code === userData.province)?.name},  {phil.regions.find(region => region.reg_code === userData.region)?.name} </p>
                
              </div>
            )}
            <div className='profileSummary'>
              <p className=' mx-9 my-5 text-[#13334c] text-[23px] font-extrabold'>Summary</p>
              <p className=' mx-9 my-2 text-[#13334c] text-[15px] text-justify'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed porta turpis. In cursus libero et sem sagittis aliquet. </p>
              <p className=' mx-9 my-2 text-[#13334c] text-[15px] text-justify'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed porta turpis. In cursus libero et sem sagittis aliquet. </p>
              <p className=' mx-9 my-2 text-[#13334c] text-[15px] text-justify'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed porta turpis. In cursus libero et sem sagittis aliquet. </p>
              <p className=' mx-9 my-5 text-[#13334c] text-[23px] font-extrabold'>Skills</p>
              <p className=' mx-9 my-2 text-[#13334c] text-[15px] text-justify'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed porta turpis. In cursus libero et sem sagittis aliquet. </p>
              <p className=' mx-9 my-2 text-[#13334c] text-[15px] text-justify'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed porta turpis. In cursus libero et sem sagittis aliquet. </p>
              <p className=' mx-9 my-2 text-[#13334c] text-[15px] text-justify'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed porta turpis. In cursus libero et sem sagittis aliquet. </p>
            </div>
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

