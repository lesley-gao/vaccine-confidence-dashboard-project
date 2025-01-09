import React from "react";
import { useNavigate } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import VaxBanner from "@/components/VaxBanner";
import GoogleConnection from "@/components/GoogleConnection";
import useGoogleAuth from "@/hooks/useGoogleAuth";

export default function SignupPage() {

  useGoogleAuth(); // Load Google Sign-In script, make sure the script is loaded before rendering the button

  const navigate = useNavigate();

  const handleSignupSuccess = (response) => {

    try {
      console.log('Login successful:', response);
      // 处理登录成功逻辑
      const { credential } = response;

      // 解码 JWT 获取用户信息
      const decoded = JSON.parse(atob(credential.split('.')[1]));
      console.log('Decoded token:', decoded);

      // 构建用户数据
      const userData = {
        email: decoded.email,
        name: decoded.name,
        googleId: decoded.sub,
        // 其他需要的用户信息
      };

      console.log('User logged in successfully:', userData);
      // TODO: 发送到后端进行注册/登录
      // const result = await registerWithGoogle(userData);

      navigate('/profile'); // Redirect to profile page after successful login
    } catch (error) {
      console.error('Google auth error:', error);
    }
  };

  const handleSignupFailure = (error) => {
    console.error('Login failed:', error);
    // 处理登录失败逻辑
  };

  const handleLogout = () => {
    console.log('User logged out');
  };

  return (
    <div className="flex h-screen bg-gradient-to-b from-customTheme-light to-customTheme-dark">
      {/* Left Section */}
      <div className="hidden md:flex md:w-2/5 items-center justify-center">
        <VaxBanner />
      </div>

      {/* Right Section */}
      <div className="flex w-full md:w-3/5 items-center justify-center bg-white rounded-none md:rounded-l-[50px]">
        <div className="w-3/5 max-w-xl">
          <h2 className="text-[25px] 2xl:text-3xl font-bold mb-5 2xl:mb-10 text-gray-800">Create Account</h2>

          {/* Google Signup Button */}
          <GoogleConnection onConnectSuccess={handleSignupSuccess} onConnectFailure={handleSignupFailure} onLogout={handleLogout} />

          {/* Separator */}
          <div className="flex items-center mb-5 2xl:mb-10">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-3 text-gray-500 text-md 2xl:text-lg">or continue with email</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          {/* Signup Form */}
          <SignupForm />
        </div>
      </div>
    </div>
  );
}