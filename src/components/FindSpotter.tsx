"use client"
import { getProfileItemsByUser, getToken } from '@/lib/DataServices';
import { IMatchSpotterCard, IProfileData, IuserCreateInfo } from '@/lib/Interfaces';
import { Button, Label } from 'flowbite-react';
import React, { useEffect, useState } from 'react'

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
  <div className='max-w-5xl'>
    {!profilePosts ? (
      <div>
        <p className="text-lg font-semibold mb-2">Create Post Here:</p>

        <div className="space-y-4">
          <Label>Name</Label>
          <input
            type="text"
            className="w-full h-10 rounded-lg p-2 border border-gray-300 text-xl bg-[#FFE9D1] text-black placeholder-gray-400"
            placeholder="Enter Name"
            value={myName}
            onChange={handleMyName}
          />

          <Label>Sport</Label>
          <input
            type="text"
            className="w-full h-10 rounded-lg p-2 border border-gray-300 text-xl bg-[#FFE9D1] text-black placeholder-gray-400"
            placeholder="Enter Sport"
            value={sport}
            onChange={handleSport}
          />

          <Label>Days Available</Label>
          <input
            type="text"
            className="w-full h-10 rounded-lg p-2 border border-gray-300 text-xl bg-[#FFE9D1] text-black placeholder-gray-400"
            placeholder="Day Available - Ex. Monday/Wednesday/Friday"
            value={date}
            onChange={handleDate}
          />

          <Label>Start Time</Label>
          <input
            type="text"
            className="w-full h-10 rounded-lg p-2 border border-gray-300 text-xl bg-[#FFE9D1] text-black placeholder-gray-400"
            placeholder="Enter Start Time"
            value={startTime}
            onChange={handleStartTime}
          />

          <Label>End Time</Label>
          <input
            type="text"
            className="w-full h-10 rounded-lg p-2 border border-gray-300 text-xl bg-[#FFE9D1] text-black placeholder-gray-400"
            placeholder="Enter End Time"
            value={endTime}
            onChange={handleEndTime}
          />

          <Label>Content</Label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tell us a bit about yourself..."
            className="w-full border p-2 rounded mb-2 h-24 bg-white"
          />
        </div>
        <button
        onClick={handlePost}
        className="w-full bg-[#FC6F2F] text-white py-2 rounded-lg disabled:opacity-50"
        disabled={loading || !myName || !content || !startTime || !endTime || !date}
      >
        {loading ? "Posting..." : "Post"}
      </button>
      </div>
    ) : (
      <div className='max-w-5xl'>
        <div>
          <Button>
            Edit Matchmaking Profile
          </Button>
        </div>
      </div>
    )}
  </div>
);
}
  

export default FindSpotter