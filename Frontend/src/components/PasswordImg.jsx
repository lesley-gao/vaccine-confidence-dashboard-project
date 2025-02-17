/**
 * This component is the image that is displayed on the ForgotPassword and ResetPassword pages.
 */
export default function PasswordImg() {
    return (
        <div className="h-screen w-full flex items-center justify-center bg-gradient-to-b from-customTheme-light to-customTheme-dark">
            <img
                src="/image/set-pwd.png"
                alt="reset password"
                className="w-64"
            />
        </div>
    );
}
