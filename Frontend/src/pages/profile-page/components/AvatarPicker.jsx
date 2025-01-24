import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
];

export default function AvatarPicker({ selectedAvatar, onAvatarChange }) {
  return (
    <div className="flex flex-col items-center">
      <Avatar className="w-40 h-40">
        <AvatarImage src={selectedAvatar} alt="Selected Avatar" />
        <AvatarFallback>
          <img src="/avatars/default-avatar.jpg" alt="Selected Avatar" />
        </AvatarFallback>
      </Avatar>

      <div className="grid grid-cols-6 gap-4 mt-4">
        {avatarOptions.map((avatar, index) => (
          <button
            key={index}
            onClick={() => onAvatarChange(avatar)}
            className={`p-1 border-4 rounded-full ${selectedAvatar === avatar ? "border-blue-500" : "border-gray-300"
              }`}
          >
            <Avatar className="w-12 h-12">
              <AvatarImage src={avatar} alt={`Avatar ${index + 1}`} />
              <AvatarFallback>Loading</AvatarFallback>
            </Avatar>
          </button>
        ))}
      </div>
    </div>
  );
}