import React from "react";
import { Link } from "react-router-dom";

import BGreg from "../assets/bgreg.png";
import { Avatar } from "@mui/material";
import Icon1 from "../assets/icon00.png";
const ALogPage = () => {
  return (
    <div
      className="font-poppins"
      style={{
        background: `url(${BGreg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="relative min-h-screen flex flex-col sm:justify-center sm:flex sm:flex-col justify-center items-center mx-[30px]">
        <div className="relative sm:max-w-sm w-full sm:items-center">
          <div className="w-[100%] h-[100%] bg-blue-500 border-[1px] border-[#1D5B79] rounded-3xl absolute transform shadow-lg -rotate-6" />
          <div className="w-[100%] h-[100%] bg-orange-500 border-[1px] border-[#1D5B79] rounded-3xl absolute transform shadow-lg rotate-6" />
          <div className="relative w-full rounded-3xl  px-6 py-6 bg-[#1D5B79] text-white shadow-lg">
            <label
              for=""
              className="flex justify-center items-center gap-1 mt-4 text-2xl text-center uppercase font-bold "
            >
              <Avatar src={Icon1} alt={Avatar} sx={{ width: 100, height: 100 }} /> Quircom<br/>Management
            </label>
            <h1 className="text-md font-bold mt-4 text-center ">Admin Login</h1>
            <form method="#" action="#" className="mt-4">
              <div>
                <input
                  type="email"
                  placeholder="Username"
                  className="mt-1 px-2 text-[#1D5B79] block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>
              <div className="mt-7">
                <input
                  type="password"
                  placeholder="Password"
                  className="mt-1 px-2 text-[#1D5B79] block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>
              <div className="mt-7 flex text-white">
                <label
                  for="remember_me"
                  className="inline-flex items-center w-full cursor-pointer"
                >
                  <input
                    id="remember_me"
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    name="remember"
                  />
                  <span class="ml-2 text-sm text-white">Remember me</span>
                </label>

                <div class="w-full text-right">
                  <a
                    class="underline text-sm text-gray-100 hover:text-gray-900"
                    href="#"
                  >
                    Forgot Password
                  </a>
                </div>
              </div>
              <div class="mt-7">
              <Link to="/admin"><button className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                 Login
                </button></Link> 
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ALogPage;
