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
  Dropdown,
  DropdownItem,
  FileInput,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  TextInput,
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
  const [toggleStatModal, setToggleStatModal] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);

  const [edit, setEdit] = useState<boolean>(false);

  const [statTitle, setStatTitle] = useState<string>("");
  const [statDescription, setStatDescription] = useState<string>("");
  const [statCategories, setStatCategories] = useState<string>("");

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

  const handleStatModal = () => {
    setToggleStatModal(!toggleStatModal);
  };

  const handleStatName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setStatTitle(e.target.value);

  const handleScore = (e: React.ChangeEvent<HTMLInputElement>) =>
    setStatDescription(e.target.value);

  const handleCategories = (categories: string) =>
    setStatCategories(categories);

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
          <Button
            className="bg-[#FFA62B] text-2xl font-bold px-10 py-7 rounded-3xl"
            onClick={() => setOpenAddModal(true)}
          >
            Add Stat +
          </Button>
          <Modal className="bg-[#16697A]" show={openAddModal} onClose={() => setOpenAddModal(false)}>
            <ModalHeader>
              {edit ? "Edit Stat Post" : "Add Stat Post"}
            </ModalHeader>
            <ModalBody>
              <form className="flex max-w-md flex-col gap-4">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="Title">Stat Name</Label>
                  </div>
                  <TextInput
                    id="Stat Name"
                    type="text"
                    placeholder="Stat Name"
                    required
                    onChange={handleStatName}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="descrption">Score</Label>
                  </div>
                  <TextInput
                    id="Score"
                    placeholder="Score"
                    type="text"
                    required
                    onChange={handleScore}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Dropdown label="Categories" dismissOnClick={true}>
                      <DropdownItem
                        onClick={() => handleCategories("Jiu Jitsu")}
                      >
                        Basketball
                      </DropdownItem>
                      <DropdownItem onClick={() => handleCategories("Boxing")}>
                        Boxing
                      </DropdownItem>
                      <DropdownItem onClick={() => handleCategories("Kung Fu")}>
                        Baseball
                      </DropdownItem>
                      <DropdownItem onClick={() => handleCategories("Kung Fu")}>
                        Cyclying
                      </DropdownItem>
                      <DropdownItem onClick={() => handleCategories("Kung Fu")}>
                        Martial Arts
                      </DropdownItem>
                      <DropdownItem onClick={() => handleCategories("Kung Fu")}>
                        Volleyball
                      </DropdownItem>
                      <DropdownItem onClick={() => handleCategories("Kung Fu")}>
                        Football
                      </DropdownItem>
                      <DropdownItem onClick={() => handleCategories("Kung Fu")}>
                        Hockey
                      </DropdownItem>
                      <DropdownItem onClick={() => handleCategories("Kung Fu")}>
                        Weight Lifting
                      </DropdownItem>
                      <DropdownItem onClick={() => handleCategories("Kung Fu")}>
                        Track & Field
                      </DropdownItem>
                      <DropdownItem onClick={() => handleCategories("Kung Fu")}>
                        Tennis
                      </DropdownItem>
                      
                    </Dropdown>
                  </div>
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button className="bg-[#82C0CC] text-xl" onClick={() => {}}>Save</Button>
              <Button className="bg-red-500 text-xl" onClick={() => setOpenAddModal(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">{name}'s Scores</h2>

            <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
              {statsItems.map((item, idx) => (
                <div
                  key={idx}
                  className="px-4 pb-4 rounded-lg shadow-md flex flex-col items-center text-center bg-[#82C0CC]"
                >
                  <div className="flex justify-end w-full">
                    <button className=" text-3xl tracking-widest font-bold text-black pb-2 cursor-pointer">
                      ...
                    </button>
                  </div>
                  <h3 className="text-xl text-black font-bold">{item.sport}</h3>
                  <p className="text-black">{item.statName}</p>
                  <p className="text-xl text-white font-bold">{item.score}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Add Stats Section */}
          <div></div>
        </div>
      </div>
    </main>
  );
};

export default page;
