import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import NavHeader from "./CMainNav";
import Profile from "../assets/profile.jpg";
import WithAuth from "../auth/WithAuth";
import { FaStar } from "react-icons/fa6";
import Loader from "../assets/quircomloading.gif";
import BGSubs from "../assets/icon00.png";

function CRank() {
  const [freelancers, setFreelancers] = useState([]); // State to hold the freelancer data
  const [serviceDetails, setService] = useState([]);
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [userData, setUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const response = await axios.get(
          `https://quircom.onrender.com/api/client/${userId}`,
          { headers }
        );
        if (response.status === 200) {
          setUsers(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [userId]);

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        // Using the provided API endpoint to fetch all freelancers
        const response = await axios.get(
          "https://quircom.onrender.com/api/freelancer",
          { headers }
        );
        const response2 = await axios.get(
          "https://quircom.onrender.com/api/service",
          { headers }
        );
        if (response.status === 200) {
          setFreelancers(response.data); // Assuming the response data is an array of freelancers
        }
        if (response2.status === 200) {
          setService(response2.data);
        }
      } catch (error) {
        console.error("Error fetching freelancers:", error);
        // Optionally, you can handle errors more gracefully in your UI here
      }
    };

    fetchFreelancers();
  }, []);

  const calculateAverageRating = (feedbackNumArray) => {
    if (!feedbackNumArray || feedbackNumArray.length === 0) return 0;

    const totalFeedbacks = feedbackNumArray.length;
    const totalRating = feedbackNumArray.reduce(
      (acc, feedback) => acc + feedback,
      0
    );
    const averageRating = totalRating / totalFeedbacks;
    return averageRating.toFixed(1);
  };
  return (
    <div className="relative flex flex-col break-words border-transparent border-solid shadow-soft-xl">
      <div>
        <NavHeader />
      </div>
      {loading ? (
          <div className="flex justify-center items-center h-screen">
            <img src={Loader} alt="Loading..." style={{ height: "100px" }} />
          </div>
        ) : userData && userData.subs && userData.subs.status === false ? (
          <div className="m-auto mt-20">
            <div className="mb-20 text-center">
              <div className="mb-4 text-gray-800">
                <h2 className="text-4xl font-bold md:text-5xl md:leading-none">
                  Unlock Our Top Freelancers!
                </h2>
              </div>
              <p className="mx-auto mb-8 max-w-3xl text-gray-800">
                To connect our exclusive services and discover top talent for
                your unique projects, subsribe now. Join us and gain access to a
                world of opportunities tailored just for you!
              </p>
              <div className="mx-auto w-1/2 relative rounded-tl-none rounded-lg shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] bg-gradient-to-tr from-sky-600 to-sky-800 p-6 ">
                <Link to={`/client/subscribe/${userId}`}>
                  <img
                    className="max-w-full h-auto rounded-lg transition-transform duration-300 shadow-lg hover:rotate-12"
                    src={BGSubs}
                    alt="Quircom Motion"
                  />
                </Link>
              </div>
            </div>
          </div>
        ) : (
      <div className="mx-auto justify-center ">
        <h6 className="mt-[60px] font-extrabold text-center text-[30px] text-[#1D5B79]">LEADERBOARD</h6>
      
      <div className="flex justify-center pb-2 w-full">
        <div className="overflow-x-auto">
          <table className="items-center w-full align-top border-gray-200 text-[#1D5B79]">
            <thead className="align-bottom">
              <tr>
                <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-orange-500 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-[#1D5B79] opacity-100">
                  Freelancers
                </th>
                <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-orange-500 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-[#1D5B79] opacity-100">
                  Services
                </th>
                <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-orange-500 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-[#1D5B79] opacity-100">
                  Rating
                </th>
                <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-orange-500 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-[#1D5B79] opacity-100">
                  Portfolio
                </th>
              </tr>
            </thead>
            <tbody>
              {freelancers
                .sort((a, b) => {
                  // Calculate average ratings for freelancer a
                  const avgRatingA = calculateAverageRating(
                    serviceDetails
                      .filter((service) => service?.freelancerId?._id === a._id)
                      .flatMap((service) =>
                        service?.requestId?.map(
                          (request) => request?.feedbackNum
                        )
                      )
                  );
                  // Calculate average ratings for freelancer b
                  const avgRatingB = calculateAverageRating(
                    serviceDetails
                      .filter((service) => service?.freelancerId?._id === b._id)
                      .flatMap((service) =>
                        service?.requestId?.map(
                          (request) => request?.feedbackNum
                        )
                      )
                  );
                  // If theres is equalk ratings
                  if (avgRatingA === avgRatingB) {
                    // Count the number of service
                    const serviceCountA = serviceDetails
                      .filter((service) => service?.freelancerId?._id === a._id)
                      .flatMap((service) =>
                        service?.requestId?.map(
                          (request) => request?.feedbackNum
                        )
                      )
                      .filter((feedback) => feedback !== undefined).length;
                    const serviceCountB = serviceDetails
                      .filter((service) => service?.freelancerId?._id === b._id)
                      .flatMap((service) =>
                        service?.requestId?.map(
                          (request) => request?.feedbackNum
                        )
                      )
                      .filter((feedback) => feedback !== undefined).length;
                    // Sort by number of service feedbacks
                    return serviceCountB - serviceCountA;
                  }
                  // Sort in descending order based on average ratings
                  return avgRatingB - avgRatingA;
                })
                .map((freelancer, index) => (
                  <tr key={index}>
                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                      <div className="flex px-2 py-1">
                        <div>
                          <img
                            src={freelancer.profilePic?.link || Profile}
                            alt="Profile"
                            className="inline-flex items-center justify-center mr-4 text-white transition-all duration-200 ease-soft-in-out text-sm h-10 w-10 rounded-xl"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h6 className="mb-0 font-semibold leading-normal text-sm text-[#1D5B79]">
                            {freelancer.firstName + " " + freelancer.surName}
                          </h6>
                          <p className="mb-0 leading-tight text-xs text-slate-500">
                            {freelancer.eMail}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                      {[
                        ...new Set(
                          serviceDetails
                            .filter(
                              (service) =>
                                service?.freelancerId?._id === freelancer._id
                            )
                            .map((service) => service.serviceType)
                        ),
                      ].map((serviceType, index) => (
                        <p
                          key={index}
                          className="mb-1 font-medium leading-tight text-sm text-[#1D5B79]"
                        >
                          {"• " + serviceType}
                        </p>
                      ))}
                    </td>
                    <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap shadow-transparent">
                      <span className="bg-gradient-to-tl px-3.6  text-xs rounded-1.8 py-2.2 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-[#1D5B79]">
                        {calculateAverageRating(
                          serviceDetails
                            .filter(
                              (service) =>
                                service?.freelancerId?._id === freelancer._id
                            )
                            .flatMap((service) =>
                              service?.requestId?.map(
                                (request) => request?.feedbackNum
                              )
                            )
                        )}
                      </span>
                      <FaStar className="inline-block ml-1 mt-[-2px]" />
                    </td>
                    <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                      <a
                        href={freelancer?.portFolio?.link}
                        className="font-semibold leading-tight text-xs text-slate-500"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <u>VIEW</u>
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
        )}
    </div>
  );
}

export default WithAuth(CRank);
