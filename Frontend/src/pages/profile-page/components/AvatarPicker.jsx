/**
 * This component is an avatar picker that allows users to select an avatar from a list of options.
 * It is used on the Profile page.
 */
import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";

const avatarOptions = [
  "/avatars/avatar1.jpg",
  "/avatars/avatar2.jpg",
  "/avatars/avatar3.jpg",
  "/avatars/avatar4.jpg",
  "/avatars/avatar5.jpg",
  "/avatars/avatar6.jpg",
  "/avatars/avatar7.jpg",
  "/avatars/avatar8.jpg",
  "/avatars/avatar9.jpg",
  "/avatars/avatar10.jpg",
  "/avatars/avatar11.jpg",
  "/avatars/avatar12.jpg",
  "/avatars/avatar13.jpg",
  "/avatars/avatar14.jpg",
  "/avatars/avatar15.jpg",
  "/avatars/avatar16.jpg",
  "/avatars/avatar17.jpg",
  "/avatars/avatar18.jpg",
  "/avatars/avatar19.jpg",
  "/avatars/avatar20.jpg",
  "/avatars/avatar21.jpg",
  "/avatars/avatar22.jpg",
  "/avatars/avatar23.jpg",
  "/avatars/avatar24.jpg",
  "/avatars/avatar25.jpg",
  "/avatars/avatar26.jpg",
  "/avatars/avatar27.jpg",
  "/avatars/avatar28.jpg",
  "/avatars/avatar29.jpg",
  "/avatars/avatar30.jpg",
];

export default function AvatarPicker({ selectedAvatar, onAvatarChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempAvatar, setTempAvatar] = useState(selectedAvatar);

  const handleSave = () => {
    onAvatarChange(tempAvatar);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col items-center">
      <Avatar className="w-40 h-40 mb-2 border-4 border-gray-300">
        <AvatarImage src={tempAvatar} alt="Selected Avatar" />
        <AvatarFallback>
          <img src="/avatars/default-avatar.jpg" alt="Selected Avatar" />
        </AvatarFallback>
      </Avatar>

      <div className="flex gap-4">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 mt-2 text-sm text-white dark:text-slate-700 hover:dark:text-slate-900 bg-[#3949ab] hover:bg-blue-900 dark:bg-cyan-300 dark:hover:bg-[#2dd4bf] rounded-lg "
          >
            Change Avatar
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                setTempAvatar(selectedAvatar);
                setIsEditing(false);
              }}
              className="px-4 py-2 text-sm text-white bg-gray-500 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm text-white dark:text-slate-700 hover:dark:text-slate-900 bg-[#3949ab] hover:bg-blue-900 dark:bg-cyan-300 dark:hover:bg-[#2dd4bf] rounded-lg "
            >
              Save
            </button>
          </>
        )}
      </div>

      {isEditing && (
        <motion.div
          className="mt-4 w-full max-w-md"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-6 gap-2 max-h-64 overflow-y-auto p-4 rounded-lg  scrollbar-hide">
            {avatarOptions.map((avatar, index) => (
              <button
                key={index}
                onClick={() => setTempAvatar(avatar)}
                className="p-1 rounded-full"
              >
                <Avatar
                  className={`w-15 h-15 rounded-full border-4 ${tempAvatar === avatar ? "border-blue-500" : "border-transparent"
                    }`}
                >
                  <AvatarImage src={avatar} alt={`Avatar ${index + 1}`} />
                  <AvatarFallback>Loading</AvatarFallback>
                </Avatar>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}