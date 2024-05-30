import React from 'react'

import { FaFileAlt } from "react-icons/fa";
import WithAuth from '../../auth/WithAuth';


function filesModal({ setfilesModal }) {
  return (
    <div
  className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
  style={{ background: "rgba(0,0,0,0.2)" }}
>
  <div>
    {/* Header */}
    <div className="relative w-full my-6 mx-auto">
      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full text-black bg-white outline-none focus:outline-none">
        <div className="flex items-start justify-between p-5 bg-[#1d5b79] border-b border-solid border-blueGray-200 rounded-t">
          <h3 className="text-3xl text-white text-center font-semibold">
            File Manager
          </h3>
        </div>
        {/* File Management */}
        <div className="mx-auto p-5">
          {/* File management components here */}
          <div className='grid grid-cols-2'>
            <div><FaFileAlt /></div>
            <strong>Cgaer</strong>
          </div>
        </div>
        {/* Close Button */}
        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
          <button
            className="text-white bg-red-500 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 rounded-md ease-linear transition-all duration-150"
            type="button"
            onClick={() => setfilesModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default WithAuth(filesModal)