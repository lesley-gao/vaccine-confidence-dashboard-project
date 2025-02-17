/**
 * This component is used to reset the user's password.
 * It allows the user to enter a verification code sent to their email and set a new password.
 * If successful, the user is redirected to the login page.
 */
import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import Logo from '@/components/Logo';
import PasswordImg from '@/components/PasswordImg';
import {BsFillCheckSquareFill} from 'react-icons/bs'
import {patchData} from '@/utils/api';

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // get email from route state, if no email, redirect to forgot password page
  useEffect(() => {
    const emailFromState = location.state?.email;
    if (!emailFromState) {
      navigate('/forgot-password');
      return;
    }
    setEmail(emailFromState);
  }, [location.state, navigate]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!verificationCode || !newPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (newPassword.length < 6) {
      setError("The new password must be at least 6 characters long.");
      return;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (!passwordRegex.test(newPassword)) {
      setError("The new password must contain upper, lower case letters and numbers.");
      return
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await patchData(
        `/account/password-reset/verify?email=${encodeURIComponent(email)}&verificationCode=${verificationCode}&newPwd=${newPassword}`
      );

      if (data.code === 0) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login', {
            state: {message: 'Password reset successful. Please login with your new password.'}
          });
        }, 3000);
      } else {
        throw new Error(data.message || 'Failed to reset password');
      }
    } catch (err) {
      console.error('Error resetting password:', err);
      setError(err.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-customTheme-light to-customTheme-dark">
      <Logo/>

      {/* Left Section */}
      <div className="flex w-full md:w-3/5 items-center justify-center bg-white rounded-none md:rounded-r-[50px]">
        <div className="w-3/5">
          <h2 className="text-[25px] 2xl:text-3xl font-bold my-4 text-gray-800">
            Reset Password
          </h2>
          <p className="text-gray-600 mb-8">
            Enter the verification code sent to your email and set your new password.
          </p>

          <form className="flex flex-col gap-5" onSubmit={handleResetPassword}>
            {error && (
              <div className="text-red-500">
                {error}
              </div>
            )}

            {success && (
              <p className="flex items-center gap-2 font-semibold text-green-600">
                <BsFillCheckSquareFill/>
                Password reset successful! Please login with your new password.
              </p>
            )}

            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Enter verification code"
              className="input-field py-5"
              disabled={isLoading}
            />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="input-field py-5"
              disabled={isLoading}
            />

            <button type="submit" className="submission-btn" disabled={isLoading}>
              {isLoading ? 'Resetting password...' : 'Reset Password'}
            </button>

            <div className="text-center mt-4">
              <Link to="/login" className="text-[#3949AB] hover:underline">
                ← Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden md:flex w-2/5 h-full min-h-screen items-center justify-center flex-col">
        <PasswordImg className="flex-grow w-full"/>
      </div>
    </div>
  );
}