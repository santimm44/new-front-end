"use client";
import React, { useState } from "react";
import profile from "@/assets/blank-profile-picture-973460_640.png";
import SettingsImage from "@/assets/settings.png";
import Image from "next/image";
import { Button } from "flowbite-react";

// NOTE Need to change default profile picture to User's uploaded picture and set inputs for profile
const page = () => {
  const [toggleSettings, setToggleSettings] = useState<boolean>(false);
  const [name, setName] = useState<string>("Mike Hackerman");
  const [location, setLocation] = useState<string>("Stockton, CA");

  const handleToggleSettings = () => {
    setToggleSettings(!toggleSettings);
  };

  return (
    <div>
      <div className="flex justify-end -mt-[515px]">
        <div className="lg:mr-[20%]">
          <Image
            src={profile}
            alt="User Profile"
            className="h-60 w-60 rounded-full border-2 border-black"
          />
          <div className="text-center text-xl font-bold">
            <p>Name: {name} </p>
            <p>Location: {location}</p>
          </div>
        </div>
        <Image
          src={SettingsImage}
          alt="Settings"
          className="h-24 w-24 -mt-6"
          onClick={handleToggleSettings}
        />
      </div>
      <div className="text-center text-xl font-bold py-4 ">
        <p> * Details About User </p>
        <p> * Details About User part 2 </p>
      </div>
      <div className="flex justify-center">
        <Button className="mx-[2%]">Stats</Button>
        <Button className="mx-[2%]">Posts</Button>
        <Button className="mx-[2%]">Friends</Button>
      </div>
    </div>
  );
};

export default page;
