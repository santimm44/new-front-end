"use client";
import {
  AddFriend,
  CreateMatch,
  GetAllMatches,
  getProfileItemsByUser,
  getToken,
  UpdateMatch,
} from "@/lib/DataServices";
import {
  IMatchSpotterCard,
  IProfileData,
  IuserCreateInfo,
} from "@/lib/Interfaces";
import React, { useEffect, useState } from "react";
// import ProfilePicture from "@/assets/Stock_Profile-removebg-preview.png";
import { Calendar, ChevronRight, Clock, Edit3, Heart, MapPin, User, X } from "lucide-react";

const FindSpotter = () => {
  const [profileItems, setProfileItems] = useState<IuserCreateInfo | null>();
  const [usernameOrEmail, setUsernameOrEmail] = useState<string | null>(null);
  const [profileCardId, setProfileCardId] = useState<number>(0);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [myName, setMyName] = useState<string>("");
  const [userContent, setUserContent] = useState<string>("");
  const [userSport, setUserSport] = useState<string>("");
  const [daysAvailable, setDaysAvailable] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [currentMatchId, setCurrentMatchId] = useState<number | null>(null);

  const [matchLoading, setMatchLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [profileModal, setProfileModal] = useState<boolean>(true);
  const [profilePosts, setProfilePost] = useState<IMatchSpotterCard[]>([]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [otherProfiles, setOtherProfiles] = useState<IMatchSpotterCard[]>([]);
  const [currentProfile, setCurrentProfile] = useState<IMatchSpotterCard | null>(null);
  const [matchedUsers, setMatchedUsers] = useState<number[]>([]);

  const handleNext = () => {
    if (otherProfiles.length > 0) {
      const nextIndex = (currentIndex + 1) % otherProfiles.length;
      setCurrentIndex(nextIndex);
      setCurrentProfile(otherProfiles[nextIndex]);
    }
  };

  const handleMatch = async () => {
    if (currentProfile && currentProfile.userId && !matchLoading) {
      setMatchLoading(true);

      try {
        const friendship = {
          userId: profileCardId,
          friendId: currentProfile.userId,
        };

        console.log(profileCardId);
        console.log(currentProfile.userId);

        const result = await AddFriend(friendship, getToken());

        if (result) {
          setMatchedUsers((prev) => [...prev, currentProfile.userId]);
          console.log(
            `Successfully matched with user ID: ${currentProfile.userId}`
          );

          handleNext();
        } else {
          console.error("Failed to add friend");
          alert("Failed to add friend. Please try again.");
        }
      } catch (error) {
        console.error("Error adding friend:", error);
        alert("An error occurred while adding friend. Please try again.");
      } finally {
        setMatchLoading(false);
      }
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      console.log(usernameOrEmail);
      console.log(profileItems);
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
              setProfileCardId(profileData.id);

              try {
                const matches = await GetAllMatches(storedToken);
                setProfilePost(matches || []);

                if (matches && matches.length > 0) {
                  const userMatch = matches.find(
                    (match) => match.userId === profileData.id
                  );
                  if (userMatch) {
                    setMyName(userMatch.myName || "");
                    setUserContent(userMatch.userContent || "");
                    setUserSport(userMatch.userSport || "");
                    setDaysAvailable(userMatch.daysAvailable || "");
                    setStartTime(userMatch.startTime || "");
                    setEndTime(userMatch.endTime || "");
                    setCurrentMatchId(userMatch.id || null);

                    const filteredProfiles = matches.filter(
                      (match) => match.userId !== profileData.id
                    );
                    setOtherProfiles(filteredProfiles);

                    // Set the first profile to display (if any)
                    if (filteredProfiles.length > 0) {
                      setCurrentProfile(filteredProfiles[0]);
                    }

                    setProfileModal(false);
                  } else {
                    setProfileModal(true);
                  }
                }
              } catch (err) {
                console.error("Error fetching matches:", err);
                console.log(error);
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

  const handlePost = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Creating/Updating match with:", {
      token: getToken(),
      profileCardId,
      currentMatchId,
      myName,
      userContent,
      userSport,
      startTime,
      endTime,
      daysAvailable,
    });
    try {
      console.log("Profile Card ID:", profileCardId);
      const items: IMatchSpotterCard = {
        userId: profileCardId,
        myName: myName,
        userContent: userContent,
        userSport: userSport,
        startTime: startTime,
        endTime: endTime,
        daysAvailable: daysAvailable,
         ...(currentMatchId && { id: currentMatchId })
      };
      console.log("Submitting items:", items);
      console.log("Token:", token);
      console.log("Edit mode:", edit || currentMatchId !== null);

      setLoading(true);

      let result = false;

      if (edit || currentMatchId !== null) {
        console.log("Updating existing match with ID:", currentMatchId);
        // Edit Logic
        result = await UpdateMatch(items, getToken());
      } else {
        console.log("Creating new match");
        // Add logic
        result = await CreateMatch(items, getToken());
      }

      if (result) {
        console.log("Success");
        const userPostsItems = await GetAllMatches(getToken());
        setProfilePost(userPostsItems);

        if (userPostsItems) {
          const filteredProfiles = userPostsItems.filter(
            (match) => match.userId !== profileCardId
          );
          setOtherProfiles(filteredProfiles);

          if (filteredProfiles.length > 0) {
            setCurrentProfile(filteredProfiles[0]);
            setCurrentIndex(0);
          }
        }

        setProfileModal(false);

        setEdit(false);
      } else {
        alert(
          `Profile Items were not ${
            edit || currentMatchId !== null ? "Updated" : "Added"
          }`
        );
      }
    } catch (error) {
      console.error("Error in handlePost:", error);
      alert("An error occurred while saving the profile");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSettings = () => {
    if (!profileModal) {
      setEdit(true);
    }
    setProfileModal(!profileModal);
  };

  const handleCancelEdit = () => {
    setProfileModal(false);

    if (edit) {
      const existingProfile = profilePosts.find(
        (match) => match.id === currentMatchId
      );
      if (existingProfile) {
        setMyName(existingProfile.myName || "");
        setUserContent(existingProfile.userContent || "");
        setUserSport(existingProfile.userSport || "");
        setDaysAvailable(existingProfile.daysAvailable || "");
        setStartTime(existingProfile.startTime || "");
        setEndTime(existingProfile.endTime || "");
      }
    }

    setEdit(false);
  };


   if (profileModal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#FC6F2F] to-[#FF8A65] p-6 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Create Your Profile</h2>
                <p className="text-orange-100 mt-1">Tell others about your workout style</p>
              </div>
              <button
                onClick={handleCancelEdit}
                className="p-2 hover:bg-white/20 rounded-full "
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="p-8 space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <User size={16} />
                Full Name
              </label>
              <input
                type="text"
                className="w-full h-12 rounded-xl px-4 border-2 border-gray-200 focus:border-[#FC6F2F] focus:outline-none  bg-[#FFE9D1] text-gray-800 placeholder-gray-500"
                placeholder="Enter your name"
                value={myName}
                onChange={(e) => setMyName(e.target.value)}
              />
            </div>

            {/* Sport Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Heart size={16} />
                Favorite Sport
              </label>
              <input
                type="text"
                className="w-full h-12 rounded-xl px-4 border-2 border-gray-200 focus:border-[#FC6F2F] focus:outline-none  bg-[#FFE9D1] text-gray-800 placeholder-gray-500"
                placeholder="What sport do you love?"
                value={userSport}
                onChange={(e) => setUserSport(e.target.value)}
              />
            </div>

            {/* Days Available */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Calendar size={16} />
                Available Days
              </label>
              <input
                type="text"
                className="w-full h-12 rounded-xl px-4 border-2 border-gray-200 focus:border-[#FC6F2F] focus:outline-none  bg-[#FFE9D1] text-gray-800 placeholder-gray-500"
                placeholder="e.g. Monday/Wednesday/Friday"
                value={daysAvailable}
                onChange={(e) => setDaysAvailable(e.target.value)}
              />
            </div>

            {/* Time Range */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Clock size={16} />
                  Start Time
                </label>
                <input
                  type="text"
                  className="w-full h-12 rounded-xl px-4 border-2 border-gray-200 focus:border-[#FC6F2F] focus:outline-none  bg-[#FFE9D1] text-gray-800 placeholder-gray-500"
                  placeholder="6:00 AM"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Clock size={16} />
                  End Time
                </label>
                <input
                  type="text"
                  className="w-full h-12 rounded-xl px-4 border-2 border-gray-200 focus:border-[#FC6F2F] focus:outline-none  bg-[#FFE9D1] text-gray-800 placeholder-gray-500"
                  placeholder="8:00 AM"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Edit3 size={16} />
                About You
              </label>
              <textarea
                value={userContent}
                onChange={(e) => setUserContent(e.target.value)}
                placeholder="Tell potential workout partners about yourself..."
                className="w-full rounded-xl px-4 py-3 border-2 border-gray-200 focus:border-[#FC6F2F] focus:outline-none  bg-[#FFE9D1] text-gray-800 placeholder-gray-500 resize-none h-24"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleCancelEdit}
                className="flex-1 h-12 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50  cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handlePost}
                disabled={loading || !myName || !userContent || !startTime || !endTime || !daysAvailable || !userSport}
                className="flex-1 h-12 rounded-xl bg-gradient-to-r from-[#FC6F2F] to-[#FF8A65] text-white font-semibold hover:from-[#e25f20] hover:to-[#FF7043] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg cursor-pointer"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </div>
                ) : (
                  'Save Profile'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Workout Matcher</h1>
            <p className="text-gray-600 mt-1">Find your perfect workout partner</p>
          </div>
          <button
            onClick={handleToggleSettings}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FC6F2F] to-[#FF8A65] text-white font-semibold rounded-xl hover:from-[#e25f20] hover:to-[#FF7043] transition-all shadow-lg cursor-pointer"
          >
            <Edit3 size={18} />
            Edit Profile
          </button>
        </div>

        {/* Profile Card */}
        {otherProfiles.length > 0 && currentProfile ? (
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-[#FFE9D1] via-[#FFF2E6] to-[#FFE9D1] p-8 text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-[#FC6F2F] to-[#FF8A65] rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl">
                <User size={48} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {currentProfile.myName}
              </h2>
              <div className="inline-flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full text-gray-700 font-medium">
                <MapPin size={16} />
                Potential Match {currentIndex + 1} of {otherProfiles.length}
              </div>
            </div>

            {/* Profile Content */}
            <div className="p-8 space-y-8">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#FC6F2F] to-[#FF8A65] rounded-xl flex items-center justify-center">
                      <Calendar size={20} className="text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-800">Schedule</h3>
                  </div>
                  <div className="space-y-2 text-gray-700">
                    <p><span className="font-medium">Days:</span> {currentProfile.daysAvailable}</p>
                    <p><span className="font-medium">Time:</span> {currentProfile.startTime} - {currentProfile.endTime}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#FC6F2F] to-[#FF8A65] rounded-xl flex items-center justify-center">
                      <Heart size={20} className="text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-800">Sport</h3>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{currentProfile.userSport}</p>
                </div>
              </div>

              {/* Bio Section */}
              <div className="bg-gradient-to-r from-[#FFE9D1] to-[#FFF2E6] rounded-2xl p-6">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <User size={20} />
                  About This Workout Partner
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {currentProfile.userContent}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleNext}
                  className="flex-1 flex items-center justify-center gap-2 h-14 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50  cursor-pointer"
                >
                  Next Profile
                  <ChevronRight size={20} />
                </button>
                <button
                  onClick={handleMatch}
                  disabled={matchedUsers.includes(currentProfile.userId || 0)}
                  className={`flex-1 h-14 rounded-xl font-semibold transition-all shadow-lg ${
                    matchedUsers.includes(currentProfile.userId || 0)
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600 cursor-pointer'
                  }`}
                >
                  {matchedUsers.includes(currentProfile.userId || 0) ? (
                    <div className="flex items-center justify-center gap-2">
                      <Heart size={20} />
                      Matched!
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Heart size={20} />
                      Match
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Your Profile */
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-[#FFE9D1] via-[#FFF2E6] to-[#FFE9D1] p-8 text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-[#FC6F2F] to-[#FF8A65] rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl">
                <User size={48} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {myName}
              </h2>
              <div className="inline-flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full text-gray-700 font-medium">
                <span>@{usernameOrEmail}</span>
              </div>
            </div>

            {/* Profile Content */}
            <div className="p-8 space-y-8">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#FC6F2F] to-[#FF8A65] rounded-xl flex items-center justify-center">
                      <Calendar size={20} className="text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-800">My Schedule</h3>
                  </div>
                  <div className="space-y-2 text-gray-700">
                    <p><span className="font-medium">Days:</span> {daysAvailable}</p>
                    <p><span className="font-medium">Time:</span> {startTime} - {endTime}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                      <Heart size={20} className="text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-800">My Sport</h3>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{userSport}</p>
                </div>
              </div>

              {/* Bio Section */}
              <div className="bg-gradient-to-r from-[#FFE9D1] to-[#FFF2E6] rounded-2xl p-6">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <User size={20} />
                  About Me
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {userContent}
                </p>
              </div>

              {/* No Matches Message */}
              {otherProfiles.length === 0 && (
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 text-center border-2 border-dashed border-orange-200">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#FC6F2F] to-[#FF8A65] rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Heart size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-orange-900 mb-2">
                    Looking for workout partners...
                  </h3>
                  <p className="text-orange-700">
                    No other spotters available right now. Check back later for potential matches!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindSpotter;
