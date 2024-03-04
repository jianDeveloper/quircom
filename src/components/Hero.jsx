import React from 'react'
import Mascot from '../assets/mascot.png'
import styles from '../styles'

const Hero = () => {
  return (
    <section className={`flex md:flex-row flex-col h-screen ${styles.paddingY}`}>
      <div className={`${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-extrabold ss:text-[72px] text-[65px] text-[#1D5B79] ss:leading-[100.8px] leading-[75px]">
            Multi-{" "}
            <span className="text-orange-600">Service</span>{" "}
          </h1>
        </div>
        <h1 className="font-poppins font-extrabold ss:text-[68px] text-[65px] text-[#1D5B79] ss:leading-[100.8px] leading-[75px] w-full">
          Provider.
        </h1>
        <p className={`${styles.paragraph} max-w-[470px] mt-5 mb-5`}>
          Quircom is always on the lookout for like-minded visionaries and businesses eager to make their mark in the world.
        </p>
        <div className={`${styles.flexCenter} w-[150px] h-[50px] p-[2px] m-[20px]`}>
          <div className={`${styles.flexCenter} flex-col bg-orange-600 w-[100%] h-[100%] rounded-full cursor-pointer`}>
            <div className={`${styles.flexStart} flex-row`}>
              <p className="font-poppins font-bold text-[18px] text-white leading-[23.4px]">
                <a href='#' className="text-gradient">Learn more!</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr className='border-[#1D5B79] border-2 flex w-full'/>
      <div className={'hidden md:flex'}>
        <img src={Mascot}  className="w-[40%]  right-0 top-[0] absolute z-[-5]" />
      </div>
      <div className={`flex-1 flex ${styles.flexCenter} md:hidden my-10 relative`}>
        <img src={Mascot}  className="w-[80%] absolute top-0 right-0 z-[-5]" />
      </div>
      </div>
      </div>
    </section>
  )
  }
export default Hero