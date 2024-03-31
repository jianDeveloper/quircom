import React from 'react'
import styles from "../styles";

const Stats =()=>{
    return(
    <section class="relative overflow-hidden">
        <div class=" relative mx-auto flex h-full w-full flex-col items-center justify-center px-4 py-12 backdrop-blur-md sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            <div class="mx-auto grid max-w-screen-lg grid-cols-1 gap-y-4 gap-x-8 text-center sm:mt-12 sm:text-left md:grid-cols-3">
                <div class="bg-white/10 relative mb-3 rounded-3xl border px-12 py-10 text-left shadow backdrop-blur-lg lg:px-12">
                    <p class="relative text-3xl font-black text-orange-600 sm:text-5xl">25M</p>
                    <p class="relative mt-5 text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores doloremque vel</p>
                </div>

                <div class="bg-white/10 relative mb-3 rounded-3xl border px-12 py-10 text-left shadow backdrop-blur-lg lg:px-12">
                    <p class="relative text-3xl font-black text-orange-600 sm:text-5xl">51%</p>
                    <p class="relative mt-5 text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores doloremque vel</p>
                </div>

                <div class="bg-white/10 relative mb-3 rounded-3xl border px-12 py-10 text-left shadow backdrop-blur-lg lg:px-12">
                    <p class="relative text-3xl font-black text-orange-600 sm:text-5xl">8529+</p>
                    <p class="relative mt-5 text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores doloremque vel</p>
                </div>
            </div>
        </div>
    </section>

    )
}
export default Stats