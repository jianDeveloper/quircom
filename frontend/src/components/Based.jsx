import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import phil from 'philippine-location-json-for-geer';

const BASE_URI = import.meta.env.RENDER_BASEURI;

import avatar from '../assets/avatar.png';
import WithoutAuth from '../auth/WithoutAuth';

const Reg = () => {
  const [users, setUsers] = useState([]);
  const [searchUsername, setSearchUsername] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const responseClient = await axios.get(`https://quircom.onrender.com/api/client`, {headers});
        const responseFreelancer = await axios.get(`https://quircom.onrender.com/api/freelancer`, {headers});

        if (responseClient.status === 200 && responseFreelancer.status === 200) {
          // Combine users from both responses
          const combinedUsers = [...responseClient.data, ...responseFreelancer.data];
          setUsers(combinedUsers);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (user) => {
    try {
      // Determine the collection based on the user's account type
      const collection = user.accType === 'client' ? 'client' : 'freelancer';
      // console.log(user)
  
      const response = await axios.delete(`https://quircom.onrender.com/api/${collection}/delete/${user._id}`);
      if (response.status === 200) {
        // Filter out the deleted user from the local state to update the UI immediately
        setUsers(users.filter(u => u._id !== user._id));
        // console.log("User deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleInputChange = (event) => {
    setSearchUsername(event.target.value);
  };

  const filterUsersByUsername = () => {
    if (searchUsername.trim() === "") {
      return users;
    } else {
      return users.filter(user => user.userName.toLowerCase().includes(searchUsername.toLowerCase()));
    }
  };

  

  return (
    <div className='w-[80%] mx-auto my-[3rem] border-2 border-blue-100 shadow-md shadow-gray-400 rounded-lg'>
      <h1 className='p-6 text-center flex-1 text-2x1 font-bold text-gray-700'>Display</h1>
      <div className='text-right mr-10'>
        <input type="text" value={searchUsername} onChange={handleInputChange} placeholder="Search by username" />
        <button className='button text-sm px-4' onClick={filterUsersByUsername}>
          Search
        </button>
        <button className='button text-sm px-4'>
          <Link to={'/registration'}> Register Now!</Link>
        </button>
      </div>
      <div className='p-4 lg:p-7 flex items-center flex-wrap gap-5 w-[95%]'>

        {filterUsersByUsername().map(user => (
          <div key={user._id} className="border border-gray-200 p-4 rounded-md">
            <p><strong>ID:</strong> {user._id}</p>
            <p className=' font'><strong>Name:</strong> {user.firstName} {user.surName}</p>
            <p><strong>Username:</strong> {user.userName}</p>
            <p><strong>Password:</strong> {user.passWord}</p>
            <p><strong>Email:</strong> {user.eMail}</p>
            <p><strong>Contact Number:</strong> {user.contactNum}</p>
            <p><strong>Region:</strong> {user.region} {phil.regions.find(region => region.reg_code === user.region)?.name} </p>
            <p><strong>Province:</strong> {user.province} {phil.provinces.find(province => province.prov_code === user.province)?.name}</p>
            <p><strong>City:</strong> {user.city} {phil.city_mun.find(city => city.mun_code === user.city)?.name}</p>
            <p><strong>Account Type:</strong> {user.accType}</p>
            {user.hasOwnProperty("profilePic") ? <img src={user.profilePic.link} alt="" className='w-[200px]'/> : <img src={avatar}/>} {/* If Else */}
            {user.hasOwnProperty("profilePic") && (<img src={user.profilePic.link} alt="" className='w-[200px]'/>)} {/* Display if has */}

            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deleteUser(user)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WithoutAuth(Reg);
