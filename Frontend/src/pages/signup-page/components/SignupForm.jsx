// This component is the form for user sign up
// It allows the user to input their username, email, password and confirm password
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Input from '@/components/Input'
import { FormProvider, useForm } from 'react-hook-form';
import { username_validation, email_validation, password_validation, confirm_password_validation } from '@/utils/inputValidations'
import { BsFillCheckSquareFill } from 'react-icons/bs'
import { postData } from '@/utils/api';

export default function SignupForm() {

    const navigate = useNavigate();
    const methods = useForm();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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
                userAvatarPath: "/avatars/avatar1.jpg"  
            };
            console.log("Registration data:", registrationData)

            // Send registration data to the server 
            const response = await postData('/user/register', registrationData);

            if (response.code === 0) {
                console.log("Registration successful! Redirecting to login page...");
                setSuccess(true);
                methods.reset();
                setTimeout(() => navigate("/login"), 2000);
            } else {
                throw new Error(response.message || "Registration failed");
            }
        } catch (error) {
            console.log(error.message || 'Registration failed');
            console.error('Registration error:', error);
        } finally {
            setIsLoading(false);
        }
    });

    return (
        <div className="text-md 2xl:text-lg">
            <FormProvider {...methods}>
                <form
                    onSubmit={e => e.preventDefault()}
                    noValidate
                    autoComplete="off"
                    className="container"
                >
                    <div className="flex flex-col gap-3 mb-5 2xl:mb-5">
                        <Input {...username_validation} />
                        <Input {...email_validation} />
                        <Input {...password_validation} />
                        <Input {...confirm_password_validation} />
                    </div>
                    <div className="mt-5">
                        {success && (
                            <p className="flex items-center gap-2 mb-5 font-semibold text-green-600">
                                <BsFillCheckSquareFill /> Sign up successfully, now you can login.
                            </p>
                        )}
                        <button onClick={onSubmit} className="submission-btn" disabled={isLoading}> {isLoading ? 'Creating Account...' : 'Create Account'} </button>
                    </div>
                </form>

                <div className=" text-center text-gray-600 mt-4">
                    Already have an account?
                    <span> <Link to="/login" className="underline text-[#3949AB]">
                        Login
                    </Link></span>
                </div>
            </FormProvider>
        </div>
    )
}