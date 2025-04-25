"use client";
import { getProfileItemsByUser } from "@/lib/DataServices";
import { IuserCreateInfo } from "@/lib/Interfaces";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SettingsImage from "@/assets/settings.png";
import ProfilePicture from "@/assets/Stock_Profile-removebg-preview.png";

const Page = () => {
  const [profileItems, setProfileItems] = useState<IuserCreateInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [usernameOrEmail, setUsernameOrEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [toggleSettings, setToggleSettings] = useState<boolean>(false);

  const handleToggleSettings = () => {
    setToggleSettings(!toggleSettings);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);

      const storedToken = localStorage.getItem("Token");
      setToken(storedToken);

      if (storedToken) {
        const storedUsernameOrEmail = localStorage.getItem("username");
        setUsernameOrEmail(storedUsernameOrEmail);

        if (storedUsernameOrEmail) {
          try {
            const profileData: IuserCreateInfo | null = await getProfileItemsByUser(
              storedUsernameOrEmail,
              storedToken
            );
            if (profileData) {
              setProfileItems(profileData);
            } else {
              setError("Failed to fetch profile data.");
            }
          } catch (err: unknown) {
            console.error("Error fetching profile data:", err);
            if (err instanceof Error) {
              setError(`An unexpected error occurred: ${err.message}`);
            } else {
              setError("An unexpected error occurred.");
            }
          }
        } else {
          setError("Username or email not found in local storage.");
        }
      } else {
        setError("Authentication token not found.");
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-xl font-semibold">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-xl font-semibold">Error: {error}</div>
      </div>
    );
  }

  if (!profileItems) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500 text-xl font-semibold">No profile data available.</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="max-w-4xl mx-auto">
        {/* Header with settings button */}
        <div className="relative w-full p-4 flex justify-between items-center border-b border-gray-200">
          <h1 className="text-xl font-bold">{profileItems.username}</h1>
          <div className="absolute top-4 right-4">
            <Image
              src={SettingsImage}
              alt="Settings"
              className="h-8 w-8 cursor-pointer"
              onClick={handleToggleSettings}
            />
          </div>
        </div>

        {/* Profile section */}
        <div className="p-4">
          <div className="flex flex-col md:flex-row">
            <div className="flex justify-center md:justify-start md:flex-shrink-0 mb-6 md:mb-0">
              <div className="relative">
                <Image
                  src={ProfilePicture}
                  priority
                  alt="User Profile"
                  className="h-24 w-24 md:h-32 md:w-32 rounded-full border border-gray-200 object-cover"
                />
              </div>
            </div>

            {/* Profile details */}
            <div className="md:ml-4 flex-grow">
              <div className="flex flex-col">
                <h2 className="text-xl font-bold mb-2">{profileItems.trueName}</h2>
                <div className="text-sm text-gray-600 mb-4">
                  <p className="mb-1">
                    <span className="font-semibold">Location:</span> {profileItems.userLocation}
                  </p>
                  <p className="mb-1">
                    <span className="font-semibold">Primary Sport:</span> {profileItems.userPrimarySport}
                  </p>
                  <p className="mb-1">
                    <span className="font-semibold">Secondary Sport:</span> {profileItems.userSecondarySport}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <div className="bg-[#FFE9D1] p-4 rounded-lg shadow-sm mt-2">
                <h3 className="font-semibold mb-2 text-2xl">Bio</h3>
                <p className="text-sm whitespace-pre-wrap break-words">{profileItems.userBio}</p>
              </div>
            </div>
          </div>

          
          <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
            <div className="grid grid-cols-2 text-center">
              <div className="p-2">
                <div className="font-bold text-xl">0</div>
                <div className=" text-[#FC6F2F]">Posts</div>
              </div>
              <div className="p-2">
                <div className="font-bold text-xl">0</div>
                <div className="text-[#FC6F2F]">Friends</div>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            Posts Section: 
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;