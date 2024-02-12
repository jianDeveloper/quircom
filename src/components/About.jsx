import React from 'react'
import styles from "../styles";

const About = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-extrabold ss:text-[72px] text-[52px] text-[#1D5B79] ss:leading-[100.8px] leading-[75px]">
            Multi-{" "}
            <span className="text-orange-600">Service</span>{" "}
          </h1>
        </div>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Quircom is always on the lookout for like-minded visionaries and businesses eager to make their mark in the world.
        </p>
      </div>
    </section> 
  )
  }
export default About