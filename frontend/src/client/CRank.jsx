import React from 'react'
import NavHeader from './CMainNav'
import Profile from '../assets/profile.jpg'
import WithAuth from '../auth/WithAuth'

function CRank() {
  return (
    <div className="relative flex flex-col w-full min-w-0 mb-0 break-words border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
        <div>
        <NavHeader />
      </div>
      
  <div className='mt-[60px] ml-[20px] font-extrabold text-[30px] text-[#1D5B79]'>
    <h6>LEADERBOARD</h6>
  </div>
  <div className="flex-auto px-0 pt-0 pb-2">
    <div className="p-0 overflow-x-auto">
      <table className="items-center w-full mb-0 align-top border-gray-200 text-[#1D5B79]">
        <thead className="align-bottom">
          <tr>
            <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-orange-500 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-[#1D5B79] opacity-100">Freelancers</th>
            <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-orange-500 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-[#1D5B79] opacity-100">Jobs</th>
            <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-orange-500 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-[#1D5B79] opacity-100">Rating</th>
            <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-orange-500 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-[#1D5B79] opacity-100">Portfolio</th>
            <th className="px-6 py-3 font-semibold capitalize align-middle bg-transparent border-b border-orange-500 border-solid shadow-none tracking-none whitespace-nowrap text-[#1D5B79] opacity-70"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
              <div className="flex px-2 py-1">
                <div>
                  <img src={Profile} alt='' className="inline-flex items-center justify-center mr-4 text-white transition-all duration-200 ease-soft-in-out text-sm h-10 w-10 rounded-xl"/>
                </div>
                <div className="flex flex-col justify-center">
                  <h6 className="mb-0 font-semibold leading-normal text-sm text-[#1D5B79]">John Michael</h6>
                  <p className="mb-0 leading-tight text-xs text-slate-500">john@creative-tim.com</p>
                </div>
              </div>
            </td>
            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
              <p className="mb-0 font-semibold leading-tight text-sm text-[#1D5B79]">Manager</p>
              <p className="mb-0 leading-tight text-xs text-slate-500">Organization</p>
            </td>
            <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap shadow-transparent">
              <span className="bg-gradient-to-tl px-3.6 text-xs rounded-1.8 py-2.2 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-[#1D5B79]">50%</span>
            </td>
            <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
              <span className="font-semibold leading-tight text-xs text-slate-500">23/04/18</span>
            </td>
          </tr>
          <tr>
            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
              <div className="flex px-2 py-1">
                <div>
                  <img src={Profile} alt='' className="inline-flex items-center justify-center mr-4 text-white transition-all duration-200 ease-soft-in-out text-sm h-10 w-10 rounded-xl" />
                </div>
                <div className="flex flex-col justify-center">
                  <h6 className="mb-0 font-semibold leading-normal text-sm text-[#1D5B79]">Alexa Liras</h6>
                  <p className="mb-0 leading-tight text-xs text-slate-500">alexa@creative-tim.com</p>
                </div>
              </div>
            </td>
            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
              <p className="mb-0 font-semibold leading-tight text-sm">Programator</p>
              <p className="mb-0 leading-tight text-xs text-slate-500">Developer</p>
            </td>
            <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap shadow-transparent">
              <span className="bg-gradient-to-tl px-3.6 text-xs rounded-1.8 py-2.2 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-[#1D5B79]">100%</span>
            </td>
            <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
              <span className="font-semibold leading-tight text-xs text-slate-500">11/01/19</span>
            </td>
            
          </tr>
          <tr>
            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
              <div className="flex px-2 py-1">
                <div>
                  <img src={Profile} alt='' className="inline-flex items-center justify-center mr-4 text-white transition-all duration-200 ease-soft-in-out text-sm h-10 w-10 rounded-xl"  />
                </div>
                <div className="flex flex-col justify-center">
                  <h6 className="mb-0 font-semibold leading-normal text-sm text-[#1D5B79]">Laurent Perrier</h6>
                  <p className="mb-0 leading-tight text-xs text-slate-500">laurent@creative-tim.com</p>
                </div>
              </div>
            </td>
            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
              <p className="mb-0 font-semibold leading-tight text-sm">Executive</p>
              <p className="mb-0 leading-tight text-xs text-slate-500">Projects</p>
            </td>
            <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap shadow-transparent">
              <span className="bg-gradient-to-tl px-3.6 text-xs rounded-1.8 py-2.2 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-[#1D5B79] ">90%</span>
            </td>
            <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
              <span className="font-semibold leading-tight text-xs text-slate-500">19/09/17</span>
            </td>
            
          </tr>
          <tr>
            <td className="p-2 align-middle bg-transparent border-b-0 whitespace-nowrap shadow-transparent">
              <div className="flex px-2 py-1">
                <div>
                  <img src={Profile} alt='' className="inline-flex items-center justify-center mr-4 text-white transition-all duration-200 ease-soft-in-out text-sm h-10 w-10 rounded-xl" />
                </div>
                <div className="flex flex-col justify-center">
                  <h6 className="mb-0 font-semibold leading-normal text-sm text-[#1D5B79]">Miriam Eric</h6>
                  <p className="mb-0 leading-tight text-xs text-slate-500">miriam@creative-tim.com</p>
                </div>
              </div>
            </td>
            <td className="p-2 align-middle bg-transparent border-b-0 whitespace-nowrap shadow-transparent">
              <p className="mb-0 font-semibold leading-tight text-sm">Programmer</p>
              <p className="mb-0 leading-tight text-xs text-slate-500">Developer</p>
            </td>
            <td className="p-2 leading-normal text-center align-middle bg-transparent border-b-0 text-sm whitespace-nowrap shadow-transparent">
              <span className="bg-gradient-to-tl px-3.6 text-xs rounded-1.8 py-2.2 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-[#1D5B79]">70%</span>
            </td>
            <td className="p-2 text-center align-middle bg-transparent border-b-0 whitespace-nowrap shadow-transparent">
              <span className="font-semibold leading-tight text-xs text-slate-500">14/09/20</span>
            </td>
            
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>


  )
}

export default WithAuth(CRank)