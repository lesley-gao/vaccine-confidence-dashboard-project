import React from "react";
import LoginForm from "@/pages/login-page/components/LoginForm";
import VaxBanner from "@/components/VaxBanner";
import GoogleConnection from "@/components/GoogleConnection";

export default function LoginPage() {
    return (
        <div className="flex h-screen bg-gradient-to-b from-customTheme-light to-customTheme-dark">
            {/* Left Section */}
            <div className="hidden md:flex w-2/5 items-center justify-center">
                <VaxBanner />
            </div>

            {/* Right Section */}
            <div className="flex w-full md:w-3/5 items-center justify-center bg-white rounded-none md:rounded-l-[50px]">
                <div className="w-3/5 max-w-xl ">
                    <h2 className="text-[25px] 2xl:text-3xl font-bold mb-10 text-gray-800">Log in to <a className="underline underline-offset-2 decoration-indigo-500 hover:decoration-indigo-300" href="/">VaccineView</a>
                    </h2>

                    {/* Google Login Button */}
                    <div className="mb-5">
                        <GoogleConnection shouldRegister={false} />
                    </div>

                    {/* Separator */}
                    <div className="flex items-center mb-5 2xl:mb-10">
                        <hr className="flex-grow border-t border-gray-300" />
                        <span className="mx-3 text-gray-500 text-md 2xl:text-lg">or continue with email</span>
                        <hr className="flex-grow border-t border-gray-300" />
                    </div>

                    {/* Login Form */}
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}