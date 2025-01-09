// 404 Page
// This page is displayed when the user tries to access a page that does not exist.
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="flex flex-col h-dvh items-center justify-center">
            <a href="/" className="absolute top-10 left-10 flex flex-row items-center gap-2">
                <div className="w-[42px] h-[40px]">
                    <img src="src/assets/logo.png" alt="logo" />
                </div>
                <div className="text-[#151d48] text-[36px] font-BaiJamjureeBold leading-[150%]">
                    VaccineView
                </div>
            </a>

            <div className="flex flex-col items-center justify-center">
                <div className="flex">
                    <h1 className="lg:text-[10rem] text-[8rem] bounce bounce-1">4</h1>
                    <h1 className="lg:text-[10rem] text-[8rem] bounce bounce-2">0</h1>
                    <h1 className="lg:text-[10rem] text-[8rem] bounce bounce-3">4</h1>
                </div>
                <p className="text-md md:text-xl mb-6 font-PoppinsRegular text-black">Oops! The page you are looking for does not exist.</p>
                <img src="notfound.png" alt="Page Not Found" className="h-1/3" />
                <button className="h-14 w-80 mt-6 bg-black hover:bg-neutral-600 text-white font-bold font-PoppinsBold text-xl py-2 px-4 rounded">
                    <Link to="/">Go Back Home</Link>
                </button>
            </div>
        </div>
    );
}
