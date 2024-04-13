import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import phil from 'phil-reg-prov-mun-brgy'

import { useDropzone } from 'react-dropzone';

import CFooter from '../CFooter';
import CMainNav from '../CMainNav';

function CSettingsProfile(props) {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  
  const { userId } = useParams();
  const [ userData, setUsers] = useState();
  const [disabled, setDisabled] = useState(false);
  const [emailEditable, setEmailEditable] = useState(false);
  const [filteredProvinces, setFilteredProvinces] = useState([]);
  const [filteredCity, setFilteredCity] = useState([]);
  const [regionCode, setRegionCode] = useState(userData ? userData.region : '');
  const [provinceCode, setProvinceCode] = useState(userData ? userData.province : ''); 
  const [cityCode, setCityCode] = useState(userData ? userData.city : '');

  const sortedRegions = phil.regions.sort((a, b) => a.name.localeCompare(b.name));
 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
          const response = await axios.get(`https://quircom.onrender.com/api/client/${userId}`);
          if (response.status === 200) {
          setUsers(response.data);
            setFormData({
              firstName: response.data.firstName,
              surName: response.data.surName,
              contactNum: response.data.contactNum,
              region: response.data.region,
              province: response.data.province,
              city: response.data.city
            });
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
    passWord: '',
    contactNum: '',
    region: '',
    province: '',
    city: ''
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
  
    // Update formData with the changed values
    setFormData(prevState => ({
      ...prevState,
      // Only update region, province, and city if they are changed
      region: name === 'region' ? value : formData.region,
      province: name === 'province' ? value : formData.province,
      city: name === 'city' ? value : formData.city,
    }));
  };
  

  const toggleEmailEdit = () => {
    setEmailEditable(true);
  };

  const cancelEmailEdit = () => {
    setEmailEditable(false);
    setFormData((prevFormData) => ({
      ...prevFormData,
      firstName: userData.firstName,
      surName: userData.surName,
      contactNum: userData.contactNum,
      region: userData.region,
      province: userData.province,
      city: userData.city // Reset to original email
    }));
  };

  return (
    <div className=''>
      <CMainNav />
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
                <Link to={`/client/settings/${userId}`}>
                  <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Accounts</li>
                </Link>
                <Link to={`/client/settings-profile/${userId}`}>
                  <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Portfolio</li>
                </Link>
                <Link to={`/client/settings-bill/${userId}`}>
                  <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Billing</li>
                </Link>
              </ul>
            </div>

            <div className="col-span-2 hidden sm:block">
              <ul>
                <Link to={`/client/settings/${userId}`}>
                    <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700">Accounts</li>
                </Link>
                <Link to={`/client/settings-profile/${userId}`}>
                    <li className="mt-5 cursor-pointer border-l-2 border-l-blue-700 px-2 py-2 font-semibold text-blue-700 transition hover:border-l-blue-700 hover:text-blue-700">Profile</li>
                </Link>
                <Link to={`/client/settings-bill/${userId}`}>
                    <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700">Billing</li>
                </Link>
              </ul>
            </div>

            <div className="col-span-8 overflow-hidden rounded-xl sm:bg-[#F7F6DF] sm:px-8 sm:shadow">
              <div className="pt-4">
                <h1 className="py-2 text-2xl font-semibold">Profile settings</h1>
                <p className="font- text-slate-600 mb-5">Edit your information here.</p>
                <form>
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
                              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              disabled={!emailEditable}
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
                          className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          disabled={!emailEditable}
                          value={formData.surName}
                          onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label htmlFor="contactNum" className="block text-sm font-medium text-gray-700">
                          Contact Number
                      </label>
                      <input
                          type="text"
                          name="contactNum"
                          id="contactNum"
                          className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          disabled={!emailEditable}
                          value={formData.contactNum}
                          onChange={handleChange}
                      />
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
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            disabled={!emailEditable}
                            value={regionCode || userData.region}
                            onChange={handleChange}
                          >
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
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            disabled={!emailEditable}
                            value={provinceCode || userData.province}
                            onChange={handleChange}
                          >
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
                            disabled={!emailEditable}
                            value={cityCode || userData.city}
                            onChange={handleChange}
                          >
                            {filteredCity.map((city, index) => (
                              <option key={`${city.mun_code}-${index}`} value={city.mun_code}>{city.name}</option>
                            ))}
                          </select>
                        </>
                      )}
                    </div>
                  </div>

                  {emailEditable ? (
                    <>
                      <button type="submit" disabled={disabled} className={`m-2 rounded font-bold py-2 px-4 ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}>
                        Save
                      </button>
                      <button type="button" onClick={cancelEmailEdit} className="m-2 rounded font-bold py-2 px-4 bg-red-500 hover:bg-red-700 text-white">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button onClick={toggleEmailEdit} className="ml-2 mt-2 rounded font-bold py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white">
                      Update Information
                    </button>
                  )}
              </form>
              </div>
              <hr className="mt-4 mb-8" />
              <p className="py-2 text-xl font-semibold">Account Handle</p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              {userData && (
                <p className="text-gray-600">Your account is <strong>{userData.firstName} {userData.surName}</strong></p>
              )}

                
              </div>
              <hr className="mt-4 mb-8" />
              {/* PORTFOLIO ZONE */}
              <p className="py-2 text-xl font-semibold">Profile Description</p>
              <div className="max-w-2xl">
              
                  <label className="block sm:col-span-2" htmlFor="message">
                    
                    <textarea className="h-32 w-full rounded-md border bg-white py-2 px-2 outline-none ring-yellow-500 focus:ring-2" type="text" placeholder="About you"></textarea>
                  </label>
                
              </div>
              <button className="mt-4 rounded-lg bg-[#FE6D30] hover:bg-[#1D5B79] active:bg-blue-800 px-4 py-2 text-white">Save</button>
              <hr className="mt-4 mb-8" />

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
        <CFooter />
      </div>
    </div>
  )
}

export default CSettingsProfile