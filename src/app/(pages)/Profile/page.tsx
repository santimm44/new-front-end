"use client";
import React, { useState } from "react";
import profile from "@/assets/blank-profile-picture-973460_640.png";
import SettingsImage from "@/assets/settings.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IUserStats } from "@/lib/Interfaces";
import Stats from "@/lib/StatEntries.json"

// NOTE Need to change default profile picture to User's uploaded picture and set inputs for profile in settings
const page = () => {
  const [toggleSettings, setToggleSettings] = useState<boolean>(false);
  const [name, setName] = useState<string>("Mike Hackerman");
  const [location, setLocation] = useState<string>("Stockton, CA");
  const [profileImage, setProfileImage] = useState<any>(profile);
  const [toggleStats, setToggleStats] = useState<boolean>(true);
  const [togglePosts, setTogglePosts] = useState<boolean>(false);
  const [toggleFriends, setToggleFriends] = useState<boolean>(false);

  const [statsItems, setStatsItems] = useState<IUserStats[]>(Stats);

  const handleToggleSettings = () => {
    setToggleSettings(!toggleSettings);
  };

  const handleStats = () => {
    setToggleStats(true);
    setTogglePosts(false);
    setToggleFriends(false);
  };

  const handlePosts = () => {
    setToggleStats(false);
    setTogglePosts(true);
    setToggleFriends(false);
  };

  const handleFriends = () => {
    setToggleStats(false);
    setTogglePosts(false);
    setToggleFriends(true);
  };

  return (
    <main className="flex flex-col">
    {/* Main content area */}
    <div className="w-full px-4 sm:px-6 md:px-8 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        {/* Profile Image and Details */}
        <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center mb-6 sm:mb-0">
        
          <div className="relative mb-4 sm:mb-0">
            <Image
              src={profileImage}
              alt="User Profile"
              className="h-40 w-40 sm:h-52 sm:w-52 lg:h-60 lg:w-60 rounded-full border-2 border-black object-cover"
            />
          </div>
          
          <div className="text-lg md:text-xl font-bold text-center sm:text-left sm:ml-6">
            <p>Name: {name}</p>
            <p>Location: {location}</p>
            <p>Details: About Me</p>
            <p>Details: About Me As Well</p>
          </div>
        </div>
        
        {/* Settings Button */}
        <div className="mt-4 sm:mt-0">
          <Image
            src={SettingsImage}
            alt="Settings"
            className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 cursor-pointer"
            onClick={handleToggleSettings}
          />
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row justify-center mt-8 gap-3 sm:gap-4">
        <Button
          onClick={handleStats}
          className="h-12 sm:h-14 w-full sm:w-[120px] lg:w-[160px] text-lg sm:text-xl bg-[#FFE9D1] border-[#FC6F2F] border-2 hover:!text-[#FC6F2F] hover:bg-white rounded-3xl"
        >
          Stats
        </Button>
        
        <Button
          onClick={handleFriends}
          className="h-12 sm:h-14 w-full sm:w-[120px] lg:w-[160px] text-lg sm:text-xl bg-[#FFE9D1] border-[#FC6F2F] border-2 hover:!text-[#FC6F2F] hover:bg-white rounded-3xl"
        >
          Friends
        </Button>
      </div>
      
      {/* Stats Section */}
      <div className="w-full sm:w-[90%] md:w-[90%] lg:w-[85%] mx-auto mt-8 text-center border-2 py-4 rounded-3xl bg-[#FFE9D1]">
        <h1 className="text-2xl sm:text-3xl font-semibold underline mb-4">{name}'s Scores</h1>
        
      
        <div className="w-full max-h-[400px] overflow-y-auto px-2 sm:px-4">
          {statsItems.map((item, idx) => (
            <div key={idx} className="mb-4 last:mb-0 border-b border-[#FC6F2F]/20 last:border-b-0 pb-4 last:pb-0">
              <div className="flex flex-col p-2 sm:p-4">
                <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-center  mb-3">
                  <p className="text-xl sm:text-2xl font-bold underline">{item.sport}:</p>
                  <p className="text-xl sm:text-2xl pl-0 sm:pl-2">{item.statName}</p>
                  <p className="text-xl sm:text-2xl pl-0 sm:pl-2">  ({item.score})</p>
                </div>
                
                <div className="flex flex-row gap-3 justify-center">
                  <Button className="bg-white border-[#FC6F2F] border-2 hover:!text-[#FC6F2F] hover:bg-white rounded-3xl text-sm" onClick={() => {}}>
                    Edit
                  </Button>
                  <Button className="bg-white border-[#FC6F2F] border-2 hover:!text-[#FC6F2F] hover:bg-white rounded-3xl text-sm" onClick={() => {}}>
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </main>
  );
};

export default page;
