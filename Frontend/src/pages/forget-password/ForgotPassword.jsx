/**
 * This component is the Forgot Password page that handles the "Forgot Password" functionality.
 * It allows users to enter their email to receive a verification code for resetting their password.
 * Upon submission, it sends the code to the provided email and navigates to the password reset page on success.
 */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import PasswordImg from '@/components/PasswordImg';
import { BsFillCheckSquareFill } from 'react-icons/bs'
import { fetchData } from '@/utils/api';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSendCode = async (e) => {
        e.preventDefault();

        if (!email) {
            setError('Please enter your email address');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await fetchData(`/account/password-reset/email-send?email=${email}`);
            setSuccess(true);
            setTimeout(() => {
                navigate('/reset-password', {
                    state: { email }
                });
            }, 2000);
        } catch (err) {
            console.error('Error sending code:', err);
            setError(err.message || 'Failed to send verification code. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-b from-customTheme-light to-customTheme-dark">
            <Logo />

            {/* Left Section*/}
            <div className="flex w-full md:w-3/5 items-center justify-center bg-white rounded-none md:rounded-r-[50px]">
                <div className="w-3/5">
                    <h2 className="text-[25px] 2xl:text-3xl font-bold my-4 text-gray-800">
                        Forgot Password?
                    </h2>
                    <p className="text-gray-600 mb-8">
                        No worries, we will send you instructions to reset your password.
                    </p>

                    <form className="flex flex-col gap-5" onSubmit={handleSendCode}>
                        {error && (
                            <div className="text-red-500">
                                {error}
                            </div>
                        )}

                        {success && (
                            <p className="flex items-center gap-2 font-semibold text-green-600">
                                <BsFillCheckSquareFill />
                                Verification code sent successfully! Please check your email.
                            </p>
                        )}

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="input-field py-5"
                            disabled={isLoading}
                        />

                        <button type="submit" className="submission-btn" disabled={isLoading}>
                            {isLoading ? 'Sending code...' : 'Send Code'}
                        </button>

                        <div className="text-center mt-4">
                            <Link to="/login" className="text-[#3949AB] hover:underline">
                                ←  Back to Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

            {/* Right Section */}
            <div className="hidden md:flex w-2/5 h-full min-h-screen items-center justify-center flex-col">
                <PasswordImg className="flex-grow w-full" />
            </div>
        </div>
    );
}