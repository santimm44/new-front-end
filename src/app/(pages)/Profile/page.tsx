"use client";
import React, { useState } from "react";
import profile from "@/assets/blank-profile-picture-973460_640.png";
import SettingsImage from "@/assets/settings.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IUserStats } from "@/lib/Interfaces";
import Stats from "@/lib/StatEntries.json"

// NOTE Need to change default profile picture to User's uploaded picture and set inputs for profile
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
    <main>
      <div className="">
        <div className="flex justify-end lg:w-[75%] -mt-[460px] ml-[25%]">
          <div className="lg:mr-[23%] md:mr-[9%]">
            <Image
              src={profileImage}
              alt="User Profile"
              className="h-60 w-60 rounded-full border-2 border-black"
            />
            <div className="text-xl font-bold">
              <p>Name: {name} </p>
              <p>Location: {location}</p>
              <p>Details: About Me </p>
              <p>Details: About Me As Well </p>
            </div>
          </div>
          <Image
            src={SettingsImage}
            alt="Settings"
            className="h-24 w-24 -mt-6"
            onClick={handleToggleSettings}
          />
        </div>
        <div className="flex justify-end mt-12 md:mr-[9%]">
          <Button
            onClick={handleStats}
            className="mx-[1%] h-14 lg:w-[190px] md:w-[120px] text-xl bg-[#FFE9D1] border-[#FC6F2F] border-2 hover:!text-[#FC6F2F] hover:bg-white rounded-3xl"
          >
            Stats
          </Button>
          <Button
            onClick={handlePosts}
            className="mx-[1%] h-14 lg:w-[190px] md:w-[120px] text-xl bg-[#FFE9D1] border-[#FC6F2F] border-2 hover:!text-[#FC6F2F] hover:bg-white rounded-3xl"
          >
            Posts
          </Button>
          <Button
            onClick={handleFriends}
            className="mx-[1%] h-14 lg:w-[190px] md:w-[120px] text-xl bg-[#FFE9D1] border-[#FC6F2F] border-2 hover:!text-[#FC6F2F] hover:bg-white rounded-3xl"
          >
            Friends
          </Button>
        </div>
       
      </div>
      <div className="mt-4 ml-auto flex flex-col place-items-center w-[63%] text-center border-2 py-4 rounded-3xl">
          <h1 className="text-3xl font-semibold underline">{name}'s Scores</h1>
          <div className="">
          {
          statsItems.map((item: IUserStats, idx: number) => {
                  return(
                    <div key={idx}>
                          <div className="flex flex-col p-5 mx-auto">
                            <div className="">
                              <p className="text-xl px-4 font-semibold underline">{item.sport}</p>
                              <p className="text-xl px-4">{item.statName}</p>
                              <p className="text-xl px-4">{item.score}</p>
                            </div>

                            <div className="flex flex-row mx-auto">
                              <Button className="bg-[#FFE9D1] border-[#FC6F2F] border-2 hover:!text-[#FC6F2F] hover:bg-white rounded-3xl" onClick={() => {}}>Edit</Button>
                              <Button className="bg-[#FFE9D1] border-[#FC6F2F] border-2 hover:!text-[#FC6F2F] hover:bg-white rounded-3xl" onClick={() => {}}>Delete</Button>
                            </div>
                          </div>
                        
                      
                    </div>
                  )
                })
              }
          </div>
          
      </div>
    </main>
  );
};

export default page;
