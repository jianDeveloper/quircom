import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WithoutAuth from '../auth/WithoutAuth';

const Subscription = () => {
    const [nav, setNav] = useState(false);
    const [openLogin, setLogin] = useState(false);
    return (
        <section id="subscription" className="pt-16 pb-8 text-center leading-8 text-gray-800 md:pb-16 lg:pt-32">
            <div className="mb-20 text-center">
                <div className="mb-4 text-gray-800">
                    <h2 className="text-4xl font-bold md:text-5xl md:leading-none">Elevate your Projects</h2>
                </div>
                <p className="mx-auto mb-8 max-w-3xl text-gray-800">At Quircom, we believe that every project has its own quirks, and finding the right talent to bring those projects to life should be easy and exciting.</p>
                <div className="text-gray-800">
                    <div className="mb-4 inline-block">
                        <a href="#" className="relative flex cursor-pointer items-center pr-12 text-base leading-tight text-sky-800 md:text-xl">See All Features<span className="ml-8">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 text-center md:grid-cols-2">
                <div className="relative text-gray-800">
                    <div className="relative mx-auto flex max-w-sm flex-col overflow-hidden rounded-md border  border-sky-800">
                        <div className="bg-sky-50 py-2 text-xl">Free</div>
                            <div className="py-10 px-4 font-semibold text-xl">
                                <p className="  "><span className="text-xl leading-tight">₱</span>0 / month</p>
                            </div>
                            <p className="mx-auto h-24 max-w-xs px-6 text-xl">Free Forever</p>
                            <ul className="  ">
                                <li className="relative mx-4 mb-2 rounded-md bg-gray-50">
                                    <svg className="absolute ml-4 block h-full align-middle" width="17.5px" viewBox="0 0 18 14" fill="none">
                                    <path d="M5.6 10.6L1.4 6.4L0 7.8L5.6 13.4L17.6 1.4L16.2 0L5.6 10.6Z" fill="currentColor" className="text-sky-800"></path>
                                    </svg>
                                    <p className="py-2 text-xl font-semibold">Limited Access</p>
                                </li>
                                <li className="relative mx-4 mb-2 rounded-md bg-gray-50">
                                    <svg className="absolute ml-4 block h-full align-middle" width="17.5px" viewBox="0 0 18 14" fill="none">
                                    <path d="M5.6 10.6L1.4 6.4L0 7.8L5.6 13.4L17.6 1.4L16.2 0L5.6 10.6Z" fill="currentColor" className="text-sky-800"></path>
                                    </svg>
                                    <p className="py-2 text-xl font-semibold">Market Viewing</p>
                                </li>
                                <li className="relative mx-4 mb-2 rounded-md bg-gray-50">
                                    <svg className="absolute ml-4 block h-full align-middle" width="17.5px" viewBox="0 0 18 14" fill="none">
                                    <path d="M5.6 10.6L1.4 6.4L0 7.8L5.6 13.4L17.6 1.4L16.2 0L5.6 10.6Z" fill="currentColor" className="text-sky-800"></path>
                                    </svg>
                                    <p className="py-2 text-xl font-semibold">No Project</p>
                                </li>
                            </ul>
                            <div className="my-10 px-2">
                                <Link className="block cursor-pointer rounded bg-sky-800 py-4 px-10 text-base leading-tight text-white duration-200 ease-in-out md:inline-block lg:py-4" to={'/registration'}>Get Started</Link>
                            </div>
                    </div>
                </div>
                <div className="relative text-gray-800">
                    <div className="absolute top-0 right-0 z-10 -mt-5 -mr-4 flex h-20 w-20 items-center justify-center rounded-full bg-sky-800 px-2 font-bold text-white">
                        <p className="text-base leading-tight">Most Picked</p>
                    </div>
                    <div className="relative mx-auto flex max-w-sm flex-col overflow-hidden rounded-md border  border-orange-500">
                        <div className="bg-orange-500 py-2 text-xl text-white">Premium</div>
                            <div className="py-10 px-4 font-semibold text-xl">
                            <p className="  "><span className="text-xl leading-tight">₱</span>199 / month</p>
                            </div>
                            <p className="mx-auto h-24 max-w-xs px-6 text-xl">Billed annually or ₱199 billed monthly</p>
                            <ul className="  ">
                                <li className="relative mx-4 mb-2 rounded-md bg-gray-50">
                                    <svg className="absolute ml-4 block h-full align-middle" width="17.5px" viewBox="0 0 18 14" fill="none">
                                    <path d="M5.6 10.6L1.4 6.4L0 7.8L5.6 13.4L17.6 1.4L16.2 0L5.6 10.6Z" fill="currentColor" className="text-orange-600"></path>
                                    </svg>
                                    <p className="py-2 text-xl font-semibold">Access all the Features</p>
                                </li>
                                <li className="relative mx-4 mb-2 rounded-md bg-gray-50">
                                    <svg className="absolute ml-4 block h-full align-middle" width="17.5px" viewBox="0 0 18 14" fill="none">
                                    <path d="M5.6 10.6L1.4 6.4L0 7.8L5.6 13.4L17.6 1.4L16.2 0L5.6 10.6Z" fill="currentColor" className="text-orange-600"></path>
                                    </svg>
                                    <p className="py-2 text-xl font-semibold">Top Leaderboards</p>
                                </li>
                                <li className="relative mx-4 mb-2 rounded-md bg-gray-50">
                                    <svg className="absolute ml-4 block h-full align-middle" width="17.5px" viewBox="0 0 18 14" fill="none">
                                    <path d="M5.6 10.6L1.4 6.4L0 7.8L5.6 13.4L17.6 1.4L16.2 0L5.6 10.6Z" fill="currentColor" className="text-orange-600"></path>
                                    </svg>
                                    <p className="py-2 text-xl font-semibold">Project Trackers</p>
                                </li>
                            </ul>
                            <div className="my-10 px-2">
                                <Link className="block cursor-pointer rounded bg-orange-600 py-4 px-10 text-base leading-tight text-white duration-200 ease-in-out md:inline-block lg:py-4" to={'/registration'}>Try it now!</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    )
}
export default WithoutAuth(Subscription)