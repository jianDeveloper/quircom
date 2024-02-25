import React from 'react'
import logo1 from '../assets/Icon1.png'

const Login = ({open, onClose}) => {
    if(!open) return null
  return (
    <div className='fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm ease-in-out duration-1000'>
        
    <div className='loginContainer'>
        <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[beige] w-[400px] px-[20px] py-[30px] rounded-[10px] shadow-[2px_2px_5px_5px_rgba(0,0,0,0.15)] border-solid border-[1px] border-black'>
            <div on onClick={onClose} className='absolute top-[10px] right-[20px] cursor-pointer w-[10px] h-[10px] text-gray-800 text-center font-semibold text-[20px] ease-in-out duration-1000'>&times;</div>
        <div className='flex-inline justify-center items-center w-full'>
          <h2 className='text-center mx-[20px] mt-[10px] text-[30px] text-[#1D5B79] font-extrabold drop-shadow-xl'>Welcome to</h2>
          <img className='h-[70px] mx-auto' src={logo1}/>
            <div className='mt-[10px]'>
                <label form='email' className='text-[16px] font-medium'>Email</label>
                <input className= 'block mt-[5px] w-[100%] px-[20px] py-[10px] outline-none rounded-[20px] bg-[#163646] text-white' type='text' id='email' placeholder='Enter email'></input>
            </div>
            <div className='mt-[10px]'>
                <label form='password'className='text-[16px] font-medium'>Password</label>
                <input className= 'block mt-[5px] w-[100%] px-[20px] py-[10px] outline-none rounded-[20px] bg-[#163646] text-white' type='password' id='password' placeholder='Enter password'></input>
            </div>
            <div className='text-right mr-2'>
                <a className='text-[12px] font-medium' href='#'>Forgot password?</a>
            </div>
            <div className='mt-[30px] text-center'>
                <button className='font-bold px-[30px] py-[10px] boreder-none outline-none text-[16px] bg-orange-600 text-white rounded-full'>Login</button>
            </div>
            <div className='mt-[60px]'>
                <hr className='border-1 border-gray-400' />
                <span className='text-[12px] font-medium'>Don't have an account? <a className='pl-2 text-[#1D5B79]' href='#'>Sign up</a></span>
            </div>
        </div>
         </div>
        </div>
    </div>
  )
}

export default Login