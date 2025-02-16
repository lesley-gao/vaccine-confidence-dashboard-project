/**
* This component is responsible for rendering the Google Sign-In button and handling the authentication process with Google. 
* It uses the Google Identity Services API to authenticate users with their Google account.
* The component also sends the Google OAuth token to the server for verification and logs the user in if the token is valid.
* It is used on Signup and Login pages.
 */
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContextProvider";
import { loadGoogleScript } from "@/utils/googleAuthLoader";
import { postData } from '@/utils/api';

export default function GoogleConnection({ shouldRegister }) {
    const navigate = useNavigate();
    const { setUser } = useAppContext();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

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

            const loginResponse = await postData(`/account/google-login`, {
                idCredential: response.credential
            });

            if (loginResponse.code === 0) {
                const userData = {
                    username: loginResponse.data.username,
                    role: loginResponse.data.role,
                    userUid: loginResponse.data.userUid,
                    token: loginResponse.data.token,
                    avatarPath: loginResponse.data.avatarPath ||
                        JSON.parse(atob(response.credential.split('.')[1])).picture ||
                        "/avatars/default-avatar.jpg"
                };

                setUser(userData);
                navigate("/profile");
            } else {
                throw new Error(loginResponse.message || 'Authentication failed');
            }
        } catch (error) {
            handleAuthError(error);
        } finally {
            setIsLoading(false);
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
                        width: 300,
                        height: 100,
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