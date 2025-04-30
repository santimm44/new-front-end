"use client";
import {
  getAllUsers,
  getFriendsData,
  getProfileItemsByUser,
} from "@/lib/DataServices";
import { IuserCreateInfo, UserModel } from "@/lib/Interfaces";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SettingsImage from "@/assets/settings.png";
import ProfilePicture from "@/assets/Stock_Profile-removebg-preview.png";
import { Button } from "@/components/ui/button";
import SpotterIcon from "@/assets/binoculars.png";
import TrainerIcon from "@/assets/muscle.png";
import { DeleteIcon, MessageSquare, User } from "lucide-react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();
  const [profileItems, setProfileItems] = useState<IuserCreateInfo | null>(
    null
  );
  const [friends, setFriends] = useState<UserModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [usernameOrEmail, setUsernameOrEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [toggleSettings, setToggleSettings] = useState<boolean>(false);
  const [toggleStats, setToggleStats] = useState<boolean>(true);
  const [toggleFriends, setToggleFriends] = useState<boolean>(false);
  const [searchUser, setSearchUser] = useState<string>("");
  const [allUsers, setAllUsers] = useState<UserModel[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredFriends = friends.filter(
    (user) =>
      user.username.toLowerCase().includes(searchUser.toLowerCase()) ||
      user.trueName.toLowerCase().includes(searchUser.toLowerCase())
  );

  const toggleFriend = () => {
    console.log(allUsers);
  };

  const handleMessageFriend = (friendId: number) => {
    router.push(`/DirectMessages?friendId=${friendId}`);
  };

  const handleViewFriendProfile = (friendId: number) => {
    router.push(`/Profile?friendId=${friendId}`);
  };

  const handleRemoveFriend = (friendId: number) => {
    console.log("Removing friend with ID:", friendId);
  };

  const handleToggleSettings = () => {
    setToggleSettings(!toggleSettings);
  };

  const handleToggleStats = () => {
    setToggleStats(true);
    setToggleFriends(false);
  };

  const handleToggleFriends = () => {
    setToggleFriends(true);
    setToggleStats(false);
  };

  const getToken = (): string => {
    return token || "";
  };

  const getCurrentUserId = (): number => {
    return profileItems?.id || 0;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      console.log(usernameOrEmail);
      setLoading(true);
      setError(null);

      const storedToken = localStorage.getItem("Token");
      setToken(storedToken);

      if (storedToken) {
        const storedUsernameOrEmail = localStorage.getItem("username");
        setUsernameOrEmail(storedUsernameOrEmail);

        if (storedUsernameOrEmail) {
          try {
            const profileData: IuserCreateInfo | null =
              await getProfileItemsByUser(storedUsernameOrEmail, storedToken);

            if (profileData) {
              setProfileItems(profileData);

              try {
                const friendsData = await getFriendsData(
                  profileData.id,
                  storedToken
                );
                setFriends(friendsData);
              } catch (friendsErr) {
                console.error("Error fetching friends data:", friendsErr);
              }
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
        <div className="animate-pulse text-xl font-semibold">
          Loading profile...
        </div>
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
        <div className="text-gray-500 text-xl font-semibold">
          No profile data available.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="max-w-5xl mx-auto">
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
            <div className="flex justify-center md:justify-start mb-6 md:mb-0">
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
                <h2 className="text-xl font-bold mb-2">
                  {profileItems.trueName}
                </h2>
                <div className="text-sm text-gray-600 mb-4">
                  <p className="mb-1">
                    <span className="font-semibold">Location:</span>{" "}
                    {profileItems.userLocation}
                  </p>
                  <p className="mb-1">
                    <span className="font-semibold">Primary Sport:</span>{" "}
                    {profileItems.userPrimarySport}
                  </p>
                  <p className="mb-1">
                    <span className="font-semibold">Secondary Sport:</span>{" "}
                    {profileItems.userSecondarySport}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <div className="bg-[#FFE9D1] p-4 rounded-lg shadow-sm mt-2">
                <h3 className="font-semibold mb-2 text-2xl">Bio</h3>
                <p className="text-sm whitespace-pre-wrap break-words">
                  {profileItems.userBio}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
            <div className="grid grid-cols-2 text-center">
              <div className="p-2">
                <div className="font-bold text-xl">0</div>
                <div className="text-[#FC6F2F]">Posts</div>
              </div>
              <div className="p-2">
                <div className="font-bold text-xl">{friends.length}</div>
                <div className="text-[#FC6F2F]">Friends</div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-center gap-4">
            <Button
              onClick={handleToggleStats}
              className={`h-12 w-[100px] lg:w-[120px] text-white hover:text-lg sm:hover:text-xl sm:text-lg cursor-pointer ${
                toggleStats
                  ? "bg-[#FC6F2F] !text-white"
                  : "bg-white text-[#FC6F2F] border-2"
              } rounded-3xl`}
            >
              Posts
            </Button>

            <Button
              onClick={handleToggleFriends}
              className={`h-12 w-[100px] lg:w-[120px] text-white hover:text-lg sm:hover:text-xl sm:text-lg cursor-pointer ${
                toggleFriends
                  ? "bg-[#FC6F2F] !text-white"
                  : "bg-white text-[#FC6F2F] border-2 "
              } rounded-3xl`}
            >
              Friends
            </Button>
          </div>
          {toggleFriends && (
            <div className="mt-4">
              <input
                type="text"
                placeholder="Search by username or name"
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                className="border rounded p-2 w-full"
              />
              <div>
                {filteredFriends.map((friend) => (
                  <div
                    key={friend.id}
                    className="p-4 border-b flex items-center justify-between"
                  >
        
                    <div className="flex items-center">
                      <Image
                        src={ProfilePicture}
                        alt={friend.username}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="ml-4">
                        <p className="font-bold">{friend.trueName}</p>
                        <p className="text-sm text-gray-500">
                          @{friend.username}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => toggleFriend}
                      className="bg-red-600 text-white py-2 px-4 rounded-3xl"
                    >
                      Unfriend
                    </Button>
                  </div>
                ))}
              </div>

              <h2 className="text-lg font-bold mb-3">My Friends:</h2>
              {friends.length === 0 ? (
                <p>You don't have any friends yet.</p>
              ) : (
                <ul className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-4 gap-2">
                  {friends.map((friend) => (
                    <li
                      key={friend.id}
                      className="p-2 border rounded-lg text-center max-w-full bg-[#FFE9D1]"
                    >
                      <p className="text-sm">{friend.trueName}</p>
                      <p className="text-sm font-semibold mb-2">
                        @{friend.username}
                      </p>

                      {friend.isSpotter === true ? (
                        <div className="flex justify-evenly items-center">
                          {" "}
                          <p className="text-gray-700">Spotter</p>{" "}
                          <Image
                            className="h-10 w-10"
                            src={SpotterIcon}
                            alt="Spotter Icon"
                          />{" "}
                        </div>
                      ) : (
                        <div className="flex justify-evenly items-center">
                          {" "}
                          <p className="text-gray-700">Trainer</p>{" "}
                          <Image
                            className="h-10 w-10"
                            src={TrainerIcon}
                            alt="Trainer Icon"
                          />{" "}
                        </div>
                      )}
                      <div className="mt-2 flex justify-evenly">
                        <Button
                          className="bg-white text-black hover:text-xl p-2 rounded-full cursor-pointer"
                          onClick={() => handleMessageFriend(friend.id)}
                        >
                          <MessageSquare size={20} />
                        </Button>
                        <Button
                          className="bg-white text-black p-2 rounded-full cursor-pointer"
                          onClick={() => handleViewFriendProfile(friend.id)}
                        >
                          <User size={20} />
                        </Button>
                        <Button
                          className="bg-white text-black p-2 rounded-full cursor-pointer"
                          onClick={() => handleRemoveFriend(friend.id)}
                        >
                          <DeleteIcon size={20} />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
