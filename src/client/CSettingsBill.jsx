import React, {useState} from 'react'
import { Link } from 'react-router-dom';

import Header from './Header'

function CSettingsBill() {

  return (
    <div className=''>
      <Header />
      <div className='flex'>
      <div class="mx-4  max-w-screen-xl sm:mx-8 xl:mx-auto">
        <h1 class="border-b py-6 text-4xl font-extrabold text-[30px] text-[#1D5B79]">SETTINGS</h1>
        <div class="grid grid-cols-8 pt-3 pb-10 sm:grid-cols-10">
          <div class="relative my-4 w-56 sm:hidden">
            <input class="peer hidden" type="checkbox" name="select-1" id="select-1" />
            <label for="select-1" class="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-700 peer-checked:ring">Accounts </label>
            <svg xmlns="http://www.w3.org/2000/svg" class="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transition peer-checked:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            <ul class="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
              <Link to="/client/settings">
                <li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Accounts</li>
              </Link>
              <Link to="/client/settings-profile">
                <li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Portfolio</li>
              </Link>
              <Link to="/client/settings-bill">
                <li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Billing</li>
              </Link>
            </ul>
          </div>

          <div class="col-span-2 hidden sm:block">
            <ul>
              <Link to="/client/settings">
                <li class="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700">Accounts</li>
              </Link>
              <Link to="/client/settings-profile">
                <li class="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700">Profile</li>
              </Link>
              <Link to="/client/settings-bill">
                <li class="mt-5 cursor-pointer border-l-2 border-l-blue-700 px-2 py-2 font-semibold text-blue-700 transition hover:border-l-blue-700 hover:text-blue-700">Billing</li>
              </Link>
            </ul>
          </div>

          <div class="col-span-8 rounded-xl sm:bg-[#F7F6DF] sm:px-8 sm:shadow">
            <div class="pt-4">
              <h1 class="py-2 text-2xl font-semibold">Billing settings</h1>
              <p class="font- text-slate-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>
            
            <hr class="mt-4 mb-8" />

            <div class="mb-10 grid gap-y-8 lg:grid-cols-2 lg:gap-y-0">
              <div class="space-y-8">
                <div class="">
                  <div class="flex">
                    <p class="font-medium mb-1">Billing Period</p>
                    <button class="ml-auto inline-flex text-sm font-semibold text-blue-600 underline decoration-2">Change</button>
                  </div>
                  <div class="flex items-center rounded-md border border-gray-100 bg-white py-3 shadow">
                    <p class="ml-4 w-56">
                      <strong class="block text-lg font-medium">MONTHLY</strong>
                      <span class="text-xs text-gray-400"> Next Renewal: 4 Jan 2022 </span>
                    </p>
                  </div>
                </div>
              <div class="">
                <div class="flex">
                  <p class="font-medium mb-1">Payment Method</p>
                  <button class="ml-auto inline-flex text-sm font-semibold text-blue-600 underline decoration-2">Change</button>
                </div>
                <div class="flex items-center rounded-md border border-gray-100 bg-white py-3 shadow">
                  <img class="h-10 object-contain pl-4" src="/images/kt10d0A1TgzZpAoNM_YPX.png" alt="" />
                  <p class="ml-4 w-56">
                    <strong class="block text-lg font-medium">**** **** **** 453 </strong>
                    <strong class="block text-lg font-medium">ALBERT K. DANIEL </strong>
                    <span class="text-xs text-gray-400"> Expires on: Dec 2024 </span>
                  </p>
                </div>
              </div>
            </div>

            <div class="grid gap-y-6 gap-x-3 sm:grid-cols-2 lg:px-8">
              <label class="block" for="name">
                <p class="text-sm">Name</p>
                <input class="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1" type="text" value="Shakir Ali" />
              </label>
              <label class="block" for="name">
                <p class="text-sm">Email Address</p>
                <input class="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1" type="text" value="shakir.ali@corpora.de" />
              </label>
              <label class="block sm:col-span-2" for="name">
                <p class="text-sm">Billing Address</p>
                <input class="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1" type="text" value="82844 Boyle Extension Suite 541 - Covington, HI / 28013" />
              </label>
              <label class="block" for="name">
                <p class="text-sm">VAT #</p>
                <input class="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1" type="text" value="6346322" />
              </label>
              <label class="block" for="name">
                <p class="text-sm">Country</p>
                <input class="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1" type="text" value="Germany" />
              </label>
            </div>
          </div>

              <div class="amx-auto mb-10 overflow-hidden rounded-lg border bg-white">
                <p class="mb-6 bg-gray-100 py-1 text-center text-lg font-medium">Billing History</p>
                <table class="w-full">
                  <thead>
                    <td class="text-center font-semibold">Date</td>
                    <td class="text-center font-semibold">Invoice #</td>
                    <td class="text-center font-semibold">Amount</td>
                    <td class="text-center font-semibold"></td>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border-b py-2 text-center text-sm">23 Nov 2021</td>
                      <td class="border-b py-2 text-center text-sm">X-543242</td>
                      <td class="border-b py-2 text-center text-sm">$99.00</td>
                      <td class="border-b py-2 text-center text-sm"><button class="text-sm text-blue-600 underline">PDF</button></td>
                    </tr>
                    <tr>
                      <td class="border-b py-2 text-center text-sm">23 Nov 2021</td>
                      <td class="border-b py-2 text-center text-sm">X-543242</td>
                      <td class="border-b py-2 text-center text-sm">$99.00</td>
                      <td class="border-b py-2 text-center text-sm"><button class="text-sm text-blue-600 underline">PDF</button></td>
                    </tr>
                    <tr>
                      <td class="border-b py-2 text-center text-sm">23 Nov 2021</td>
                      <td class="border-b py-2 text-center text-sm">X-543242</td>
                      <td class="border-b py-2 text-center text-sm">$99.00</td>
                      <td class="border-b py-2 text-center text-sm"><button class="text-sm text-blue-600 underline">PDF</button></td>
                    </tr>
                    <tr>
                      <td class="border-b py-2 text-center text-sm">23 Nov 2021</td>
                      <td class="border-b py-2 text-center text-sm">X-543242</td>
                      <td class="border-b py-2 text-center text-sm">$99.00</td>
                      <td class="border-b py-2 text-center text-sm"><button class="text-sm text-blue-600 underline">PDF</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center h-[5vh] z-[5] bg-[#163646] text-gray-300 font-bolds">
        <h1 className='py-1'>QUIRCOM © 2024 | All Rights Reserved</h1>
      </div>
    </div>
  )
}

export default CSettingsBill