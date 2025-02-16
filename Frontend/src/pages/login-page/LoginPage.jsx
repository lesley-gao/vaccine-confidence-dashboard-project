/**
 * This component is the login page of the application.
 * It provides a login interface with options for Google authentication and email-based login.
 */
import React from "react";
import LoginForm from "@/pages/login-page/components/LoginForm";
import VaxBanner from "@/components/VaxBanner";
import GoogleConnection from "@/components/GoogleConnection";
import HomeButton from "@/components/HomeButton";

export default function LoginPage() {
    return (
        <div className="flex min-h-screen bg-gradient-to-b from-customTheme-light to-customTheme-dark">
            {/* Left Section */}
            <div className="hidden md:flex w-2/5 h-full min-h-screen items-center justify-center flex-col">
                <HomeButton />
                <VaxBanner className="flex-grow w-full" />
            </div>

            {/* Right Section */}
            <div className="flex w-full md:w-3/5 items-center justify-center bg-white rounded-none md:rounded-l-[50px]">
                <div className="w-3/5">
                    <h2 className="text-[25px] 2xl:text-3xl font-bold my-5 text-gray-800">
                        Log in to <a className="text-customTheme-light" href="/">VaccineView</a>
                    </h2>

                    <div className="my-8">
                        <GoogleConnection shouldRegister={false} />
                    </div>

                    <div className="flex items-center mb-5 2xl:mb-10">
                        <hr className="flex-grow border-t border-gray-300" />
                        <span className="mx-3 text-gray-500 text-md 2xl:text-lg">or continue with email</span>
                        <hr className="flex-grow border-t border-gray-300" />
                    </div>

                    <LoginForm />
                </div>
            </div>
        </div>
    );
}