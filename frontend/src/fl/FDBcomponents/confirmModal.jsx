import React, { useState } from "react";
import WithAuth from "../../auth/WithAuth";
import axios from "axios";

const ConfirmModal = ({ setConfirmModal, requestInfos }) => {
  const handleSubmit = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      await axios.patch(
        `https://quircom.onrender.com/api/request/verify/${id}`,
        {
          status: "Complete",
        },
        { headers }
      );
    } catch (error) {
      console.error("Error during completion: ", error.response);
    }
  };

  console.log("RAWRAR:", requestInfos);
  return (
    <div>
      <div className="fixed inset-0 z-10 bg-black bg-opacity-[0.30]"></div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-md">
        <div className="relative w-1/3 my-6 mx-auto">
          <div className="border-0 rounded-lg relative flex flex-col w-full bg-white">
            <div className="relative flex flex-col bg-white border-2 rounded-t-lg ">
              <div className="flex items-start justify-between p-5 bg-[#1d5b79] border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl text-white text-center font-semibold">
                  Confirmation
                </h3>
              </div>

              <p className="text-base leading-relaxed py-6 px-8 text-center">
                Would you like to mark this project as <b>COMPLETE</b>?
              </p>
              <i className="px-8 text-xs text-left">
                Note: This action will make the product on hold until the
                payment is released
              </i>

              {/* Add Close Button and Add Button */}
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setConfirmModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {
                    handleSubmit(requestInfos._id);
                    setConfirmModal(false);
                  }}
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithAuth(ConfirmModal);
