import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import phil from "philippine-location-json-for-geer";
import { ToastContainer, toast } from "react-toastify";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

import { Spinner } from "@material-tailwind/react";

import BGreg from "../assets/bgreg.png";
import logo2 from "../assets/Icon2.png";

import WithoutAuth from "../auth/WithoutAuth";

const Reg = () => {
  const sortedRegions = phil.regions.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    surName: "",
    userName: "",
    eMail: "",
    passWord: "",
    contactNum: "",
    region: "",
    province: "",
    city: "",
    accType: "",
    aggRee: false,
  });

  const [invalidFields, setInvalidFields] = useState({});
  const [filteredProvinces, setFilteredProvinces] = useState([]);
  const [filteredCity, setFilteredCity] = useState([]);
  const [regionCode, setRegionCode] = useState("");
  const [provinceCode, setProvinceCode] = useState("");
  const [cityCode, setCityCode] = useState("");

  const formRef = useRef(null);

  const [profilePic, setProfile] = useState();

  const [showPassword, setShowPassword] = useState(false); // New state to track password visibility

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleImage = (e) => {
    setProfile(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let trimmedValue = value;

    if (name === "userName" || name === "eMail" || name === "passWord") {
      trimmedValue = value.trim();
    }

    if (name === "region") {
      setRegionCode(value);
      const regionProvinces = phil.getProvincesByRegion(value);
      setFilteredProvinces(regionProvinces);

      setProvinceCode("");
      setCityCode("");
      setFilteredCity([]);
    }
    if (name === "province") {
      setProvinceCode(value);
      const provincesCity = phil.getCityMunByProvince(value);
      setFilteredCity(provincesCity);
    }
    if (name === "city") {
      setCityCode(value);
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
      region: name === "region" ? value : formData.region,
      province: name === "province" ? value : formData.province,
      city: name === "city" ? value : formData.city,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInvalidFields({});
  
    const errors = {};
    if (formData.firstName.trim().length === 0) {
      errors.firstName = "Please input your first name";
    }
    if (formData.surName.trim().length === 0) {
      errors.surName = "Please input your last name";
    }
    if (formData.userName.trim().length === 0) {
      errors.userName = "Please input your username";
    }
    if (formData.passWord.length === 0) {
      errors.passWord = "Please input your password";
    }
    if (!formData.contactNum || isNaN(formData.contactNum)) {
      errors.contactNum = "Contact number must be a valid number";
    } else if (formData.contactNum.length !== 10) {
      errors.contactNum = "Contact number must be 11 digits";
    }
    if (!formData.eMail.includes("@")) {
      errors.eMail = "Please enter a valid email address";
    }
    if (!formData.region) {
      errors.region = "Please select a region";
    }
    if (!formData.province) {
      errors.province = "Please select a province";
    }
    if (!formData.city) {
      errors.city = "Please select a city";
    }
    if (!formData.accType) {
      errors.accType = "Please select an account type";
    }
    if (!formData.aggRee) {
      errors.aggRee = "Please agree to the terms and conditions";
    }
    if (
      !profilePic ||
      !(
        profilePic.type.startsWith("image/jpeg") ||
        profilePic.type.startsWith("image/jpg") ||
        profilePic.type.startsWith("image/png")
      )
    ) {
      errors.profilePic = "Please add a picture";
    }
  
    try {
      const response = await axios.post(
        `https://quircom.onrender.com/api/auth/validate`,
        {
          userName: formData.userName,
          eMail: formData.eMail,
          contactNum: formData.contactNum,
        }
      );
  
      const data = response.data;
  
      if (data.userName.exists) {
        errors.userName = "Username is already taken";
      }
      if (data.eMail.exists) {
        errors.eMail = "Email is already registered";
      }
      if (data.contactNum.exists) {
        errors.contactNum = "Contact number is already registered";
      }
    } catch (error) {
      console.error("Error validating data:", error);
    }
  
    setInvalidFields(errors);
  
    if (Object.keys(errors).length > 0) {
      return;
    }
  
    try {
      setLoading(true);
  
      const formObject = new FormData();
      formObject.append("file", profilePic);
  
      const endpoint = formData.accType === "client" ? "client" : "freelancer";
      formObject.append(endpoint, JSON.stringify(formData));
  
      const response = await axios.post(
        `https://quircom.onrender.com/api/${endpoint}/upload`,
        formObject,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      setRegionCode("");
      setFilteredProvinces([]);
      setProvinceCode("");
      setFilteredCity([]);
      setCityCode("");
      setFormData({
        firstName: "",
        surName: "",
        userName: "",
        eMail: "",
        passWord: "",
        contactNum: "",
        region: "",
        province: "",
        city: "",
        accType: "",
        aggRee: false,
      });
      formRef.current.reset();
  
      const { result, emailToken } = response.data;
      localStorage.setItem("verifyToken", emailToken);
  
      toast.success("Registration successful!", {
        autoClose: 1000,
        onClose: async () => {
          setTimeout(async () => {
            try {
              const verifyResponse = await axios.post(
                "https://quircom.onrender.com/api/auth/verify",
                { eMail: formData.eMail }
              );
              localStorage.setItem("verifyToken", emailToken);
              navigate(`/verify/${result._id}`);
            } catch (error) {
              console.error("Error during verification request:", error);
            }
          }, 1000);
        },
      });
    } catch (error) {
      toast.error("Error during registration");
      console.error("Error during registration ", error.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <section className="">
      <ToastContainer />
      <div
        className="flex xl:none xl:justify-start mb-[200px] md:mb-0 justify-center"
        style={{
          background: `url(${BGreg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="flex flex-col mt-[30px] mb-10 xl:mx-[80px] md:h-auto~ bg-[beige] bg-opacity-80 md:bg-[beige] w-screen md:w-[650px] px-[20px] py-[30px] rounded-[10px] md:shadow-[2px_2px_5px_5px_rgba(0,0,0,0.15)]">
          <h2 className="text-center mx-[20px] mb-[-20px] text-[30px] text-[#1D5B79] font-extrabold drop-shadow-xl">
            Create Account
          </h2>
          <div className="container mx-auto mt-8">
            <form
              ref={formRef}
              className="w-full max-w-screen-ss mx-auto"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col md:flex-row md:justify-center -mx-3">
                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label
                    htmlFor="firstName"
                    className="block text-[#1D5B79] text-sm font-bold mb-2"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full text-[14px] p-3 border rounded ${
                      invalidFields.firstName ? "border-red-500" : ""
                    }`}
                    placeholder="Enter your first name"
                  />
                  {invalidFields.firstName && (
                    <p className="text-red-500 text-[12px]">
                      {invalidFields.firstName}
                    </p>
                  )}
                </div>
                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label
                    htmlFor="lastName"
                    className="block text-[#1D5B79] text-sm font-bold mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="surName"
                    value={formData.surName}
                    onChange={handleChange}
                    className={`w-full text-[14px] p-3 border rounded ${
                      invalidFields.surName ? "border-red-500" : ""
                    }`}
                    placeholder="Enter your last name"
                  />
                  {invalidFields.surName && (
                    <p className="text-red-500 text-[12px]">
                      {invalidFields.surName}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:justify-center -mx-3">
                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label
                    htmlFor="Username"
                    className="block text-[#1D5B79] text-sm font-bold mb-2"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    className={`w-full text-[14px] p-3 border rounded ${
                      invalidFields.userName ? "border-red-500" : ""
                    }`}
                    placeholder="Enter your username"
                  />
                  {invalidFields.userName && (
                    <p className="text-red-500 text-[12px]">
                      {invalidFields.userName}
                    </p>
                  )}
                </div>
                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label
                    htmlFor="password"
                    className="block text-[#1D5B79] text-sm font-bold mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"} // Toggle between text and password
                      id="password"
                      name="passWord"
                      value={formData.passWord}
                      onChange={handleChange}
                      className={`w-full text-[14px] p-3 border rounded ${
                        invalidFields.passWord ? "border-red-500" : ""
                      }`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      tabIndex="-1" // Add tabIndex="-1" here
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {invalidFields.passWord && (
                    <p className="text-red-500 text-[12px]">
                      {invalidFields.passWord}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:justify-center -mx-3">
                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label
                    htmlFor="contactNum"
                    className="block text-[#1D5B79] text-sm font-bold mb-2"
                  >
                    Contact Number
                  </label>
                  <div className="relative">
                    <div className="absolute left-0 inset-y-[.80rem] text-center pl-3 pointer-events-none text-[14px]">
                      +63
                    </div>
                    <input
                      type="tel"
                      id="contactNum"
                      name="contactNum"
                      value={formData.contactNum}
                      onChange={handleChange}
                      className={`w-full text-[14px] pl-12 p-3 border rounded ${
                        invalidFields.contactNum ? "border-red-500" : ""
                      }`}
                      placeholder="Enter your contact number"
                      maxLength="10"
                      pattern="\d*"
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^\d]/g, ""); // Ensure only numbers are input
                      }}
                    />
                    {invalidFields.contactNum && (
                      <p className="text-red-500 text-[12px]">
                        {invalidFields.contactNum}
                      </p>
                    )}
                  </div>
                </div>

                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label
                    htmlFor="region"
                    className="block text-[#1D5B79] text-sm font-bold mb-2"
                  >
                    Region
                  </label>
                  <select
                    id="region"
                    name="region"
                    value={regionCode}
                    onChange={handleChange}
                    className={`w-full p-3 text-[14px] border rounded ${
                      invalidFields.region ? "border-red-500" : ""
                    }`}
                  >
                    <option value="">Select Region</option>
                    {sortedRegions.map((region, index) => (
                      <option
                        key={`${region.reg_code}-${index}`}
                        value={region.reg_code}
                      >
                        {region.name}
                      </option>
                    ))}
                  </select>
                  {invalidFields.region && (
                    <p className="text-red-500 text-[12px]">
                      {invalidFields.region}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:justify-center -mx-3">
                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label
                    htmlFor="province"
                    className="block text-[#1D5B79] text-sm font-bold mb-2"
                  >
                    Province
                  </label>
                  <select
                    id="province"
                    name="province"
                    value={provinceCode}
                    onChange={handleChange}
                    className={`w-full p-3 text-[14px] border rounded ${
                      invalidFields.province ? "border-red-500" : ""
                    }`}
                  >
                    <option value="">Select Province</option>
                    {filteredProvinces.map((province, index) => (
                      <option
                        key={`${province.prov_code}-${index}`}
                        value={province.prov_code}
                      >
                        {province.name}
                      </option>
                    ))}
                  </select>
                  {invalidFields.province && (
                    <p className="text-red-500 text-[12px]">
                      {invalidFields.province}
                    </p>
                  )}
                </div>
                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label
                    htmlFor="city"
                    className="block text-[#1D5B79] text-sm font-bold mb-2"
                  >
                    City
                  </label>
                  <select
                    id="city"
                    name="city"
                    value={cityCode}
                    onChange={handleChange}
                    className={`w-full p-3 text-[14px] border rounded ${
                      invalidFields.city ? "border-red-500" : ""
                    }`}
                  >
                    <option value="">Select City</option>
                    {filteredCity.map((city, index) => (
                      <option
                        key={`${city.mun_code}-${index}`}
                        value={city.mun_code}
                      >
                        {city.name}
                      </option>
                    ))}
                  </select>
                  {invalidFields.city && (
                    <p className="text-red-500 text-[12px]">
                      {invalidFields.city}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:justify-center -mx-3">
                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label
                    htmlFor="eMail"
                    className="block text-[#1D5B79] text-sm font-bold mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="eMail"
                    name="eMail"
                    value={formData.eMail}
                    onChange={handleChange}
                    className={`w-full text-[14px] p-3  border rounded ${
                      invalidFields.eMail ? "border-red-500" : ""
                    }`}
                    placeholder="Enter your email"
                  />
                  {invalidFields.eMail && (
                    <p className="text-red-500 text-[12px]">
                      {invalidFields.eMail}
                    </p>
                  )}
                </div>
                <div className="w-full md:w-1/2 px-3 mb-3">
                  <label
                    htmlFor="accountType"
                    className="block text-[#1D5B79] text-sm font-bold mb-2"
                  >
                    Account Type
                  </label>
                  <select
                    id="accountType"
                    name="accType"
                    value={formData.accType}
                    onChange={handleChange}
                    className={`w-full p-3 text-[14px] border rounded ${
                      invalidFields.accType ? "border-red-500" : ""
                    }`}
                  >
                    <option value="">Select Account Type</option>
                    <option value="client">Client</option>
                    <option value="freelancer">Freelancer</option>
                  </select>
                  {invalidFields.accType && (
                    <p className="text-red-500 text-[12px]">
                      {invalidFields.accType}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:justify-center -mx-3">
                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label
                    htmlFor="Pic"
                    className="block text-[#1D5B79] text-sm font-bold mb-2"
                  >
                    Upload Profile Pic
                  </label>
                  <input
                    type="file"
                    id="profilePic"
                    name="profilePic"
                    value={formData.profilePic}
                    onChange={handleImage}
                    accept="image/png, image/jpeg, image/jpg"
                    className={`w-full text-[14px] p-3  border rounded ${
                      invalidFields.profilePic ? "border-red-500" : ""
                    }`}
                    placeholder="Pic"
                  />
                  {invalidFields.profilePic && (
                    <p className="text-red-500 text-[12px]">
                      {invalidFields.profilePic}
                    </p>
                  )}
                </div>
              </div>

              <div className="m-6">
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    id="agree"
                    name="aggRee"
                    checked={formData.aggRee}
                    onChange={handleChange}
                    className={`mr-2 ${
                      invalidFields.aggRee ? "border-red-500" : ""
                    }`}
                  />
                  <label htmlFor="agree" className="text-[14px]">
                    I agree to the{" "}
                    <Link to="/terms" className="text-[#1D5B79] font-medium">
                      <u>terms and conditions</u>
                    </Link>
                  </label>
                </div>
                {invalidFields.aggRee && (
                  <p className="text-red-500 text-[12px] text-center">
                    {invalidFields.aggRee}
                  </p>
                )}
              </div>
              <div className="flex justify-center">
                {loading ? (
                  <button className="bg-[#FE6D30] w-[150px] text-white p-2 rounded-full hover:bg-[#EA580C] hover:w-[155px] focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                    <Spinner className="inline-block mr-2 text-white-500" />
                    <span className="inline-block">Processing...</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-[#FE6D30] w-[150px] text-white p-2 rounded-full hover:bg-[#EA580C] hover:w-[155px] focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                  >
                    Get Started
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        <div>
          <img
            className="hidden top-[25%] xl:flex absolute left-[62%] h-[400px] translate-x-[-0%] mx-auto"
            src={logo2}
          />
        </div>
      </div>
    </section>
  );
};

export default WithoutAuth(Reg);
