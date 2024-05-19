import React, { useState } from "react";
import { Link } from "react-router-dom";
import WithoutAuth from "../auth/WithoutAuth";

function Terms() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isChecked) {
      console.log("Form submitted successfully!");
    } else {
      alert("Please accept the terms and conditions.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm z-[5] overflow-auto ease-in-out duration-1000">
      <div>
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[beige] w-[700px] px-[20px] py-[30px] rounded-[10px] shadow-[2px_2px_5px_5px_rgba(0,0,0,0.15)] border-solid border-[1px] border-black">
          <div className="flex-inline justify-center h-full items-center w-full">
            <h1 className="text-center mx-[20px] mt-[10px] text-[20px] text-[#1D5B79] font-extrabold drop-shadow-xl">
              Terms and Conditions
            </h1>
            <form onSubmit={handleFormSubmit}>
              <p className="text-center mx-[20px] mt-[20px] text-[15px] font-bold">
                Welcome to Quircom!{" "}
              </p>
              <p className="text-center mx-[20px] mt-[20px] text-[15px] font-bold">
                If you continue to browse and use this website, you are agreeing
                to comply with and be bound by the following terms and
                conditions of use:
              </p>
              <li className="text-justify mx-[20px] mt-[20px] text-[13px]">
                The content of the pages of this website is for your general
                information and use only. It is subject to change without
                notice.{" "}
              </li>
              <li className="text-justify mx-[20px] mt-[20px] text-[13px]">
                This website uses cookies to monitor browsing preferences.
              </li>
              <li className="text-justify mx-[20px] mt-[20px] text-[13px]">
                Your use of any information or materials on this website is
                entirely at your own risk, for which we shall not be liable.{" "}
              </li>
              <li className="text-justify mx-[20px] mt-[20px] text-[13px]">
                This website contains material which is owned by or licensed to
                us. This material includes, but is not limited to, the design,
                layout, look, appearance, and graphics.
              </li>
              <li className="text-justify mx-[20px] mt-[20px] text-[13px]">
                Unauthorized use of this website may give rise to a claim for
                damages and/or be a criminal offense.
              </li>
              <li className="text-justify mx-[20px] mt-[20px] text-[13px]">
                From time to time, this website may also include links to other
                websites. These links are provided for your convenience to
                provide further information. They do not signify that we endorse
                Quircom. We have no responsibility for the content of the linked
                website.
              </li>
              <li className="text-justify mx-[20px] mt-[20px] text-[13px]">
                Your use of this website and any dispute arising out of such use
                of the website is subject to the laws of Philippines.
              </li>
              <div className="mt-3"></div>

              <Link to={"/registration"}>
                <button
                  className="bg-[#FE6D30] w-[150px] ml-[250px] mt-[20px] text-white p-2 rounded-full hover:bg-[#1D5B79] focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                  type="submit"
                >
                  I agree
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WithoutAuth(Terms);
