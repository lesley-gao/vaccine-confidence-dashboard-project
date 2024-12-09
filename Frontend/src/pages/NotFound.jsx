// 404 Page
// This page is displayed when the user tries to access a page that does not exist.
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="flex flex-col h-screen items-center justify-center bg-gray-50">

            <a href="/" className="absolute top-10 left-10 flex flex-row items-center gap-2">
                <div className="w-[42px] h-[40px]">
                    <img src="src/assets/logo.png" alt="logo" />
                </div>
                <div className="text-[#151d48] text-[36px] font-BaiJamjureeBold leading-[150%]">
                    VaccineView
                </div>
            </a>

            <div className="flex flex-col items-center ">
                <div class="flex ">
                    <h1 className="lg:text-[16rem] text-[13rem] bounce bounce-1">4</h1>
                    <h1 className="lg:text-[16rem] text-[13rem] bounce bounce-2">0</h1>
                    <h1 className="lg:text-[16rem] text-[13rem] bounce bounce-3">4</h1>
                </div>
                <p className="md:text-3xl mb-6 font-PoppinsRegular">Oops! The page you are looking for does not exist.</p>
                <img src="404.gif" alt="Page Not Found" />
                <button className=" h-16 w-80 mt-8 bg-black hover:bg-neutral-600 text-white font-bold font-PoppinsBold text-xl py-2 px-4 rounded">
                    <Link to="/">Go Back Home</Link></button>
            </div>
        </div>
    );
}
