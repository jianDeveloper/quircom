import React, { useState } from 'react';

const Subscription = () => {
    const [nav, setNav] = useState(false);
    const [openLogin, setLogin] = useState(false);
    return (
        <div class="pt-16 pb-8 text-center leading-8 text-gray-800 md:pb-16 lg:pt-32">
            <div class="mb-20 text-center">
                <div class="mb-4 text-gray-800">
                    <h2 class="text-4xl font-bold md:text-5xl md:leading-none">Elevate your Projects</h2>
                </div>
                <p class="mx-auto mb-8 max-w-3xl text-gray-800">At Quircom, we believe that every project has its own quirks, and finding the right talent to bring those projects to life should be easy and exciting.</p>
                <div class="text-gray-800">
                    <div class="mb-4 inline-block">
                        <a href="#" class="relative flex cursor-pointer items-center pr-12 text-base leading-tight text-sky-800 md:text-xl">See All Features<span class="ml-8">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="mx-auto grid max-w-5xl grid-cols-1 gap-8 text-center md:grid-cols-2">
                <div class="relative text-gray-800">
                    <div class="relative mx-auto flex max-w-sm flex-col overflow-hidden rounded-md border  border-sky-800">
                        <div class="bg-sky-50 py-2 text-xl">Free</div>
                            <div class="py-10 px-4 font-semibold text-xl">
                                <p class="  "><span class="text-xl leading-tight">₱</span>0 / month</p>
                            </div>
                            <p class="mx-auto h-24 max-w-xs px-6 text-xl">Free Forever</p>
                            <ul class="  ">
                                <li class="relative mx-4 mb-2 rounded-md bg-gray-50">
                                    <svg class="absolute ml-4 block h-full align-middle" width="17.5px" viewBox="0 0 18 14" fill="none">
                                    <path d="M5.6 10.6L1.4 6.4L0 7.8L5.6 13.4L17.6 1.4L16.2 0L5.6 10.6Z" fill="currentColor" class="text-sky-800"></path>
                                    </svg>
                                    <p class="py-2 text-xl font-semibold">Limited Access</p>
                                </li>
                                <li class="relative mx-4 mb-2 rounded-md bg-gray-50">
                                    <svg class="absolute ml-4 block h-full align-middle" width="17.5px" viewBox="0 0 18 14" fill="none">
                                    <path d="M5.6 10.6L1.4 6.4L0 7.8L5.6 13.4L17.6 1.4L16.2 0L5.6 10.6Z" fill="currentColor" class="text-sky-800"></path>
                                    </svg>
                                    <p class="py-2 text-xl font-semibold">Market Viewing</p>
                                </li>
                                <li class="relative mx-4 mb-2 rounded-md bg-gray-50">
                                    <svg class="absolute ml-4 block h-full align-middle" width="17.5px" viewBox="0 0 18 14" fill="none">
                                    <path d="M5.6 10.6L1.4 6.4L0 7.8L5.6 13.4L17.6 1.4L16.2 0L5.6 10.6Z" fill="currentColor" class="text-sky-800"></path>
                                    </svg>
                                    <p class="py-2 text-xl font-semibold">No Project</p>
                                </li>
                            </ul>
                            <div class="my-10 px-2">
                                <a class="block cursor-pointer rounded bg-sky-800 py-4 px-10 text-base leading-tight text-white duration-200 ease-in-out md:inline-block lg:py-4" href="#">Get Started</a>
                            </div>
                    </div>
                </div>
                <div class="relative text-gray-800">
                    <div class="absolute top-0 right-0 z-10 -mt-5 -mr-4 flex h-20 w-20 items-center justify-center rounded-full bg-sky-800 px-2 font-bold text-white">
                        <p class="text-base leading-tight">Most Picked</p>
                    </div>
                    <div class="relative mx-auto flex max-w-sm flex-col overflow-hidden rounded-md border  border-orange-500">
                        <div class="bg-orange-500 py-2 text-xl text-white">Premium</div>
                            <div class="py-10 px-4 font-semibold text-xl">
                            <p class="  "><span class="text-xl leading-tight">₱</span>199 / month</p>
                            </div>
                            <p class="mx-auto h-24 max-w-xs px-6 text-xl">Billed annually or ₱199 billed monthly</p>
                            <ul class="  ">
                                <li class="relative mx-4 mb-2 rounded-md bg-gray-50">
                                    <svg class="absolute ml-4 block h-full align-middle" width="17.5px" viewBox="0 0 18 14" fill="none">
                                    <path d="M5.6 10.6L1.4 6.4L0 7.8L5.6 13.4L17.6 1.4L16.2 0L5.6 10.6Z" fill="currentColor" class="text-orange-600"></path>
                                    </svg>
                                    <p class="py-2 text-xl font-semibold">Access all the Features</p>
                                </li>
                                <li class="relative mx-4 mb-2 rounded-md bg-gray-50">
                                    <svg class="absolute ml-4 block h-full align-middle" width="17.5px" viewBox="0 0 18 14" fill="none">
                                    <path d="M5.6 10.6L1.4 6.4L0 7.8L5.6 13.4L17.6 1.4L16.2 0L5.6 10.6Z" fill="currentColor" class="text-orange-600"></path>
                                    </svg>
                                    <p class="py-2 text-xl font-semibold">Top Leaderboards</p>
                                </li>
                                <li class="relative mx-4 mb-2 rounded-md bg-gray-50">
                                    <svg class="absolute ml-4 block h-full align-middle" width="17.5px" viewBox="0 0 18 14" fill="none">
                                    <path d="M5.6 10.6L1.4 6.4L0 7.8L5.6 13.4L17.6 1.4L16.2 0L5.6 10.6Z" fill="currentColor" class="text-orange-600"></path>
                                    </svg>
                                    <p class="py-2 text-xl font-semibold">Project Trackers</p>
                                </li>
                            </ul>
                            <div class="my-10 px-2">
                                <a class="block cursor-pointer rounded bg-orange-600 py-4 px-10 text-base leading-tight text-white duration-200 ease-in-out md:inline-block lg:py-4" href="#">Try it now!</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
export default Subscription