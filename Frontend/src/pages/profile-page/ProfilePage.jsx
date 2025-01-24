import React, { useState, useEffect } from "react";
import AvatarPicker from "./components/AvatarPicker";
import UsernameField from "./components/UsernameField";
import PasswordField from "./components/PasswordField";
import EmailField from "./components/EmailField";
import SubscriptionsField from "./components/SubscriptionsField";
import ConfirmationModal from "./components/ConfirmationModal";
import { useAppContext } from "@/context/AppContextProvider";
import { fetchData } from "@/utils/api.js";
import { postData } from "@/utils/api";
import { putData } from "@/utils/api";
import { patchData } from "@/utils/api";
import { deleteData } from "@/utils/api";

export default function ProfilePage() {
  const { user, setUser } = useAppContext();
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [tempInfo, setTempInfo] = useState(null);
  const [tempPassword, setTempPassword] = useState(null);
  const [tempSubscriptions, setTempSubscriptions] = useState([]);
  const [editableField, setEditableField] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [passwordFieldError, setPasswordFieldError] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = user?.token;
        if (!token) {
          alert("Session expired. Please log in again.");
          window.location.href = "/login";
          return;
        }
        setToken(token);

        const userData = await fetchData("/user/profile", {
          headers: {
            token: token,
          },
        });
        setUserInfo(userData);
        setTempInfo(userData);

        console.log("Fetched userInfo:", userData);
  
        const subscriptionData = await fetchData("/user/subscription/get", {
          headers: {
            token: token,
          },
        });

        if (Array.isArray(subscriptionData)) {
          setSubscriptions(subscriptionData);
          setTempSubscriptions(subscriptionData); 
        } else {
          console.error("Unexpected subscription response format:", subscriptionData);
        }

      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
  
    fetchUserData();
  }, [user]);


const saveAvatar = async (newAvatar) => {
  const updatedInfo = { ...tempInfo, userAvatarPath: newAvatar };
  try {
    const response = await postData("/user/update/profile", updatedInfo, {
      headers: { token },
    });

    console.log("Response from updating avatar:", updatedInfo);

    if (response.code === 0) {
      setUserInfo((prev) => ({
        ...prev,
        userAvatarPath: newAvatar,
      }));
      setTempInfo((prev) => ({
        ...prev,
        userAvatarPath: newAvatar,
      }));

      setUser({
        ...user,
        avatarPath: newAvatar
      });

      alert("Avatar updated successfully!");
    } else {
      throw new Error(response.message || "Failed to update avatar. Please try again.");
    }
  } catch (error) {
    console.error("Error updating avatar:", error.message || error);
    alert("Failed to update avatar.");
  }
};

const saveUserInfo = async () => {
  try {
    const response = await postData("/user/update/profile", tempInfo, {
      headers: {
        token: token,
      },
    });
    
    if (response.code === 0) {
      setUserInfo((prev) => ({
        ...prev,
        ...tempInfo,
      }));

      setUser({
        ...user,
        username: tempInfo.userUsername
      });

      alert("Profile updated successfully!");
      setEditableField(null);  
    } else {
      throw new Error(response.message || "Failed to update profile. Please try again.");
    }
  } catch (error) {
    console.error("Error in handleSave:", error);
    alert("An error occurred: " + (error.message || "Please try again."));
  }
}

  const savePassword = async () => {
    try {
      const response = await patchData(
        `/user/update/password?oldPwd=${encodeURIComponent(tempPassword.oldPassword)}&newPwd=${encodeURIComponent(tempPassword.newPassword)}`, // 拼接 query string
        null,
        {
          headers: {
            token: token,
          },
        }
      );
  
      if (response.code === 0) {
        alert("Password updated successfully!");
        setEditableField(null);
      } else {
        throw new Error(response.message || "Failed to update password.");
      }
    } catch (error) {
      console.error("Error updating password:", error.message || error);
      setPasswordFieldError({
        oldPassword: error.message.includes("The password is wrong.")
          ? "The old password is incorrect"
          : "",
      });
    }
  };
  
  const saveSubscriptions = async () => {
    try {
      const addedSubscriptions = tempSubscriptions.filter(
        (temp) => !subscriptions.some((sub) => sub.vacIdPk === temp.vacIdPk)
      );
  
      const removedSubscriptions = subscriptions.filter(
        (sub) => !tempSubscriptions.some((temp) => temp.vacIdPk === sub.vacIdPk)
      );
  
      for (const sub of addedSubscriptions) {
        if (!sub.vacIdPk) {
          console.error("vaccineId is missing for added subscription:", sub);
          continue;
        }
        await putData(`/user/subscription/put?vaccineId=${sub.vacIdPk}`, null, {
          headers: { token },
        });
      }
      for (const sub of removedSubscriptions) {
        if (!sub.vacIdPk) {
          console.error("vaccineId is missing for removed subscription:", sub);
          continue;
        }
        await deleteData(`/user/subscription/delete?vaccineId=${sub.vacIdPk}`, {
          headers: { token },
        });
      }
  
      setSubscriptions(tempSubscriptions);
      alert("Subscriptions updated successfully!");
      setEditableField(null);
    } catch (error) {
      console.error("Error saving subscriptions:", error.message || error);
      alert("Failed to save subscriptions.");
    }
  };
  
  const handleSave = async () => {
    try {
      if (editableField === "userUsername" || editableField === "userEmail") {
        await saveUserInfo();
      } else if (editableField === "userPassword") {
        await savePassword();
      } else if (editableField === "subscriptions") {
        await saveSubscriptions();
      }
    } catch (error) {
      console.error("Error in handleSave:", error.message);
    } finally {
      setShowConfirmationModal(false);
    }
  };
  

  const handleCancel = () => {
    setUserInfo(tempInfo);
    setTempSubscriptions(subscriptions);
    setTempPassword(null);
    setEditableField(null);
    setShowConfirmationModal(false);
  };

  if (!userInfo) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="relative z-30 flex flex-row items-center justify-center gap-20 w-[80%] p-10 pr-10 backdrop-blur-lg bg-white/80 rounded-lg shadow-lg">
        <div className="w-full">
        <AvatarPicker
          selectedAvatar={userInfo?.userAvatarPath || ""}
          onAvatarChange={saveAvatar}
        />
        </div>

        <div className="mx-auto my-10 w-full">
          <p className="text-[35px] font-bold">
            <span className="text-[55px] font-bold text-[#152063]">Hi,</span> {userInfo.userUsername}
          </p>

          <div className="mt-4 flex flex-col gap-6">
            <UsernameField
              editable={editableField === "userUsername"}
              onReset={() => setEditableField("userUsername")}
              currentUsername={userInfo.userUsername}
              onCancel={handleCancel}
              setShowConfirmationModal={setShowConfirmationModal}
              onTempSave={(newUserName) =>
                setTempInfo((prev) => ({
                  ...prev,
                  userUsername: newUserName,
                }))
              }
            />

            <PasswordField
              editable={editableField === "userPassword"}
              onReset={() => setEditableField("userPassword")}
              onCancel={handleCancel}
              setShowConfirmationModal={setShowConfirmationModal}
              onTempSave={setTempPassword}
              error={passwordFieldError}
            />

            <EmailField
              editable={editableField === "userEmail"}
              onReset={() => setEditableField("userEmail")}
              currentEmail={userInfo.userEmail}
              onCancel={handleCancel}
              setShowConfirmationModal={setShowConfirmationModal}
              onTempSave={(newEmail) =>
                setTempInfo((prev) => ({
                  ...prev,
                  userEmail: newEmail,
                }))
              }
            />

            <SubscriptionsField
              subscriptions={tempSubscriptions}
              editable={editableField === "subscriptions"}
              onReset={() => setEditableField("subscriptions")}
              onCancel={handleCancel}
              setShowConfirmationModal={setShowConfirmationModal}
              onTempSave={(updatedSubscriptions) => setTempSubscriptions(updatedSubscriptions)}
            />

            {showConfirmationModal && (
              <ConfirmationModal onConfirm={handleSave} onCancel={handleCancel} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}