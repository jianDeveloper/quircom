import React from 'react'

import NavHeader from './CMainNav'

import mpTop from '../assets/mpTop.jpg'
import CCards from './Marketcomponents/CCards'
import mpCard1 from '../assets/pic1.png'
import mpCard2 from '../assets/pic2.jpg'
import mpCard3 from '../assets/pic3.png'
import mpCard4 from '../assets/pic4.jpg'
import mpCard5 from '../assets/pic5.jpg'
import mpCard6 from '../assets/pic6.png'
import mpCard7 from '../assets/pic7.png'
import mpCard8 from '../assets/pic8.jpg'
import CFooter from './CFooter'

const CMarketplace = () => {
  const data = [
    { image: mpCard1, subtitle: 'UI/UX Design', title: 'The Firepit', author: 'by Naruto', button: 'Connect' },
    { image: mpCard2, subtitle: 'Logo Design', title: 'The Firepit', author: 'by Naruto', button: 'Connect' },
    { image: mpCard3, subtitle: 'Word Press', title: 'The Firepit', author: 'by Naruto', button: 'Connect' },
    { image: mpCard4, subtitle: 'Graphic Design', title: 'The Firepit', author: 'by Naruto', button: 'Connect' },
    { image: mpCard5, subtitle: 'Landing Page Design', title: 'The Firepit', author: 'by Naruto', button: 'Connect' },
    { image: mpCard6, subtitle: 'Web Design', title: 'The Firepit', author: 'by Naruto', button: 'Connect' },
    { image: mpCard7, subtitle: 'Social Media Design', title: 'The Firepit', author: 'by Naruto', button: 'Connect' },
    { image: mpCard8, subtitle: '3D Design', title: 'The Firepit', author: 'by Naruto', button: 'Connect' },
    // Add more items as needed
  ];
  return (
    <div className=''>
      <NavHeader />
      <div className='flex'>
        <div className='flex-col mx-10 my-10 w-[100%]'>
          <h1 className='font-extrabold text-[30px] text-[#1D5B79]' >MARKETPLACE</h1>
          <div className="w-full h-[300px] relative rounded-lg" style={{background: `url(${mpTop})`, backgroundRepeat:'no-repeat', backgroundSize:'cover'}}>
            <div className="absolute bottom-10 left-10 text-white p-2">
              <h1 className='text-[40px] font-bold mb-5'>Freelancing Services</h1>
              <a href="#" className='bg-orange-600 p-2 rounded-md hover:bg-[#1D5B79] active:bg-blue-800'>Hire now!</a>
            </div>
          </div>
          <h1 className='mt-10 font-extrabold text-[30px] text-[#1D5B79]'>Top Services</h1>
          <div class="m-[10px] w-[50%]">
            <form class="">
              <div class="relative w-full flex  items-center justify-between rounded-md">
                <svg class="absolute left-2 block h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8" class=""></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65" class=""></line>
                </svg>
                <input type="name" name="search" class="h-12 w-full cursor-text rounded-md border border-gray-100 bg-gray-100 py-4 pr-40 pl-12 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" placeholder="Search by name, type, manufacturer, etc" />
              </div>
            </form>
          </div>
          <div className=' h-[43vh] overflow-scroll grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {data.map((item, index) => (
              <CCards key={index} image={item.image} subtitle={item.subtitle} title={item.title} author={item.author}  button={item.button}/>
            ))}
          </div>
        </div>
      </div>
      <div className="">
        <CFooter />
      </div>
    </div>
  )
}

export default CMarketplace