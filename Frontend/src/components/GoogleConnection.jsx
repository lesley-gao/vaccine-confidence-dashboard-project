// This component is used to display the Google connection button on the login and signup page.
import { useEffect } from 'react';

export default function GoogleConnection({ onConnectSuccess, onConnectFailure, onLogout }) {

    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    useEffect(() => {
        const initializeGoogleSignIn = () => {
            if (window.google) {
                try {
                    window.google.accounts.id.initialize({
                        client_id: clientId,
                        callback: handleCredentialResponse,
                        auto_select: false,
                        cancel_on_tap_outside: true,
                    });

                    window.google.accounts.id.renderButton(
                        document.getElementById('google-signin-btn'),
                        {
                            type: 'standard',
                            theme: 'outline',
                            size: 'large',
                            text: 'signup_with',
                            locale: 'en',
                            shape: 'rectangular',
                        }
                    );
                } catch (error) {
                    console.error('Google Sign In initialization error:', error);
                }
            }
        };

        const handleCredentialResponse = (response) => {
            try {
                if (response.credential) {
                    onConnectSuccess(response);
                } else {
                    onConnectFailure?.('No credentials received');
                }
            } catch (error) {
                console.error('Credential handling error:', error);
                onConnectFailure?.(error);
            }
        };

        const handleLogout = () => {
            if (window.google) {
                window.google.accounts.id.disableAutoSelect(); // 禁用自动登录
                console.log('User logged out successfully');
                onLogout?.(); // 调用外部的登出回调
            }
        };

        // make sure the script is loaded before rendering the button
        if (window.google) {
            initializeGoogleSignIn();
        } else {
            // add event listener to load the script
            window.addEventListener('load', initializeGoogleSignIn);
            return () => window.removeEventListener('load', initializeGoogleSignIn);
        }
    }, [clientId, onConnectSuccess, onConnectFailure, onLogout]);

    useEffect(() => {
        const btn = document.querySelector('#google-signin-btn > div');
        if (btn) {
            console.log('Button size:', btn.offsetWidth, btn.offsetHeight);
        }
    }, []);

    return (
        <div className="w-full">
            <div
                id="google-signin-btn"
                className="mb-5 2xl:mb-10 w-full
            [&_div.S9gUrf-YoZ4jf]:!w-full
            [&_div.nsm7Bb-HzV7m-LgbsSe]:!w-full
            [&_div.nsm7Bb-HzV7m-LgbsSe]:!border-2
            [&_div.nsm7Bb-HzV7m-LgbsSe]:!border-gray-300
            [&_div.nsm7Bb-HzV7m-LgbsSe]:!rounded-xl
            [&_div.nsm7Bb-HzV7m-LgbsSe]:!py-5
            [&_div.nsm7Bb-HzV7m-LgbsSe]:!px-4
            [&_div.nsm7Bb-HzV7m-LgbsSe]:hover:!bg-gray-100
            [&_div.nsm7Bb-HzV7m-LgbsSe]:!transition
            [&_div.nsm7Bb-HzV7m-LgbsSe]:!h-[60px]
            [&_div.nsm7Bb-HzV7m-LgbsSe]:!flex
            [&_div.nsm7Bb-HzV7m-LgbsSe]:!items-center
            [&_div.nsm7Bb-HzV7m-LgbsSe]:!justify-center
            [&_span.nsm7Bb-HzV7m-LgbsSe-BPrWId]:!text-md
            [&_span.nsm7Bb-HzV7m-LgbsSe-BPrWId]:2xl:!text-lg
            [&_span.nsm7Bb-HzV7m-LgbsSe-BPrWId]:!text-gray-600
            [&_span.nsm7Bb-HzV7m-LgbsSe-BPrWId]:!font-normal
            [&_div.google-icon]:!w-[25px]
            [&_div.google-icon]:!mr-3"
            />
        </div>
    );
}