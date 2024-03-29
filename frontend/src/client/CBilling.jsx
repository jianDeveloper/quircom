import React from 'react'



const Billing = () => {
  return (
    <section className="">
        
    <div className='p-10'>
        
        <h2 className='text-center mx-[20px] mt-[10px] text-[30px] text-[#1D5B79] font-extrabold drop-shadow-xl'>Billing</h2>
        <form className="w-full max-w-screen-ss mx-auto">
        <div className="flex flex-col md:flex-row md:justify-center -mx-3">
            <div className="w-full md:w-1/2 px-3 mb-4">
                  <label htmlFor="fullName" className="block text-[#1D5B79] text-sm font-bold mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className="w-full text-[12px] p-3 border rounded"
                    placeholder="Enter your full name"
                  />
             </div>
             <div className="w-full md:w-1/2 px-3 mb-4">
                  <label htmlFor="address" className="block text-[#1D5B79] text-sm font-bold mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="w-full text-[12px] p-3 border rounded"
                    placeholder="Enter your address"
                  />
                  
                </div>
            </div>
            <div className="flex flex-col md:flex-row md:justify-center -mx-3">
                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label htmlFor="Username" className="block text-[#1D5B79] text-sm font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="w-full text-[12px] p-3 border rounded"
                    placeholder="Enter your email address"
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label htmlFor="password" className="block text-[#1D5B79] text-sm font-bold mb-2">
                    Contact No.
                  </label>
                  <input
                    type="text"
                    id="number"
                    name="number"
                    className="w-full p-3 border rounded text-[12px]"
                    placeholder="Enter your contact number"
                  />
                </div>
         </div>
              <hr className='border-[#1D5B79] border-2 flex md:flex w-[100%]'/>
        <div>
        <div className="w-full md:w-1/2 mb-3 mt-3">
                  <label htmlFor="accountType" className="block text-[#1D5B79] text-sm font-bold mb-2">
                    Payment Method
                  </label>
                  <select
                    id="paymentmethod"
                    name="paymentmethod"
                    className="w-[600px] p-2 rounded-md" 
                  >
                    <option value="freelancer">Debit Card</option>
                    <option value="client">Credit Card</option>
                    <option value="client">E-Cash</option>
                  </select>
                </div>
        </div>
        <div>
        <div className="flex flex-col md:flex-row md:justify-center -mx-3">
                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label htmlFor="Username" className="block text-[#1D5B79] text-sm font-bold mb-2">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className="w-full text-[12px] p-3 border rounded"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label htmlFor="password" className="block text-[#1D5B79] text-sm font-bold mb-2">
                    Card Number
                  </label>
                  <input
                    type="digit"
                    id="number"
                    name="number"
                    className="w-full p-3 border rounded text-[12px]"
                    placeholder="Enter your card number"
                  />
                </div>
         </div>
         <div>
            <div className="flex flex-col md:flex-row md:justify-center -mx-3">
                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label htmlFor="Username" className="block text-[#1D5B79] text-sm font-bold mb-2">
                    CVV
                  </label>
                  <input
                    type="number"
                    id="number"
                    name="number"
                    className="w-full text-[12px] p-3 border rounded"
                    placeholder="Enter your cvv"
                  />
                </div>
                
                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label htmlFor="password" className="block text-[#1D5B79] text-sm font-bold mb-2">
                    Exp Date
                  </label>
                  <input
                    type="Date"
                    id="Date"
                    name="Date"
                    className="w-full p-2 border rounded"
                    placeholder="Enter your Exp Date"
                  />
                </div>
                </div>
         </div>
         <div>
         <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-[#FE6D30] w-[150px] text-white p-2 rounded-full hover:bg-[#EA580C] hover:w-[155px] focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                  Subscribe
                </button>
              </div>
         </div>
            
            
        </div>
        
        </form>

       

    </div>
    </section>
  )
}

export default Billing