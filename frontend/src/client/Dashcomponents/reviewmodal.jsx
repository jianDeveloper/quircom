import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ReviewModal = ({requestInfos, setreviewModal}) => {
  const [rating, setRating] = useState();
  const [hover, setHover] = useState();
  const [formData, setFormData] = useState({
    feedbackNum: "",
    feedbackInfo: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingClick = (index) => {
    setRating(index);
    setFormData((prevFormData) => ({
      ...prevFormData,
      feedbackNum: index,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!formData.feedbackNum) {
      toast.error.taskTitle = "Please input ratings";
      return;
    }
    if (formData.feedbackInfo.length === 0) {
      toast.error.taskDetails = "Please include feedback message";
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.patch(
        `https://quircom.onrender.com/api/request/feedback/${requestInfos._id}`,
        formData, {headers}
      );

      if (response && response.data) {
        toast.success("Feedback submitted successfully");
        setreviewModal(false)
      } else {
        toast.error("Failed to submit feedback");
      }
    } catch (error) {
      console.error("Error during patch ", error.response);
      toast.error("Failed to submit feedback");
    }
  };
  return (
    <div>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none cursor-default"
        style={{ background: "rgba(0,0,0,0.2)" }}
      >
        <div className="relative w-2/6 my-6 mx-auto">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full text-black bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 bg-orange-500 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl text-white text-center font-semibold">
                Review
              </h3>
            </div>
            {/* Creating Form */}
            <form className="w-full max-w-screen-ss mx-auto" onSubmit={handleSubmit}>
              <div className="relative flex flex-col overflow-y-auto max-h-[400px] px-6 py-4">
                <div className="space-y-6">
                  <label
                    htmlFor="rate"
                    className="block text-md font-extrabold text-gray-700 pb-1 border-b border-gray-300"
                  >
                    Rate
                  </label>
                  <div className="flex justify-center items-center cursor-default">
                    {[...Array(5)].map((star, index) => {
                      index += 1;
                      return (
                        <button
                          type="button"
                          key={index}
                          value={formData.feedbackNum}
                          className={
                            index <= (hover || rating)
                              ? "text-yellow-500 gap-4"
                              : "text-gray-300 gap-4"
                          }
                          onChange={handleChange}
                          onClick={() => handleRatingClick(index)}
                          onMouseEnter={() => setHover(index)}
                          onMouseLeave={() => setHover(rating)}
                        >
                          <span className="text-[40px] mr-2" >&#9733;</span>
                        </button>
                      );
                    })}
                  </div>
                  <label
                    htmlFor="feedbackInfo"
                    className="block mt-4 text-md font-extrabold text-gray-700 pb-1 border-b border-gray-300"
                  >
                    Leave a comment:
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="feedbackInfo"
                      name="feedbackInfo"
                      value={formData.feedbackInfo}
                      onChange={handleChange}
                      rows={4}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 px-3 py-2"
                    />
                  </div>

                  <div className="flex flex-row justify-between gap-12">
                    <div className="w-[50%]">
                      <label
                        htmlFor="freelancerId"
                        className="block mt-4 text-md font-extrabold text-gray-700 pb-1 border-b border-gray-300"
                      >
                        Review to:
                      </label>
                      <div className="mt-1 flex px-3 py-2">
                        <input
                          type="text"
                          id="freelancerId"
                          name="freelancerId"
                          value={`${requestInfos?.serviceId?.freelancerId.firstName + " " + requestInfos?.serviceId?.freelancerId?.surName}`}
                          disabled
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm p-2 shadow-sm border border-gray-300"
                        />
                      </div>
                    </div>
                    <div className="w-[50%]"></div>
                  </div>
                </div>
              </div>

              {/* Add Close Button and Add Button */}
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setreviewModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                >
                  Rate
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default ReviewModal;
