import React from "react";

const AddServiceModal = ({ setaddModal }) => {
  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-2/4 my-6 mx-auto">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flexitems-start justify-between p-5 bg-[#1d5b79] border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl text-white text-center font-semibold">
                Add Services
              </h3>
            </div>

            {/* Creating Form */}
            <div className="relative flex flex-col p-6 gap-4">
              <label
                htmlFor="title"
                className="block text-md font-extrabold text-gray-700 pb-1 border-b border-gray-300"
              >
                Service Title
              </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="mt-1 relative rounded-md shadow-sm border border-gray-300 px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
                />
              <label
                htmlFor="description"
                className="block mt-4 text-md font-extrabold text-gray-700 pb-1 border-b border-gray-300"
              >
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 px-3 py-2"
                />
              </div>
              <div className="flex flex-row justify-between gap-12">
                <div className="w-[50%]">
                  <label
                    htmlFor="price"
                    className="block mt-4 text-md font-extrabold text-gray-700 pb-1 border-b border-gray-300"
                  >
                    Price
                  </label>
                  <div className="mt-1 flex px-3 py-2">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                      PHP
                    </span>
                    <input
                      type="text"
                      id="price"
                      name="price"
                      pattern="[0-9]*"
                      inputMode="numeric"
                      className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-r-md sm:text-sm p-2 shadow-sm border border-gray-300"
                    />
                  </div>
                </div>
                <div className="w-[50%]">
                  <label
                    htmlFor="sampleProduct"
                    className="block mt-4 text-md font-extrabold text-gray-700 pb-1 border-b border-gray-300"
                  >
                    Add Sample Product
                  </label>
                  <div className="relative mt-1">
                    <input
                      type="file"
                      id="sampleProduct"
                      name="sampleProduct"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full border border-gray-300 px-3 py-2"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Add Close Button and Add Button */}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setaddModal(false)}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setaddModal(false)}
              >
                Add Service
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default AddServiceModal;
