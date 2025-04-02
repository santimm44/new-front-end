"use client";
import React, { useState } from "react";
import profile from "@/assets/blank-profile-picture-973460_640.png";
import SettingsImage from "@/assets/settings.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// NOTE Need to change default profile picture to User's uploaded picture and set inputs for profile
const page = () => {
  const [toggleSettings, setToggleSettings] = useState<boolean>(false);
  const [name, setName] = useState<string>("Mike Hackerman");
  const [location, setLocation] = useState<string>("Stockton, CA");

  const handleToggleSettings = () => {
    setToggleSettings(!toggleSettings);
  };

  return (
    <div className="">
      <div className="flex justify-end lg:w-[75%] -mt-[460px] ml-[25%]">
        <div className="lg:mr-[23%]">
          <Image
            src={profile}
            alt="User Profile"
            className="h-60 w-60 rounded-full border-2 border-black"
          />
          <div className="text-center text-xl font-bold">
            <p>Name: {name} </p>
            <p>Location: {location}</p>
            <p> * Details About User </p>
            <p> * Details About User part 2 </p>
          </div>
        </div>
        <Image
          src={SettingsImage}
          alt="Settings"
          className="h-24 w-24 -mt-6"
          onClick={handleToggleSettings}
        />
      </div>
      <div className="flex justify-end mt-10 mr-[11%]">
        <Button className="mx-[1%] h-14 lg:w-[180px] text-xl bg-[#FFE9D1] border-[#FC6F2F] border-2 hover:!text-[#FC6F2F] hover:bg-white rounded-3xl">Stats</Button>
        <Button className="mx-[1%] h-14 lg:w-[180px] text-xl bg-[#FFE9D1] border-[#FC6F2F] border-2 hover:!text-[#FC6F2F] hover:bg-white rounded-3xl">Posts</Button>
        <Button className="mx-[1%] h-14 lg:w-[180px] text-xl bg-[#FFE9D1] border-[#FC6F2F] border-2 hover:!text-[#FC6F2F] hover:bg-white rounded-3xl">Friends</Button>
      </div>
    </div>
  );
};

export default page;
