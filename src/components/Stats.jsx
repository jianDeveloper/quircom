import React from 'react'
import styles from "../styles";

const Stats =()=>{
    return(
        <div className={`${styles.flexCenter} h-[2rem] my-6`}>
            <div className='max-w-[1240px] flex1 flex items-center'> 
                <h4 className='font-semibold md:text-4xl sm:text-3xl text-2xl text-[#1D5B79] px-4 mr-6'>3600+</h4>
                <p className='font-semibold sm:text-[20px] text-[15px] md:leading-[26px] leading-[21px] text-orange-600'>Daily User Active</p>
                <h4 className='font-semibold sm:text-[40px] text-[30px] md:leading-[53px] leading-[43px] text-[#1D5B79] px-4 ml-20 mr-6'>200+</h4>
                <p className='font-semibold sm:text-[20px] text-[15px] md:leading-[26px] leading-[21px] text-orange-600'>Partners</p>
                <h4 className='font-semibold sm:text-[40px] text-[30px] md:leading-[53px] leading-[43px] text-[#1D5B79] px-4 ml-32 mr-6'>$1000+</h4>
                <p className='font-semibold sm:text-[20px] text-[15px] md:leading-[26px] leading-[21px] text-orange-600'>Revenue</p>
            </div>         
        </div>
    )
}
export default Stats