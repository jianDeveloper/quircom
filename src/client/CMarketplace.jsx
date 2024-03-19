import React from 'react'

import NavHeader from './CMainNav'

import mpTop from '../assets/mpTop.jpg'
import CCards from './CCards'
import mpCard from '../assets/laptop.jpg'
import CFooter from './CFooter'

const CMarketplace = () => {
  const data = [
    { image: mpCard, subtitle:'Logo Design', title:'The Firepit', author:'by Naruto', button:'Connect'  },
    { image: mpCard, subtitle:'Logo Design', title:'The Firepit', author:'by Naruto', button:'Connect'  },
    { image: mpCard, subtitle:'Logo Design', title:'The Firepit', author:'by Naruto', button:'Connect'  },
    { image: mpCard, subtitle:'Logo Design', title:'The Firepit', author:'by Naruto', button:'Connect'  },
    { image: mpCard, subtitle:'Logo Design', title:'The Firepit', author:'by Naruto', button:'Connect'  },
    { image: mpCard, subtitle:'Logo Design', title:'The Firepit', author:'by Naruto', button:'Connect'  },
    { image: mpCard, subtitle:'Logo Design', title:'The Firepit', author:'by Naruto', button:'Connect'  },
    { image: mpCard, subtitle:'Logo Design', title:'The Firepit', author:'by Naruto', button:'Connect'  },
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
            <a href="#" className='bg-orange-600 p-2 rounded-md'>Hire now!</a>
          </div>
        </div>
        <h1 className=' mt-10 font-extrabold text-[30px] text-[#1D5B79]'>Top Services</h1>
        <div className=''>
          <div className='w-full grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4'>
            {data.map((item, index) => (
            <CCards key={index} image={item.image} subtitle={item.subtitle} title={item.title} author={item.author}  button={item.button}/>
            ))}
          </div>
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