/**
 * This component manages vaccine subscriptions, allowing users to add, remove, and edit their subscribed vaccines.
 * It is used on the Profile page.
 */
import { FaPlus } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { useVaccine } from "@/hooks/useVaccine";
import { useNavigate } from "react-router-dom";

export default function SubscriptionsField({
  subscriptions,
  editable,
  onReset,
  onCancel,
  setShowConfirmationModal,
  onTempSave
}) {
  const [localSubscriptions, setLocalSubscriptions] = useState([]);
  const { vaccineTypes } = useVaccine();
  const navigate = useNavigate();

  useEffect(() => {
    setLocalSubscriptions(subscriptions || []);
  }, [subscriptions]);

  const [showAddDropdown, setShowAddDropdown] = useState(false);

  const handleAddSubscription = (vaccineType) => {
    const vaccine = vaccineTypes.find((v) => v.vaccineType === vaccineType);
    if (!vaccine) {
      console.error("Vaccine not found for type:", vaccineType);
      return;
    }

    const newSubscription = {
      vacType: vaccineType,
      vacIdPk: vaccine.vaccineId,
    };
    setLocalSubscriptions((prev) => [...prev, newSubscription]);
    setShowAddDropdown(false);
  };

  const handleRemoveSubscription = (index) => {
    setLocalSubscriptions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCancelAllSubscriptions = () => {
    setLocalSubscriptions([]);
    setShowAddDropdown(false);
  };

  const getAvailableVaccines = () => {
    return vaccineTypes
      .map((vaccine) => vaccine.vaccineType)
      .filter((vaccine) => !localSubscriptions.some((sub) => sub.vacType === vaccine));
  };

  const filteredVaccines = getAvailableVaccines();

  const handleSaveSubscriptions = () => {
    onTempSave(localSubscriptions);
    setShowConfirmationModal(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-gray-700 font-medium dark:text-white">
          Vaccine Information Subscription
        </label>
        <div className="flex items-center gap-2">
          <button
            className={`font-bold text-sm text-[#152063] cursor-pointer dark:text-cyan-300`}
            onClick={editable ? onCancel : onReset}
          >
            {editable ? "Cancel" : "Edit"}
          </button>
          {editable && (
            <button
              className="font-bold text-sm text-[#152063] cursor-pointer dark:text-cyan-300"
              onClick={handleSaveSubscriptions}
            >
              Save
            </button>
          )}
        </div>
      </div>

      {localSubscriptions.length === 0 ? (
        <p className="text-gray-500 text-[15px] dark:text-white/60">
          You don't have any vaccines subscribed yet
        </p>
      ) : (
        <div className="flex flex-wrap gap-2 mt-2">
          {localSubscriptions.map((subscription, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-[#3949ab] text-white px-3 py-1 rounded"
            >
              <span
                onClick={() =>
                  navigate("/dashboard", { state: { vaccineId: subscription.vacIdPk } })
                }
                className="cursor-pointer hover:text-cyan-300"
              >{subscription.vacType}</span>
              {editable && (
                <button
                  className="flex items-center justify-center bg-white text-[#152063] font-bold rounded-full w-5 h-5"
                  onClick={() => handleRemoveSubscription(index)}
                >
                  x
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {editable && (
        <div className="flex flex-col gap-4 mt-4 items-start">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setShowAddDropdown((prev) => !prev)}
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-[#152063] dark:text-[#2dd4bf] hover:text-blue-700 dark:hover:text-cyan-300 transition-colors duration-200 ease-in-out rounded-md hover:bg-blue-50 dark:hover:bg-slate-800"
            >
              <FaPlus className="w-4 h-4 mr-1.5" /> Add Vaccine
            </button>

            {showAddDropdown && (
              <select
                onChange={(e) => handleAddSubscription(e.target.value)}
                value=""
                className="p-2 border border-gray-300 rounded-md dark:bg-slate-800 dark:border-slate-600 dark:text-white w-[200px] focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-400 focus:border-transparent outline-none"
              >
                <option value="" disabled>
                  Select a vaccine
                </option>
                {filteredVaccines.map((vaccine, index) => (
                  <option key={index} value={vaccine}>
                    {vaccine}
                  </option>
                ))}
              </select>
            )}
          </div>

          <button
            onClick={handleCancelAllSubscriptions}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 transition-colors duration-200 ease-in-out rounded-md hover:bg-red-50 dark:hover:bg-slate-800 dark:text-red-400 dark:hover:text-red-300"
          >
            <FaTimes className="w-4 h-4 mr-1.5" />Cancel all subscriptions
          </button>
        </div>
      )}
    </div>
  );
}