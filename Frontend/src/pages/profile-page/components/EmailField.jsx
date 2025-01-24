import React, { useState } from "react";

export default function EmailField({
  editable,
  onReset,
  onCancel,
  setShowConfirmationModal,
  currentEmail,
  onTempSave,
}) {
  const [tempEmail, setTempEmail] = useState({
    newEmail: "",
  });
  const [validationError, setValidationError] = useState({});

  const handleEmailChange = (field, value) => {
    setTempEmail((prev) => ({ ...prev, [field]: value }));
    setValidationError((prev) => ({ ...prev, [field]: "" }));
  };

  const handlecheckSave = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!tempEmail.newEmail.trim()) {
      errors.newEmail = "The email cannot be empty";
    } else if (tempEmail.newEmail === currentEmail) {
      errors.newEmail = "The email cannot be the same as the current one";
    } else if (!emailRegex.test(tempEmail.newEmail)) {
        errors.newEmail = "Please enter a valid email address";
    }

    if (Object.keys(errors).length > 0) {
      setValidationError(errors);
      return;
    }

    setShowConfirmationModal(true);
    onTempSave(tempEmail.newEmail);
    setTempEmail({ newEmail: "" });
  };

  const handleCancelClick = () => {
    onCancel();
    setTempEmail({ newEmail: "" });
    setValidationError({});
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-gray-700 font-medium">Email</label>
        <div className="flex items-center gap-2">
          <button
            className="font-bold text-sm text-[#152063] cursor-pointer"
            onClick={editable ? handleCancelClick : onReset}
          >
            {editable ? "Cancel" : "Reset"}
          </button>
          {editable && (
            <button
              className="font-bold text-sm text-[#152063] cursor-pointer"
              onClick={handlecheckSave}
            >
              Save
            </button>
          )}
        </div>
      </div>

      {editable ? (
        <div className="mt-2">
          <div className="mb-3">
            <input
              type="text"
              value={tempEmail.newEmail}
              onChange={(e) => handleEmailChange("newEmail", e.target.value)}
              placeholder="Enter your new email"
              className={`w-full p-2 border rounded ${
                validationError.newEmail ? "border-red-500" : "border-gray-300"
              }`}
            />
            {validationError.newEmail && (
              <p className="text-red-500 text-sm mt-1">
                {validationError.newEmail}
              </p>
            )}
          </div>
        </div>
      ) : (
        <input
          type="text"
          value={currentEmail}
          disabled
          className="w-full p-2 border rounded border-gray-300"
        />
      )}
    </div>
  );
}
