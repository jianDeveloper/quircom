import React from "react";

const AddBillModal = ({ setbillModal }) => {
  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-2/4 my-6 mx-auto">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flexitems-start justify-between p-5 bg-[#1d5b79] border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl text-white text-center font-semibold">
                Add Billing
              </h3>
            </div>

            {/* Creating Form */}
            <div class="">
              <form class="relative border border-gray-100 space-y-3 max-w-screen-md mx-auto rounded-md bg-white p-6 lg:p-5">

              <div class="grid gap-3 md:grid-cols-2">
                <div> 
                  <label class=""> First Name </label>
                  <input type="text" placeholder="First Name" class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" />
                </div>
                <div>
                  <label class=""> Last Name </label>
                  <input type="text" placeholder="Last  Name" class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" />
                </div>
              </div>
              
              
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Card Number</label>
                    <input type="text" placeholder="Card Number" class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Expiry Date</label>
                    <div class="relative mt-2 bg-gray-100 rounded-md">
                        <input class="peer hidden" type="checkbox" id="select-1" />
                        <label for="select-1" class="flex justify-between items-center h-12 w-full cursor-pointer rounded-md px-3 text-sm text-gray-700 ring-blue-400 peer-checked:ring">
                            Select Option
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600 transition-transform peer-checked:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </label>
                        
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">CVV</label>
                    <input type="text" placeholder="CVV" class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" />
                </div>
            </div>


              <div class="checkbox">
                <input type="checkbox" id="chekcbox1" checked="" />
                <label for="checkbox1">I agree to the <a href="#" target="_blank" class="text-blue-600"> Terms and Conditions </a> </label>
              </div>
            </form>

            </div>

            {/* Add Close Button and Add Button */}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() =>  setbillModal (false)}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() =>  setbillModal (false)}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default AddBillModal;
