"use client"
import { AddFriend, CreateMatch, GetAllMatches, getProfileItemsByUser, getToken, UpdateMatch } from '@/lib/DataServices';
import { IMatchSpotterCard, IProfileData, IuserCreateInfo } from '@/lib/Interfaces';
import { Button, Label } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import ProfilePicture from "@/assets/Stock_Profile-removebg-preview.png";
import Image from 'next/image';
import { X } from 'lucide-react'; 




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
        friendId: currentProfile.userId
      };

      console.log(profileCardId);
      console.log(currentProfile.userId)
      

      const result = await AddFriend(friendship, getToken());
      
      if (result) {
        setMatchedUsers(prev => [...prev, currentProfile.userId]);
        console.log(`Successfully matched with user ID: ${currentProfile.userId}`);
        
        
        handleNext();
      } else {
        
        console.error('Failed to add friend');
        alert('Failed to add friend. Please try again.');
      }
    } catch (error) {
      console.error('Error adding friend:', error);
      alert('An error occurred while adding friend. Please try again.');
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
                      const userMatch = matches.find(match => match.userId === profileData.id);
                      if (userMatch) {
                       
                        setMyName(userMatch.myName || "");
                        setUserContent(userMatch.userContent || "");
                        setUserSport(userMatch.userSport || "");
                        setDaysAvailable(userMatch.daysAvailable || "");
                        setStartTime(userMatch.startTime || "");
                        setEndTime(userMatch.endTime || "");
                        setCurrentMatchId(userMatch.id || null);
                        
                        
                        const filteredProfiles = matches.filter(match => match.userId !== profileData.id);
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
        try {
          console.log("Profile Card ID:", profileCardId);
          const items: IMatchSpotterCard = {
            id: currentMatchId,
            userId: profileCardId,
            myName: myName,
            userContent: userContent,
            userSport: userSport,
            startTime: startTime,
            endTime: endTime,
            daysAvailable: daysAvailable
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
              const filteredProfiles = userPostsItems.filter(match => match.userId !== profileCardId);
              setOtherProfiles(filteredProfiles);
              
              
              if (filteredProfiles.length > 0) {
                setCurrentProfile(filteredProfiles[0]);
                setCurrentIndex(0);
              }
            }
  
            setProfileModal(false);
            
          
            setEdit(false);
          } else {
            alert(`Profile Items were not ${(edit || currentMatchId !== null) ? "Updated" : "Added"}`);
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
          const existingProfile = profilePosts.find(match => match.id === currentMatchId);
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

      const handleMyName = (e: React.ChangeEvent<HTMLInputElement>) =>
          setMyName(e.target.value);

      const handleSport = (e: React.ChangeEvent<HTMLInputElement>) =>
          setUserSport(e.target.value);

      const handleDate = (e: React.ChangeEvent<HTMLInputElement>) =>
          setDaysAvailable(e.target.value);

      const handleStartTime = (e: React.ChangeEvent<HTMLInputElement>) =>
          setStartTime(e.target.value);

      const handleEndTime = (e: React.ChangeEvent<HTMLInputElement>) =>
          setEndTime(e.target.value);

          

  return (
    <div className="px-4 py-8 bg-gray-50">
      {profileModal ? (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6 mt-40">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold text-gray-800">Create Spotter Profile</p>
           
            <button 
              onClick={handleCancelEdit}
              className="p-2 text-gray-600 hover:text-gray-800 rounded-full hover:bg-gray-100"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Name</Label>
              <input
                type="text"
                className="w-full h-10 rounded-lg p-2 border border-gray-300 text-lg bg-[#FFE9D1] text-black placeholder-gray-500"
                placeholder="Enter Name"
                value={myName}
                onChange={handleMyName}
              />
            </div>

            <div>
              <Label>Sport</Label>
              <input
                type="text"
                className="w-full h-10 rounded-lg p-2 border border-gray-300 text-lg bg-[#FFE9D1] text-black placeholder-gray-500"
                placeholder="Enter Sport"
                value={userSport}
                onChange={handleSport}
              />
            </div>

            <div>
              <Label>Days Available</Label>
              <input
                type="text"
                className="w-full h-10 rounded-lg p-2 border border-gray-300 text-lg bg-[#FFE9D1] text-black placeholder-gray-500"
                placeholder="e.g. Monday/Wednesday/Friday"
                value={daysAvailable}
                onChange={handleDate}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Start Time</Label>
                <input
                  type="text"
                  className="w-full h-10 rounded-lg p-2 border border-gray-300 text-lg bg-[#FFE9D1] text-black placeholder-gray-500"
                  placeholder="Enter Start Time"
                  value={startTime}
                  onChange={handleStartTime}
                />
              </div>

              <div>
                <Label>End Time</Label>
                <input
                  type="text"
                  className="w-full h-10 rounded-lg p-2 border border-gray-300 text-lg bg-[#FFE9D1] text-black placeholder-gray-500"
                  placeholder="Enter End Time"
                  value={endTime}
                  onChange={handleEndTime}
                />
              </div>
            </div>

            <div>
              <Label>Bio / Content</Label>
              <textarea
                value={userContent}
                onChange={(e) => setUserContent(e.target.value)}
                placeholder="Tell us a bit about yourself..."
                className="w-full border p-2 rounded h-24 bg-white text-gray-800"
              />
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <button
              onClick={handleCancelEdit}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handlePost}
              className="flex-1 bg-[#FC6F2F] text-white py-2 rounded-lg font-semibold text-lg hover:bg-[#e25f20] transition disabled:opacity-50 cursor-pointer"
              disabled={loading || !myName || !userContent || !startTime || !endTime || !daysAvailable || !userSport}
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 min-h-screen">
          <main className="max-w-5xl mx-auto p-4">
            <div className="flex justify-end mb-4">
              <Button className='cursor-pointer bg-[#FC6F2F] hover:bg-amber-500 ' onClick={handleToggleSettings}>Edit Matchmaking Profile</Button>
            </div>

            {otherProfiles.length > 0 && currentProfile ? (
             
              <div className="max-w-5xl mx-auto bg-[#FFE9D1] rounded-2xl shadow-lg p-6 md:space-y-12 space-y-2 md:mt-20 mt-10">
               
                <div className="flex justify-center">
                  <Image
                    src={ProfilePicture}
                    alt="Profile Picture"
                    className="md:h-50 md:w-50 h-24 w-24 object-cover rounded-full border-4 border-white shadow-md"
                  />
                </div>

              
                <div className="text-center space-y-1">
                  <h2 className="text-2xl font-bold text-gray-800">Potential Match</h2>
                  <p className="text-xl text-gray-700">{currentProfile.myName}</p>
                  <p className="text-md text-gray-600">
                    Match {currentIndex + 1} of {otherProfiles.length}
                  </p>
                </div>

                {/* Schedule Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-base">
                  <div><strong>Days Available:</strong> {currentProfile.daysAvailable}</div>
                  <div><strong>Sports:</strong> {currentProfile.userSport}</div>
                  <div><strong>Start Time:</strong> {currentProfile.startTime}</div>
                  <div><strong>End Time:</strong> {currentProfile.endTime}</div>
                </div>

                {/* Bio Section */}
                <div className="bg-white rounded-lg p-4 text-gray-800">
                  <h3 className="font-semibold mb-1">About This Spotter:</h3>
                  <p className="whitespace-pre-line">{currentProfile.userContent}</p>
                </div>

                {/* Match Controls */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
                  <button
                    onClick={handleNext}
                    className="w-full sm:w-auto px-6 py-2 rounded-xl bg-red-400 text-white font-semibold hover:bg-red-500 transition cursor-pointer"
                  >
                    Next
                  </button>
                  <button
                    onClick={handleMatch}
                    className="w-full sm:w-auto px-6 py-2 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition cursor-pointer"
                    disabled={matchedUsers.includes(currentProfile.userId || 0)}
                  >
                    {matchedUsers.includes(currentProfile.userId || 0) ? "Matched" : "Match"}
                  </button>
                </div>
              </div>
            ) : (
              // Display the user's own profile when no other profiles available
              <div className="max-w-5xl mx-auto bg-[#FFE9D1] rounded-2xl shadow-lg p-6 md:space-y-12 space-y-2 md:mt-20 mt-10">
                <div className="flex justify-center">
                  <Image
                    src={ProfilePicture}
                    alt="Profile Picture"
                    className="md:h-50 md:w-50 h-24 w-24 object-cover rounded-full border-4 border-white shadow-md"
                  />
                </div>

                <div className="text-center space-y-1">
                  <h2 className="text-2xl font-bold text-gray-800">{usernameOrEmail ? `@${usernameOrEmail}` : "@username"}</h2>
                  <p className="text-xl text-gray-700">{myName}</p>
                  <p className="text-md text-gray-600">Location: City, State</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-base">
                  <div><strong>Days Available:</strong> {daysAvailable}</div>
                  <div><strong>Sports:</strong> {userSport}</div>
                  <div><strong>Start Time:</strong> {startTime}</div>
                  <div><strong>End Time:</strong> {endTime}</div>
                </div>

                <div className="bg-white rounded-lg p-4 text-gray-800">
                  <h3 className="font-semibold mb-1">About Me:</h3>
                  <p className="whitespace-pre-line">{userContent}</p>
                </div>

                {otherProfiles.length === 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800">
                    <p className="font-semibold text-center">No other spotters available at the moment.</p>
                    <p className="text-center text-sm mt-1">Check back later for potential matches!</p>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  )
}
  
export default FindSpotter