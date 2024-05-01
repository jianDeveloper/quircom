import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddBillModal = ({ setbillModal }) => {
  const [expDate, setExpDate] = useState('');
  
  const handleInputDate = (event) => {
    let value = event.target.value;
    // Remove all characters that are not numbers or slashes
    value = value.replace(/[^0-9/]/g, '');
    // Automatically add a slash after MM if not yet present and length reaches 2
    if (value.length === 2 && value.indexOf('/') === -1) {
      value += '/';
    }
    // Limit the length of the input to 7 (MM/YYYY)
    value = value.slice(0, 7);

    setExpDate(value);
  };
  const [cvv, setCvv] = useState('');

    const handleInputCVV = (e) => {
        const value = e.target.value;
        // Check if the input value is numeric and does not exceed 3 characters
        if (value.match(/^\d{0,3}$/)) {
            setCvv(value);
        }
    };

  // State to manage checkbox checked status
  const [isChecked, setIsChecked] = useState(true); // Initially set to true to match the original HTML

  // Function to toggle the checkbox state
  const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
  };

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
                  <label class="text-[#1d5b79] font-bold"> First Name </label>
                  <input type="text" placeholder="First Name" class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" />
                </div>
                <div>
                  <label class="text-[#1d5b79] font-bold"> Last Name </label>
                  <input type="text" placeholder="Last  Name" class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" />
                </div>
              </div>
              
              
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label class="block text-sm font-bold text-[#1d5b79]">Card Number</label>
                    <input type="number" placeholder="Enter your card number" id="number" name="number" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" />
                </div>
                <div>
                  <label className="block text-[#1D5B79] text-sm font-bold mb-2">
                    Exp Date
                  </label>
                  <input
                    type="text"
                    id="Date"
                    name="Date"
                    className="w-full p-2 border rounded bg-gray-100 px-3"
                    placeholder="MM/YYYY"
                    value={expDate}
                    onChange={handleInputDate}
                  />
                </div>
                <div>
                    <label className="block text-sm font-bold text-[#1d5b79]">CVV</label>
                    <input 
                        type="text" 
                        placeholder="CVV" 
                        value={cvv} 
                        onChange={handleInputCVV} 
                        className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                    />
                </div>
              </div>


              <div className="checkbox">
                  <input
                      type="checkbox"
                      id="checkbox1"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                  />
                  <label htmlFor="checkbox1 text-[#1d5b79]">
                      I agree to the <a href="#" target="_blank" rel="noopener noreferrer" className="text-blue-600">Terms and Conditions</a>
                  </label>
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
                onClick={linkData}
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
