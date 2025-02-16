/**
 * This component is the form for user sign up.
 * It handles the registration process and email verification.
 * It is used on the Signup page.
 */
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Input from '@/components/Input'
import { FormProvider, useForm } from 'react-hook-form';
import { username_validation, email_validation, password_validation, confirm_password_validation, verification_code_validation } from '@/utils/inputValidations'
import { BsFillCheckSquareFill } from 'react-icons/bs'
import { postData } from '@/utils/api';

export default function SignupForm() {
    const navigate = useNavigate();
    const methods = useForm({ mode: 'onTouched' });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);

    // This useEffect listens for form changes, once the form changes, it will clear the error message
    React.useEffect(() => {
        const subscription = methods.watch(() => {
            if (error) setError('');
        });
        return () => subscription.unsubscribe();
    }, [methods.watch, error]);

    // Submit form and handle registration
    const onSubmit = methods.handleSubmit(async (data) => {
        try {
            setIsLoading(true);
            setError('');

            // Check if passwords match
            if (data.password !== data.cPassword) {
                throw new Error("Passwords don't match");
            }

            // Registration data
            const registrationData = {
                userUsername: data.username,
                userEmail: data.email,
                userPassword: data.password,
                userAvatarPath: "/avatars/default-avatar.jpg",
                userGoogleId: "",
                userFullName: data.username
            };

            if (!isVerifying) {
                // Initial registration
                const response = await postData('/account/register/account-details', registrationData);

                if (response.code === 0) {
                    setIsVerifying(true);
                    methods.reset({
                        ...data,
                        verificationCode: ''
                    });
                }
                else {
                    throw new Error(response.message || "Registration failed");
                }
            } else {
                // Email verification
                const verificationData = {
                    ...registrationData,
                    verificationCode: data.verificationCode
                };

                const response = await postData('/account/register/email-verification', verificationData);

                if (response.code === 0) {
                    console.log("Registration completed successfully! Redirecting to login page...");
                    setSuccess(true);
                    methods.reset();
                    setTimeout(() => navigate("/login"), 2000);
                }
                else {
                    throw new Error(response.message || "Verification failed");
                }
            }
        } catch (error) {
            setError(error.message || 'Registration failed');
            console.error('Registration error:', error);
        } finally {
            setIsLoading(false);
        }
    });

    return (
        <div className="text-md 2xl:text-lg">
            <FormProvider {...methods}>
                <form onSubmit={e => e.preventDefault()} noValidate autoComplete="off" className="container">
                    {!isVerifying ? (
                        // Registration Form
                        <div className="flex flex-col gap-9 mt-7 mb-5 2xl:mb-5">
                            <Input {...username_validation} />
                            <Input {...email_validation} />
                            <Input {...password_validation} />
                            <Input {...confirm_password_validation} />
                        </div>
                    ) : (
                        // Verification Form
                        <div className="flex flex-col gap-9 mt-7 mb-5 2xl:mb-5">
                            <div className="text-gray-600 mb-4">
                                Please check your email for the verification code.
                            </div>
                            <Input {...verification_code_validation} />
                        </div>
                    )}

                    <div className="mt-5">
                        {error && (<p className="text-red-500 mb-4">{error}</p>)}

                        {success && (
                            <p className="flex items-center gap-2 mb-5 font-semibold text-green-600">
                                <BsFillCheckSquareFill /> Sign up successfully, now you can login.
                            </p>
                        )}

                        <button onClick={onSubmit} className="submission-btn" disabled={isLoading}>
                            {isLoading
                                ? (isVerifying ? 'Verifying...' : 'Creating Account...')
                                : (isVerifying ? 'Verify Email' : 'Create Account')}
                        </button>
                    </div>
                </form>

                <div className="text-center text-gray-600 mt-4">
                    Already have an account?
                    <span> <Link to="/login" className="underline text-[#3949AB]">Login</Link></span>
                </div>
            </FormProvider>
        </div>
    )
}