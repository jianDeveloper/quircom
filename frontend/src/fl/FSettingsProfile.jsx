import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import phil from 'phil-reg-prov-mun-brgy'

import { useDropzone } from 'react-dropzone';

import FFooter from './FFooter';
import FMainNav from './FMainNav';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function FSettingsProfile() {
  // State to hold the uploaded portfolio file
  const [portFolio, setPortfolio] = useState(null);
  // Extract userId from the URL parameters
  

  // Dropzone configuration for handling file uploads
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      // Set the uploaded file into state and show a toast notification
      setPortfolio(acceptedFiles[0]);
      toast.info(`File ${acceptedFiles[0].name} uploaded successfully.`);
    },
    maxSize: 1024 * 1024 * 10, // Max file size (10MB for a PDF)
    accept: 'application/pdf' // Only accept PDF files
  });

  // Function to handle saving the uploaded portfolio to the backend
  const handleSavePortfolio = async () => {
    // Check if there's a file to save
    if (!portFolio) {
      toast.error('No file uploaded to save.');
      return;
    }
  
    // Create a FormData object to send the file to the backend
    const formData = new FormData();
    formData.append("portfolioFile", portFolio);

    try {
      // Post request to upload the portfolio file
      const response = await axios.post(`https://quircom.onrender.com/api/freelancer/update/portfolio/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Check response status and notify the user
      if (response.status === 200) {
        toast.success('Portfolio saved successfully!');
      } else {
        toast.error('Failed to save portfolio.');
      }
    } catch (error) {
      // Handle errors if the request fails
      console.error('Error uploading portfolio:', error);
      toast.error('Error saving portfolio: ' + error.message);
    }
  };
  
  const { userId } = useParams();
  const [ userData, setUsers] = useState();
  const [disabled, setDisabled] = useState(false);
  const [editable, setEditable] = useState(false);
  const [disabled2, setDisabled2] = useState(false);
  const [editable2, setEditable2] = useState(false);
  const [disabled3, setDisabled3] = useState(false);
  const [editable3, setEditable3] = useState(false);
  const [filteredProvinces, setFilteredProvinces] = useState([]);
  const [filteredCity, setFilteredCity] = useState([]);
  const [regionCode, setRegionCode] = useState('');
  const [provinceCode, setProvinceCode] = useState(''); 
  const [cityCode, setCityCode] = useState('');

  const sortedRegions = phil.regions.sort((a, b) => a.name.localeCompare(b.name));
 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://quircom.onrender.com/api/freelancer/${userId}`);
        if (response.status === 200) {
          setUsers(response.data);
          setFormData({
            firstName: response.data.firstName,
            surName: response.data.surName,
            contactNum: response.data.contactNum,
            region: response.data.region,
            province: response.data.province,
            city: response.data.city,
            userName: response.data.userName,
            userInfo: response.data.userInfo
          });

          const userData = response.data;
          setUsers(userData);

          // Initialize region, province, and city codes
          setRegionCode(userData.region);
          setProvinceCode(userData.province);
          setCityCode(userData.city);
          
          // Fetch provinces and cities based on the user's region
          const regionProvinces = phil.getProvincesByRegion(userData.region);
          setFilteredProvinces(regionProvinces);

          const provincesCity = phil.getCityMunByProvince(userData.province);
          setFilteredCity(provincesCity);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const [formData, setFormData] = useState({
    firstName: '',
    surName: '',
    contactNum: '',
    region: '',
    province: '',
    city: '',

    userName: '',
    userInfo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Handle specific logic based on the name of the input field
    if (name === 'region') {
      // Handle region change logic
      setRegionCode(value);
      const regionProvinces = phil.getProvincesByRegion(value);
      setFilteredProvinces(regionProvinces);
  
      setProvinceCode('');
      setCityCode('');
      setFilteredCity([]);
    }
    if (name === 'province') {
      // Handle province change logic
      setProvinceCode(value);
      const provincesCity = phil.getCityMunByProvince(value);
      setFilteredCity(provincesCity);
    }
    if (name === 'city') {
      // Handle city change logic
      setCityCode(value);
    }

    setFormData({ ...formData, [name]: value });

  };

  const toggleEdit = () => {
    setEditable(true);
  };

  const toggleEdit2 = () => {
    setEditable2(true);
  };

  const toggleEdit3 = () => {
    setEditable3(true);
  };

  const cancelEdit = () => {
    setDisabled(false);
    setEditable(false);
    setFormData({
      firstName: userData.firstName,
      surName: userData.surName,
      contactNum: userData.contactNum,
      region: userData.region,
      province: userData.province,
      city: userData.city
    });
  
    // Update regionCode, provinceCode, and cityCode to reflect userData
    setRegionCode(userData.region);
    setProvinceCode(userData.province);
    setCityCode(userData.city);

    const regionProvinces = phil.getProvincesByRegion(userData.region);
    setFilteredProvinces(regionProvinces);

    const provincesCity = phil.getCityMunByProvince(userData.province);
    setFilteredCity(provincesCity);
  };

  const cancelEdit2 = () => {
    setDisabled2(false);
    setEditable2(false);
    setFormData({
      userName: userData.userName,
    });
  };

  const cancelEdit3 = () => {
    setDisabled3(false);
    setEditable3(false);
    setFormData(prevFormData => ({
      ...prevFormData,
      userInfo: userData.userInfo !== null ? userData.userInfo : ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isFormDataChanged =
    formData.firstName !== userData.firstName ||
    formData.surName !== userData.surName ||
    formData.contactNum !== userData.contactNum &&
    Number(formData.contactNum) !== userData.contactNum ||
    formData.region !== userData.region ||
    formData.province !== userData.province ||
    formData.city !== userData.city;

    setDisabled(true);

    if (!isFormDataChanged) {
      toast.error('No changes have been made');
      setDisabled(false);
      return;
    }

    if (formData.firstName.length === 0) {
      toast.error('Please input your first name');
      setDisabled(false);
      return;
    }
    if (formData.surName.length === 0) {
      toast.error('Please input your last name');
      setDisabled(false);
      return;
    }
    if (!formData.contactNum || isNaN(formData.contactNum) || String(formData.contactNum).length <= 9) {
      toast.error('Contact number must be a valid number');
      setDisabled(false);
      return;
    }
    if (!regionCode) {
      toast.error('Please select a region');
      setDisabled(false);
      return;
    }
    if (!provinceCode) {
      toast.error('Please select a province');
      setDisabled(false);
      return;
    }
    if (!cityCode) {
      toast.error('Please select a city');
      setDisabled(false);
      return;
    }

    try {

      const validationResponse = await axios.post(`https://quircom.onrender.com/api/auth/validate`, {
        contactNum: Number(formData.contactNum),
      });

      if (validationResponse.data.userId !== userId){
        if (validationResponse.data.exists) {
          toast.error('Contact Number is already registered');
          setDisabled(false);
          return;
        }
      }
      
    } catch (error) {
      console.error('Error validating contact:', error);
      toast.error('Failed to validate contact');
      setDisabled(false);
      return;
    }
    
    const formObj = new FormData();
    formObj.append('client', JSON.stringify({
      ...userData,
      firstName: formData.firstName,
      surName: formData.surName,
      contactNum: formData.contactNum,
      region: formData.region,
      province: formData.province,
      city: formData.city
    }));

    try {
      const updateResponse = await axios.patch(`https://quircom.onrender.com/api/freelancer/update/${userId}`, formObj, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
      });

      if (updateResponse.status === 201) {
        console.log(updateResponse.data);
        toast.success('Information has been updated');
        setEditable(false);
        setUsers(updateResponse.data); // Update userData with the latest user data
      } else {
        console.log('Response data not available');
        toast.error('Failed to update information');
      }
    } catch (error) {
      console.error('Error during patch:', error);
      toast.error('Failed to change information: ' + error.message);
    } finally {
      setDisabled(false);
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();

    const isFormDataChanged =
    formData.userName !== userData.userName;

    setDisabled2(true);

    if (!isFormDataChanged) {
      toast.error('No changes have been made');
      setDisabled2(false);
      return;
    }

    if (formData.userName.length === 0) {
      toast.error('Please input your username');
      setDisabled2(false);
      return;
    }

    try {
      const validationResponse = await axios.post(`https://quircom.onrender.com/api/auth/validate`, {
        userName: formData.userName,
      });

      if (validationResponse.data.userId !== userId){
        if (validationResponse.data.exists) {
          toast.error('Username is already registered');
          setDisabled2(false);
          return;
        }
      }
      
    } catch (error) {
      console.error('Error validating username: ', error);
      toast.error('Failed to validate username');
      setDisabled2(false);
      return;
    }
    
    const formObj = new FormData();
    formObj.append('client', JSON.stringify({
      ...userData,
      userName: formData.userName
    }));

    try {
      const updateResponse = await axios.patch(`https://quircom.onrender.com/api/freelancer/update/${userId}`, formObj, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
      });

      if (updateResponse.status === 201) {
        console.log(updateResponse.data);
        toast.success('Username has been updated');
        setEditable2(false);
        setUsers(updateResponse.data); // Update userData with the latest user data
      } else {
        console.log('Response data not available');
        toast.error('Failed to update Username');
      }
    } catch (error) {
      console.error('Error during patch:', error);
      toast.error('Failed to change Username: ' + error.message);
    } finally {
      setDisabled2(false);
    }
  };

  const handleSubmit3 = async (e) => {
    e.preventDefault();

    const isFormDataChanged =
    formData.userInfo !== userData.userInfo;

    setDisabled3(true);

    if (!isFormDataChanged) {
      toast.error('No changes have been made');
      setDisabled3(false);
      return;
    }

    if (formData.userInfo.length === 0) {
      toast.error('Please tell us about yourself');
      setDisabled3(false);
      return;
    }
    
    const formObj = new FormData();
    formObj.append('client', JSON.stringify({
      ...userData,
      userInfo: formData.userInfo
    }));

    try {
      const updateResponse = await axios.patch(`https://quircom.onrender.com/api/freelancer/update/${userId}`, formObj, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
      });

      if (updateResponse.status === 201) {
        console.log(updateResponse.data);
        toast.success('Description has been updated');
        setEditable3(false);
        setUsers(updateResponse.data); // Update userData with the latest user data
      } else {
        console.log('Response data not available');
        toast.error('Failed to update description');
      }
    } catch (error) {
      console.error('Error during patch:', error);
      toast.error('Failed to change description: ' + error.message);
    } finally {
      setDisabled3(false);
    }
  };

  return (
    <div className=''>
      <FMainNav />
      <div className='flex'>
        <div className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto">
          <h1 className="border-b py-6 text-4xl font-extrabold text-[30px] text-[#1D5B79]">SETTINGS</h1>
          <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
            <div className="relative my-4 w-56 sm:hidden">
              <input className="peer hidden" type="checkbox" name="select-1" id="select-1" />
              <label htmlFor="select-1" className="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-700 peer-checked:ring">Accounts </label>
              <svg xmlns="http://www.w3.org/2000/svg" className="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transition peer-checked:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              <ul className="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
                <Link to={`/freelancer/settings/${userId}`}>
                  <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Accounts</li>
                </Link>
                <Link to={`/freelancer/settings-profile/${userId}`}>
                  <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Portfolio</li>
                </Link>
              </ul>
            </div>

            <div className="col-span-2 hidden sm:block">
              <ul>
                <Link to={`/freelancer/settings/${userId}`}>
                    <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700">Accounts</li>
                </Link>
                <Link to={`/freelancer/settings-profile/${userId}`}>
                    <li className="mt-5 cursor-pointer border-l-2 border-l-blue-700 px-2 py-2 font-semibold text-blue-700 transition hover:border-l-blue-700 hover:text-blue-700">Profile</li>
                </Link>
              </ul>
            </div>

            <div className="col-span-8 overflow-hidden rounded-xl sm:bg-[#F7F6DF] sm:px-8 sm:shadow">
              <div className="pt-4">
                <h1 className="py-2 text-2xl font-semibold">Profile settings</h1>
                <p className="font- text-slate-600 mb-5">Edit your information here.</p>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                            First Name
                        </label>
                          {userData && (<>    
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                className={`mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm `}
                                disabled={!editable}
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                          </>)}
                      </div>

                      <div>
                        <label htmlFor="surName" className="block text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="surName"
                            id="surName"
                            className={`mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm `}
                            disabled={!editable}
                            value={formData.surName}
                            onChange={handleChange}
                        />
                      </div>

                      <div className="relative">
                        <label htmlFor="contactNum" className="block text-sm font-medium text-gray-700">
                          Contact Number
                        </label>
                        <div className='relative'>
                          <div className={`absolute left-0 inset-y-0 flex text-sm items-center pl-3 pointer-events-none`}>
                            +63
                          </div>
                          <input
                            type="text"
                            name="contactNum"
                            id="contactNum"
                            className={`pl-11 mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm `}
                            disabled={!editable}
                            value={formData.contactNum}
                            onChange={handleChange}
                            maxLength="10"
                          />
                        </div>
                      </div>


                      {/* Region Dropdown */}
                      <div>
                        <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                          Region
                        </label>
                        {userData && (
                          <>         
                            <select
                              id="region"
                              name="region"
                              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm `}
                              disabled={!editable}
                              value={regionCode}
                              onChange={handleChange}
                            >
                              <option value="">Select Region</option>
                              {sortedRegions.map((region, index) => (
                                <option key={`${region.reg_code}-${index}`} value={region.reg_code}>{region.name}</option>
                              ))}
                            </select>
                          </>
                        )}
                      </div>

                      {/* Province Dropdown */}
                      <div>
                        <label htmlFor="province" className="block text-sm font-medium text-gray-700">
                            Province
                        </label>
                        {userData && (
                          <>
                            <select
                              id="province"
                              name="province"
                              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm `}
                              disabled={!editable}
                              value={provinceCode}
                              onChange={handleChange}
                            >
                              <option value="">Select Province</option>
                              {filteredProvinces.map((province, index) => (
                                <option key={`${province.prov_code}-${index}`} value={province.prov_code}>{province.name}</option>
                              ))}
                            </select>
                          </>
                        )}
                      </div>

                      {/* City Dropdown */}
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                            City
                        </label>
                        {userData && (
                          <>
                            <select
                              id="city"
                              name="city"
                              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              disabled={!editable}
                              value={cityCode}
                              onChange={handleChange}
                            >
                              <option value="">Select City</option>
                              {filteredCity.map((city, index) => (
                                <option key={`${city.mun_code}-${index}`} value={city.mun_code}>{city.name}</option>
                              ))}
                            </select>
                          </>
                        )}
                      </div>
                  </div>

                    {editable ? (
                      <>
                        <button type="submit" disabled={disabled} className={`mt-2 mr-2 rounded font-bold py-2 px-4 ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}>
                          Save
                        </button>
                        <button type="button" onClick={cancelEdit} className="mt-2 mr-2 rounded font-bold py-2 px-4 bg-red-500 hover:bg-red-700 text-white">
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button onClick={toggleEdit} className="mt-2 rounded font-bold py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white">
                        Update Information
                      </button>
                    )}

                </form>
              </div>

              <hr className="mt-4 mb-8" />
              <p className="py-2 text-xl font-semibold">Account Handle</p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <form onSubmit={handleSubmit2}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                        Username
                      </label>
                      {userData && (<>    
                        <input
                          type="text"
                          name="userName"
                          id="userName"
                          className={`mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm `}
                          disabled={!editable2}
                          value={formData.userName}
                          onChange={handleChange}
                        />
                      </>)}
                    </div>
                  </div>

                  {editable2 ? (
                    <>
                      <button type="submit" disabled={disabled2} className={`mt-2 mr-2 rounded font-bold py-2 px-4 ${disabled2 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}>
                        Save
                      </button>
                      <button type="button" onClick={cancelEdit2} className="mt-2 mr-2 rounded font-bold py-2 px-4 bg-red-500 hover:bg-red-700 text-white">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button onClick={toggleEdit2} className="mt-2 rounded font-bold py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white">
                      Update Account Handle
                    </button>
                  )}
                </form>
              </div>

              <hr className="mt-4 mb-8" />
              {/* PORTFOLIO ZONE */}
              <p class="py-2 text-xl font-semibold">Portfolio</p>
              {/* Dropzone for file upload */}
                <div className='max-w-2xl'>
                  <div className='flex flex-col items-center justify-center w-full'>
                    <div className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 hover:bg-gray-100'>
                      <div {...getRootProps({className: 'dropzone flex flex-col items-center'})}>
                        <input {...getInputProps()} />
                        {/* Icon and text prompting user to upload files */}
                        <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500">Only PDF files are accepted (MAX. 10MB)</p>
                      </div>
                    </div>
                    {/* Display the name of the uploaded file or a message if no file is uploaded */}
                    <aside>
                      <ul>{portFolio ? <li>{portFolio.name}</li> : <li>No file uploaded</li>}</ul>
                    </aside>
                  </div>
                </div>
                {/* Button to save the uploaded portfolio */}
                <button onClick={handleSavePortfolio} className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white">Save Portfolio</button>
                <hr className="mt-4 mb-8" />
                <ToastContainer />

              <div className="mb-10">
                {/* <p className="py-2 text-xl font-semibold">Delete Portfolio</p> */}
                <p className="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"clipRule="evenodd" />
                  </svg>
                  Proceed with caution
                </p>
                <p className="mt-2">Make sure you have taken backup of your account in case you ever need to get access to your data. We will completely wipe your data. There is no way to access your account after this action.</p>
                <button className="ml-auto text-sm font-semibold text-rose-600 underline decoration-2 hover:text-[#1D5B79]">Continue with deletion</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="">
      <hr className="mt-4 mb-4" />
        <FFooter />
      </div>
    </div>
  )
}

export default FSettingsProfile