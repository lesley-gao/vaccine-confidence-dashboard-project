/**
 * This component is a username field that allows users to change their username.
 * It displays the current username and allows users to edit it.
 * It provides validation for the new username and handles the save and cancel actions.
 * It is used on the Profile page.
 */
import React, { useState } from "react";

export default function UsernameField({
  editable,
  onReset,
  onCancel,
  setShowConfirmationModal,
  currentUsername,
  onTempSave,
}) {
  const [tempUsername, setTempUsername] = useState({
    newUserName: "",
  });
  const [validationError, setValidationError] = useState({});

  const handleUserNameChange = (field, value) => {
    setTempUsername((prev) => ({ ...prev, [field]: value }));
    setValidationError((prev) => ({ ...prev, [field]: "" }));
  };

  const handlecheckSave = () => {
    const errors = {};

    if (!tempUsername.newUserName.trim()) {
      errors.newUserName = "The username cannot be empty";
    } else if (tempUsername.newUserName === currentUsername) {
      errors.newUserName = "The username cannot be the same as the current one";
    }

    if (Object.keys(errors).length > 0) {
      setValidationError(errors);
      return;
    }

    setShowConfirmationModal(true);
    onTempSave(tempUsername.newUserName);
    setTempUsername({ newUserName: "" });
  };

  const handleCancelClick = () => {
    onCancel();
    setTempUsername({ newUserName: "" });
    setValidationError({});
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-gray-700 font-medium dark:text-white ">Username</label>
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
              onClick={handlecheckSave}
            >
              Save
            </button>
          )}
        </div>
      </div>

      {editable ? (
        <div>
          <input
            type="text"
            value={tempUsername.newUserName}
            onChange={(e) => handleUserNameChange("newUserName", e.target.value)}
            placeholder="Enter your new username"
            className={`w-full p-2 border rounded dark:text-black ${validationError.newUserName ? "border-red-500" : "border-gray-300"
              }`}
          />
          {validationError.newUserName && (
            <p className="text-red-500 text-sm mt-1">
              {validationError.newUserName}
            </p>
          )}
        </div>
      ) : (
        <input
          type="text"
          value={currentUsername}
          disabled
          className="w-full p-2 border rounded border-gray-300"
        />
      )}
    </div>
  );
}
