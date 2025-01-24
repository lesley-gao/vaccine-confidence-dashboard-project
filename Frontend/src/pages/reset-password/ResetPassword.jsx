// ResetPasswordForm.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Logo from '@/components/Logo';

export default function ResetPassword() {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [passwords, setPasswords] = useState({
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [isValidating, setIsValidating] = useState(true);

    // Validate reset token when component mounts
    useEffect(() => {
        const validateToken = async () => {
            if (!token) {
                setError('Invalid or missing reset token');
                setIsValidating(false);
                return;
            }

            try {
                const response = await axios.post(
                    `${API_BASE_URL}/user/validate-reset-token`,
                    { token }
                );
                setIsTokenValid(true);
            } catch (err) {
                setError('This password reset link is invalid or has expired');
            } finally {
                setIsValidating(false);
            }
        };

        validateToken();
    }, [token, API_BASE_URL]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate passwords
        if (passwords.newPassword !== passwords.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (passwords.newPassword.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            await axios.post(`${API_BASE_URL}/user/reset-password`, {
                token,
                newPassword: passwords.newPassword
            });

            setSuccess(true);
            // Clear form
            setPasswords({ newPassword: '', confirmPassword: '' });

        } catch (err) {
            console.error('Reset password error:', err);
            setError(err.response?.data?.message || 'Failed to reset password. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isValidating) {
        return <div className="text-center">Validating reset link...</div>;
    }

    if (!isTokenValid) {
        return (
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Invalid Reset Link</h2>
                <p className="text-red-500 mb-4">{error}</p>
                <div className="mt-4">
                    <Link to="/forgot-password" className="text-[#3949AB] hover:underline">
                        Request a new reset link
                    </Link>
                </div>
            </div>
        );
    }

    if (success) {
        return (


            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Password Reset Successfully</h2>
                <p className="mb-4">Your password has been reset. You can now log in with your new password.</p>
                <div className="mt-4">
                    <Link to="/login" className="text-[#3949AB] hover:underline">
                        Go to Login
                    </Link>
                </div>
            </div>

        );
    }

    return (
        <div className="text-md 2xl:text-lg">

            <Logo />

            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold">Reset Password</h2>
                <p className="text-gray-600 mt-2">
                    Please enter your new password.
                </p>
            </div>

            <form className="container" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5 2xl:gap-10 mb-5 2xl:mb-10">
                    {error && (
                        <div className="text-red-500 mb-4">
                            {error}
                        </div>
                    )}

                    <input
                        type="password"
                        value={passwords.newPassword}
                        onChange={(e) => setPasswords(prev => ({
                            ...prev,
                            newPassword: e.target.value
                        }))}
                        placeholder="New Password"
                        className="w-full p-5 font-medium border border-b-slate-900 hover:border hover:border-slate-300 placeholder:opacity-60"
                        disabled={isSubmitting}
                    />

                    <input
                        type="password"
                        value={passwords.confirmPassword}
                        onChange={(e) => setPasswords(prev => ({
                            ...prev,
                            confirmPassword: e.target.value
                        }))}
                        placeholder="Confirm New Password"
                        className="w-full p-5 font-medium border border-b-slate-900 hover:border hover:border-slate-300 placeholder:opacity-60"
                        disabled={isSubmitting}
                    />
                </div>

                <div className="mt-5">
                    <button
                        type="submit"
                        className="submission-btn w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Resetting...' : 'Reset Password'}
                    </button>
                </div>
            </form>
        </div>



    );
}