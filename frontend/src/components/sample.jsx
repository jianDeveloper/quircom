import React from 'react';
import {Link} from 'react-router-dom';
import { useQuery } from 'react-query';
import { getAllData } from '../fetchReg/fetchReg';

import Register from './Registration';

const Reg = () => {

  const data1=[
    { 
      id: 1,
      fName: "James",
      surName:"De Sena",
      userName: "Kaoru",
      passWord: "123",
      contactNum: 123,
      country: "Philippines",
      eMail: "test@hotmail.com",
      accType: "Client"
    },
    { 
      id: 2,
      fName: "James",
      surName:"De Sena",
      userName: "Kaoru",
      passWord: "123",
      contactNum: 123,
      country: "Philippines",
      eMail: "test@hotmail.com",
      accType: "Client"
    },
    { 
      id: 3,
      fName: "James",
      surName:"De Sena",
      userName: "Kaoru",
      passWord: "123",
      contactNum: 123,
      country: "Philippines",
      eMail: "test@hotmail.com",
      accType: "Client"
    },
    { 
      id: 4,
      fName: "James",
      surName:"De Sena",
      userName: "Kaoru",
      passWord: "123",
      contactNum: 123,
      country: "Philippines",
      eMail: "test@hotmail.com",
      accType: "Client"
    },
    { 
      id: 5,
      fName: "James",
      surName:"De Sena",
      userName: "Kaoru",
      passWord: "123",
      contactNum: 123,
      country: "Philippines",
      eMail: "test@hotmail.com",
      accType: "Client"
    }
  ];

  const {data, isLoading, isError} = useQuery("userRegs", getAllData);
  console.log(data)

  return (
    <div className='w-[80%] mx-auto my-[3rem] border-2 border-blue-100 shadow-md shadow-gray-400 rounded-lg'>
      <h1 className='p-6 text-center flex-1 text-2x1 font-bold text-gray-700'>Display</h1>
      <div className='text-right mr-10'>
        <button className='button text-sm px-4'>
         <Link to={'/registration'}> Register Now!</Link>
        </button>
      </div>
      <div className='p-4 lg:p-7 flex items-center flex-wrap gap-5 w-[95%]'>
        {data1.map((register, i) => (
          <Register register={register} key={i}/>
        ))}
      </div>
    </div>
  );
};

export default Reg;
