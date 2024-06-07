import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CMainNav from "./CMainNav";
import CFooter from "./CFooter";
import WithAuth from "../auth/WithAuth";
import axios from "axios";
import Loader from "../assets/quircomloading.gif";
import { ToastContainer, toast } from "react-toastify";
import BGSubs from "../assets/icon00.png";

const CSubscribe = () => {
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [userData, setUsers] = useState();
  const [referenceNumber, setReferenceNumber] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const response = await axios.get(
          `https://quircom.onrender.com/api/client/${userId}`,
          { headers }
        );
        if (response.status === 200) {
          setUsers(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [userId]);

  const createLink = async () => {
    try {
      const requestBody = {
        data: {
          attributes: {
            amount: 19900,
            description: "Subscription Payment",
          },
        },
      };

      const createLinkResponse = await axios.post(
        "https://api.paymongo.com/v1/links",
        requestBody,
        {
          headers: {
            accept: "application/json",
            Authorization: `Basic ${import.meta.env.VITE_PAYMONGO_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const referenceNumber =
        createLinkResponse.data.data.attributes.reference_number;
      setReferenceNumber(referenceNumber);
      window.open(
        createLinkResponse.data.data.attributes.checkout_url,
        "_blank"
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let intervalId;

    const checkPaymentStatus = async () => {
      if (!referenceNumber) {
        clearInterval(intervalId); // Stop if there's no reference number
        return;
      }

      try {
        const response = await axios.get(
          `https://api.paymongo.com/v1/links?reference_number=${referenceNumber}`,
          {
            headers: {
              accept: "application/json",
              authorization: `Basic ${import.meta.env.VITE_PAYMONGO_KEY}`,
            },
          }
        );

        const status = response.data.data[0].attributes.status;
        if (status === "paid") {
          setPaymentStatus("Payment was successful");
          clearInterval(intervalId); // Stop checking once payment is successful

          const updateStatus = async () => {
            try {
              const token = localStorage.getItem("authToken");
              const headers = {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              };

              const requestBody = {
                subs: {
                  status: true,
                },
              };

              const patchResponse = await axios.patch(
                `https://quircom.onrender.com/api/client/status/${userId}`,
                requestBody,
                { headers }
              );

              if (patchResponse && patchResponse.data) {
                toast.success("Payment is successful");
              } else {
                // console.log("Response data not available");
                toast.error("Payment is not successful");
              }
            } catch (error) {
              console.error(
                "Error during status update: ",
                error.response || error.message
              );
              toast.error("Unexpected problem occurred during status update");
            }
          };

          const updateBilling = async () => {
            try {
              const token = localStorage.getItem("authToken");
              const headers = {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              };

              const requestBody = {
                billing: {
                  amount: response.data.data[0].attributes.amount,
                  name: response.data.data[0].attributes.payments[0].data
                    .attributes.billing.name,
                  refNum: response.data.data[0].attributes.reference_number,
                  paymentNum:
                    response.data.data[0].attributes.payments[0].data.attributes
                      .billing.phone,
                  paymentMethod:
                    response.data.data[0].attributes.payments[0].data.attributes
                      .source.type,
                },
              };

              const patchResponse = await axios.patch(
                `https://quircom.onrender.com/api/client/billing/${userId}`,
                requestBody,
                { headers }
              );

              if (patchResponse && patchResponse.data) {
                toast.success("Uploaded successfully", {
                  autoClose: 2000,
                  onClose: () => {
                    setTimeout(() => {
                      window.location.reload();
                    }, 2000);
                  },
                });
              } else {
                // console.log("Response data not available");
                toast.error("Payment is not successful");
              }
            } catch (error) {
              console.error(
                "Error during billing update: ",
                error.response || error.message
              );
              toast.error("Unexpected problem occurred during billing update");
            }
          };

          await updateStatus();
          await updateBilling();
        } else {
          setPaymentStatus("Payment not completed yet");
        }
      } catch (error) {
        console.error("Error checking payment status: ", error);
        setPaymentStatus("Error checking payment status");
      }
    };

    intervalId = setInterval(checkPaymentStatus, 2000); // Set up the interval

    return () => clearInterval(intervalId); // Clean up on unmount
  }, [referenceNumber, userId]);

  return (
    <div>
      <div>
        <CMainNav />
      </div>
      <div className="pt-16 pb-8 text-center leading-8 text-gray-800 md:pb-16 lg:pt-20">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <img src={Loader} alt="Loading..." style={{ height: "100px" }} />
          </div>
        ) : userData && userData.subs && userData.subs.status === true ? (
          <div className="mb-20 text-center">
            <div className="mb-4 text-gray-800">
              <h2 className="text-4xl font-bold md:text-5xl md:leading-none">
                Find Services Now!
              </h2>
            </div>
            <p className="mx-auto mb-8 max-w-3xl text-gray-800">
              Discovering the perfect talent to bring your unique projects to
              life should be a breeze. Let's make it easy and exhilarating
              together.
            </p>
            <Link to={`/client/browse-service/${userId}`}>
              <div className="mx-auto w-1/4 relative rounded-md shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] bg-gradient-to-tr from-sky-600 to-sky-800 p-6 ">
                <button className="text-white font-bold text-2xl">
                  Go to Marketplace!
                </button>
                <img
                  className="max-w-full rounded-lg transition-transform duration-300 hover:rotate-12"
                  src={BGSubs}
                  alt="Quircom Motion"
                />
              </div>
            </Link>
          </div>
        ) : (
          <div className="pt-16 pb-8 text-center leading-8 text-gray-800 md:pb-16 lg:pt-20">
            <ToastContainer />
            <div className="mb-20 text-center">
              <div className="mb-4 text-gray-800">
                <h2 className="text-4xl font-bold md:text-5xl md:leading-none">
                  Elevate your Projects
                </h2>
              </div>
              <p className="mx-auto mb-8 max-w-3xl text-gray-800">
                At Quircom, we believe that every project has its own quirks,
                and finding the right talent to bring those projects to life
                should be easy and exciting.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 text-center md:grid-cols-2">
              <div className="relative text-gray-800">
                <div className="relative mx-auto flex max-w-sm flex-col overflow-hidden rounded-md border  border-sky-800">
                  <div className="bg-sky-50 py-2 text-xl">Free</div>
                  <div className="py-10 px-4 font-semibold text-xl">
                    <p className="  ">
                      <span className="text-xl leading-tight">₱</span>0 / month
                    </p>
                  </div>
                  <p className="mx-auto h-24 max-w-xs px-6 text-xl">
                    Free Access!
                  </p>
                  <ul className="  ">
                    <li className="relative mx-4 mb-2 rounded-md bg-gray-50">
                      <svg
                        className="absolute ml-4 block h-full align-middle"
                        width="17.5px"
                        viewBox="0 0 18 14"
                        fill="none"
                      >
                        <path
                          d="M5.6 10.6L1.4 6.4L0 7.8L5.6 13.4L17.6 1.4L16.2 0L5.6 10.6Z"
                          fill="currentColor"
                          className="text-sky-800"
                        ></path>
                      </svg>
                      <p className="py-2 text-xl font-semibold">
                        Limited Access
                      </p>
                    </li>
                    <li className="relative mx-4 mb-2 rounded-md bg-gray-50">
                      <svg
                        className="absolute ml-4 block h-full align-middle"
                        width="17.5px"
                        viewBox="0 0 18 14"
                        fill="none"
                      >
                        <path
                          d="M5.6 10.6L1.4 6.4L0 7.8L5.6 13.4L17.6 1.4L16.2 0L5.6 10.6Z"
                          fill="currentColor"
                          className="text-sky-800"
                        ></path>
                      </svg>
                      <p className="py-2 text-xl font-semibold">
                        Market Viewing
                      </p>
                    </li>
                    <li className="relative mx-4 mb-2 rounded-md bg-gray-50">
                      <svg
                        className="absolute ml-4 block h-full align-middle"
                        width="17.5px"
                        viewBox="0 0 18 14"
                        fill="none"
                      >
                        <path
                          d="M5.6 10.6L1.4 6.4L0 7.8L5.6 13.4L17.6 1.4L16.2 0L5.6 10.6Z"
                          fill="currentColor"
                          className="text-sky-800"
                        ></path>
                      </svg>
                      <p className="py-2 text-xl font-semibold">No Project</p>
                    </li>
                  </ul>
                  <div className="my-10 px-2">
                    <a
                      className="block cursor-pointer rounded bg-sky-800 py-4 px-10 text-base leading-tight text-white duration-200 ease-in-out md:inline-block lg:py-4"
                      href="#"
                    >
                      Current Plan
                    </a>
                  </div>
                </div>
              </div>
              <div className="relative text-gray-800">
                <div className="absolute top-0 right-0 z-10 -mt-5 -mr-4 flex h-20 w-20 items-center justify-center rounded-full bg-sky-800 px-2 font-bold text-white">
                  <p className="text-base leading-tight">Most Picked</p>
                </div>
                <div className="relative mx-auto flex max-w-sm flex-col overflow-hidden rounded-md border  border-orange-500">
                  <div className="bg-orange-500 py-2 text-xl text-white">
                    Premium
                  </div>
                  <div className="py-10 px-4 font-semibold text-xl">
                    <p className="  ">
                      <span className="text-xl leading-tight">₱</span>199 /
                      month
                    </p>
                  </div>
                  <p className="mx-auto h-24 max-w-xs px-6 text-xl">
                    Billed Monthly
                  </p>
                  <ul className="  ">
                    <li className="relative mx-4 mb-2 rounded-md bg-gray-50">
                      <svg
                        className="absolute ml-4 block h-full align-middle"
                        width="17.5px"
                        viewBox="0 0 18 14"
                        fill="none"
                      >
                        <path
                          d="M5.6 10.6L1.4 6.4L0 7.8L5.6 13.4L17.6 1.4L16.2 0L5.6 10.6Z"
                          fill="currentColor"
                          className="text-orange-600"
                        ></path>
                      </svg>
                      <p className="py-2 text-xl font-semibold">
                        Access all the Features
                      </p>
                    </li>
                    <li className="relative mx-4 mb-2 rounded-md bg-gray-50">
                      <svg
                        className="absolute ml-4 block h-full align-middle"
                        width="17.5px"
                        viewBox="0 0 18 14"
                        fill="none"
                      >
                        <path
                          d="M5.6 10.6L1.4 6.4L0 7.8L5.6 13.4L17.6 1.4L16.2 0L5.6 10.6Z"
                          fill="currentColor"
                          className="text-orange-600"
                        ></path>
                      </svg>
                      <p className="py-2 text-xl font-semibold">
                        Top Leaderboards
                      </p>
                    </li>
                    <li className="relative mx-4 mb-2 rounded-md bg-gray-50">
                      <svg
                        className="absolute ml-4 block h-full align-middle"
                        width="17.5px"
                        viewBox="0 0 18 14"
                        fill="none"
                      >
                        <path
                          d="M5.6 10.6L1.4 6.4L0 7.8L5.6 13.4L17.6 1.4L16.2 0L5.6 10.6Z"
                          fill="currentColor"
                          className="text-orange-600"
                        ></path>
                      </svg>
                      <p className="py-2 text-xl font-semibold">
                        Project Trackers
                      </p>
                    </li>
                  </ul>
                  <div className="my-10 px-2">
                    <button
                      type="button"
                      className="block rounded bg-orange-600 py-4 px-10 text-base leading-tight text-white duration-200 ease-in-out md:inline-block lg:py-4"
                      onClick={createLink}
                    >
                      Try Now!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        <CFooter />
      </div>
    </div>
  );
};

export default WithAuth(CSubscribe);
