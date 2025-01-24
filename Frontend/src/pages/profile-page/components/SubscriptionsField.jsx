import React, { useState, useEffect } from "react";
import { useVaccine } from "@/hooks/useVaccine";

export default function SubscriptionsField({
  subscriptions,
  editable,
  onReset,
  onCancel,
  setShowConfirmationModal,
  onTempSave
}) {
  const [localSubscriptions, setLocalSubscriptions] = useState([]);
  const { vaccineTypes, isLoading, error } = useVaccine();

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
        <label className="text-gray-700 font-medium">
          Vaccine Information Subscription
        </label>
        <div className="flex items-center gap-2">
          <button
            className={`font-bold text-sm text-[#152063] cursor-pointer`}
            onClick={editable ? onCancel : onReset}
          >
            {editable ? "Cancel" : "Edit"}
          </button>
          {editable && (
            <button
              className="font-bold text-sm text-[#152063] cursor-pointer"
              onClick={handleSaveSubscriptions}
            >
              Save
            </button>
          )}
        </div>
      </div>

      {localSubscriptions.length === 0 ? (
        <p className="text-gray-500 text-[15px]">
          You don't have any vaccines subscribed yet
        </p>
      ) : (
        <div className="flex flex-wrap gap-2 mt-2">
          {localSubscriptions.map((subscription, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-[#152063] text-white px-3 py-1 rounded"
            >
              <span>{subscription.vacType}</span>
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
              className="text-blue-600 font-bold underline text-sm"
            >
              + Add
            </button>
            {showAddDropdown && (
              <select
                onChange={(e) => handleAddSubscription(e.target.value)}
                value=""
                className="p-1 border border-gray-300 rounded"
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
            className="text-red-600 font-bold underline text-sm"
          >
            - Cancel all subscriptions
          </button>
        </div>
      )}
    </div>
  );
}