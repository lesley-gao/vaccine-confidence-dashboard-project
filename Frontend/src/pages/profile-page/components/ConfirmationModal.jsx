/**
 * This component is a confirmation modal that displays a dialog box with confirm and cancel options for user actions.
 * It is used on the Profile page.
 */
import React from "react";

export default function ConfirmationModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 rounded-lg shadow-lg">
      <div className="bg-white p-6 rounded shadow-lg w-96 dark:text-slate-800">
        <h2 className="text-lg font-bold mb-4">Confirmation</h2>
        <p className="mb-6">Are you sure you want to save the changes?</p>
        <div className="flex justify-end gap-4">
          <button
            className="bg-gray-300 px-4 py-2 rounded text-gray-800"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-[#152063] text-white px-4 py-2 rounded"
            onClick={onConfirm}
          >
            Sure
          </button>
        </div>
      </div>
    </div>
  );
}