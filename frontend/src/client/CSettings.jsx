import { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

import NavHeader from './CMainNav'
import CFooter from './CFooter'
import avatar from '../assets/avatar.png'
import { FaEyeSlash, FaEye } from "react-icons/fa";


function CSettings() {

  const { userId } = useParams();
  const [ userData, setUsers] = useState();
  const [showPassword, setShowPassword] = useState(false); // New state to track password visibility
  const [disabled, setDisabled] = useState(false);
  const [disabled2, setDisabled2] = useState(false);
  const [emailEditable, setEmailEditable] = useState(false);
  const formRef = useRef();
  

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://localhost:8800/api/client/${userId}`);
        if (response.status === 200) {
          setUsers(response.data);
          setFormData({ eMail: response.data.eMail });
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [userId]);

  const [formData, setFormData] = useState({

    eMail: '',
    passWord: '',
  });

  const [profilePic, setProfile] = useState()

  const handleImage = (e) => {
    setProfile(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    setDisabled(true);
  
    if (!profilePic) {
      toast.error('Please select a profile picture');
      setDisabled(false);
      return;
    }
  
    try {
      const formObj = new FormData();
      formObj.append('client', JSON.stringify(userData));
      formObj.append('file', profilePic);
  
      const response = await axios.patch(`https://localhost:8800/api/client/${userId}`, formObj, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response && response.data) {
        console.log(response.data);
        toast.success('Profile picture uploaded successfully');
        setDisabled(false);
      } else {
        console.log('Response data not available');
        toast.error('Failed to upload profile picture');
        setDisabled(false);
      }
    } catch (error) {
      console.error('Error during patch ', error.response);
      console.log(error.message);
      toast.error('Failed to upload profile picture');
      setDisabled(false);
    }
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setDisabled2(true);

    if (!formData.eMail.includes('@')) {
        toast.error('Please enter a valid email address');
        setDisabled2(false);
        return;
    }

    if (formData.eMail === userData.eMail) {
        toast.error('Email is the same as the existing one');
        setDisabled2(false);
        return;
    }

    try {
        const validationResponse = await axios.post(`https://quircom.onrender.com/api/auth/validate`, {
            eMail: formData.eMail,
        });

        if (validationResponse.data.exists && validationResponse.data.eMailExists) {
            toast.error('Email is already registered');
            setDisabled2(false);
            return;
        }
    } catch (error) {
        console.error('Error validating email:', error);
        toast.error('Failed to validate email');
        setDisabled2(false);
        return;
    }

    // If the email is valid and not already registered, proceed with updating
    const formObj = new FormData();
    formObj.append('client', JSON.stringify({
        ...userData,
        eMail: formData.eMail
    }));

    try {
        const updateResponse = await axios.patch(`https://quircom.onrender.com/api/client/${userId}`, formObj, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (updateResponse.status === 201) {
            console.log(updateResponse.data);
            toast.success('Email has been updated');
            setEmailEditable(false);
            setUsers(updateResponse.data); // Update userData with the latest user data
        } else {
            console.log('Response data not available');
            toast.error('Failed to update email');
        }
    } catch (error) {
        console.error('Error during patch:', error);
        toast.error('Failed to change email: ' + error.message);
    } finally {
        setDisabled2(false);
    }
};

const handleChangePassword = async (e) => {
  e.preventDefault();
  setDisabled2(true);

  if (!formData.passWord.includes('')) {
      toast.error('Please enter a valid password');
      setDisabled2(false);
      return;
  }

  if (formData.passWord === userData.passWord) {
      toast.error('Email is the same as the existing one');
      setDisabled2(false);
      return;
  }

  try {
      const validationResponse = await axios.post(`https://quircom.onrender.com/api/auth/validate`, {
        passWord: formData.passWord,
      });

      if (validationResponse.data.exists && validationResponse.data.passWordExists) {
          toast.error('Password is already used');
          setDisabled2(false);
          return;
      }
  } catch (error) {
      console.error('Error validating password:', error);
      toast.error('Failed to validate password');
      setDisabled2(false);
      return;
  }

  // If the email is valid and not already registered, proceed with updating
  const formObj = new FormData();
  formObj.append('client', JSON.stringify({
      ...userData,
      passWord: formData.passWord
  }));

  try {
      const updateResponse = await axios.patch(`https://quircom.onrender.com/api/client/${userId}`, formObj, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });

      if (updateResponse.status === 201) {
          console.log(updateResponse.data);
          toast.success('Email has been updated');
          setPasswordEditable(false);
          setUsers(updateResponse.data); // Update userData with the latest user data
      } else {
          console.log('Response data not available');
          toast.error('Failed to update email');
      }
  } catch (error) {
      console.error('Error during patch:', error);
      toast.error('Failed to change password: ' + error.message);
  } finally {
      setDisabled2(false);
  }
};




  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const toggleEmailEdit = () => {
    setEmailEditable(true);
  };
  const togglePasswordEdit = () => {
    setPasswordEditable(true);
  };

  const cancelEmailEdit = () => {
    setEmailEditable(false);
    setFormData((prevFormData) => ({
      ...prevFormData,
      eMail: userData.eMail // Reset to original email
    }));
  };
  

  return (
    <div className=''>
      <NavHeader />
      <ToastContainer />
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
                  <li className="mt-5 cursor-pointer border-l-2 border-l-blue-700 px-2 py-2 font-semibold text-blue-700 transition hover:border-l-blue-700 hover:text-blue-700">Accounts</li>
                </Link>
                <Link to={`/client/settings-profile/${userId}`}>
                  <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700">Profile</li>
                </Link>
                <Link to={`/client/settings-bill/${userId}`}>
                  <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700">Billing</li>
                </Link>
              </ul>
            </div>

            <div className="col-span-8 overflow-hidden rounded-xl sm:bg-[#F7F6DF] sm:px-8 sm:shadow">
              <div className="pt-4">
                <h1 className="py-2 text-2xl font-semibold">Account settings</h1>
                <div className='pictureBorder p-5'>
                  {userData && userData.hasOwnProperty("profilePic") ? (
                    <img className="profilePicture" src={userData.profilePic.link} alt="Profile Picture"/>
                  ) : (
                    <img className="profilePicture" src={avatar} alt="Profile Picture"/> // Render a default avatar if profilePic is not available
                  )}
                </div>
                <div className="my-4">
                  <input type="file" name="profilePic" id="profilePic" onChange={handleImage} />
                  <button onClick={handleSubmit} disabled={disabled} className={`ml-2 rounded font-bold py-2 px-4 ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}>
                    Upload New Profile Picture
                  </button>
                </div>
              </div>
              <hr className="mt-4 mb-8" />
              <form ref={formRef} className="w-full max-w-screen-ss mx-auto" onSubmit={handleSubmitEmail}>
              <p className="py-2 text-xl font-semibold">Email Address</p>
              <div className="w-full md:w-1/2 px-3 mb-4">
                <label htmlFor="email" className="block text-[#1D5B79] text-sm font-bold mb-2">
                  Email
                </label>
                {userData && (
                  <>
                  <input
                      type="email"
                      id="email"
                      name="eMail"
                      value={formData.eMail}
                      onChange={handleChange}
                      disabled={!emailEditable}
                      className="w-full text-[14px] p-3  border rounded"
                      placeholder="Enter your email"
                    />
                  </>
                )}
                {emailEditable ? (
                  <>
                    <button type="submit" disabled={disabled2} className={`m-2 rounded font-bold py-2 px-4 ${disabled2 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}>
                      Save Email
                    </button>
                    <button type="button" onClick={cancelEmailEdit} className="m-2 rounded font-bold py-2 px-4 bg-red-500 hover:bg-red-700 text-white">
                      Cancel
                    </button>
                  </>
                ) : (
                  <button onClick={toggleEmailEdit} className="ml-2 mt-2 rounded font-bold py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white">
                    Change Email
                  </button>
                )}            
              </div>
              </form>
              <hr className="mt-4 mb-8" />
              <p className="py-2 text-xl font-semibold">Password</p>
              <div className="flex items-center">
                <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                  <label htmlFor="login-password">
                    <span className="text-sm text-gray-500">Current Password</span>
                    <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                      <input 
                        type={showPassword ? 'text' : 'password'} 
                        id="login-password" 
                        className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" 
                        placeholder="***********" 
                      />
                    </div>
                  </label>
                  <label htmlFor="login-password">
                    <span className="text-sm text-gray-500">New Password</span>
                    <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                      <input 
                        type={showPassword ? 'text' : 'password'}
                        id="login-password2" 
                        className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" 
                        placeholder="***********"
                      />                     
                    </div>
                  </label>                
                </div>
                <button
                  type="button"
                  tabIndex="-1" // Add tabIndex="-1" here
                  className="mt-5 ml-2 h-8 w-8 cursor-pointer text-sm font-semibold text-gray-600 underline decoration-2 user-select-none"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash/> : <FaEye/> }
                </button> 
              </div>
              <p className="mt-2">Can't remember your current password. <a className="text-sm font-semibold text-blue-600 underline decoration-2" href="#">Recover Account</a></p>
              <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white">Save Password</button>
              <hr className="mt-4 mb-8" />

              <div className="mb-10">
                <p className="py-2 text-xl font-semibold">Delete Account</p>
                <p className="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Proceed with caution
                </p>
                <p className="mt-2">Make sure you have taken backup of your account in case you ever need to get access to your data. We will completely wipe your data. There is no way to access your account after this action.</p>
                <button className="ml-auto text-sm font-semibold text-rose-600 underline decoration-2">Continue with deletion</button>
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

export default CSettings