import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import phil from "philippine-location-json-for-geer";
import { FaStar } from "react-icons/fa6";

import NavHeader from "./CMainNav";
import CFooter from "./CFooter";
import "./profile.css";
import "tailwindcss/tailwind.css";
import avatar from "../assets/avatar.png";
import BG1 from "../assets/bg1.png";
import Loader from "../assets/quircomloading.gif";
import WithAuth from "../auth/WithAuth";

const CViewProfile = () => {
  const { userId } = useParams();
  const { viewId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true); // Set loading state to true
      const token = localStorage.getItem("authToken");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
  
      try {
        let response = await axios.get(
          `https://quircom.onrender.com/api/freelancer/${viewId}`,
          { headers }
        );
  
        if (response.status === 200) {
          // If freelancer data is found, setUserData and return
          setUserData(response.data);
          setLoading(false); // Set loading state to false
          return;
        }
      } catch (error) {
        // If freelancer API call fails, proceed to try client API
        console.error("Error fetching freelancer data:", error);
      }
  
      try {
        // Attempt to fetch data from client API
        const response = await axios.get(
          `https://quircom.onrender.com/api/client/${viewId}`,
          { headers }
        );
  
        if (response.status === 200) {
          setUserData(response.data);
        } else {
          // Handle other non-successful status codes from client API
          console.error("Error fetching user data from client API. Status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching user data from client API:", error);
      } finally {
        setLoading(false); // Set loading state to false
      }
    };
  
    fetchUserData();
  }, [viewId]); // Depend on viewId instead of userId
  
  useEffect(() => {
    if(viewId === userId){
      navigate(`/client/profile/${userId}`, {replace: true});
    }
  })
  
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
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <img src={Loader} alt="Loading..." style={{ height: "100px" }} />
        </div>
      ) : userData?.accType === "freelancer" ? (
        <div className="flex">
          <main className="flex-inline my-10 w-[100%] md:mx-[100px] lg:mx-[300px]">
            <div className="userInfo flex-auto justify-center">
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
                <div className="flex flex-col justify-center text-center lg:text-left ">
                  {userData && (
                    <>
                      <h4 className="font-extrabold text-[30px] text-[#1D5B79] my-1 md:mx-0">
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
                {userData && userData.portFolio && (
                  <button
                    className="buttonSettings py-2 px-3 m-auto text-center font-bold text-white bg-[#1D5B79]"
                    onClick={() =>
                      window.open(userData.portFolio?.link, "_blank")
                    }
                    disabled={!userData.portFolio?.link}
                  >
                    View Portfolio
                  </button>
                )}
              </div>
            </div>
            <div className="grid lg:grid-cols-2 p-10 bg-[#F5F5DC] rounded-md border-2 border-orange-600">
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
                      Contact Number: +63 {userData.contactNum}{" "}
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
      ) : (
        <div className="flex">
          <main className="flex-inline my-10 w-[100%] md:mx-[100px] lg:mx-[300px]">
            <div className="userInfo flex-auto justify-center">
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
                <div className="flex flex-col justify-center text-center lg:text-left ">
                  {userData && (
                    <>
                      <h4 className="font-extrabold text-[30px] text-[#1D5B79] my-1 md:mx-0">
                        {userData.firstName} {userData.surName}
                      </h4>
                      <strong className="text-[15px] text-[#1D5B79] my-1">
                        @{userData.userName}
                      </strong>
                    </>
                  )}
                </div>
              </div>
              <div className="profileSettings">

              </div>
            </div>
            <div className="grid lg:grid-cols-2 p-10 bg-[#F5F5DC] rounded-md border-2 border-orange-600">
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
                      Contact Number: +63 {userData.contactNum}{" "}
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
      )}
      <div className="flex">
        <CFooter />
      </div>
    </div>
  );
};

export default WithAuth(CViewProfile);
