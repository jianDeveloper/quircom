import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Spinner } from "@material-tailwind/react";

import BGreg from "../assets/bgreg.png";
import { Avatar } from "@mui/material";
import Icon1 from "../assets/icon00.png";
import WithoutAuthAdmin from "../auth/WithoutAuthAdmin";

const ALogPage = () => {
  const [userName, setUserName] = useState("");
  const [passWord, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const trimmedUserName = userName.trim();
      const trimmedPassWord = passWord.trim();
  
      setLoading(true);
  
      const response = await axios.post(
        "https://quircom.onrender.com/api/auth/login-admin",
        {
          admin: trimmedUserName, // Send 'admin' instead of 'userName'
          password: trimmedPassWord, // Send 'password' instead of 'passWord'
        }
      );
  
      // Handle the response from the server
      if (response.status === 200) {
        const { authToken, user } = response.data;
        const { _id } = user;
  
        setLoading(false);
        localStorage.setItem("adminToken", authToken);
        navigate(`/admin/dashboard/${_id}`);
      } else {
        // Handle other status codes (e.g., 404 for user not found, 401 for invalid password)
        setError(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  if (!open) return null;

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
              htmlFor=""
              className="flex justify-center items-center gap-1 mt-4 text-2xl text-center uppercase font-bold "
            >
              <Avatar src={Icon1} alt={'Avatar'} sx={{ width: 100, height: 100 }} /> Quircom<br/>Management
            </label>
            <h1 className="text-md font-bold mt-4 text-center ">Admin Login</h1>
            <form method="#" action="#" className="mt-4">
              <div>
                <input
                  type="text"
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter Username"
                  className="mt-1 px-2 text-[#1D5B79] block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>
              <div className="mt-7">
                <input
                  type="passWord"
                  id="passWord"
                  value={passWord}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter password"
                  className="mt-1 px-2 text-[#1D5B79] block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <div className="mt-7 flex text-white">
                <label
                  htmlFor="remember_me"
                  className="inline-flex items-center w-full cursor-pointer"
                >
                  <input
                    id="remember_me"
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    name="remember"
                  />
                  <span className="ml-2 text-sm text-white">Remember me</span>
                </label>

                <div className="w-full text-right">
                  <a
                    className="underline text-sm text-gray-100 hover:text-gray-900"
                    href="#"
                  >
                    Forgot Password
                  </a>
                </div>
              </div>
              <div className="mt-7">
              {loading ? (
                <button
                  onClick={handleLogin}
                  className=" bg-[#FE6D30] hover:bg-[#EA580C] w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105 "
                >
                  <Spinner className="inline-block mr-2 text-white-500"/>
                  <span className="inline-block">Processing...</span>
                </button>
              ) : (
              <button 
                onClick={handleLogin}
                className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                 Login
                </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithoutAuthAdmin(ALogPage);
