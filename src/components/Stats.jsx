import React from 'react'
import styles from "../styles";

const Stats =()=>{
    return(
        <div className={`${styles.flexCenter} w-full my-6`}>
            <div className='max-w-[1240px] mx-auto flex1 flex justify-start items-center '> 
                <h4 className='font-semibold md:text-4xl sm:text-3xl text-2xl text-[#1D5B79] px-4'>3600+</h4>
                <p className='font-semibold sm:text-[20px] text-[15px] md:leading-[26px] leading-[21px] text-orange-600'>Daily User Active</p>
                <h4 className='font-semibold sm:text-[40px] text-[30px] md:leading-[53px] leading-[43px] text-[#1D5B79] px-4'>200+</h4>
                <p className='font-semibold sm:text-[20px] text-[15px] md:leading-[26px] leading-[21px] text-orange-600'>Partners</p>
                <h4 className='font-semibold sm:text-[40px] text-[30px] md:leading-[53px] leading-[43px] text-[#1D5B79] px-4'>$1000+</h4>
                <p className='font-semibold sm:text-[20px] text-[15px] md:leading-[26px] leading-[21px] text-orange-600'>Revenue</p>
            </div>         
        </div>
    )
}
export default Stats