// This is a component that allows the user to select an avatar from a list of options
import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const avatarOptions = [
  "/src/assets/avatars/avatar1.jpg",
  "/src/assets/avatars/avatar2.jpg",
  "/src/assets/avatars/avatar3.jpg",
  "/src/assets/avatars/avatar4.jpg",
  "/src/assets/avatars/avatar5.jpg",
  "/src/assets/avatars/avatar6.jpg",
  "/src/assets/avatars/avatar7.jpg",
  "/src/assets/avatars/avatar8.jpg",
  "/src/assets/avatars/avatar9.jpg",
  "/src/assets/avatars/avatar10.jpg",
  "/src/assets/avatars/avatar11.jpg",
  "/src/assets/avatars/avatar12.jpg",
  "/src/assets/avatars/avatar13.jpg",
  "/src/assets/avatars/avatar14.jpg",
  "/src/assets/avatars/avatar15.jpg",
  "/src/assets/avatars/avatar16.jpg",
  "/src/assets/avatars/avatar17.jpg",
  "/src/assets/avatars/avatar18.jpg"
];

export default function AvatarSelector() {
  const [selectedAvatar, setSelectedAvatar] = useState(avatarOptions[0]);

  return (
    <div className="flex flex-col items-center">
      {/* Current Selected Avatar */}
      <Avatar className=" w-20 h-20">
        <AvatarImage src={selectedAvatar} alt="Selected Avatar" />
        <AvatarFallback>?</AvatarFallback>
      </Avatar>


      {/* Avatar Options */}
      <div className="grid grid-cols-6 gap-4 mt-4 max-w-3xl">
        {avatarOptions.map((avatar, index) => (
          <button
            key={index}
            onClick={() => setSelectedAvatar(avatar)}
            className={`p-1 border-4 rounded-full ${selectedAvatar === avatar ? "border-blue-500" : "border-gray-300"
              }`}
          >
            <Avatar>
              <AvatarImage src={avatar} alt={`Avatar ${index + 1}`} />
              <AvatarFallback>?</AvatarFallback>
            </Avatar>
          </button>
        ))}
      </div>
    </div>
  );
}
