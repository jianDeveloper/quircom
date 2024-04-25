import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavHeader from './FMainNav';
import Profile from '../assets/profile.jpg';
import WithAuth from '../auth/WithAuth';

function FRank() {
  const [freelancers, setFreelancers] = useState([]); // State to hold the freelancer data

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        // Using the provided API endpoint to fetch all freelancers
        const response = await axios.get('https://quircom.onrender.com/api/freelancer', {headers});
        if (response.status === 200) {
          setFreelancers(response.data); // Assuming the response data is an array of freelancers
        }
      } catch (error) {
        console.error('Error fetching freelancers:', error);
        // Optionally, you can handle errors more gracefully in your UI here  
      }
    };

    fetchFreelancers();
  }, []);

  return (
    <div className="relative flex flex-col w-full min-w-0 mb-0 break-words border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
      <div>
        <NavHeader />
      </div>
      <div className="mt-[60px] ml-[150px] mr-[150px] font-extrabold text-[30px] text-[#1D5B79]">
        <h6>LEADERBOARD</h6>
      </div>
      <div className="flex-auto px-0 pt-0 pb-2 mx-[150px]">
        <div className="p-0 overflow-x-auto">
          <table className="items-center w-full mb-0 align-top border-gray-200 text-[#1D5B79]">
            <thead className="align-bottom">
              <tr>
                <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-orange-500 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-[#1D5B79] opacity-100">Freelancers</th>
                <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-orange-500 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-[#1D5B79] opacity-100">Jobs</th>
                <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-orange-500 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-[#1D5B79] opacity-100">Rating</th>
                <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-orange-500 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-[#1D5B79] opacity-100">Portfolio</th>
              </tr>
            </thead>
            <tbody>
              {freelancers.map((freelancer, index) => (
                <tr key={index}>
                  <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                    <div className="flex px-2 py-1">
                      <div>
                        <img
                          src={freelancer.profilePic || Profile}
                          alt="Profile"
                          className="inline-flex items-center justify-center mr-4 text-white transition-all duration-200 ease-soft-in-out text-sm h-10 w-10 rounded-xl"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h6 className="mb-0 font-semibold leading-normal text-sm text-[#1D5B79]">
                          {freelancer.name}
                        </h6>
                        <p className="mb-0 leading-tight text-xs text-slate-500">
                          {freelancer.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                    <p className="mb-0 font-semibold leading-tight text-sm text-[#1D5B79]">
                      {freelancer.jobTitle}
                    </p>
                  </td>
                  <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap shadow-transparent">
                    <span className="bg-gradient-to-tl px-3.6 text-xs rounded-1.8 py-2.2 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-[#1D5B79]">
                      {`${freelancer.rating}%`}
                    </span>
                  </td>
                  <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                    <span className="font-semibold leading-tight text-xs text-slate-500">
                      {freelancer.portfolioDate}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default WithAuth(FRank);
