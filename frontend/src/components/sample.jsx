import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Reg = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [username, setUsername] = useState("");
   // State to store input value

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8800/api/users");
        if (response.status === 200) {
          setUsers(response.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Function to handle input change
  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  // Function to filter users by username
  const filterUserByUsername = () => {
    const user = users.find(user => user.userName === username);
    setSelectedUser(user);
  };

  return (
    <div className='w-[80%] mx-auto my-[3rem] border-2 border-blue-100 shadow-md shadow-gray-400 rounded-lg'>
      <h1 className='p-6 text-center flex-1 text-2x1 font-bold text-gray-700'>Display</h1>
      <div className='text-right mr-10'>
        <input type="text" value={username} onChange={handleInputChange} />
        <button className='button text-sm px-4' onClick={filterUserByUsername}>
          Filter
        </button>
        <button className='button text-sm px-4'>
          <Link to={'/registration'}> Register Now!</Link>
        </button>
      </div>
      <div className='p-4 lg:p-7 flex items-center flex-wrap gap-5 w-[95%]'>
        {selectedUser ? (
          <div className="border border-gray-200 p-4 rounded-md">
            <p><strong>Name:</strong> {selectedUser.firstName} {selectedUser.surName}</p>
            <p><strong>Username:</strong> {selectedUser.userName}</p>
            <p><strong>Password:</strong> {selectedUser.passWord}</p>
            <p><strong>Email:</strong> {selectedUser.eMail}</p>
            <p><strong>Contact Number:</strong> {selectedUser.contactNum}</p>
            <p><strong>Country:</strong> {selectedUser.country}</p>
            <p><strong>Account Type:</strong> {selectedUser.accType}</p>
          </div>
        ) : (
          <p>No user selected.</p>
        )}
      </div>
    </div>
  );
};

export default Reg;
