import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import NavHeader from "./FMainNav";
import FFooter from "./FFooter";
import avatar from "../assets/avatar.png";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { BsFileEarmarkPdfFill } from "react-icons/bs";

import WithAuth from "../auth/WithAuth";

function FSettings() {
  const { userId } = useParams();
  const [userData, setUsers] = useState();
  const [showPassword, setShowPassword] = useState(false); // New state to track password visibility
  const [disabled, setDisabled] = useState(false);
  const [disabled2, setDisabled2] = useState(false);
  const [disabled3, setDisabled3] = useState(false);
  const [emailEditable, setEmailEditable] = useState(false);
  const [invalidFields, setInvalidFields] = useState({});
  const formRef = useRef();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const response = await axios.get(
          `https://quircom.onrender.com/api/freelancer/${userId}`,
          { headers }
        );
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
    eMail: "",
    currentPassword: "",
    passWord: "",
  });

  const [profilePic, setProfile] = useState();

  const handleImage = (e) => {
    const file = e.target.files[0];
    setProfile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    setDisabled(true);

    if (
      !profilePic ||
      !(
        profilePic.type.startsWith("image/jpeg") ||
        profilePic.type.startsWith("image/jpg") ||
        profilePic.type.startsWith("image/png")
      )
    ) {
      toast.error("Please select an image");
      setDisabled(false);
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      const formObj = new FormData();
      formObj.append("freelancer", JSON.stringify(userData));
      formObj.append("file", profilePic);

      const response = await axios.patch(
        `https://quircom.onrender.com/api/freelancer/update/${userId}`,
        formObj,
        {
          headers,
        }
      );

      if (response && response.data) {
        toast.success("Profile picture uploaded successfully");
        setDisabled(false);
        setProfile(null);
      } else {
        toast.error("Failed to upload profile picture");
        setDisabled(false);
      }
    } catch (error) {
      console.error("Error during patch ", error.response);
      toast.error("Failed to upload profile picture");
      setDisabled(false);
    }
  };

  const [portFolio, setPortfolio] = useState();

  const handlePortfolio = (e) => {
    const file = e.target.files[0];
    setPortfolio(file);
  };

  const handleSubmit3 = async (e) => {
    e.preventDefault(); // Prevent default form submission

    setDisabled3(true);

    if (!portFolio || !portFolio.type.startsWith("application/pdf")) {
      toast.error("Please select a pdf file");
      setDisabled3(false);
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "mulipart/form-data",
      };

      const formObj = new FormData();
      formObj.append("freelancer", JSON.stringify(userData));
      formObj.append("file", portFolio);

      const response = await axios.patch(
        `https://quircom.onrender.com/api/freelancer/update/portfolio/${userId}`,
        formObj,
        {
          headers,
        }
      );

      if (response && response.data) {
        //console.log(response.data);
        toast.success("Portfolio uploaded successfully");
        setDisabled3(false);
      } else {
        // console.log("Response data not available");
        toast.error("Failed to upload portfolio");
        setDisabled3(false);
      }
    } catch (error) {
      console.error("Error during patch ", error.response);
      // console.log(error.message);
      toast.error("Failed to upload portfolio");
      setDisabled3(false);
    }
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setDisabled2(true);

    if (!formData.eMail.includes("@")) {
      toast.error("Please enter a valid email address");
      setDisabled2(false);
      return;
    }

    if (formData.eMail === userData.eMail) {
      toast.error("Email is the same as the existing one");
      setDisabled2(false);
      return;
    }

    try {
      const validationResponse = await axios.post(
        `https://quircom.onrender.com/api/auth/validate`,
        {
          eMail: formData.eMail,
        }
      );

      if (
        validationResponse.data.exists &&
        validationResponse.data.eMailExists
      ) {
        toast.error("Email is already registered");
        setDisabled2(false);
        return;
      }
    } catch (error) {
      console.error("Error validating email:", error);
      toast.error("Failed to validate email");
      setDisabled2(false);
      return;
    }

    // If the email is valid and not already registered, proceed with updating
    const formObj = new FormData();
    formObj.append(
      "freelancer",
      JSON.stringify({
        ...userData,
        eMail: formData.eMail,
      })
    );

    try {
      const token = localStorage.getItem("authToken");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      const updateResponse = await axios.patch(
        `https://quircom.onrender.com/api/freelancer/update/${userId}`,
        formObj,
        {
          headers,
        }
      );

      if (updateResponse.status === 201) {
        //console.log(updateResponse.data);
        toast.success("Email has been updated");
        setEmailEditable(false);
        setUsers(updateResponse.data); // Update userData with the latest user data
      } else {
        // console.log("Response data not available");
        toast.error("Failed to update email");
      }
    } catch (error) {
      console.error("Error during patch:", error);
      toast.error("Failed to change email: " + error.message);
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

  const cancelEmailEdit = () => {
    setEmailEditable(false);
    setFormData((prevFormData) => ({
      ...prevFormData,
      eMail: userData.eMail, // Reset to original email
    }));
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();

    setInvalidFields({});
    let errors = {};

    // Validation checks
    if (!formData.currentPassword) {
      errors.currentPassword = "Please enter your current password";
    }
    if (!formData.passWord) {
      errors.passWord = "Please enter your new password";
    }
    if (formData.currentPassword === formData.passWord) {
      errors.passWord =
        "New password must be different from the current password";
    }

    // If there are errors, set the invalidFields state and return
    if (Object.keys(errors).length > 0) {
      setInvalidFields(errors);
      return;
    }

    // Check if the current password matches userData.passWord
    if (formData.currentPassword !== userData.passWord) {
      toast.error("Current password is incorrect");
      return;
    }

    // If validation passes, proceed with updating the password
    const formObj = new FormData();
    formObj.append(
      "freelancer",
      JSON.stringify({
        ...userData,
        passWord: formData.passWord,
      })
    );

    try {
      const token = localStorage.getItem("authToken");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      const updateResponse = await axios.patch(
        `https://quircom.onrender.com/api/freelancer/update/${userId}`,
        formObj,
        {
          headers,
        }
      );

      if (updateResponse.status === 201) {
        //console.log(updateResponse.data);
        toast.success("Password has been updated");
        setUsers(updateResponse.data); // Update userData with the latest user data
      } else {
        // console.log("Response data not available");
        toast.error("Failed to update password");
      }
    } catch (error) {
      console.error("Error during patch:", error);
      toast.error("Failed to change password: " + error.message);
    }
  };

  return (
    <div className="">
      <NavHeader />
      <ToastContainer />
      <div className="flex">
        <div className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto">
          <h1 className="border-b py-6 text-4xl font-extrabold text-[30px] text-[#1D5B79]">
            SETTINGS
          </h1>
          <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
            <div className="relative my-4 w-56 sm:hidden">
              <input
                className="peer hidden"
                type="checkbox"
                name="select-1"
                id="select-1"
              />
              <label
                htmlFor="select-1"
                className="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-700 peer-checked:ring"
              >
                Accounts{" "}
              </label>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transition peer-checked:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              <ul className="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
                <Link to={`/freelancer/settings/${userId}`}>
                  <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">
                    Accounts
                  </li>
                </Link>
                <Link to={`/freelancer/settings-profile/${userId}`}>
                  <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">
                    Portfolio
                  </li>
                </Link>
              </ul>
            </div>

            <div className="col-span-2 hidden sm:block">
              <ul>
                <Link to={`/freelancer/settings/${userId}`}>
                  <li className="mt-5 cursor-pointer border-l-2 border-l-blue-700 px-2 py-2 font-semibold text-blue-700 transition hover:border-l-blue-700 hover:text-blue-700">
                    Accounts
                  </li>
                </Link>
                <Link to={`/freelancer/settings-profile/${userId}`}>
                  <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700">
                    Profile
                  </li>
                </Link>
              </ul>
            </div>

            <div className="col-span-8 overflow-hidden rounded-xl sm:bg-[#F7F6DF] sm:px-8 sm:shadow">
              <div className="pt-4">
                <h1 className="py-2 text-2xl font-semibold">
                  Account settings
                </h1>
                <div className="pictureBorder p-5">
                  {userData && userData.hasOwnProperty("profilePic") ? (
                    <img
                      className="profilePicture"
                      src={userData.profilePic.link}
                      alt="Profile Picture"
                    />
                  ) : (
                    <img
                      className="profilePicture"
                      src={avatar}
                      alt="Profile Picture"
                    /> // Render a default avatar if profilePic is not available
                  )}
                </div>
                <div className="my-4">
                  <input
                    type="file"
                    name="profilePic"
                    id="profilePic"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleImage}
                  />
                  <button
                    onClick={handleSubmit}
                    disabled={!profilePic || disabled}
                    className={`ml-2 rounded font-bold py-2 px-4 ${
                      !profilePic || disabled
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-sky-700 hover:bg-sky-800 text-white"
                    }`}
                  >
                    Upload New Profile Picture
                  </button>
                </div>
              </div>
              <hr className="mt-4 mb-8" />

              <div className="pt-4">
                <h1 className="py-2 text-2xl font-semibold">Portfolio</h1>
                <div className="pictureBorder p-5">
                  {userData &&
                  userData.portFolio &&
                  userData.portFolio.id !== "" ? (
                    <div>
                      <a
                        href={userData.portFolio.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-[50%] border-2 border-dashed border-orange-600 text-orange-600 hover:text-white hover:bg-sky-800 hover:border-transparent px-4 py-2 rounded transition duration-300"
                      >
                        <BsFileEarmarkPdfFill className="mr-2 " /> View
                        Portfolio
                      </a>
                    </div>
                  ) : (
                    <div>
                      <span className="flex items-center justify-center w-[50%] border-2 border-dashed border-orange-600 text-orange-600 hover:text-white hover:bg-sky-800 hover:border-transparent px-4 py-2 rounded transition duration-300">
                        No portfolio yet
                      </span>
                    </div>
                  )}
                </div>
                <div className="my-4">
                  <input
                    type="file"
                    name="portFolio"
                    id="portFolio"
                    accept="application/pdf"
                    onChange={handlePortfolio}
                  />
                  <button
                    onClick={handleSubmit3}
                    disabled={!portFolio || disabled3}
                    className={`ml-2 rounded font-bold py-2 px-4 ${
                      !portFolio || disabled3
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-sky-700 hover:bg-sky-800 text-white"
                    }`}
                  >
                    Upload Portfolio
                  </button>
                </div>
              </div>
              <hr className="mt-4 mb-8" />

              <form
                ref={formRef}
                className="w-full max-w-screen-ss mx-auto"
                onSubmit={handleSubmitEmail}
              >
                <p className="py-2 text-xl font-semibold">Email Address</p>
                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label
                    htmlFor="email"
                    className="block text-[#1D5B79] text-sm font-bold mb-2"
                  >
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
                      <button
                        type="submit"
                        disabled={disabled2}
                        className={`m-2 rounded font-bold py-2 px-4 ${
                          disabled2
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-sky-700 hover:bg-sky-800 text-white"
                        }`}
                      >
                        Save Email
                      </button>
                      <button
                        type="button"
                        onClick={cancelEmailEdit}
                        className="m-2 rounded font-bold py-2 px-4 bg-red-500 hover:bg-red-700 text-white"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={toggleEmailEdit}
                      className="ml-2 mt-2 rounded font-bold py-2 px-4 bg-sky-700 hover:bg-sky-800 text-white"
                    >
                      Change Email
                    </button>
                  )}
                </div>
              </form>
              <hr className="mt-4 mb-8" />
              <p className="py-2 text-xl font-semibold">Password</p>
              <div className="flex items-center">
                <form
                  ref={formRef}
                  className="w-full max-w-screen-ss mx-auto"
                  onSubmit={handleSubmitPassword}
                >
                  <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                    <label htmlFor="login-password">
                      <span className="text-sm text-gray-500">
                        Current Password
                      </span>
                      <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                        {userData && (
                          <>
                            <input
                              type={showPassword ? "text" : "password"}
                              id="currentPassword"
                              name="currentPassword"
                              className={`w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none ${
                                invalidFields.currentPassword
                                  ? "border-red-500"
                                  : ""
                              }`}
                              value={formData.currentPassword}
                              onChange={handleChange}
                              placeholder="Current Password"
                            />
                          </>
                        )}
                      </div>
                      {invalidFields.currentPassword && (
                              <p className="text-red-500 text-xs mt-1">
                                {invalidFields.currentPassword}
                              </p>
                            )}
                    </label>
                    <label htmlFor="login-password">
                      <span className="text-sm text-gray-500">
                        New Password
                      </span>
                      <div className="relative flex flex-col overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                        {userData && (
                          <>
                            <input
                              type={showPassword ? "text" : "password"}
                              id="passWord"
                              name="passWord"
                              className={`w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none ${
                                invalidFields.passWord ? "border-red-500" : ""
                              }`}
                              value={formData.passWord}
                              onChange={handleChange}
                              placeholder="New Password"
                            />                        
                          </>              
                        )}
                      </div>
                      {invalidFields.passWord && (
                              <p className="text-red-500 text-xs mt-1">
                                {invalidFields.passWord}
                              </p>
                            )}
                    </label>
                    <div className="">
                      <button
                        type="button"
                        tabIndex="-1"
                        className="mt-7 ml-2 h-8 w-8 cursor-pointer text-sm font-semibold text-gray-600 underline decoration-2 user-select-none "
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <p className="mt-2">
                    Can't remember your current password.{" "}
                    <a
                      className="text-sm font-semibold text-blue-600 underline decoration-2"
                      href="#"
                    >
                      Recover Account
                    </a>
                  </p>
                  <button
                    type="submit"
                    className="mt-4 rounded-lg bg-sky-700 px-4 py-2 text-white"
                  >
                    Save Password
                  </button>
                </form>
              </div>

              <hr className="mt-4 mb-8" />

              <div className="mb-10">
                <p className="py-2 text-xl font-semibold">Delete Account</p>
                <p className="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Caution!
                </p>
                <p className="mt-2">
                  The ability to delete an account is restricted exclusively to
                  the admin. This means that regular users do not have the
                  permission or capability to delete their own accounts or the
                  accounts of other users.
                </p>
                <button className="ml-auto text-sm font-semibold text-rose-600 underline decoration-2">
                  Attempt to Delete
                </button>
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
  );
}

export default WithAuth(FSettings);
