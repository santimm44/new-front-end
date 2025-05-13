"use client";
import {
  CreatePost,
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
import { Button } from "@/components/ui/button";
import SpotterIcon from "@/assets/binoculars.png";
import TrainerIcon from "@/assets/muscle.png";
import { DeleteIcon, MessageSquare, User } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dropdown,
  DropdownItem,
  FileInput,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  TextInput,
} from "flowbite-react";
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
  const [allUsers, setAllUsers] = useState<UserModel[]>([]);
  const [city, setCity] = useState<string>("");
  const [filterFriendModal, setFilterFriendModal] = useState<boolean>(false);

  const [postsModal, setPostsModal] = useState<boolean>(false);
  const [postId, setPostId] = useState<number>(0);
  const [postUserId, setPostUserId] = useState<number>(0);
  const [postUsername, setPostUsername] = useState<string>("");
  const [postTruename, setPostTruename] = useState<string>("");
  const [postDescription, setPostDescription] = useState<string>("");

  const [edit, setEdit] = useState<boolean>(false);

  const [posts, setPosts] = useState<IUserStats[]>([]);

  // Posts

  const filteredPosts = useMemo(() => {
    return posts.filter(item => item.isPublished === true && item.isDeleted === false);
  }, [posts]);

  const handlePostDelete = async (items: IUserStats) => {
    items.isDeleted = true;

    let result = await DeletePost(items, getToken());

    if (result) {
      let userPostItems = await getPostsByUserId(postUserId, getToken());
      setPosts(userPostItems);
    } else {
      alert("Post Item(s) were not deleted");
    }
  };
  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPostDescription(e.target.value);

  const handleShow = () => {
    setPostsModal(true);
    setEdit(false);
    setPostId(0);
    setPostUsername(postUsername);
    setPostDescription("");
    setPostTruename(postTruename);
  };

  const handlePostEdit = (items: IUserStats) => {
    setPostsModal(true);
    setEdit(true);
    setPostId(items.id);
    setPostTruename(items.trueName);
    setPostUsername(items.username);
    setPostDescription(items.description);
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
    };
    setPostsModal(false);

    let result = false;

    if (edit) {
      // Now implementing the edit logic
      result = await updatePost(item, getToken());
    } else {
      // Add logic
      result = await CreatePost(item, getToken());
    }

    if (result) {
      let userPostsItems = await getPostsByUserId(postUserId, getToken());
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
  }, [postUserId]); // Dependency on postUserId

  // Filter Friends
  const filteredFriends = friends.filter(
    (user) =>
      user.username.toLowerCase().includes(searchUser.toLowerCase()) ||
      user.trueName.toLowerCase().includes(searchUser.toLowerCase())
  );

  // Toggle friend (remove from list)
  const toggleFriend = () => {
    console.log(allUsers);
    setAllUsers(allUsers);
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
  const [state, setState] = useState<string>("");

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
      setBirthdate(profileItems.dateOfBirth || "");
      setPhoneNumber(profileItems.phoneNumber || "");
      setUsername(profileItems.username || "");
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
              <Modal
                className="bg-[#16697A]"
                show={toggleSettings}
                onClose={() => setToggleSettings(false)}
              >
                <ModalHeader>Settings</ModalHeader>
                <ModalBody>
                  <form className="flex max-w-md flex-col gap-2">
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="Title">Name</Label>
                      </div>
                      <TextInput
                        id="Name"
                        type="text"
                        value={trueName}
                        placeholder="Name"
                        required
                        onChange={(e) => setTrueName(e.target.value)}
                      />
                    </div>

                    <div className="block">
                      <Label htmlFor="descrption">Email</Label>
                    </div>
                    <TextInput
                      id="Email"
                      placeholder="Email"
                      value={email}
                      type="text"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <div className="block">
                      <Label htmlFor="descrption">Bio</Label>
                    </div>
                    <TextInput
                      id="Bio"
                      placeholder="Bio"
                      value={userBio}
                      type="text"
                      required
                      onChange={(e) => setUserBio(e.target.value)}
                    />
                    <div className=" block">
                      <Label htmlFor="Title">Location</Label>
                    </div>
                    <TextInput
                      id="City"
                      type="text"
                      value={city}
                      placeholder="City"
                      required
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <div>
                      <Dropdown label={state} dismissOnClick={true}>
                        <div className="h-[300px] overflow-y-auto">
                          <DropdownItem
                            onChange={() => setState("Washington")}
                            onClick={() => setUserLocation(`${city}, ${state}`)}
                          >
                            Washington
                          </DropdownItem>
                          <DropdownItem
                            onChange={() => setState("WV")}
                            onClick={() => setUserLocation(`${city}, ${state}`)}
                          >
                            West Virginia
                          </DropdownItem>
                          <DropdownItem
                            onChange={() => setState("WI")}
                            onClick={() => setUserLocation(`${city}, ${state}`)}
                          >
                            Wisconsin
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => setUserLocation(city + ", WY")}
                          >
                            Wyoming
                          </DropdownItem>
                        </div>
                      </Dropdown>

                      <div className="mb-2 block">
                        <Label htmlFor="descrption">Preferred Sports </Label>
                      </div>
                      <div className="flex justify-evenly items-center">
                        <Dropdown
                          label={userPrimarySport}
                          dismissOnClick={true}
                        >
                          <div className="h-[300px] overflow-y-auto">
                            <DropdownItem
                              onClick={() => setUserPrimarySport("Boxing")}
                            >
                              Boxing
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => setUserPrimarySport("Boxing")}
                            >
                              Boxing
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => setUserPrimarySport("Boxing")}
                            >
                              Boxing
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => setUserPrimarySport("Boxing")}
                            >
                              Boxing
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => setUserPrimarySport("Boxing")}
                            >
                              Boxing
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => setUserPrimarySport("Boxing")}
                            >
                              Boxing
                            </DropdownItem>
                          </div>
                        </Dropdown>

                        <Dropdown
                          label={userSecondarySport}
                          dismissOnClick={true}
                        >
                          <div className="h-[300px] overflow-y-auto">
                            <DropdownItem
                              onClick={() => setUserSecondarySport("Boxing")}
                            >
                              Boxing
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => setUserSecondarySport("Boxing")}
                            >
                              Boxing
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => setUserSecondarySport("Boxing")}
                            >
                              Boxing
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => setUserSecondarySport("Boxing")}
                            >
                              Boxing
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => setUserSecondarySport("Boxing")}
                            >
                              Boxing
                            </DropdownItem>
                          </div>
                        </Dropdown>
                      </div>
                      <div className="mb-2 block">
                        <Label htmlFor="Image">Profile Picture</Label>
                      </div>
                      <FileInput
                        id="Picture"
                        accept="image/png, image/jpg"
                        placeholder="Chose Picture"
                      />
                    </div>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button className="bg-[#82C0CC] text-xl" onClick={handleSave}>
                    Save
                  </Button>
                  <Button
                    className="bg-red-500 text-xl"
                    onClick={() => setToggleSettings(false)}
                  >
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
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
              <div className="font-bold text-2xl">{filteredPosts.length}</div>
                <div className="text-[#FC6F2F] text-xl">Posts</div>
              </div>
              <div className="relative">
                <div
                  onClick={handleFilterFriendsModal}
                  className="p-2 cursor-pointer hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="font-bold text-2xl">{friends.length}</div>
                  <div className="text-orange-500 text-xl">Friends</div>
                </div>

                {/* Modal overlay */}
                {filterFriendModal && (
                  <div className="fixed inset-0 bg-[#FFE9D1] flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
                      <div className="p-4 border-b flex justify-between items-center">
                        <h2 className="text-xl font-bold">Friends</h2>
                        <Button
                          onClick={handleFilterFriendsModal}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          ✕
                        </Button>
                      </div>

                      <div className="p-4">
                        <input
                          type="text"
                          placeholder="Search by username or name"
                          value={searchUser}
                          onChange={(e) => setSearchUser(e.target.value)}
                          className="border rounded p-2 w-full mb-4"
                        />

                        <div className="h-80 overflow-y-auto">
                          {filteredFriends.length > 0 ? (
                            filteredFriends.map((friend) => (
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
                                    <p className="font-bold">
                                      {friend.trueName}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      @{friend.username}
                                    </p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => toggleFriend()}
                                  className="bg-red-600 text-white py-2 px-4 rounded-3xl"
                                >
                                  Unfriend
                                </button>
                              </div>
                            ))
                          ) : (
                            <div className="py-6 text-center text-gray-500">
                              No friends found
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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

          {toggleStats && (
            <div className="mt-5">
              <div className="flex justify-center">
                <Button className="bg-emerald-400" onClick={handleShow}>
                  Add Post +
                </Button>
              </div>
              <Modal show={postsModal} onClose={() => setPostsModal(false)}>
                <ModalHeader>{edit ? "Edit Post" : "Add Post"}</ModalHeader>
                <ModalBody>
                  <form className="flex max-w-md flex-col gap-4">
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="description">Description</Label>
                      </div>
                      <TextInput
                        id="description"
                        placeholder="Description"
                        type="text"
                        value={postDescription}
                        required
                        onChange={handleDescription}
                      />
                    </div>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button
                    className="bg-[#FC6F2F] "
                    onClick={(e) => handlePostSave(e)}
                  >
                    Post
                  </Button>
                  <Button
                    className="bg-white"
                    color="gray"
                    onClick={() => setPostsModal(false)}
                  >
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>

              {/* Debug section to show raw posts data */}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
  {posts && posts.length > 0 ? (
    posts
      .filter(item => item.isPublished === true && item.isDeleted === false)
      .map((item) => (
        <div
          key={item.id}
          className="p-6 border border-gray-200 rounded-2xl shadow-md bg-white"
        >
          <h2 className="text-xl font-bold text-[#FC6F2F]">
            {item.username || "No username"}
          </h2>
          <h3 className="text-md text-gray-600 mb-2">
            {item.trueName || "No true name"}
          </h3>
          <p className="text-gray-800">{item.description || "No description"}</p>
         
          <div className="flex justify-center mt-4 gap-10">
            <Button
              className="bg-blue-500"
              onClick={() => handlePostEdit(item)}
            >
              Edit
            </Button>
            <Button
              className="bg-red-500"
              onClick={() => handlePostDelete(item)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))
  ) : (
    <div className="col-span-full p-6 text-center bg-gray-50 rounded-lg">
      <p className="text-gray-500">No posts available</p>
    </div>
  )}
</div>
            </div>
          )}
          {toggleFriends && (
            <div className="mt-4">
              <h2 className="text-lg font-bold mb-3">My Friends:</h2>
              {friends.length === 0 ? (
                <p>You don&apos;t have any friends yet.</p>
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
