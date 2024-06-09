import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import NavHeader from "./FMainNav";
import Profile from "../assets/profile.jpg";
import WithAuth from "../auth/WithAuth";
import { FaStar } from "react-icons/fa6";
import Loader from "../assets/quircomloading.gif";
import BGSubs from "../assets/icon00.png";
import { FaFilter } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";

function FRank() {
  const [freelancers, setFreelancers] = useState([]); // State to hold the freelancer data
  const [serviceDetails, setService] = useState([]);
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [userData, setUsers] = useState();
  const [filterTab, setFilterTab] = useState("");
  const [selectedServiceType, setSelectedServiceType] = useState(null);
  const [showSubcategories, setShowSubcategories] = useState(false);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

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

  const subcategories = {
    Animation: [
      "2D Animation",
      "3D Animation",
      "Motion Graphics",
      "Whiteboard Animation",
      "Stop Motion",
      "Character Animation",
      "Explainer Videos",
      "Logo Animation",
      "Product Animation",
      "Visual Effects",
    ],
    "Graphic Design": [
      "Logo Design",
      "Illustration",
      "UI/UX Design",
      "Banner Design",
      "Brochure Design",
      "Business Card Design",
      "Flyer Design",
      "Infographic Design",
      "Packaging Design",
      "Print Design",
    ],
    "Graphic Motion": [
      "Animated Logos",
      "Title Sequences",
      "Promotional Videos",
      "Social Media Videos",
      "Corporate Videos",
      "Event Videos",
      "Training Videos",
      "Demo Videos",
      "Music Videos",
    ],
    "Software Development": [
      "Web Apps",
      "Mobile Apps",
      "Desktop Apps",
      "Game Development",
      "API Development",
      "Database Design",
      "E-commerce Development",
      "Software Testing",
      "DevOps",
      "System Integration",
    ],
    "Web Development": [
      "Frontend Development",
      "Backend Development",
      "Full Stack Development",
      "WordPress Development",
      "Shopify Development",
      "Web Optimization",
      "Web Maintenance",
      "Web Security",
    ],
  };

  const handleFilter = (type) => {
    setSelectedServiceType(type);
    setFilterTab(type ? "Filter" : "");
    setShowSubcategories(false);
  };
  const handleFilterTab = () => {
    setShowSubcategories(!showSubcategories);
  };

  const handleRemoveFilter = () => {
    setSelectedSubCategories([]);
  };

  return (
    <div className="relative flex flex-col w-full min-w-0 mb-0 break-words border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
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
              To connect our exclusive services and discover top talent for your
              unique projects, subsribe now. Join us and gain access to a world
              of opportunities tailored just for you!
            </p>
            <Link to={`/client/subscribe/${userId}`}>
              <div className="mx-auto w-1/2 relative rounded-lg shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] bg-gradient-to-tr from-sky-600 to-sky-800 p-6 ">
                <button className="text-white font-bold text-2xl">
                  Go to Subscription!
                </button>
                <img
                  className="max-w-full h-auto rounded-lg transition-transform duration-300 hover:rotate-12"
                  src={BGSubs}
                  alt="Quircom Motion"
                />
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center mt-[60px] mx-4 md:mx-[100px] font-extrabold  text-[#1D5B79] gap-6">
            <h6 className="text-[30px]">LEADERBOARD</h6>
            <div>
              <div className="flex space-x-3 justify-center w-full ">
                {selectedServiceType && (
                  <button
                    onClick={handleFilterTab}
                    className="flex items-center justify-center px-2 py-1 border-2 border-[#1D5B79] text-[#1D5B79] rounded-md"
                  >
                    <FaFilter />
                    <IoFilter />
                  </button>
                )}
                <button
                  onClick={() => handleFilter(null)}
                  className="px-4 py-1 bg-[#1D5B79] hover:bg-[#2069A3] text-white rounded-md"
                >
                  All
                </button>
                {Object.keys(subcategories).map((category) => (
                  <button
                    key={category}
                    onClick={() => handleFilter(category)}
                    className="px-4 py-1 bg-[#1D5B79] hover:bg-[#2069A3] text-white rounded-md"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            {showSubcategories && selectedServiceType && (
              <>
                <div className="bg-white px-4 py-2 mt-2 grid grid-cols-4 gap-2 rounded-lg border-[1px] shadow-sm">
                  {subcategories[selectedServiceType]?.map((subcat) => (
                    <label key={subcat} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="serviceSubCat"
                        value={subcat}
                        checked={selectedSubCategories.includes(subcat)}
                        onChange={(e) => {
                          const { checked } = e.target;
                          if (checked) {
                            setSelectedSubCategories((prevSubCategories) => [
                              ...prevSubCategories,
                              subcat,
                            ]);
                          } else {
                            setSelectedSubCategories((prevSubCategories) =>
                              prevSubCategories.filter(
                                (category) => category !== subcat
                              )
                            );
                          }
                        }}
                        className="form-checkbox"
                      />
                      <span className="ml-2">{subcat}</span>
                    </label>
                  ))}
                  <div className="col-span-4 flex justify-end px-4">
                    <button
                      className="bg-blue-100 px-2 rounded-md border-[1px] border-[#1D5B79] hover:bg-blue-200"
                      onClick={handleRemoveFilter}
                    >
                      Remove Filter
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="flex-auto px-0 pt-0 pb-2 mx-4 md:mx-[100px]">
            <div className="p-0 overflow-x-auto">
              <table className="items-center w-full mb-0 align-top border-gray-200 text-[#1D5B79]">
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
                    .filter((freelancer) => {
                      // Filter the freelancers based on the selected service type
                      if (selectedServiceType) {
                        return serviceDetails.some(
                          (service) =>
                            service?.freelancerId?._id === freelancer._id &&
                            service.serviceType === selectedServiceType
                        );
                      }
                      return true; // If no service type is selected, include all freelancers
                    })
                    .sort((a, b) => {
                      // Sorting logic remains the same as before
                      const ratingA = a.ratings !== null ? a.ratings : 0;
                      const ratingB = b.ratings !== null ? b.ratings : 0;
                      if (ratingA === ratingB) {
                        const serviceCountA = serviceDetails
                          .filter(
                            (service) => service?.freelancerId?._id === a._id
                          )
                          .flatMap((service) =>
                            service?.requestId?.map(
                              (request) => request?.feedbackNum
                            )
                          ).length;
                        const serviceCountB = serviceDetails
                          .filter(
                            (service) => service?.freelancerId?._id === b._id
                          )
                          .flatMap((service) =>
                            service?.requestId?.map(
                              (request) => request?.feedbackNum
                            )
                          ).length;
                        return serviceCountB - serviceCountA;
                      }
                      return ratingB - ratingA;
                    })
                    .map((freelancer, index) => (
                      <tr key={index}>
                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                          <div className="flex px-2 py-1">
                            <div>
                              <Link
                                to={`/client/view-profile/${userId}/${freelancer._id}`}
                              >
                                <img
                                  src={freelancer.profilePic?.link || Profile}
                                  alt="Profile"
                                  className="inline-flex items-center justify-center mr-4 text-white transition-all duration-200 ease-soft-in-out text-sm h-10 w-10 rounded-xl"
                                />
                              </Link>
                            </div>
                            <div className="flex flex-col justify-center">
                              <Link
                                to={`/client/view-profile/${userId}/${freelancer._id}`}
                                className="text-[#1D5B79] hover:text-[#1D5B79] transition-colors duration-300"
                              >
                                <h6 className="mb-0 font-semibold leading-normal text-sm">
                                  {freelancer.firstName +
                                    " " +
                                    freelancer.surName}
                                </h6>
                              </Link>
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
                                    service?.freelancerId?._id ===
                                    freelancer._id
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
                          <span className="bg-gradient-to-tl px-3.6 text-xs rounded-1.8 py-2.2 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-[#1D5B79]">
                            {freelancer.ratings !== null
                              ? freelancer.ratings
                              : 0}
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
        </>
      )}
    </div>
  );
}

export default WithAuth(FRank);
