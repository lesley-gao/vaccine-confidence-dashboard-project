/**
 * This component is the 404 page that is displayed when the user tries to access a page that does not exist.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';

export default function NotFound() {
    return (
        <div className="flex flex-col h-dvh items-center justify-center">
            <Logo />

            <div className="flex flex-col items-center justify-center">
                <img src="/image/404 error.png" alt="Page Not Found" className="h-1/3" />
                <p className="text-md md:text-xl mb-6 font-PoppinsRegular text-[#152063]">Oops! The page you are looking for does not exist...</p>
                <button className="h-14 w-80 mt-6 submission-btn">
                    <Link to="/">Go Back Home</Link>
                </button>
            </div>
        </div>
    );
}
