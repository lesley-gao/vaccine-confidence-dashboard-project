// This is the page where users can reset their password if they have forgotten it.
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PasswordImg from '@/components/PasswordImg';
import Logo from '@/components/Logo';

export default function ForgotPassword() {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setError('Please enter your email address');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const response = await axios.post(
                `${API_BASE_URL}/user/forgot-password`,
                { email },
                { withCredentials: true }
            );

            console.log(`${API_BASE_URL}/user/forgot-password`)
            setSuccess(true);
            // Reset form
            setEmail('');

        } catch (err) {
            console.error('Forgot password error:', err);
            setError(err.response?.data?.message || 'Failed to process request. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Check Your Email</h2>
                <p className="mb-4">We've sent password reset instructions to your email.</p>
                <div className="mt-4">
                    <Link to="/login" className="text-[#3949AB] hover:underline">
                        Return to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-row h-dvh justify-center text-md 2xl:text-lg ">

            <Logo />

            <div className="flex w-full md:w-3/5 items-center justify-center bg-white rounded-none md:rounded-l-[50px]">
                <div className="flex flex-col justify-center">
                    <div className=" mb-5">
                        <h2 className="text-2xl font-bold">Forgot Password?</h2>
                        <p className="text-gray-600 mt-5">
                            No worries, we'll send you instructions to reset your password.
                        </p>
                    </div>

                    <form className="container" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-5 2xl:gap-10 mb-5 2xl:mb-10">
                            {error && (
                                <div className="text-red-500 mb-5">
                                    {error}
                                </div>
                            )}

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full p-5 font-medium border-0 border-b-2  border-b-slate-300 hover:border-b-2 focus:outline-none hover:border-b-slate-500 transition-colors duration-200 placeholder:opacity-60"
                                disabled={isSubmitting}
                            />

                            <button
                                type="submit"
                                className="submission-btn"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending instructions...' : 'Reset Password'}
                            </button>

                        </div>


                        <div className="text-center">
                            <Link to="/login" className="text-[#3949AB] hover:underline">
                                ←  Back to Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

            <div className="hidden md:flex w-2/5 items-center justify-center">
                <PasswordImg />
            </div>

        </div>
    );
}