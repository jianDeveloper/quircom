import React from 'react'
import styles from "../styles";

const Stats =()=>{
    return(
        <div className="lg:col-span-3 justify-center h-[75%] text-xl xl:text-sm flex flex-wrap">
            <div className='max-w-[1240px] flex1 flex items-center my-6'> 
                <h4 className='font-semibold md:text-6xl sm:text-3xl text-4xl text-[#1D5B79] px-4'>30<span className='text-[2rem] align-middle'>+</span></h4>
                <p className='font-semibold sm:text-[25px] text-[30px] md:leading-[26px] leading-[21px] text-orange-600'>Users</p>
            </div>
            <div className='max-w-[1240px] flex1 flex items-center my-6'>
                <h4 className='font-semibold md:text-6xl sm:text-3xl text-4xl text-[#1D5B79] px-4'>10<span className='text-[2rem] align-middle'>+</span></h4>
                <p className='font-semibold sm:text-[25px] text-[30px] md:leading-[26px] leading-[21px] text-orange-600'>Partners</p>
            </div>
            <div className='max-w-[1240px] flex1 flex items-center my-6'>
                <h4 className='font-semibold md:text-6xl sm:text-3xl text-4xl text-[#1D5B79] px-4'>$200<span className='text-[2rem] align-middle'>+</span></h4>
                <p className='font-semibold sm:text-[25px] text-[30px] md:leading-[26px] leading-[21px] text-orange-600'>Transactions</p>
            </div>
                  
        </div>
    )
}
export default Stats