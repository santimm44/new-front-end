"use client"
import { getProfileItemsByUser, getToken } from '@/lib/DataServices';
import { IMatchSpotterCard, IProfileData, IuserCreateInfo } from '@/lib/Interfaces';
import { Button, Label } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import ProfilePicture from "@/assets/Stock_Profile-removebg-preview.png";
import Image from 'next/image';

const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`); // Change to AM and PM format


const FindSpotter = () => {

    const [profileItems, setProfileItems] = useState<IuserCreateInfo | null>();
    const [usernameOrEmail, setUsernameOrEmail] = useState<string | null>(null);
    const [profileCardId, setProfileCardId] = useState<number>(0);
    const [token, setToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [myName, setMyName] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [sport, setSport] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false);
    const [match, setMatch] = useState<boolean>(false);
    const [next, setNext] = useState<boolean>(false);
    const [profileModal, setProfileModal] = useState<boolean>(false);
    const [profilePosts, setProfilePost] = useState<IMatchSpotterCard[]>([]);


const handleNext = () => {
 // Next Logic
};

const handleMatch = () => {
 // Match Logic 
  handleNext(); 
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
                const profileData: IProfileData | null =
                  await getProfileItemsByUser(storedUsernameOrEmail, storedToken);
    
                if (profileData) {
                  setProfileItems(profileData);
                  setProfileCardId(profileData.id);
    
                  
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

      const handlePostEdit = (items: IMatchSpotterCard) => {
        setProfileModal(true);
        setEdit(true);
        setMyName(items.myName);
        setDate(items.date);
        setContent(items.content);
        setSport(items.sport);
        setStartTime(items.startTime);
        setEndTime(items.endTime);
      };

     
    
      const handlePost = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const item: IMatchSpotterCard = {
          myName: myName,
          content: content,
          sport: sport,
          startTime: startTime,
          endTime: endTime,
          date: date
        };

        setProfileModal(false);
    
        let result = false;
    
        if (edit) {
          // Edit Logic
          // result = await updateProfileCard(item, getToken());
        } else {
          // Add logic
         // result = await CreateProfileCard(item, getToken());
        }
    
        if (result) {
          //const userPostsItems = await getCardByUserId(profileCardId, getToken());
         // setProfilePost(userPostsItems);
        } else {
          alert(`Profile Items were not ${edit ? "Updated" : "Added"}`);
        }
      };

      const handleToggleSettings = () => {
        setProfileModal(!profileModal);
      };

      const handleMyName = (e: React.ChangeEvent<HTMLInputElement>) =>
          setMyName(e.target.value);

      const handleSport = (e: React.ChangeEvent<HTMLInputElement>) =>
          setSport(e.target.value);

      const handleDate = (e: React.ChangeEvent<HTMLInputElement>) =>
          setDate(e.target.value);

      const handleStartTime = (e: React.ChangeEvent<HTMLInputElement>) =>
          setStartTime(e.target.value);

      const handleEndTime = (e: React.ChangeEvent<HTMLInputElement>) =>
          setEndTime(e.target.value);

          

return (
  <div className="px-4 py-8">
  {!profilePosts ? (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">
      <p className="text-2xl font-bold text-gray-800">Create Spotter Profile</p>

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
            value={sport}
            onChange={handleSport}
          />
        </div>

        <div>
          <Label>Days Available</Label>
          <input
            type="text"
            className="w-full h-10 rounded-lg p-2 border border-gray-300 text-lg bg-[#FFE9D1] text-black placeholder-gray-500"
            placeholder="e.g. Monday/Wednesday/Friday"
            value={date}
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tell us a bit about yourself..."
            className="w-full border p-2 rounded h-24 bg-white text-gray-800"
          />
        </div>
      </div>

      <button
        onClick={handlePost}
        className="w-full bg-[#FC6F2F] text-white py-2 rounded-lg font-semibold text-lg hover:bg-[#e25f20] transition disabled:opacity-50"
        disabled={loading || !myName || !content || !startTime || !endTime || !date}
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </div>
  ) : (
    <div className="bg-gray-50 min-h-screen">
      <main className="max-w-5xl mx-auto p-4">
        <div className="flex justify-end mb-4">
          <Button onClick={handleToggleSettings}>Edit Matchmaking Profile</Button>
        </div>

        <div className="max-w-3xl mx-auto bg-[#FFE9D1] rounded-2xl shadow-lg p-6 space-y-6">
          {/* Profile Image */}
          <div className="flex justify-center">
            <Image
              src={ProfilePicture}
              alt="Profile Picture"
              className="h-40 w-40 object-cover rounded-full border-4 border-white shadow-md"
            />
          </div>

          {/* Basic Info */}
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-gray-800">@username</h2>
            <p className="text-xl text-gray-700">{myName}</p>
            <p className="text-md text-gray-600">Location: City, State</p>
          </div>

          {/* Schedule Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-base">
            <div><strong>Days Available:</strong> {date}</div>
            <div><strong>Sports:</strong> {sport}</div>
            <div><strong>Start Time:</strong> {startTime}</div>
            <div><strong>End Time:</strong> {endTime}</div>
          </div>

          {/* Bio Section */}
          <div className="bg-white rounded-lg p-4 text-gray-800">
            <h3 className="font-semibold mb-1">About Me:</h3>
            <p className="whitespace-pre-line">{content}</p>
          </div>

          {/* Match Controls */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
            <button
              onClick={handleNext}
              className="w-full sm:w-auto px-6 py-2 rounded-xl bg-red-400 text-white font-semibold hover:bg-red-500 transition"
            >
              Next
            </button>
            <button
              onClick={handleMatch}
              className="w-full sm:w-auto px-6 py-2 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition"
            >
              Match
            </button>
          </div>
        </div>
      </main>
    </div>
  )}
</div>
)
}
  

export default FindSpotter