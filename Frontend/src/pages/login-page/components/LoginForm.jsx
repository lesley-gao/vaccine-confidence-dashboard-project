import React, { useRef, useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import RememberPW from "@/pages/login-page/components/RememberPW";
import { useAppContext } from "@/context/AppContextProvider";
import { postData } from "@/utils/api";

export default function LoginForm() {

    const navigate = useNavigate();
    const { setUser } = useAppContext();
    const [error, setError] = useState(null);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const usernameRef = useRef();
    const passwordRef = useRef();

    const handleRememberChange = useCallback((checked) => {
        setRememberMe(checked);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        if (!username || !password) {
            setError('Please fill in all fields');
            setIsLoading(false);
            return;
        }

        try {
            const response = await postData('/user/login', { username, password });

            if (response.code === 0) {

                const userData = {
                    username: response.data.username,
                    role: response.data.role,
                    userUid: response.data.userUid,
                    token: response.data.token,
                    avatarPath: response.data.avatarPath || "/avatars/default-avatar.jpg"
                };
                
                console.log('User logged in successfully:', userData);
                setUser(userData);

                if (rememberMe) {
                    localStorage.setItem('rememberedUsername', username);   
                } 

                navigate("/profile");
            } else {
                setError(response.message || 'Login failed');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
            if (rememberMe) {
                localStorage.removeItem('rememberedUsername');
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Load remembered username if exists
    useEffect(() => {
        const rememberedUsername = localStorage.getItem('rememberedUsername');
        if (rememberedUsername && usernameRef.current) {
            usernameRef.current.value = rememberedUsername;
            setRememberMe(true);
        }
    }, []);

    return (
        <div className="text-md 2xl:text-lg">
            <form className="container" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5 2xl:gap-10 mb-5 2xl:mb-10">
                    {error && (
                        <div className="text-red-500 mb-4">
                            {error}
                        </div>
                    )}

                    <input
                        placeholder="Username"
                        type="text"
                        ref={usernameRef}
                        name="username"
                        id="username"
                        className="input-field"
                        disabled={isLoading}
                    />

                    <input
                        placeholder="Password"
                        type="password"
                        ref={passwordRef}
                        name="password"
                        id="password"
                        className="input-field"
                        disabled={isLoading}
                    />
                </div>

                <div className="flex justify-between items-center py-3">
                    <RememberPW checked={rememberMe} onCheckedChange={handleRememberChange} />
                    <Link to="/forgot-password" className="text-[#3949AB] hover:underline">
                        Forgot password?
                    </Link>
                </div>

                <div className="mt-5">
                    <button
                        className="submission-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Log In'}
                    </button>
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