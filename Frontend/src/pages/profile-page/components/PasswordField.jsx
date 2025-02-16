/**
 * This component is a password field that allows users to change their password.
 * It displays fields for the old password, new password, and password confirmation.
 * It provides validation for the new password and handles the save and cancel actions.
 * It is used on the Profile page.
 */
import React, { useEffect, useState } from "react";

export default function PasswordField({
  editable,
  onReset,
  onCancel,
  setShowConfirmationModal,
  onTempSave,
  error
}) {
  const [tempPassword, setTempPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [validationError, setValidationError] = useState({});
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  useEffect(() => {
    if (error) {
      setValidationError((prev) => ({ ...prev, ...error }));
    }
  }, [error]);

  const handlePasswordChange = (field, value) => {
    setTempPassword((prev) => ({ ...prev, [field]: value }));
    setValidationError((prev) => ({ ...prev, [field]: "" }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSavePassword = () => {
    const errors = {};

    // Validate old password
    if (!tempPassword.oldPassword.trim()) {
      errors.oldPassword = "The old password cannot be empty";
    }

    // Validate new password
    if (!tempPassword.newPassword.trim()) {
      errors.newPassword = "The new password cannot be empty";
    } else {
      if (tempPassword.newPassword.length < 6) {
        errors.newPassword = "The new password must be at least 6 characters long";
      }
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
      if (!passwordRegex.test(tempPassword.newPassword)) {
        errors.newPassword =
          "The new password must include at least one uppercase letter, one lowercase letter, and one number";
      }
    }
    // Validate confirm password
    if (!tempPassword.confirmPassword.trim()) {
      errors.confirmPassword = "Please confirm your new password";
    } else if (tempPassword.newPassword !== tempPassword.confirmPassword) {
      errors.confirmPassword = "The new passwords you entered twice do not match";
    }

    if (Object.keys(errors).length > 0) {
      setValidationError(errors);
      return;
    }

    onTempSave({
      oldPassword: tempPassword.oldPassword,
      newPassword: tempPassword.newPassword,
    });

    setShowConfirmationModal(true);
    setTempPassword({ oldPassword: "", newPassword: "", confirmPassword: "" });
    setShowPassword({ oldPassword: false, newPassword: false, confirmPassword: false });
  };

  const handleCancelClick = () => {
    onCancel();
    setTempPassword({ oldPassword: "", newPassword: "", confirmPassword: "" });
    setValidationError({});
    setShowPassword({ oldPassword: false, newPassword: false, confirmPassword: false });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-gray-700 font-medium dark:text-white">Password</label>
        <div className="flex items-center gap-2">
          <button
            className="font-semibold text-sm text-[#152063] cursor-pointer dark:text-cyan-300"
            onClick={editable ? handleCancelClick : onReset}
          >
            {editable ? "Cancel" : "Reset"}
          </button>
          {editable && (
            <button
              className="font-bold text-sm text-[#152063] cursor-pointer dark:text-cyan-300"
              onClick={handleSavePassword}
            >
              Save
            </button>
          )}
        </div>
      </div>

      {editable ? (
        <div>
          {/* Old Password */}
          <div className="mb-3 relative">
            <input
              type={showPassword.oldPassword ? "text" : "password"}
              value={tempPassword.oldPassword}
              onChange={(e) => handlePasswordChange("oldPassword", e.target.value)}
              placeholder="Enter your old password"
              className={`w-full p-2 border rounded dark:text-black  ${validationError.oldPassword ? "border-red-500" : "border-gray-300"
                }`}
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-sm text-[#152063] cursor-pointer"
              onClick={() => togglePasswordVisibility("oldPassword")}
            >
              {showPassword.oldPassword ? "Hide" : "Show"}
            </button>
            {validationError.oldPassword && (
              <p className="text-red-500 text-sm mt-1">
                {validationError.oldPassword}
              </p>
            )}
          </div>

          {/* New Password */}
          <div className="mb-3 relative">
            <input
              type={showPassword.newPassword ? "text" : "password"}
              value={tempPassword.newPassword}
              onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
              placeholder="Enter your new password"
              className={`w-full p-2 border rounded dark:text-black ${validationError.newPassword ? "border-red-500" : "border-gray-300"
                }`}
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-sm text-[#152063] cursor-pointer"
              onClick={() => togglePasswordVisibility("newPassword")}
            >
              {showPassword.newPassword ? "Hide" : "Show"}
            </button>
            {validationError.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {validationError.newPassword}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showPassword.confirmPassword ? "text" : "password"}
              value={tempPassword.confirmPassword}
              onChange={(e) =>
                handlePasswordChange("confirmPassword", e.target.value)
              }
              placeholder="Repeat your new password"
              className={`w-full p-2 border rounded dark:text-black  ${validationError.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-sm text-[#152063] cursor-pointer"
              onClick={() => togglePasswordVisibility("confirmPassword")}
            >
              {showPassword.confirmPassword ? "Hide" : "Show"}
            </button>
            {validationError.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {validationError.confirmPassword}
              </p>
            )}
          </div>
          <a
            className="font-bold text-sm text-[#152063] cursor-pointer dark:text-cyan-300"
            href="/forgot-password"
          >
            Forgot Your Password?
          </a>
        </div>
      ) : (
        <input
          type="password"
          value="**********"
          disabled
          className="w-full p-2 border rounded border-gray-300"
        />
      )}
    </div>
  );
}