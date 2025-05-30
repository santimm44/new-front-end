"use client";
import {
  CreatePost,
  DeleteFriend,
  DeletePost,
  //getAllUsers,
  getFriendsData,
  getPostsByUserId,
  getProfileItemsByUser,
  updatePost,
  // updateProfileItem,
} from "@/lib/DataServices";
import {
  IProfileData,
  IuserCreateInfo,
  IUserStats,
  UserModel,
} from "@/lib/Interfaces";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import SettingsImage from "@/assets/settings.png";
import ProfilePicture from "@/assets/Stock_Profile-removebg-preview.png";
import SpotterIcon from "@/assets/binoculars.png";
import TrainerIcon from "@/assets/muscle.png";
import { useRouter } from "next/navigation";
import { Dropdown, DropdownItem, FileInput, Modal } from "flowbite-react";
import { format } from "date-fns";

const ProfilePage = () => {
  const router = useRouter();
  const [profileItems, setProfileItems] = useState<IuserCreateInfo | null>(
    null
  );
  const [profileItemsTwo, setProfileItemsTwo] = useState<IProfileData>();
  const [friends, setFriends] = useState<UserModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [usernameOrEmail, setUsernameOrEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [toggleSettings, setToggleSettings] = useState<boolean>(false);
  const [toggleStats, setToggleStats] = useState<boolean>(true);
  const [toggleFriends, setToggleFriends] = useState<boolean>(false);
  const [searchUser, setSearchUser] = useState<string>("");
  // const [allUsers, setAllUsers] = useState<UserModel[]>([]);

  const [filterFriendModal, setFilterFriendModal] = useState<boolean>(false);

  const [postsModal, setPostsModal] = useState<boolean>(false);
  const [postId, setPostId] = useState<number>(0);
  const [postUserId, setPostUserId] = useState<number>(0);
  const [postUsername, setPostUsername] = useState<string>("");
  const [postTruename, setPostTruename] = useState<string>("");
  const [postDescription, setPostDescription] = useState<string>("");
  const [postSport, setPostSport] = useState<string>("Sport");
  const [postStat, setPostStat] = useState<string>("");

  const [edit, setEdit] = useState<boolean>(false);

  const [posts, setPosts] = useState<IUserStats[]>([]);

  // Sports
  const sports = [
    "American Football",
    "Baseball",
    "Basketball",
    "Cricket",
    "Field Hockey",
    "Ice Hockey",
    "Lacrosse",
    "Rugby",
    "Soccer/Football",
    "Softball",
    "Volleyball",
    "Water Polo",
    "Badminton",
    "Padel",
    "Pickleball",
    "Racquetball",
    "Squash",
    "Table Tennis/Ping Pong",
    "Tennis",
    "Boxing",
    "Brazilian Jiu-Jitsu",
    "Fencing",
    "Judo",
    "Karate",
    "Kickboxing",
    "Mixed Martial Arts (MMA)",
    "Muay Thai",
    "Taekwondo",
    "Wrestling",
    "Bodybuilding",
    "Calisthenics",
    "CrossFit",
    "Functional Training",
    "HIIT (High-Intensity Interval Training)",
    "Olympic Weightlifting",
    "Pilates",
    "Powerlifting",
    "Strength Training",
    "Yoga",
    "Cycling",
    "Duathlon",
    "Marathon Running",
    "Rowing",
    "Swimming",
    "Trail Running",
    "Triathlon",
    "Archery",
    "Canoeing/Kayaking",
    "Climbing/Bouldering",
    "Golf",
    "Hiking",
    "Mountain Biking",
    "Sailing",
    "Skateboarding",
    "Skiing",
    "Snowboarding",
    "Surfing",
    "Bowling",
    "Dance",
    "Darts",
    "Diving",
    "Equestrian",
    "Figure Skating",
    "Gymnastics",
    "Handball",
    "Parkour",
  ];

  const sportCategories = [
    {
      category: "Team Sports",
      sports: [
        "American Football",
        "Baseball",
        "Basketball",
        "Cricket",
        "Field Hockey",
        "Ice Hockey",
        "Lacrosse",
        "Rugby",
        "Soccer/Football",
        "Softball",
        "Volleyball",
        "Water Polo",
      ],
    },
    {
      category: "Racket Sports",
      sports: [
        "Badminton",
        "Padel",
        "Pickleball",
        "Racquetball",
        "Squash",
        "Table Tennis/Ping Pong",
        "Tennis",
      ],
    },
    {
      category: "Combat Sports",
      sports: [
        "Boxing",
        "Brazilian Jiu-Jitsu",
        "Fencing",
        "Judo",
        "Karate",
        "Kickboxing",
        "Mixed Martial Arts (MMA)",
        "Muay Thai",
        "Taekwondo",
        "Wrestling",
      ],
    },
    {
      category: "Gym & Fitness",
      sports: [
        "Bodybuilding",
        "Calisthenics",
        "CrossFit",
        "Functional Training",
        "HIIT (High-Intensity Interval Training)",
        "Olympic Weightlifting",
        "Pilates",
        "Powerlifting",
        "Strength Training",
        "Yoga",
      ],
    },
    {
      category: "Endurance & Cardio",
      sports: [
        "Cycling",
        "Duathlon",
        "Marathon Running",
        "Rowing",
        "Swimming",
        "Trail Running",
        "Triathlon",
      ],
    },
    {
      category: "Outdoor Recreation",
      sports: [
        "Archery",
        "Canoeing/Kayaking",
        "Climbing/Bouldering",
        "Golf",
        "Hiking",
        "Mountain Biking",
        "Sailing",
        "Skateboarding",
        "Skiing",
        "Snowboarding",
        "Surfing",
      ],
    },
    {
      category: "Other Sports",
      sports: [
        "Bowling",
        "Dance",
        "Darts",
        "Diving",
        "Equestrian",
        "Figure Skating",
        "Gymnastics",
        "Handball",
        "Parkour",
      ],
    },
  ];

  // Posts

  const filteredPosts = useMemo(() => {
    return posts.filter(
      (item) => item.isPublished === true && item.isDeleted === false
    );
  }, [posts]);

  const handlePostDelete = async (items: IUserStats) => {
    items.isDeleted = true;

    const result = await DeletePost(items, getToken());

    if (result) {
      const userPostItems = await getPostsByUserId(postUserId, getToken());
      setPosts(userPostItems);
    } else {
      alert("Post Item(s) were not deleted");
    }
  };

  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPostDescription(e.target.value);

  const handleStat = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPostStat(e.target.value);

  const handleShow = () => {
    setPostsModal(true);
    setEdit(false);
    setPostId(0);
    setPostUsername(postUsername);
    setPostDescription("");
    setPostTruename(postTruename);
    setPostSport("Sport");
    setPostStat("");
  };

  const handlePostEdit = (items: IUserStats) => {
    setPostsModal(true);
    setEdit(true);
    setPostId(items.id);
    setPostTruename(items.trueName);
    setPostUsername(items.username);
    setPostDescription(items.description);
    setPostSport(items.sport);
    setPostStat(items.stat);
  };

  const handlePostSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const item: IUserStats = {
      id: postId,
      userId: postUserId,
      username: postUsername,
      trueName: postTruename,
      dateCreated: format(new Date(), "MM-dd-yyyy"),
      description: postDescription,
      isPublished: e.currentTarget.textContent === "Save" ? false : true,
      isDeleted: false,
      sport: postSport,
      stat: postStat,
    };
    setPostsModal(false);

    let result = false;

    if (edit) {
      // Edit Logic
      result = await updatePost(item, getToken());
    } else {
      // Add logic
      result = await CreatePost(item, getToken());
    }

    if (result) {
      const userPostsItems = await getPostsByUserId(postUserId, getToken());
      setPosts(userPostsItems);
    } else {
      alert(`Post Items were not ${edit ? "Updated" : "Added"}`);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (postUserId) {
          const userPostsItems = await getPostsByUserId(postUserId, getToken());
          console.log("Fetched posts:", userPostsItems);
          setPosts(userPostsItems);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [postUserId]);

  // Filter Friends
  const filteredFriends = friends.filter(
    (user) =>
      user.username.toLowerCase().includes(searchUser.toLowerCase()) ||
      user.trueName.toLowerCase().includes(searchUser.toLowerCase())
  );

  // Toggle friend (remove from list)
  const handleDeleteFriend = async (friendId: number) => {
    console.log("Attempting to delete friend:");
    console.log("Current user ID (postUserId):", postUserId);
    console.log("Friend ID to remove:", friendId);

    if (!postUserId) {
      console.error("No user ID found");
      alert("Error: User not logged in properly");
      return;
    }

    const friendship = {
      userId: postUserId,
      friendId: friendId,
    };

    console.log("Friendship object being sent:", friendship);
    console.log("Token exists:", !!getToken());

    try {
      const result = await DeleteFriend(friendship, getToken());
      console.log("DeleteFriend API result:", result);

      if (result) {
        // Updates Local Friends List
        setFriends((prev) => {
          const updatedFriends = prev.filter(
            (friend) => friend.id !== friendId
          );
          console.log("Updated friends list:", updatedFriends);
          return updatedFriends;
        });
      } else {
        alert("Failed to remove friend. Please try again.");
      }
    } catch (error) {
      console.error("Error removing friend:", error);
      alert("An error occurred while removing the friend.");
    }
  };

  // Dynamic Routing

  const handleMessageFriend = (friendId: number) => {
    router.push(`/DirectMessages?friendId=${friendId}`);
  };

  const handleViewFriendProfile = (friend: number) => {
    router.push(`/profile/${friend}`);
  };

  // Remove Friend
  const handleRemoveFriend = (friendId: number) => {
    console.log("Removing friend with ID:", friendId);
  };

  // Toggles
  const handleToggleSettings = () => {
    setToggleSettings(!toggleSettings);
  };

  const handleFilterFriendsModal = () => {
    setFilterFriendModal(!filterFriendModal);
  };

  const handleToggleStats = () => {
    setToggleStats(true);
    setToggleFriends(false);
  };

  const handleToggleFriends = () => {
    setToggleFriends(true);
    setToggleStats(false);
  };

  // Get Token
  const getToken = (): string => {
    return token || "";
  };
  getToken();

  // Fetch Data

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
            const profileData: IProfileData | null =
              await getProfileItemsByUser(storedUsernameOrEmail, storedToken);

            if (profileData) {
              setProfileItems(profileData);
              setPostUserId(profileData.id);

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

  // Saving Changes
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthdate, setBirthdate] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [userPrimarySport, setUserPrimarySport] = useState<string>("");
  const [userSecondarySport, setUserSecondarySport] = useState<string>("");
  const [userBio, setUserBio] = useState<string>("");
  const [userLocation, setUserLocation] = useState<string>("");
  const [userLocationPublic, setUserLocationPublic] = useState<boolean>(false);
  const [isTrainer, setIsTrainer] = useState<boolean>(false);
  const [isSpotter, setIsSpotter] = useState<boolean>(false);
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [trueName, setTrueName] = useState<string>("");

  const handleEdit = (items: IuserCreateInfo) => {
    setToggleSettings(true);
    setUsername(items.username);
    setPassword(items.password);
    setEmail(items.email);
    setBirthdate(items.dateOfBirth);
    setPhoneNumber(items.phoneNumber);
    setUserPrimarySport(items.userPrimarySport);
    setUserSecondarySport(items.userSecondarySport);
    setUserBio(items.userBio);
    setUserLocation(items.userLocation);
    setUserLocationPublic(items.userLocationPublic);
    setIsTrainer(items.isTrainer);
    setIsSpotter(items.isSpotter);
    setProfilePicture(items.profilePicture);
    setTrueName(items.trueName);
  };

  const url =
    "https://fullstackwebapp-bxcja2evd2hef3b9.westus-01.azurewebsites.net/";
  const updateProfileItem = async (item: IuserCreateInfo, token: string) => {
    const userId = profileItemsTwo?.id;
    setProfileItemsTwo(profileItemsTwo);
    console.log("Updating user with ID:", userId);
    console.log("Payload:", item);
    const res = await fetch(url + `User/UpdateUserInfo/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(item),
    });
    if (!res.ok) {
      const errorData = await res.json();
      const message = errorData.message;
      console.log(message);
      return false;
    }
    const data = await res.json();
    return data.success;
  };

  const handleSave = async () => {
    if (!usernameOrEmail || !token) {
      alert("Missing username/email or authentication token");
      return;
    }

    const item: IuserCreateInfo = {
      username: username,
      password: password,
      email: email,
      dateOfBirth: birthdate,
      phoneNumber: phoneNumber,
      userPrimarySport: userPrimarySport,
      userSecondarySport: userSecondarySport,
      userBio: userBio,
      userLocation: userLocation,
      userLocationPublic: userLocationPublic,
      isTrainer: isTrainer,
      isSpotter: isSpotter,
      profilePicture: profilePicture,
      trueName: trueName,
    };
    setToggleSettings(false);
    handleEdit(item); // Edit out later

    let result = false;
    result = await updateProfileItem(item, token);

    if (result) {
      const userProfileItems = await getProfileItemsByUser(
        usernameOrEmail,
        token
      );
      setProfileItems(userProfileItems);
      setToggleSettings(false);
    } else {
      alert(`Items not updating or Editing`);
    }
  };

  useEffect(() => {
    if (profileItems) {
      setTrueName(profileItems.trueName || "");
      setEmail(profileItems.email || "");
      setUserBio(profileItems.userBio || "");
      setUserLocation(profileItems.userLocation || "");
      setPhoneNumber(profileItems.phoneNumber || "");
      setUserPrimarySport(profileItems.userPrimarySport || "");
      setUserSecondarySport(profileItems.userSecondarySport || "");
      setIsSpotter(profileItems.isSpotter || false);
      setIsTrainer(profileItems.isTrainer || false);
      setUserLocationPublic(profileItems.userLocationPublic || false);
      setProfilePicture(profileItems.profilePicture || "");
    }
  }, [profileItems]);

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
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <main className="max-w-6xl mx-auto">
        {/* Header with Username and Settings */}
        <div className="relative w-full p-6 flex justify-between items-center bg-white/80  border-b border-white/20 shadow-lg">
          <h1 className="text-2xl font-bold bg-[#FF8C42] bg-clip-text text-transparent">
            {profileItems.username}
          </h1>
          <div className="relative">
            <button
              onClick={handleToggleSettings}
              className="p-3 bg-[#FF8C42] rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all cursor-pointer group"
            >
              <Image
                src={SettingsImage}
                alt="Settings"
                className="h-6 w-6 invert group-hover:rotate-45 transition-transform"
              />
            </button>
          </div>
        </div>

        {/* Profile section with modern cards */}
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Profile Picture Card */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative w-[180px] h-[180px] rounded-full border-4 border-white shadow-2xl overflow-hidden">
                <Image
                  src={profileItems.profilePicture}
                  priority
                  alt="User Profile"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Profile Details Card */}
            <div className="flex-grow">
              <div className="bg-white/80  rounded-2xl p-6 shadow-xl border border-white/20">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">
                  {profileItems.trueName}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-[#FFE9D1] to-[#FFF2E6] rounded-xl">
                    <div className="w-2 h-2 bg-[#FC6F2F] rounded-full"></div>
                    <span className="font-semibold text-gray-700">
                      Location:
                    </span>
                    <span className="text-gray-600">
                      {profileItems.userLocation}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-[#FFE9D1] to-[#FFF2E6] rounded-xl">
                    <div className="w-2 h-2 bg-[#FC6F2F] rounded-full"></div>
                    <span className="font-semibold text-gray-700">
                      Primary:
                    </span>
                    <span className="text-gray-600">
                      {profileItems.userPrimarySport}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-[#FFE9D1] to-[#FFF2E6] rounded-xl">
                    <div className="w-2 h-2 bg-[#FC6F2F] rounded-full"></div>
                    <span className="font-semibold text-gray-700">
                      Secondary:
                    </span>
                    <span className="text-gray-600">
                      {profileItems.userSecondarySport}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bio Card */}
              <div className="mt-6 bg-gradient-to-br from-[#FFE9D1] to-[#FFF2E6] rounded-2xl p-6 shadow-xl border border-white/20">
                <h3 className="font-bold mb-3 text-2xl text-gray-800 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-[#FC6F2F] to-[#FF8C42] rounded-full"></div>
                  Bio
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                  {profileItems.userBio}
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="mt-8 grid grid-cols-2 gap-6">
            <div className="bg-white/80  rounded-2xl p-6 shadow-xl border border-white/20 text-center group hover:scale-105 transition-transform">
              <div className="font-bold text-4xl text-gray-800 mb-2">
                {filteredPosts.length}
              </div>
              <div className="text-[#FC6F2F] text-xl font-semibold">Posts</div>
            </div>

            <div className="relative">
              <div
                onClick={handleFilterFriendsModal}
                className="bg-white/80  rounded-2xl p-6 shadow-xl border border-white/20 text-center cursor-pointer group hover:scale-105 transition-all"
              >
                <div className="font-bold text-4xl text-gray-800 mb-2">
                  {friends.length}
                </div>
                <div className="text-[#FC6F2F] text-xl font-semibold">
                  Friends
                </div>
              </div>

              {/* Enhanced Friends Modal */}
              {filterFriendModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
                    <div className="p-6 bg-[#FF8C42] text-white flex justify-between items-center">
                      <h2 className="text-2xl font-bold">Friends</h2>
                      <button
                        onClick={handleFilterFriendsModal}
                        className="p-2 hover:bg-white/20 rounded-full transition-colors text-2xl"
                      >
                        ×
                      </button>
                    </div>

                    <div className="p-6">
                      <input
                        type="text"
                        placeholder="Search by username or name"
                        value={searchUser}
                        onChange={(e) => setSearchUser(e.target.value)}
                        className="border-2 border-gray-200 rounded-xl p-3 w-full mb-4 focus:border-[#FC6F2F] focus:outline-none transition-colors"
                      />

                      <div className="h-80 overflow-y-auto">
                        {filteredFriends.length > 0 ? (
                          filteredFriends.map((friend) => (
                            <div
                              key={friend.id}
                              className="p-4 border-b border-gray-100 flex items-center justify-between hover:bg-gray-50 rounded-xl transition-colors"
                            >
                              <div className="flex items-center">
                                <Image
                                  src={ProfilePicture}
                                  alt={friend.username}
                                  width={50}
                                  height={50}
                                  className="rounded-full border-2 border-[#FFE9D1]"
                                />
                                <div className="ml-4">
                                  <p className="font-bold text-gray-800">
                                    {friend.trueName}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    @{friend.username}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => {
                                  console.log(
                                    "Clicked unfriend for:",
                                    friend.id
                                  );
                                  handleDeleteFriend(friend.id);
                                }}
                                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-full font-medium transition-all transform hover:scale-105 cursor-pointer"
                              >
                                Unfriend
                              </button>
                            </div>
                          ))
                        ) : (
                          <div className="py-8 text-center text-gray-500">
                            <div className="text-4xl mb-2">👥</div>
                            <p>No friends found</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Modern Toggle Buttons */}
          <div className="mt-8 flex justify-center gap-2 bg-white/80  rounded-2xl p-2 shadow-xl border border-white/20 w-fit mx-auto">
            <button
              onClick={handleToggleStats}
              className={`px-8 py-3 rounded-xl font-semibold transition-all cursor-pointer ${
                toggleStats
                  ? "bg-[#FF8C42] text-white shadow-lg"
                  : "text-[#FC6F2F] hover:bg-[#FFE9D1]/50"
              }`}
            >
              Posts
            </button>
            <button
              onClick={handleToggleFriends}
              className={`px-8 py-3 rounded-xl font-semibold transition-all cursor-pointer ${
                toggleFriends
                  ? "bg-[#FF8C42] text-white shadow-lg"
                  : "text-[#FC6F2F] hover:bg-[#FFE9D1]/50"
              }`}
            >
              Friends
            </button>
          </div>

          {/* Posts Section */}
          {toggleStats && (
            <div className="mt-8">
              <div className="flex justify-center mb-8">
                <button
                  className="bg-[#FF8C42] hover:from-[#E55A2B] hover:to-[#FC6F2F] text-white font-semibold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all cursor-pointer text-lg"
                  onClick={handleShow}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-2xl font-bold">+</span>
                    Add New Post
                  </span>
                </button>
              </div>

              {/* Modern Settings Modal */}
              <Modal
                className="!bg-black/50 !rounded-3xl"
                show={toggleSettings}
                onClose={() => setToggleSettings(false)}
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-2xl mx-auto">
                  <div className="bg-[#FF8C42] p-6">
                    <h2 className="text-2xl font-bold text-white">
                      Profile Settings
                    </h2>
                  </div>
                  <div className="p-6">
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Name
                          </label>
                          <input
                            type="text"
                            value={trueName}
                            placeholder="Your name"
                            onChange={(e) => setTrueName(e.target.value)}
                            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#FC6F2F] focus:outline-none transition-colors bg-[#FFE9D1]/30"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            value={email}
                            placeholder="your.email@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#FC6F2F] focus:outline-none transition-colors bg-[#FFE9D1]/30"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Bio
                        </label>
                        <textarea
                          value={userBio}
                          placeholder="Tell us about yourself..."
                          onChange={(e) => setUserBio(e.target.value)}
                          rows={3}
                          className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#FC6F2F] focus:outline-none transition-colors bg-[#FFE9D1]/30 resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          value={userLocation}
                          placeholder="City, Country"
                          onChange={(e) => setUserLocation(e.target.value)}
                          className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#FC6F2F] focus:outline-none transition-colors bg-[#FFE9D1]/30"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Preferred Sports
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <select
                            value={userPrimarySport}
                            onChange={(e) =>
                              setUserPrimarySport(e.target.value)
                            }
                            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#FC6F2F] focus:outline-none transition-colors bg-[#FFE9D1]/30 cursor-pointer"
                          >
                            <option value="">Select Primary Sport</option>
                            {sports.map((sport) => (
                              <option key={sport} value={sport}>
                                {sport}
                              </option>
                            ))}
                          </select>

                          <select
                            value={userSecondarySport}
                            onChange={(e) =>
                              setUserSecondarySport(e.target.value)
                            }
                            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#FC6F2F] focus:outline-none transition-colors bg-[#FFE9D1]/30 cursor-pointer"
                          >
                            <option value="">Select Secondary Sport</option>
                            {sports.map((sport) => (
                              <option key={sport} value={sport}>
                                {sport}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Profile Picture
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#FC6F2F] transition-colors">
                          <div className="text-4xl mb-2">📷</div>
                          <FileInput
                            id="Picture"
                            accept="image/png, image/jpg"
                            className="text-sm text-gray-500"
                          />
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
                    <button
                      onClick={() => setToggleSettings(false)}
                      className="px-6 py-2 text-gray-600 font-medium rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-6 py-2 bg-[#FF8C42] text-white font-medium rounded-xl hover:bg-[#E55A2B] transition-all shadow-lg hover:shadow-xl"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </Modal>

              {/* Enhanced Posts Modal */}
              <Modal
                show={postsModal}
                onClose={() => setPostsModal(false)}
                className="!bg-black/50"
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
                  <div className="bg-[#FF8C42] p-6">
                    <h2 className="text-2xl font-bold text-white">
                      {edit ? "Edit Post" : "Create New Post"}
                    </h2>
                  </div>
                  <div className="p-6">
                    <form className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Select Sport
                        </label>
                        <Dropdown
                          label={postSport}
                          className="w-full !bg-[#FFE9D1] !text-gray-800 !border-2 !border-gray-200 !rounded-xl"
                          dismissOnClick={true}
                        >
                          <div className="h-[200px] overflow-y-auto !text-gray-800">
                            {sportCategories.flatMap((category) =>
                              category.sports.map((sport, index) => (
                                <DropdownItem
                                  key={index}
                                  className="!text-gray-800 hover:!text-[#FC6F2F] hover:!bg-[#FFE9D1]/50"
                                  onClick={() => setPostSport(sport)}
                                >
                                  {sport}
                                </DropdownItem>
                              ))
                            )}
                          </div>
                        </Dropdown>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Stat
                        </label>
                        <input
                          type="text"
                          value={postStat}
                          placeholder="e.g., Personal Best, Distance, Weight"
                          onChange={handleStat}
                          className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#FC6F2F] focus:outline-none transition-colors bg-[#FFE9D1]/30"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Stat Score
                        </label>
                        <input
                          type="text"
                          value={postDescription}
                          placeholder="e.g., 100kg, 5km, 2:30 min"
                          onChange={handleDescription}
                          className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#FC6F2F] focus:outline-none transition-colors bg-[#FFE9D1]/30"
                        />
                      </div>
                    </form>
                  </div>

                  <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
                    <button
                      onClick={() => setPostsModal(false)}
                      className="px-6 py-2 text-gray-600 font-medium rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={(e) => handlePostSave(e)}
                      className="px-6 py-2 bg-[#FF8C42] text-white font-medium rounded-xl hover:from-[#E55A2B] hover:to-[#FC6F2F] transition-all shadow-lg hover:shadow-xl"
                    >
                      {edit ? "Update Post" : "Create Post"}
                    </button>
                  </div>
                </div>
              </Modal>

              {/* Modern Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {posts && posts.length > 0 ? (
                  posts
                    .filter(
                      (item) =>
                        item.isPublished === true && item.isDeleted === false
                    )
                    .map((item) => (
                      <div
                        key={item.id}
                        className="bg-white/80  rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl hover:scale-105 transition-all group"
                      >
                        <div className="mb-4">
                          <h2 className="text-2xl font-bold text-center bg-[#FF8C42] bg-clip-text text-transparent mb-2">
                            {item.sport || "No sport"}
                          </h2>
                          <h3 className="text-lg text-center text-gray-600 font-medium">
                            {item.stat || "No stat"}
                          </h3>
                        </div>

                        <div className="bg-[#FFF2E6] rounded-xl p-4 mb-4">
                          <p className="text-gray-800 text-center font-semibold text-lg">
                            {item.description || "No description"}
                          </p>
                        </div>

                        <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handlePostEdit(item)}
                            className="bg-[#82C0CC] hover:bg-[#6BA8B5] text-white font-medium py-2 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handlePostDelete(item)}
                            className=" bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="col-span-full p-8 text-center bg-white/80 rounded-2xl shadow-xl border border-white/20">
                    <div className="text-6xl mb-4">📝</div>
                    <p className="text-gray-500 text-lg">No posts available</p>
                    <p className="text-gray-400 text-sm mt-2">
                      Create your first post to get started!
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Enhanced Friends Section */}
          {toggleFriends && (
            <div className="mt-8">
              <div className="bg-white/80  rounded-2xl p-6 shadow-xl border border-white/20">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-[#FC6F2F] to-[#FF8C42] rounded-full"></div>
                  My Friends
                </h2>
                {friends.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">👥</div>
                    <p className="text-gray-500 text-lg">
                      You do not have any friends yet.
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      Start connecting with other athletes!
                    </p>
                  </div>
                ) : (
                  <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                    {friends.map((friend) => (
                      <div
                        key={friend.id}
                        className="bg-gradient-to-br from-[#FFE9D1] to-[#FFF2E6] rounded-2xl p-4 text-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all border border-white/20"
                      >
                        <div className="mb-3">
                          <p className="font-bold text-gray-800">
                            {friend.trueName}
                          </p>
                          <p className="text-sm text-gray-600 mb-2">
                            @{friend.username}
                          </p>
                        </div>

                        <div className="flex justify-center items-center gap-2 mb-4 p-2 bg-white/50 rounded-xl">
                          <span className="text-gray-700 font-medium">
                            {friend.isSpotter ? "Spotter" : "Trainer"}
                          </span>
                          <Image
                            className="h-8 w-8"
                            src={friend.isSpotter ? SpotterIcon : TrainerIcon}
                            alt={
                              friend.isSpotter ? "Spotter Icon" : "Trainer Icon"
                            }
                          />
                        </div>

                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleMessageFriend(friend.id)}
                            className="p-2 bg-white hover:bg-[#82C0CC] text-gray-700 hover:text-white rounded-xl transition-all shadow-md hover:shadow-lg"
                          >
                            💬
                          </button>
                          <button
                            onClick={() => handleViewFriendProfile(friend.id)}
                            className="p-2 bg-white hover:bg-[#FC6F2F] text-gray-700 hover:text-white rounded-xl shadow-md hover:shadow-lg"
                          >
                            👤
                          </button>
                          <button
                            onClick={() => handleRemoveFriend(friend.id)}
                            className="p-2 bg-white hover:bg-red-500 text-gray-700 hover:text-white rounded-xl  shadow-md hover:shadow-lg"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
