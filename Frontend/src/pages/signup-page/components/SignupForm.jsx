// This component is the form for user sign up
// It allows the user to input their username, email, password and confirm password
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Input from '../../../components/Input'
import { FormProvider, useForm } from 'react-hook-form';
import { username_validation, email_validation, password_validation, confirm_password_validation } from '../../../utils/inputValidations'
import { BsFillCheckSquareFill } from 'react-icons/bs'

export default function SignupForm() {

    const navigate = useNavigate();
    const methods = useForm();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = methods.handleSubmit(data => {
        console.log(data)
        methods.reset()
        setSuccess(true)

    })

    // TODO: add detailed logic, such as below, to navigate to login page
    // const onSubmit = methods.handleSubmit(async (data) => {
    //     try {
    //         setIsLoading(true);
    //         setError('');

    //         // 验证密码匹配
    //         if (data.password !== data.confirm_password) {
    //             throw new Error("Passwords don't match");
    //         }

    //         // 构建注册数据
    //         const registrationData = {
    //             username: data.username,
    //             email: data.email,
    //             password: data.password
    //         };

    //         // TODO: 发送到后端注册
    //         // const response = await registerUser(registrationData);

    //         setSuccess(true);
    //         methods.reset();

    //         // 延迟后跳转到登录页
    //         setTimeout(() => {
    //             navigate('/login');
    //         }, 2000);

    //     } catch (error) {
    //         setError(error.message || 'Registration failed');
    //         console.error('Registration error:', error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // });

    return (
        <div className="text-md 2xl:text-lg">
            <FormProvider {...methods}>
                <form
                    onSubmit={e => e.preventDefault()}
                    noValidate
                    autoComplete="off"
                    className="container"
                >
                    <div className="flex flex-col gap-5 mb-5 2xl:mb-5">
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