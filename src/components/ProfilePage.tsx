"use client";
import { getProfileItemsByUser } from "@/lib/DataServices";
import { IuserCreateInfo } from "@/lib/Interfaces";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SettingsImage from "@/assets/settings.png";
import ProfilePicture from "@/assets/Stock_Profile-removebg-preview.png"

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
      console.log(token); // change these later
      console.log(usernameOrEmail);

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
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profileItems) {
    return <div>No profile data available.</div>;
  }

  return (
    <div>
      <main className="flex flex-col">
      {/* Main content area */}
      <div className="w-full px-4 sm:px-6 md:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          {/* Profile Image and Details */}
          <div className="w-full sm:w-auto flex flex-col mx-auto sm:flex-row items-center mb-6 sm:mb-0">
            <div className="relative mb-4 sm:mb-0">
              <Image
                src={ProfilePicture}
                alt="User Profile"
                className="h-40 w-40 sm:h-52 sm:w-52 lg:h-60 lg:w-60 rounded-full border-2 border-black object-cover"
              />
            </div>

            <div className="text-lg md:text-xl font-bold text-center sm:text-left sm:ml-6">
              <p>Name:</p>
              <p>
                Location:
              </p>
              <p>Primary Sport: </p>
              <p>Secondary Sport: </p>
                <p>Bio: </p>
            </div>
          </div>

          {/* Settings Button */}
          <div className="mt-4 sm:-mt-40">
            <Image
              src={SettingsImage}
              alt="Settings"
              className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 cursor-pointer"
              onClick={handleToggleSettings}
            />
          </div>

          </div>
          </div>
          </main>


      {/* {(
        <>
          <p>Name: {profileItems.trueName}</p>
          <p>Location: {profileItems.userLocation}</p>
          <p>Bio: {profileItems.userBio}</p>
          <pre>{JSON.stringify(profileItems, null, 2)}</pre>
        </>
      )} */}
    </div>
  );
};

export default Page;