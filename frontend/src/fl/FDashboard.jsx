import { useEffect, useState, useContext } from 'react';
import React from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import UserContext from '../context/UserContext';
import { useParams } from 'react-router-dom';

import fTable from '../fl/FDBcomponents/fTable.jsx';
import BG1 from '../assets/bg1.png';
import { MdDesignServices,MdPendingActions } from "react-icons/md";
import { FaFileCircleCheck } from "react-icons/fa6";
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

function FDashboard() {
  const { userId } = useParams();
  const [ userData, setUserData] = useState(null); // State to store user data
  
  const [activeTab, setActiveTab] = useState('track');

  const handleTab = (track) => {
    setActiveTab(track);
  };

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
    <div className='flex flex-col h-[100vh]' style={{ background: `url(${BG1})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
     {/* insert NAvbar  */}
      <div className='flex align-center justify-center mx-[100px]'>
        <div className='flex flex-col container my-10'> {/*formatting navbar & body -j*/}

          {/* Box Analytics */}
          <div className="grid grid-cols-3 gap-[20px] my-[15px]">
            <div className='flex flex-col justify-around px-4 py-4 border-[#1D5B79] border-[3px] border-solid bg-white hover:shadow-lg rounded-md'>
              <div className='flex items-center justify-between'>
                <h1 className='text-[20px] text-[#13334C] font-bold'>My Services</h1>
                <MdDesignServices size={30} color='#1d5b79'/>
              </div>
              <h1 className="font-medium text-[#1D5B79]">100</h1>
            </div>
            <div className='flex flex-col justify-around px-4 py-4 border-[#1D5B79] border-[3px] border-solid bg-white hover:shadow-lg rounded-md'>
              <div className='flex items-center justify-between'>
                <h1 className='text-[20px] text-[#13334C] font-bold'>Pending Projects</h1>
                <MdPendingActions size={30} color='#1d5b79'/>
              </div>
              <h1 className="font-medium text-[#1D5B79]">33</h1>
            </div>
            <div className='flex flex-col justify-around px-4 py-4 border-[#1D5B79] border-[3px] border-solid bg-white hover:shadow-lg rounded-md'>
              <div className='flex items-center justify-between'>
                <h1 className='text-[20px] text-[#13334C] font-bold'>Finished Projects</h1>
                <FaFileCircleCheck size={27} color='#1d5b79'/>
              </div> 
              <h1 className="font-medium text-[#1D5B79]">12</h1>
            </div>
          </div>
          {/* Box Analytics */}
            
          {/* Menu Tabs */}
          <div className='flex flex-col justify-center items-center'>
            {/* outside container */}
            <div className='flex justify-between items-center w-[100%] h-[100px] my-5'>
              <button className={activeTab === 'track' ? 'active-tab border-[#1D5B79] text-white bg-[#13334C] py-8 w-[49%] border-[3px] rounded-md' :
              'border-[#1D5B79] py-4 w-[48%] border-[3px] rounded-md hover:w-[49%] hover:py-8 hover:bg-[#13334C] hover:text-white'}
              onClick={() => handleTab('track')} >
                <h1 className=' text-lg font-extrabold'>Ticket Tracker</h1>
              </button>
              <button className={activeTab === 'manage' ? 'active-tab border-[#1D5B79] text-white bg-[#13334C] py-8 w-[49%] border-[3px] rounded-md' : 
              'border-[#1D5B79] py-4 w-[48%] border-[3px] rounded-md hover:w-[49%] hover:py-8 hover:bg-[#13334C] hover:text-white'} 
              onClick={() => handleTab('manage')}>
                <h1 className=' text-lg font-extrabold'>Manage Services</h1>
              </button>
            </div>
            {/* inside container */}
            <div>
              {activeTab === 'track' && (
              <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{
                  pagination: {
                  paginationModel: { page: 0, pageSize: 99 },
                   },
                 }}
                 pageSizeOptions={[5, 10]}
               />
              </div>)}
              {activeTab === 'manage' && (
              <div className=''>
                Rawr
              </div>)}
            </div>
          </div>
          {/* Menu Tabs */}

        </div>
      </div>
      {/* Footer */}
      
    </div>
  )
}

export default FDashboard