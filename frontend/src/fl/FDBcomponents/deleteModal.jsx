import React from "react";
import axios from "axios";
import WithAuth from "../../auth/WithAuth";

const deleteModal = ({ serviceInfos, setDeleteModal }) => {
  const deleteUser = async (serviceInfos) => {
    try {
      const token = localStorage.getItem("authToken");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.delete(
        `https://quircom.onrender.com/api/service/delete/${serviceInfos._id}`,
        { headers }
      );
      if (response.status === 200) {
        setDeleteModal(false);
        // console.log("User deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <div className="fixed inset-0 z-10 bg-black bg-opacity-[0.25]"></div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-md">
        <div className="relative w-1/3 my-6 mx-auto">
          <div className="border-0 rounded-lg relative flex flex-col w-full bg-white">
            <div className="relative flex flex-col bg-white border-2 rounded-t-lg ">
              <div className="flexitems-start justify-between p-5 bg-[#1d5b79] border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl text-white text-center font-semibold">
                  Confirmation
                </h3>
              </div>

              <p className="text-base leading-relaxed py-6 px-8 text-center">
                Are you sure you like to <b>DELETE</b> this service?
              </p>
              <i className="px-8 text-xs text-left">
                Note: This action will removed your service from the marketplace
                permanently
              </i>

              {/* Add Close Button and Add Button */}
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-emerald-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => deleteUser(serviceInfos)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithAuth(deleteModal);
