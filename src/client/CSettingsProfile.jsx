import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import '../client/profile.css'
import NavHeader from './Header'

function CSettingsProfile(props) {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  return (
    <div className=''>
      <NavHeader />
      <div className='flex'>
        <div class="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto">
          <h1 class="border-b py-6 text-4xl font-extrabold text-[30px] text-[#1D5B79]">SETTINGS</h1>
          <div class="grid grid-cols-8 pt-3 sm:grid-cols-10">
            <div class="relative my-4 w-56 sm:hidden">
              <input class="peer hidden" type="checkbox" name="select-1" id="select-1" />
              <label for="select-1" class="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-700 peer-checked:ring">Accounts </label>
              <svg xmlns="http://www.w3.org/2000/svg" class="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transition peer-checked:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              <ul class="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
                <li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Accounts</li>
                <li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Profile</li>
                <li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Billing</li>
              </ul>
            </div>

            <div class="col-span-2 hidden sm:block">
              <ul>
                <Link to="/client/settings">
                    <li class="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700">Accounts</li>
                </Link>
                <Link to="/client/settings-profile">
                    <li class="mt-5 cursor-pointer border-l-2 border-l-blue-700 px-2 py-2 font-semibold text-blue-700 transition hover:border-l-blue-700 hover:text-blue-700">Profile</li>
                </Link>
                <Link to="/client/settings-bill">
                    <li class="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700">Billing</li>
                </Link>
              </ul>
            </div>

            <div class="col-span-8 overflow-hidden rounded-xl sm:bg-[#F7F6DF] sm:px-8 sm:shadow">
              <div class="pt-4">
                <h1 class="py-2 text-2xl font-semibold">Profile settings</h1>
                <p class="font- text-slate-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
              </div>
              <hr class="mt-4 mb-8" />
              <p class="py-2 text-xl font-semibold">Account Handle</p>
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <p class="text-gray-600">Your account is <strong>John Doe</strong></p>
              </div>
              <hr class="mt-4 mb-8" />
              {/* PORTFOLIO ZONE */}
              <p class="py-2 text-xl font-semibold">Portfolio</p>
              <div class="flex items-center">
                <section className="container">
                  <div {...getRootProps({className: 'dropzone'})}>
                    <input {...getInputProps()} />
                    <p >Drag 'n' drop some files here, or click to select files</p>
                  </div>
                  <aside>
                    <ul>{files}</ul>
                  </aside>
                </section>
              </div>
              <button class="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white">Save Password</button>
              <hr class="mt-4 mb-8" />

              <div class="mb-10">
                <p class="py-2 text-xl font-semibold">Delete Portfolio</p>
                <p class="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  Proceed with caution
                </p>
                <p class="mt-2">Make sure you have taken backup of your account in case you ever need to get access to your data. We will completely wipe your data. There is no way to access your account after this action.</p>
                <button class="ml-auto text-sm font-semibold text-rose-600 underline decoration-2">Continue with deletion</button>
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

export default CSettingsProfile