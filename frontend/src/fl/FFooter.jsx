import React from 'react'

import { 
    FaFacebook, 
    FaGithub, FaInstagram, 
    FaTwitter 
} from 'react-icons/fa';
import WithAuth from '../auth/WithAuth';

function FFooter() {
  return (
    <div className='w-full mx-full py-8 px-4 grid lg:grid-cols-3 gap-8 text-gray-300 bg-[#163646]'>
    <div className='flex flex-col items-center'>
        <h1 className='w-full text-3xl font-bold text-orange-600'>QUIRCOM</h1>
        <span className='w-full text-sm text-left'>QUIRCOM © 2024 | All Rights Reserved</span>
        <p className='py-4 text-gray-300'>Quircom is dedicated to fostering innovation and collaboration, constantly seeking out like-minded visionaries and businesses eager to leave their imprint on the world.</p>
        <div className='flex justify-between w-[75%] my-6 mx-10'>
        <a href='https://facebook.com/quircomoffical' target='_blank' rel='noopener noreferrer'><FaFacebook size={32} color="skyblue" /></a>
                <a href='https://github.com/jianDeveloper/quircom' target='_blank' rel='noopener noreferrer'><FaGithub size={32} color="skyblue" /></a>
                <a href='https://instagram.com/quircomoffical' target='_blank' rel='noopener noreferrer'><FaInstagram size={32} color="skyblue" /></a>
                <a href='https://twitter.com/quircomofficial' target='_blank' rel='noopener noreferrer'><FaTwitter size={32} color="skyblue" /></a>
        </div>
    </div>
    <div className='lg:col-span-2 flex justify-between mt-6 bg-[#1D5B79] bg-opacity-95 p-4 '>
        <div className='pt-2'>
            <h6 className='font-medium text-orange-600 '>Solutions</h6>
            <ul>
                <li className='py-2 text-sm'>Analytics</li>
                <li className='py-2 text-sm'>Information Technology</li>
                <li className='py-2 text-sm'>Graphic Designs</li>
                <li className='py-2 text-sm'>Features</li>
            </ul>
        </div>
        <div className='pt-2'>
            <h6 className='font-medium text-gray-400 pr-5'>Company</h6>
            <ul>
                <li className='py-2 text-sm'>About Us</li>
                <li className='py-2 text-sm'>Team</li>
                <li className='py-2 text-sm'>Blogs</li>
                <li className='py-2 text-sm'>Careers</li>
            </ul>
        </div>
        <div className='pt-2'>
            <h6 className='font-medium text-gray-400'>Support</h6>
            <ul>
                <li className='py-2 text-sm'>Help Center</li>
                <li className='py-2 text-sm'>Contact Us</li>
                <li className='py-2 text-sm'>Community Form</li>
                <li className='py-2 text-sm'>Feedback & Suggestions</li>
            </ul>
        </div>
        <div className='pt-2'>
            <h6 className='font-medium text-gray-400'>Legal</h6>
            <ul>
                <li className='py-2 text-sm'>Terms of Service</li>
                <li className='py-2 text-sm'>Privacy Policy</li>
                <li className='py-2 text-sm'>Cookie Policy</li>
                <li className='py-2 text-sm'>Copyright & DMCA</li>
            </ul>
        </div>
    </div>
</div>
  )
}

export default WithAuth(FFooter)