// This is a login form component that allows the user to input their username and password

import React, { useRef, useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import RememberPW from "@/pages/login-page/components/RememberPW";

export default function LoginForm() {

    return (
        <div className="text-md 2xl:text-lg">
            <form className="container">
                <div className="flex flex-col gap-5 2xl:gap-10 mb-5 2xl:mb-10">
                    {/* <label htmlFor="username ">Username</label> */}
                    <input
                        placeholder="Username"
                        type="text"
                        className="w-full p-5 font-medium border border-b-slate-900 hover:border  hover:border-slate-300 placeholder:opacity-60"
                    />
                    {/* <label htmlFor="password">Password</label> */}
                    <input
                        placeholder="Password"
                        type="password"
                        className="w-full p-5 font-medium border border-b-slate-900 hover:border  hover:border-slate-300 placeholder:opacity-60"
                    />
                </div>

                {/* TODO: add the logic for the remember me checkbox and the forgot password link */}
                {/* TODO: add the logic for the remember me checkbox and the forgot password link */}
                {/* TODO: add the logic for the remember me checkbox and the forgot password link */}
                <div className="flex justify-between items-center">
                    <RememberPW />
                    <Link to="/forgot-password" className="text-[#3949AB]">Forgot password?</Link>
                </div>

                <div className="mt-5">
                    <button className="submission-btn"> Log In </button>
                </div>
            </form>

            <div className="text-center text-gray-600 mt-4">
                Don't have an account?
                <span> <Link to="/signup" className="underline text-[#3949AB]">
                    Sign up now
                </Link> </span>
            </div>
        </div>
    );
}
