"use client";
import { getBlogItemsByUser } from "@/lib/DataServices";
import { IProfileData } from "@/lib/Interfaces";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [profileItems, setProfileItems] = useState<IProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [usernameOrEmail, setUsernameOrEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

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
            const profileData: IProfileData | null = await getBlogItemsByUser(
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
      <h1>Profile Page</h1>
      {profileItems && (
        <>
          <p>Name: {profileItems.TrueName}</p>
          <p>Location: {profileItems.UserLocation}</p>
          <p>Bio: {profileItems.UserBio}</p>
          <pre>{JSON.stringify(profileItems, null, 2)}</pre> {/* For debugging that i found to test if the data is coming through */}
        </>
      )}
    </div>
  );
};

export default Page;