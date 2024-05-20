import React from "react";
import { Link } from 'react-router-dom';

import Stats from "./Stats";
import Services from "./Services";
import Subscription from "./Subscription";
import Newsletter from "./Newsletter";

import Mascot from "../assets/icon00.png";
import WithoutAuth from "../auth/WithoutAuth";


const Hero = () => {
  return (
    <div className=" bg-beige overflow-hidden">
      <section className="mx-auto mt-[-50px] h-full px-4 py-28 md:py-40 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
        <div className="flex flex-col items-center justify-between lg:flex-row">
          <div className="mx-5 md:mx-0">
            <div className="lg:max-w-xl lg:pr-5">
              <p className="flex text-sm uppercase text-[#1D5B79]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1 inline h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                    clipRule="evenodd"
                  />
                </svg>
                An online platform for high growth freelancers
              </p>
              <h2 className="mb-6 max-w-lg text-5xl font-bold leading-snug tracking-tight text-[#1D5B79] sm:text-7xl sm:leading-snug">
                Multi-<span className="text-orange-600">Service</span> Provider
              </h2>
              <p className="text-base text-[#13334C]">
                Quircom is always on the lookout for like-minded visionaries and
                businesses eager to make their mark in the world.
              </p>
            </div>
            <div className="mt-10 flex flex-col items-center md:flex-row">
              <Link
                to={'/registration'}
                className="mb-3 inline-flex h-12 w-full items-center justify-center rounded bg-gradient-to-bl from-orange-400 to-orange-600 px-6 font-medium tracking-wide text-white shadow-md transition md:mr-4 md:mb-0 md:w-auto focus:outline-none hover:bg-gradient-to-br "
              >
                Try for free
              </Link>
              <a
                href="#services"
                aria-label=""
                className="group inline-flex items-center font-semibold text-[#13334C]"
              >
                Learn more!
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="group-hover:translate-x-2 ml-4 h-6 w-6 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="relative hidden lg:ml-32 lg:block lg:w-1/2">
            <div className="bg-orange-400 w-fit rounded-[6rem] mx-auto overflow-hidden rounded-tl-none rounded-br-none shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] bg-gradient-to-tr from-sky-600 to-sky-800 p-6">
              <div className="flex w-96 flex-wrap">
                <img src={Mascot} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
        <Services />
        <Stats />
        <Subscription />
        <Newsletter />
      </div>
      </section>
      
    </div>
  );
};
export default WithoutAuth(Hero);
