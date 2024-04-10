import React from "react";

import { CiImageOn } from "react-icons/ci";

function AddAboutus({ brgy }) {
//   const [submitClicked, setSubmitClicked] = useState(false);
//   const [creationStatus, setCreationStatus] = useState(null);
//   const [error, setError] = useState(null);
//   const [aboutus, setAboutus] = useState({
//     brgy: brgy,
//     title: "",
//     details: "",
//   });

//   const [banner, setBanner] = useState();

//   const navigate = useNavigate();

//   const handleBannerChange = (e) => {
//     setBanner(e.target.files[0]);

//     var output = document.getElementById("add_banner");
//     output.src = URL.createObjectURL(e.target.files[0]);
//     output.onload = function () {
//       URL.revokeObjectURL(output.src); // free memory
//     };
//   };

//   const handleChange = (e) => {
//     // if (e.target.classList.contains("border-red-500")) {
//     //   e.target.classList.remove("border-red-500");
//     // }
//     setAboutus((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     try {
//       e.preventDefault();

//       // Check for empty fields
//       if (!aboutus.title.trim() || !aboutus.details.trim() || !banner) {
//         setError("Please fill out all required fields.");
//         return; // Prevent further execution of handleSubmit
//       }

//       // Reset form state and perform submission logic
//       setSubmitClicked(true);
//       setError(null);

//       const response = await axios.get(
//         `${API_LINK}/folder/specific/?brgy=${brgy}`
//       );
      

//       // Create form data
//       if (response.status === 200) {
//         const formData = new FormData();
//         formData.append("file", banner);
//         formData.append(
//           "aboutusinfo",
//           JSON.stringify({
//             brgy: aboutus.brgy,
//             title: aboutus.title,
//             details: aboutus.details,
//           })
//         );

//         // Submit form data
//         const result = await axios.post(`${API_LINK}/aboutus/?folder_id=${response.data[0].about_us}`, formData);
//         if (result.status === 200) {
//           // Reset form fields
//           setAboutus({
//             brgy: "",
//             title: "",
//             details: "",
//           });
//           setBanner(null);
//           setSubmitClicked(false);
//           setCreationStatus("success");
//           setTimeout(() => {
//             window.location.reload();
//           }, 3000);
//         }
//       }

     
//     } catch (err) {
//       console.error(err);
//       setSubmitClicked(false);
//       setCreationStatus(null);
//       setError("An error occurred while creating the info.");
//     }
//   };
//   const resetForm = () => {
//     setAboutus({
//       brgy: "", // Reset to the initial value or keep the initial brgy if needed
//       title: "",
//       details: "",
//     });
//     setBanner(null); // Assuming null is the initial state of banner
//     setError(null);
//   };

  return (
    <div>
      <div
        id="hs-modal-addaboutus"
        className="hs-overlay hidden fixed top-0 left-0 z-[80] w-full h-full overflow-x-hidden overflow-y-auto flex items-center justify-center "
      >
        {/* Modal */}
        <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 px-3 py-5 md:px-5 opacity-0 transition-all w-full h-auto">
          <div className="flex flex-col bg-white shadow-sm rounded-t-3xl rounded-b-3xl w-full h-full md:max-w-xl lg:max-w-2xl xxl:max-w-3xl mx-auto max-h-screen">
            {/* Header */}
            <div className="py-5 px-3 flex justify-between items-center bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#408D51] to-[#295141]  overflow-hidden rounded-t-2xl">
              <h3
                className="font-bold text-white mx-auto md:text-xl text-center"
                style={{ letterSpacing: "0.3em" }}
              >
                ADD HOMEPAGE ABOUT US
              </h3>
            </div>

            <div className="flex flex-col mx-auto w-full py-5 px-5 overflow-y-auto relative h-[470px]">
              {/* {error && (
                <div
                  className="max-w-full border-2 mb-4 border-[#bd4444] rounded-xl shadow-lg bg-red-300"
                  role="alert"
                >
                  <div className="flex p-4">
                    <div className="flex-shrink-0">
                      <svg
                        className="flex-shrink-0 h-4 w-4 text-red-600 mt-0.5"
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                      </svg>
                    </div>
                    <div className="ms-3">
                      <p className="text-sm text-gray-700 font-medium ">
                        {error}
                      </p>
                    </div>
                  </div>
                </div>
              )} */}
              <div className="flex mb-4 w-full flex-col md:flex-row sm:space-x-0 md:space-x-2 sm:space-y-2 md:space-y-0">
                <div className="w-full">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Banner
                  </label>
                  <div className="flex flex-col items-center space-y-2 relative">
                    <div className="w-full border border-gray-300">
                      <img
                        className={` w-[200px] md:w-[250px]  lg:w-full md:h-[140px] lg:h-[250px] object-cover`}
                        id="add_banner"
                        alt="Current profile photo"
                      />{" "}
                      <CiImageOn
                        size={250}
                        className={` mx-auto`}
                      />
                    </div>
                    <label
                      className={`w-full bg-white border  `}
                    >
                      <span className="sr-only">Choose banner photo</span>
                      <input
                        required
                        type="file"
                       
                        name="banner"
                        accept="image/*"
                  
                        className={`block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4  file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100`}
                      />
                    </label>
                  </div>
                  
                </div>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="title"
                >
                  ARTICLE TITLE
                </label>
                <input
                  id="title"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-green-500 focus:ring-green-500 focus:outline-none focus:shadow-outline `}
                  name="title"
                  type="text"
                
                  placeholder="Article name"
                />
               
              </div>
              <div className="mb-4">
                <label
                  htmlFor="details"
                  className="block mb-2 text-sm font-bold text-gray-700 "
                >
                  DETAILS
                </label>
                <textarea
                  id="details"
                  rows={4}
                  name="details"
                 
                  className={`block p-2.5 w-full text-sm text-gray-700  rounded-lg border focus:border-green-500 focus:ring-green-500 focus:outline-none focus:shadow-outline `}
                  placeholder="Enter article details..."
                />
              
              </div>
            </div>
            <div className="flex justify-center items-center gap-x-2 py-3 px-6 dark:border-gray-700">
              <div className="sm:space-x-0 md:space-x-2 sm:space-y-2 md:space-y-0 w-full flex sm:flex-col md:flex-row">
                <button
                  type="submit"
                  className="h-[2.5rem] w-full py-1 px-6 gap-2 rounded-md borde text-sm font-base bg-[#295141] text-white shadow-sm"
                 
                >
                  CREATE
                </button>
                <button
                  type="button"
                  className="h-[2.5rem] w-full py-1 px-6  gap-2 rounded-md borde text-sm font-base bg-pink-800 text-white shadow-sm"
                  data-hs-overlay="#hs-modal-addaboutus"
               
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default AddAboutus;
