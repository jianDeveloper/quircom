import React from 'react'

const Login = ({open, closeLogin}) => {
    if(!open) return null
  return (
    <div className='overlay'>
    <div className='loginContainer'>
        <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[beige] w-[400px] px-[20px] py-[30px] rounded-[10px] shadow-[2px_2px_5px_5px_rgba(0,0,0,0.15)] border-solid border-[1px] border-black'>
            <div on onClick={closeLogin} className='absolute top-[10px] right-[20px] cursor-pointer w-[10px] h-[10px] text-gray-800 text-center font-semibold text-[20px]'>&times;</div>
                <div className='form'>
          <h2 className='text-center mx-[20px] my-[10px] text-[22px] font-extrabold drop-shadow-xl'>Welcome to</h2>
            <div className='mt-[10px]'>
                <label form='email' className='text-[16px] font-medium'>Email</label>
                <input className= 'block mt-[5px] w-[100%] p-[10px] outline-none border-solid-[1px] rounded-[5px]' type='text' id='email' placeholder='Enter email'></input>
            </div>
            <div className='mt-[10px]'>
                <label form='password'className='text-[16px] font-medium'>Password</label>
                <input className= 'block mt-[5px] w-[100%] p-[10px] outline-none border-solid-[1px] rounded-[5px]' type='password' id='password' placeholder='Enter password'></input>
            </div>
            <div className='mt-[10px]'>
                <input className='mr-[10px]' type='checkbox' id='remember-me' placeholder='Enter password'></input>
                <label form='remember-me' className='text-[16px] font-medium'>Remember me</label>
            </div>
            <div className='mt-[10px]'>
                <button className='font-bold w-[150px] h-[30px] boreder-none outline-none text-[16px] bg-orange-600 text-white rounded-full'>Sign in</button>
            </div>
            <div className='mt-[10px]'>
                <a href='#'>Forgot password?</a>
            </div>
        </div>
         </div>
        </div>
    </div>
  )
}

export default Login