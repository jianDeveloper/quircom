import React from "react";
import CMainNav from "./CMainNav";
import CFooter from "./CFooter";
import AddBillModal from "./Subscomponents/AddBillModal";

const CSubscribe = () => {
    
  const [billModal, setbillModal] = React.useState(false);

  return (
    <div>
      <div>
        <CMainNav />
      </div>
      <div className="pt-16 pb-8 text-center leading-8 text-gray-800 md:pb-16 lg:pt-20">
        <div className="mb-20 text-center">
          <div className="mb-4 text-gray-800">
            <h2 className="text-4xl font-bold md:text-5xl md:leading-none">
              Elevate your Projects
            </h2>
          </div>
          <p className="mx-auto mb-8 max-w-3xl text-gray-800">
            At Quircom, we believe that every project has its own quirks, and
            finding the right talent to bring those projects to life should be
            easy and exciting.
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
              <p className="mx-auto h-24 max-w-xs px-6 text-xl">Free Forever</p>
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
                  <p className="py-2 text-xl font-semibold">Limited Access</p>
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
                  <p className="py-2 text-xl font-semibold">Market Viewing</p>
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
                  Get Started
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
                  <span className="text-xl leading-tight">₱</span>199 / month
                </p>
              </div>
              <p className="mx-auto h-24 max-w-xs px-6 text-xl">
                Billed annually or ₱199 billed monthly
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
                  <p className="py-2 text-xl font-semibold">Top Leaderboards</p>
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
                  <p className="py-2 text-xl font-semibold">Project Trackers</p>
                </li>
              </ul>
              <div className="my-10 px-2">
                <button
                  type="button"
                  className="block rounded bg-orange-600 py-4 px-10 text-base leading-tight text-white duration-200 ease-in-out md:inline-block lg:py-4"
                  onClick={() => setbillModal(true)}
                >
                  Try Now!
                </button>
                {billModal ? (
                  <AddBillModal setbillModal={setbillModal} />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <CFooter />
      </div>
    </div>
  );
};
export default CSubscribe;
