import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContextProvider";
import { loadGoogleScript } from "@/utils/googleAuthLoader";
import { postData } from '@/utils/api';

export default function GoogleConnection({ shouldRegister = false }) {
    const navigate = useNavigate();
    const { setUser } = useAppContext();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    const generateCredentials = (decoded) => {
        const emailPrefix = decoded.email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');
        const googleIdSuffix = decoded.sub.slice(0, 6);
        const username = `${emailPrefix}${googleIdSuffix}`;
        const password = `Guser${decoded.sub.slice(-8)}`;
        return { username, password };
    };

    const handleAuthError = (error) => {
        console.error('Authentication error:', error);
        setError(error.message || 'Authentication failed');
        setIsLoading(false);
    };

    const handleGoogleResponse = async (response) => {
        if (!response?.credential) {
            handleAuthError(new Error('No credentials received from Google'));
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            const decoded = JSON.parse(atob(response.credential.split('.')[1]));

        // If same Google account, use existing profile data
        // const storedEmail = localStorage.getItem('userEmail');
        // if (storedEmail === decoded.email) {
        //     const username = localStorage.getItem('googleUsername');
        //     const password = localStorage.getItem('googleUserPassword');
        //     const loginResponse = await postData('/user/login', { username, password });
            
        //     if (loginResponse.code === 0) {
        //         const userData = {
        //             ...loginResponse.data,
        //             avatarPath: loginResponse.data.avatarPath // Use server-side avatar
        //         };
        //         setUser(userData);
        //         navigate("/profile");
        //         return;
        //     }
        // }


            let username = localStorage.getItem('googleUsername');
            let password = localStorage.getItem('googleUserPassword');

            // if it's signup or no stored credentials, generate new credentials
            if (shouldRegister || !username || !password) {
                console.log("here", shouldRegister, username, password);
                const credentials = generateCredentials(decoded);
                username = credentials.username;
                password = credentials.password;

                // try to register
                const registrationData = {
                    userUsername: username,
                    userPassword: password,
                    userEmail: decoded.email,
                    userAvatarPath: decoded.picture || "/avatars/default-avatar.jpg",
                   // isGoogleUser: true
                };

                const registerResponse = await postData('/user/register', registrationData);

                if (registerResponse.code === 0) {
                    localStorage.setItem('googleUsername', username);
                    localStorage.setItem('googleUserPassword', password);
                }
            }

            // login
            const loginResponse = await postData('/user/login', { username, password });

            if (loginResponse.code === 0) {
                const userData = {
                    username: loginResponse.data.username,
                    role: loginResponse.data.role,
                    userUid: loginResponse.data.userUid,
                    token: loginResponse.data.token,
                    avatarPath: loginResponse.data.avatarPath || decoded.picture || "/avatars/default-avatar.jpg"
                };

                localStorage.setItem('userEmail', decoded.email);
                localStorage.setItem('isGoogleUser', 'true');

                setUser(userData);
                navigate("/profile");
            } else {
                throw new Error(loginResponse.message || 'Login failed');
            }
        } catch (error) {
            handleAuthError(error);
        }
    };

    useEffect(() => {
        const initializeGoogleSignIn = async () => {
            try {
                await loadGoogleScript();

                if (!window.google) {
                    throw new Error('Google Sign In script failed to load');
                }

                window.google.accounts.id.initialize({
                    client_id: clientId,
                    callback: handleGoogleResponse,
                    auto_select: false,
                    cancel_on_tap_outside: true,
                });

                window.google.accounts.id.renderButton(
                    document.getElementById('google-signin-btn'),
                    {
                        type: 'standard',
                        theme: 'outline',
                        size: 'large',
                        text: shouldRegister ? 'signup_with' : 'signin_with',
                        shape: 'rectangular',
                        locale: 'en',
                        width: 250
                    }
                );
            } catch (error) {
                setError('Failed to initialize Google Sign In');
            }
        };

        initializeGoogleSignIn();

        return () => {
            if (window.google) {
                window.google.accounts.id.cancel();
            }
        };
    }, [clientId, shouldRegister]);

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div
                id="google-signin-btn"
                className={`mb-5 2xl:mb-10 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            />

            {isLoading && (
                <div className="text-center text-gray-600">
                    Processing...
                </div>
            )}

            {error && (
                <div className="text-red-500 text-sm mb-4 text-center">
                    {error}
                </div>
            )}
        </div>
    );
}