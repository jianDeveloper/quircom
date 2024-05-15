import React from 'react'
import WithoutAuth from '../auth/WithoutAuth'

const Stats =()=>{
    return(
    <section id="statistics" className="overflow-hidden">
        <div className="mx-auto flex w-full flex-col items-center justify-center px-4 backdrop-blur-md sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            <div className="mx-auto grid max-w-screen-lg grid-cols-1 gap-y-4 gap-x-8 text-center sm:mt-12 sm:text-left md:grid-cols-3">
                <div className="bg-white/10 relative mb-3 rounded-3xl border px-6 py-10 text-left shadow backdrop-blur-lg lg:px-12">
                    <p className="relative text-3xl font-black text-orange-600 lg:text-5xl md:text-4xl">1.5M</p>
                    <p className="relative mt-5 text-gray-600">Around 1.5 million freelancers in the Philippines. That represents around 1.35% of the whole 110.8 million population in the country. </p>
                </div>

                <div className="bg-white/10 relative mb-3 rounded-3xl border px-6 py-10 text-left shadow backdrop-blur-lg lg:px-12">
                    <p className="relative text-3xl font-black text-orange-600 lg:text-5xl md:text-4xl">208%</p>
                    <p className="relative mt-5 text-gray-600">According to the Philippine Institute for Development Studies (PIDS), the Philippines recorded a 208% growth in freelance revenues.</p>
                </div>

                <div className="bg-white/10 relative mb-3 rounded-3xl border px-6 py-10 text-left shadow backdrop-blur-lg lg:px-12">
                    <p className="relative text-3xl font-black text-orange-600 lg:text-5xl md:text-4xl">1.5B+</p>
                    <p className="relative mt-5 text-gray-600">World Bank data shows the total number of freelancers globally is estimated to be 1.57 billion people out of a total global workforce of 3.38 billion.</p>
                </div>
            </div>
        </div>
    </section>

    )
}
export default WithoutAuth(Stats)