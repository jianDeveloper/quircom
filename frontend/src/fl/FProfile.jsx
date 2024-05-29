import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import phil from "philippine-location-json-for-geer";

import NavHeader from "./FMainNav";
import FFooter from "./FFooter";
import { FaStar } from "react-icons/fa6";

import "./profile.css";
import "tailwindcss/tailwind.css";
import avatar from "../assets/avatar.png";

import BG1 from "../assets/bg1.png";
import WithAuth from "../auth/WithAuth";

function FProfile() {
  const { userId } = useParams();
  const [userData, setUsers] = useState(null);

  //console.log(userId)
  //console.log('Display User:', userData)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const response = await axios.get(
          `https://quircom.onrender.com/api/freelancer/${userId}`,
          { headers }
        );
        if (response.status === 200) {
          setUsers(response.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div
      className=""
      style={{
        background: `url(${BG1})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <NavHeader />
      <div className="flex">
        <main className="flex-inline mx-10 my-10 w-[100%] md:mx-[300px]">
          <div className="userInfo">
            <div className="pictureBorder p-5">
              {userData && userData.hasOwnProperty("profilePic") ? (
                <img
                  className="profilePicture"
                  src={userData.profilePic.link}
                  alt="Profile Picture"
                />
              ) : (
                <img
                  className="profilePicture"
                  src={avatar}
                  alt="Profile Picture"
                /> // Render a default avatar if profilePic is not available
              )}
            </div>
            <div className="profileDetail w-[500px] ">
              <div className="">
                {userData && (
                  <>
                    <h4 className="font-extrabold text-[30px] text-[#1D5B79] my-1">
                      {userData.firstName} {userData.surName}
                    </h4>
                    <strong className="text-[15px] text-[#1D5B79] my-1">
                      @{userData.userName}{" "}
                      <FaStar className="inline-block ml-1 mt-[-2px]" />
                      <span className="bg-gradient-to-tl px-3.6 text-xs rounded-1.8 py-2.2 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-[#1D5B79]">
                        {userData.ratings !== null ? userData.ratings : 0}
                      </span>
                    </strong>
                  </>
                )}
              </div>
            </div>
            <div className="profileSettings">
              <button
                onClick={() => setNav(false)}
                className="py-2 px-3 m-auto text-center font-bold"
              >
                <Link
                  to={`/freelancer/settings/${userId}`}
                  className="buttonSettings text-white bg-[#1D5B79]"
                >
                  Manage Profile
                </Link>
              </button>
              {userData && userData.portFolio && (
                <button
                  className="buttonSettings py-2 px-3 m-auto text-center font-bold text-[#1D5B79] bg-[#F5F5DC]"
                  onClick={() => {
                    if (userData.portFolio?.link) {
                      window.open(userData.portFolio.link, "_blank");
                    }
                  }}
                  disabled={!userData.portFolio?.link}
                >
                  View Portfolio
                </button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 p-10 bg-[#F5F5DC] rounded-md border-2 border-orange-600">
            {userData && (
              <>
                <div className="text-inline border-r-2 border-gray-300 p-10">
                  <strong className="mx-9 text-[#13334c] text-[23px]">
                    Personal Information
                  </strong>

                  <p className="mx-9 my-2 text-[#13334c] text-[15px]">
                    Email: {userData.eMail}{" "}
                  </p>
                  <p className="mx-9 my-2 text-[#13334c] text-[15px]">
                    Contact Number: {userData.contactNum}{" "}
                  </p>
                  <p className="mx-9 my-2 text-[#13334c] text-[15px]">
                    Address:{" "}
                    {
                      phil.city_mun.find(
                        (city) => city.mun_code === userData.city
                      )?.name
                    }
                    ,{" "}
                    {
                      phil.provinces.find(
                        (province) => province.prov_code === userData.province
                      )?.name
                    }
                    ,{" "}
                    {
                      phil.regions.find(
                        (region) => region.reg_code === userData.region
                      )?.name
                    }{" "}
                  </p>
                </div>
                <div className="text-inline border-l-2 border-gray-300 p-10">
                  <strong className="mx-9 text-[#13334c] text-[23px]">
                    {" "}
                    About{" "}
                  </strong>
                  {userData.userInfo ? (
                    <p className="mx-9 my-2 text-[#13334c] text-[15px]">
                      {userData.userInfo}
                    </p>
                  ) : (
                    <p className="mx-9 my-2 text-[#13334c] text-[15px]">
                      Hello, I am {userData.firstName} {userData.surName}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
      <div className="flex">
        <FFooter />
      </div>
    </div>
  );
}

export default WithAuth(FProfile);
