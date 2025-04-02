"use client";
import React, { useState } from "react";
import profile from "@/assets/blank-profile-picture-973460_640.png";
import SettingsImage from "@/assets/settings.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IUserStats } from "@/lib/Interfaces";
import Stats from "@/lib/StatEntries.json";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
  ListGroup,
} from "flowbite-react";

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
            className="h-12 sm:h-14 w-full sm:w-[120px] lg:w-[160px] text-white text-lg sm:text-xl bg-[#16697A] hover:!text-[#16697A] hover:bg-[#82C0CC] rounded-3xl"
          >
            Stats
          </Button>

          <Button
            onClick={handleFriends}
            className="h-12 sm:h-14 w-full sm:w-[120px] lg:w-[160px] text-white text-lg sm:text-xl bg-[#16697A] hover:!text-[#16697A] hover:bg-[#82C0CC] rounded-3xl"
          >
            Friends
          </Button>
        </div>

        {/* Stats Section */}
        <div className="w-full sm:w-[90%] md:w-[90%] lg:w-[85%] mx-auto mt-8 text-center py-4">
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">{name}'s Scores</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {statsItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg shadow-md flex flex-col items-center text-center bg-[#82C0CC]"
                >
                  <h3 className="text-lg text-black font-bold">{item.sport}</h3>
                  <p className="text-black">{item.statName}</p>
                  <p className="text-xl font-bold">{item.score}</p>

                  <div className="flex gap-2 mt-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Stats Section */}
        </div>
      </div>
    </main>
  );
};

export default page;
