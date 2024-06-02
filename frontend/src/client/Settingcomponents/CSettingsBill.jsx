import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/UserContext";

import CFooter from "../CFooter";
import CMainNav from "../CMainNav";

import WithAuth from "../../auth/WithAuth";

function CSettingsBill() {
  const { userId } = useParams();
  const [userData, setUsers] = useState(null);
  const [nav, setNav] = useState(false);
  const [loading, setLoading] = useState(true);

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
        }
        //console.log("Try:", userData.billing.name);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
    
  }, []);

  //console.log(userData)
  
  function formatAmount(amount) {
    return (amount / 100).toFixed(2); // Divide by 100 and format to 2 decimal places
  }

  return (
    <div className="">
      <CMainNav />
      <div className="flex">
        <div className="mx-4  max-w-screen-xl sm:mx-8 xl:mx-auto">
          <h1 className="border-b py-6 text-4xl font-extrabold text-[30px] text-[#1D5B79]">
            SETTINGS
          </h1>
          <div className="grid grid-cols-8 pt-3 pb-10 sm:grid-cols-10">
            <div className="relative my-4 w-56 sm:hidden">
              <input
                className="peer hidden"
                type="checkbox"
                name="select-1"
                id="select-1"
              />
              <label
                for="select-1"
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
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              <ul className="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
                <Link to={`/client/settings/${userId}`}>
                  <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">
                    Accounts
                  </li>
                </Link>
                <Link to={`/client/settings-profile/${userId}`}>
                  <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">
                    Portfolio
                  </li>
                </Link>
                <Link to={`/client/settings-bill/${userId}`}>
                  <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">
                    Billing
                  </li>
                </Link>
              </ul>
            </div>

            <div className="col-span-2 hidden sm:block">
              <ul>
                <Link to={`/client/settings/${userId}`}>
                  <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700">
                    Accounts
                  </li>
                </Link>
                <Link to={`/client/settings-profile/${userId}`}>
                  <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700">
                    Profile
                  </li>
                </Link>
                <Link to={`/client/settings-bill/${userId}`}>
                  <li className="mt-5 cursor-pointer border-l-2 border-l-blue-700 px-2 py-2 font-semibold text-blue-700 transition hover:border-l-blue-700 hover:text-blue-700">
                    Billing
                  </li>
                </Link>
              </ul>
            </div>

            <div className="col-span-8 rounded-xl sm:bg-[#F7F6DF] sm:px-8 sm:shadow">
              <div className="pt-4">
                <h1 className="py-2 text-2xl font-semibold">
                  Billing Settings
                </h1>
                <p className="font- text-slate-600">
                  Here is your detail for your billing.
                </p>
              </div>
              <hr className="mt-4 mb-8" />
              <div className="mb-10 grid gap-y-8 lg:grid-cols-2 lg:gap-y-0">
                <div className="space-y-8">
                  <div className="">
                    <div className="flex">
                      <p className="font-medium mb-1">Billing Status</p>
                    </div>
                    <div className="flex items-center rounded-md border border-gray-100 bg-white py-3 shadow">
                      <p className="ml-4 w-56">
                        {userData && (
                          <>
                            <strong className="block text-lg font-medium">
                              {userData.subs.status
                                ? "Subscribed"
                                : "Not Subscribed"}
                            </strong>
                            <span className="text-xs text-gray-400">
                              Expires on: {new Date(userData.subs.dateSubscribed).toLocaleDateString()}
                            </span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="">
                    <div className="flex">
                      <p className="font-medium mb-1">Payment Method</p>
                    </div>
                    <div className="flex items-center rounded-md border border-gray-100 bg-white py-3 shadow">
                      <p className="ml-4 w-56">
                        {userData && (
                          <>
                            <strong className="block text-lg font-medium uppercase">
                              {userData.billing.paymentMethod}
                            </strong>
                            <span className="text-xs text-gray-400">
                              Expires on:{" "}
                              {new Date(userData.subs.dateExpire).toLocaleDateString()}
                            </span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-y-6 gap-x-3 mt-2 sm:grid-cols-2 lg:px-8">
                  <label className="block" for="name">
                    <p className="text-sm">Name</p>
                    {userData && (
                      <>
                        <input
                          className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
                          type="text"
                          value={userData.billing.name}
                          readOnly
                        />
                      </>
                    )}
                  </label>
                  <label className="block" for="name">
                    <p className="text-sm">Contacts</p>
                    {userData && (
                      <>
                        <input
                          className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
                          type="text"
                          value={userData.billing.paymentNum}
                        />
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div className="amx-auto mb-10 overflow-hidden rounded-lg border bg-white">
                <p className="mb-6 bg-[#1D5B79] py-1 text-center text-lg font-medium text-white">
                  Billing History
                </p>
                <table className="w-full">
                  <thead>
                    <td className="text-center font-semibold">Date</td>
                    <td className="text-center font-semibold">Reference No.</td>
                    <td className="text-center font-semibold">Amount</td>
                  </thead>
                  <tbody>
                  {userData && (
                    <>
                    <tr>
                      <td className="border-b py-2 text-center text-sm">
                      {new Date(userData.subs.dateExpire).toLocaleDateString()}
                      </td>
                      <td className="border-b py-2 text-center text-sm">
                      {userData.billing.refNum}
                      </td>
                      <td className="border-b py-2 text-center text-sm">
                      ₱ {formatAmount(userData.billing.amount)}
                      </td>
                    </tr>
                    </>
                    )}
                  </tbody>
                </table>
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
  );
}

export default WithAuth(CSettingsBill);
