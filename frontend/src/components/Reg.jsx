import React, { useState, useRef } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import phil from 'phil-reg-prov-mun-brgy'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseURL = import.meta.env.VITE_BASEURL;


import BGreg from '../assets/bgreg.png';
import logo2 from '../assets/Icon2.png';

const Reg = () => {

  // console.log(phil.regions)
  // console.log(phil.regions.find(region => region.reg_code === '04')?.name);
  // console.log(phil.provinces)
  // console.log(phil.provinces.find(provinces=> provinces.prov_code === '1602')?.name);
  // console.log(phil.city_mun)
  // console.log(phil.city_mun.find(city=> city.mun_code === '160201')?.name);

  const sortedRegions = phil.regions.sort((a, b) => a.name.localeCompare(b.name));
  const sortedCityMun = phil.city_mun.sort((a, b) => a.name.localeCompare(b.name));
  const sortedProvinces = phil.provinces.sort((a, b) => a.name.localeCompare(b.name));

  const [formData, setFormData] = useState({
    firstName: '',
    surName: '',
    userName: '',
    eMail: '',
    passWord: '',
    contactNum: '',
    region: '', 
    province: '',
    city: '',
    accType: '',
    aggRee: false,
  });

  const [invalidFields, setInvalidFields] = useState({});
  const [filteredProvinces, setFilteredProvinces] = useState([]);
  const [filteredCity, setFilteredCity] = useState([]);
  const [regionCode, setRegionCode] = useState('');
  const [provinceCode, setProvinceCode] = useState(''); 
  const [cityCode, setCityCode] = useState('');

  const formRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false); // New state to track password visibility

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // console.log(regionCode)
  // console.log(provinceCode)
  // console.log(cityCode)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'region') {
      setRegionCode(value);
      const regionProvinces = phil.getProvincesByRegion(value);
      setFilteredProvinces(regionProvinces);
      
      // Reset province and city dropdowns
      setProvinceCode('');
      setCityCode('');
      setFilteredCity([]);
    }
    if (name === 'province') {
      setProvinceCode(value);
      const provincesCity = phil.getCityMunByProvince(value);
      setFilteredCity(provincesCity);
    }
    if (name === 'city') {
      setCityCode(value);
    }
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
      region: name === 'region' ? value : formData.region,
      province: name === 'province' ? value : formData.province,
      city: name === 'city' ? value : formData.city,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    // Reset invalid fields
    setInvalidFields({});
  
    // Validation checks
    const errors = {};
    if (formData.firstName.length === 0) {
      errors.firstName = 'Please input your first name';
    }
    if (formData.surName.length === 0) {
      errors.surName = 'Please input your last name';
    }
    if (formData.userName.length === 0) {
      errors.userName = 'Please input your username';
    }
    if (formData.passWord.length === 0) {
      errors.passWord = 'Please input your password';
    }
    if (!formData.contactNum || isNaN(formData.contactNum)) {
      errors.contactNum = 'Contact number must be a valid number';
    } else if (formData.contactNum.length !== 11) {
      errors.contactNum = 'Contact number must be 11 digits';
    }
    if (!formData.eMail.includes('@')) {
      errors.eMail = 'Please enter a valid email address';
    }
    if (!formData.region || !formData.province || !formData.city || !formData.accType) {
      errors.region = 'Please select a region';
      errors.province = 'Please select a province';
      errors.city = 'Please select a city';
      errors.accType = 'Please select an account type';
    }
    if (!formData.aggRee) {
      errors.aggRee = 'Please agree to the terms and conditions';
    }
  
    try {
      const response = await axios.post(`${baseURL}/api/users/validate`, {
        userName: formData.userName,
        eMail: formData.eMail,
        contactNum: formData.contactNum,
      });
  
      if (response.data.exists) {
        if (response.data.userNameExists) {
          errors.userName = 'Username is already taken';
        }
        if (response.data.eMailExists) {
          errors.eMail = 'Email is already registered';
        }
        if (response.data.contactNumExists) {
          errors.contactNum = 'Contact number is already registered';
        }
      }
    } catch (error) {
      console.error('Error validating data:', error);
    }
  
    // Set invalid fields state
    setInvalidFields(errors);
  
    // If there are any errors, stop form submission
    if (Object.keys(errors).length > 0) {
      return;
    }
  
    try {
      console.log(formData);
      var formObject = new FormData();
      formObject.append('user', JSON.stringify(formData));
      const response = await axios.post(`${baseURL}/api/users`, formObject, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);

      setRegionCode(''); // Reset region dropdown
      setFilteredProvinces([]); // Reset filtered provinces dropdown
      setProvinceCode(''); // Reset province dropdown
      setFilteredCity([]); // Reset filtered city dropdown
      setCityCode('');

      setFormData({
        firstName: '',
        surName: '',
        userName: '',
        eMail: '',
        passWord: '',
        contactNum: '',
        region: '',
        province: '',
        city: '',
        accType: '',
        aggRee: false,
      });
      formRef.current.reset();
      
      toast.success('Registration successful!');
    } catch (error) {
      console.error('Error during registration: ', error.response);
    }
  };

  return (
    <section className="">
      <ToastContainer />
      <div className="flex xl:none xl:justify-start h-screen mb-[200px] md:mb-0 justify-center" style={{background: `url(${BGreg})`, backgroundRepeat:'no-repeat', backgroundSize:'cover'}}>
        <div className='flex flex-col mt-[60px] xl:ml-[150px] md:h-[775px] bg-[beige] bg-opacity-80 md:bg-[beige] w-screen md:w-[650px] px-[20px] py-[30px] rounded-[10px] md:shadow-[2px_2px_5px_5px_rgba(0,0,0,0.15)]'>
        <h2 className='text-center mx-[20px] mt-[10px] text-[30px] text-[#1D5B79] font-extrabold drop-shadow-xl'>Create Account</h2>
          <div className="container mx-auto mt-8">
            <form ref={formRef} className="w-full max-w-screen-ss mx-auto" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row md:justify-center -mx-3">
                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label htmlFor="firstName" className="block text-[#1D5B79] text-sm font-bold mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full text-[14px] p-3 border rounded ${invalidFields.firstName ? 'border-red-500' : ''}`}
                    placeholder="Enter your first name"
                  />
                  {invalidFields.firstName && <p className="text-red-500 text-[12px]">{invalidFields.firstName}</p>}
                </div>
                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label htmlFor="lastName" className="block text-[#1D5B79] text-sm font-bold mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="surName"
                    value={formData.surName}
                    onChange={handleChange}
                    className={`w-full text-[14px] p-3 border rounded ${invalidFields.surName ? 'border-red-500' : ''}`}
                    placeholder="Enter your last name"
                  />
                  {invalidFields.surName && <p className="text-red-500 text-[12px]">{invalidFields.surName}</p>}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:justify-center -mx-3">
                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label htmlFor="Username" className="block text-[#1D5B79] text-sm font-bold mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    className={`w-full text-[14px] p-3 border rounded ${invalidFields.userName ? 'border-red-500' : ''}`}
                    placeholder="Enter your username"
                  />
                  {invalidFields.userName && <p className="text-red-500 text-[12px]">{invalidFields.userName}</p>}
                </div>
                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label htmlFor="password" className="block text-[#1D5B79] text-sm font-bold mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'} // Toggle between text and password
                      id="password"
                      name="passWord"
                      value={formData.passWord}
                      onChange={handleChange}
                      className={`w-full text-[14px] p-3 border rounded ${invalidFields.passWord ? 'border-red-500' : '' }`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      tabIndex="-1" // Add tabIndex="-1" here
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  {invalidFields.passWord && (
                    <p className="text-red-500 text-[12px]">{invalidFields.passWord}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:justify-center -mx-3">
                <div className="w-full md:w-1/2 px-3 mb-4">
                <label htmlFor="contactNumber" className="block text-[#1D5B79] text-sm font-bold mb-2">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    id="contactNumber"
                    name="contactNum"
                    value={formData.contactNum}
                    onChange={handleChange}
                    className={`w-full text-[14px] p-2.5 border rounded ${invalidFields.contactNum ? 'border-red-500' : ''}`}
                    placeholder="Enter your contact number"
                  />
                  {invalidFields.contactNum && <p className="text-red-500 text-[12px]">{invalidFields.contactNum}</p>}
                </div>
                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label htmlFor="region" className="block text-[#1D5B79] text-sm font-bold mb-2">
                    Region
                  </label>
                  <select
                    id="region"
                    name="region"
                    value={regionCode}
                    onChange={handleChange}
                    className={`w-full p-2 text-[14px] border rounded ${invalidFields.region ? 'border-red-500' : ''}`}>
                    <option value="">Select Region</option>
                    {sortedRegions.map((region, index) => (
                      <option key={`${region.reg_code}-${index}`} value={region.reg_code}>{region.name}</option>
                    ))}
                  </select>
                  {invalidFields.region && <p className="text-red-500 text-[12px]">{invalidFields.region}</p>}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:justify-center -mx-3">
                <div className="w-full md:w-1/2 px-3 mb-4">
                    <label htmlFor="province" className="block text-[#1D5B79] text-sm font-bold mb-2">
                      Province
                    </label>
                    <select
                      id="province"
                      name="province"
                      value={provinceCode}
                      onChange={handleChange}
                      className={`w-full p-2 text-[14px] border rounded ${invalidFields.province ? 'border-red-500' : ''}`}>
                      <option value="">Select Province</option>
                      {filteredProvinces.map((province, index) => (
                        <option key={`${province.prov_code}-${index}`} value={province.prov_code}>{province.name}</option>
                      ))}
                    </select>
                    {invalidFields.province && <p className="text-red-500 text-[12px]">{invalidFields.province}</p>}
                </div>
                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label htmlFor="city" className="block text-[#1D5B79] text-sm font-bold mb-2">
                    City
                  </label>
                  <select
                    id="city"
                    name="city"
                    value={cityCode}
                    onChange={handleChange}
                    className={`w-full p-2 text-[14px] border rounded ${invalidFields.city ? 'border-red-500' : ''}`}>
                    <option value="">Select City</option>
                    {filteredCity.map((city, index) => (
                      <option key={`${city.mun_code}-${index}`} value={city.mun_code}>{city.name}</option>
                    ))}
                  </select>
                  {invalidFields.city && <p className="text-red-500 text-[12px]">{invalidFields.city}</p>}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:justify-center -mx-3">
                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label htmlFor="email" className="block text-[#1D5B79] text-sm font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="eMail"
                    value={formData.eMail}
                    onChange={handleChange}
                    className={`w-full text-[14px] p-3  border rounded ${invalidFields.eMail ? 'border-red-500' : ''}`}
                    placeholder="Enter your email"
                  />
                  {invalidFields.contactNum && <p className="text-red-500 text-[12px]">{invalidFields.eMail}</p>}
                </div>
                <div className="w-full md:w-1/2 px-3 mb-3">
                  <label htmlFor="accountType" className="block text-[#1D5B79] text-sm font-bold mb-2">
                    Account Type
                  </label>
                  <select
                    id="accountType"
                    name="accType"
                    value={formData.accType}
                    onChange={handleChange}
                    className={`w-full p-2 text-[14px] border rounded ${invalidFields.accType ? 'border-red-500' : ''}`}>
                    <option value="">Select Account Type</option>
                    <option value="client">Client</option>
                    <option value="freelancer">Freelancer</option>
                  </select>
                  {invalidFields.accType && <p className="text-red-500 text-[12px]">{invalidFields.accType}</p>}
                </div>
              </div>
              <div className="mb-6">
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    id="agree"
                    name="aggRee"
                    checked={formData.aggRee}
                    onChange={handleChange}
                    className={`mr-2 ${invalidFields.aggRee ? 'border-red-500' : ''}`}
                  />  
                  <label htmlFor="agree" className='text-[14px]'>
                    I agree to the <Link className='text-[#1D5B79] font-medium'><u>terms and conditions</u></Link>
                  </label>    
                </div>
                {invalidFields.aggRee && <p className="text-red-500 text-[12px] text-center">{invalidFields.aggRee}</p>}
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-[#FE6D30] w-[150px] text-white p-2 rounded-full hover:bg-[#EA580C] hover:w-[155px] focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                  Get Started
                </button>
              </div>
            </form>
          </div>
        </div>
        <div>
          <img className='hidden top-[25%] xl:flex absolute left-[62%] h-[400px] translate-x-[-0%] mx-auto' src={logo2}/>
        </div>
      </div>
    </section>
    
  )
}

export default Reg