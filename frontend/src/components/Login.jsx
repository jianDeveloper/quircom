import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/UserContext";

import logo1 from "../assets/Icon1.png";
import WithoutAuth from "../auth/WithoutAuth";
import { Spinner } from "@material-tailwind/react";

const Login = ({ open, onClose }) => {
  const [userName, setUserName] = useState("");
  const [passWord, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // const { login } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const trimmedUserName = userName.trim();
      const trimmedPassWord = passWord.trim();

      setLoading(true);

      const response = await axios.post(
        "https://quircom.onrender.com/api/auth/login",
        {
          userName: trimmedUserName,
          passWord: trimmedPassWord,
        }
      );

      if (response.status === 200) {
        const { authToken, emailToken } = response.data;
        const { _id, accType } = response.data.user;
        if (accType === "client") {
          // login(_id);
          setLoading(false);
          localStorage.setItem("authToken", authToken);
          localStorage.setItem("verifyToken", emailToken);
          navigate(`/client/dashboard/${_id}`);
        } else if (accType === "freelancer") {
          // login(_id);
          setLoading(false);
          localStorage.setItem("authToken", authToken);
          localStorage.setItem("verifyToken", emailToken);
          navigate(`/freelancer/dashboard/${_id}`);
        }
      }
      // Here you can handle the successful login, such as setting user data in state or redirecting the user
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
    <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm z-[5] ease-in-out duration-1000">
      <div>
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[beige] w-[400px] px-[20px] py-[30px] rounded-[10px] shadow-[2px_2px_5px_5px_rgba(0,0,0,0.15)] border-solid border-[1px] border-black">
          <div
            onClick={onClose}
            className="absolute top-[10px] right-[20px] cursor-pointer w-[10px] h-[10px] text-gray-800 text-center font-semibold text-[20px] ease-in-out duration-1000"
          >
            &times;
          </div>
          <div className="flex-inline justify-center items-center w-full">
            <h2 className="text-center mx-[20px] mt-[10px] text-[30px] text-[#1D5B79] font-extrabold drop-shadow-xl">
              Welcome to
            </h2>
            <img className="h-[70px] mx-auto" src={logo1} alt="Logo" />
            <div className="mt-[10px]">
              <label htmlFor="userName" className="text-[16px] font-medium">
                Username
              </label>
              <input
                className="block mt-[5px] w-[100%] px-[20px] py-[10px] outline-none rounded-[20px] bg-[#163646] text-white"
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter Username"
              />
            </div>
            <div className="mt-[10px]">
              <label htmlFor="passWord" className="text-[16px] font-medium">
                Password
              </label>
              <input
                className="block mt-[5px] w-[100%] px-[20px] py-[10px] outline-none rounded-[20px] bg-[#163646] text-white"
                type="passWord"
                id="passWord"
                value={passWord}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter password"
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="text-right mr-2">
              <Link to="/forgot" className="text-[12px] font-medium">
                Forgot password?
              </Link>
            </div>
            <div className="mt-[30px] text-center">
              {loading ? (
                <button
                  onClick={handleLogin}
                  className="bg-[#FE6D30] w-[150px] text-white p-2 rounded-full hover:bg-[#EA580C] hover:w-[155px] focus:outline-none focus:shadow-outline-blue active:bg-blue-800 "
                >
                  <Spinner className="inline-block mr-2 text-white-500"/>
                  <span className="inline-block">Processing...</span>
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="bg-[#FE6D30] w-[150px] text-white p-2 rounded-full hover:bg-[#EA580C] hover:w-[155px] focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                >
                  Login
                </button>
              )}
            </div>
            <div className="mt-[60px]">
              <hr className="border-1 border-gray-400" />
              <span className="text-[12px] font-medium">
                Don't have an account ?{" "}
                <Link
                  to={"/registration"}
                  onClick={onClose}
                  className="pl-2 text-[#1D5B79]"
                >
                  Sign up
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithoutAuth(Login);
