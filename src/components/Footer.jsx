import React from 'react';
import { 
    FaDribbble, 
    FaFacebook, 
    FaGithub, FaInstagram, 
    FaTwitter 
} from 'react-icons/fa';

const Footer = () => {
    return (
        <div className='max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300'>
            <div className=''>
                <h1 className='w-full text-3xl font-bold text-orange-600'>QUIRCOM</h1>
                <p className='py-4 text-[#1D5B79]'>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying ...</p>
                <div className='flex justify-between md:w-[75%] my-6'>
                    <FaDribbble size={32} color="#1D5B79" />
                    <FaFacebook size={32} color="#1D5B79" />
                    <FaGithub size={32} color="#1D5B79"  />
                    <FaInstagram size={32} color="#1D5B79"  />
                    <FaTwitter size={32} color="#1D5B79"  />
                </div>
            </div>
            <div className='lg:col-span-2 flex justify-between mt-6'>
                <div>
                    <h6 className='font-medium text-blue-300'>Solutions</h6>
                    <ul>
                        <li className='py-2 text-sm'>Analytics</li>
                        <li className='py-2 text-sm'>Information Technology</li>
                        <li className='py-2 text-sm'>Graphic Designs</li>
                        <li className='py-2 text-sm'>Features</li>
                    </ul>
                </div>
                <div>
                    <h6 className='font-medium text-gray-400'>Company</h6>
                    <ul>
                        <li className='py-2 text-sm'>About Us</li>
                        <li className='py-2 text-sm'>Team</li>
                        <li className='py-2 text-sm'>Blogs</li>
                        <li className='py-2 text-sm'>Careers</li>
                    </ul>
                </div>
                <div>
                    <h6 className='font-medium text-gray-400'>Support</h6>
                    <ul>
                        <li className='py-2 text-sm'>Help Center</li>
                        <li className='py-2 text-sm'>Contact Us</li>
                        <li className='py-2 text-sm'>Community Form</li>
                        <li className='py-2 text-sm'>Feedback & Suggestions</li>
                    </ul>
                </div>
                <div>
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
};
export default Footer