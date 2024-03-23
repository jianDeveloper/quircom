import React from 'react'

const Register = ({ register }) => {
  const {fName, surName, userName, password, contactNum, country, eMail, accType} = register;
  return(
    <div className='w-[17rem] shadow-md shadow-gray-400 overflow-hidden rounded-lg'>
      <div className='p-3 text-sm flex flex-col gap-1'>
        <p> Full Name: {fName + ' ' + surName}</p>
        <p> Username: {userName}</p>
        <p> Password: {password}</p>
        <p> Contact: {contactNum}</p>
        <p> Country {country}</p>
        <p> Email: {eMail}</p>
        <p> Account Type: {accType}</p>
      </div>
      <div className='p-3 flex items-center justify-end gap-2'>
        <button className='text-red-700 hover:opacity-75'>
          Delete
        </button>
        <button className='text-blue-600 hover:opacity-75'>
          Edit
        </button>
      </div>
    </div>
  )
} 

export default Register