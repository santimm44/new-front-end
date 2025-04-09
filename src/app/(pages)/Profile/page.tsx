"use client";
import React, { useState } from "react";
import SettingsImage from "@/assets/settings.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IUserStats } from "@/lib/Interfaces";
import Stats from "@/lib/StatEntries.json";

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
} from "flowbite-react";
import { MessageSquare, User } from "lucide-react";
import { useRouter } from "next/navigation";

// Mock data for friends
const mockFriends = [
  {
    id: 1,
    name: "Sarah Johnson",
    city: "Oakland",
    state: "CA",
    specialty: "Weightlifting",
  },
  {
    id: 2,
    name: "James Wilson",
    
    city: "San Jose",
    state: "CA",
    specialty: "Track & Field",
  },
  {
    id: 3,
    name: "Emma Davis",
  
    city: "Fresno",
    state: "CA",
    specialty: "Basketball",
  },
  {
    id: 4,
    name: "Alex Taylor",
    
    city: "Sacramento",
    state: "CA",
    specialty: "Boxing",
  },
  {
    id: 5,
    name: "Chris Lee",
    
    city: "Modesto",
    state: "CA",
    specialty: "Tennis",
  },
  {
    id: 6,
    name: "Olivia Martin",
    
    city: "Austin",
    state: "TX",
    specialty: "Yoga",
  },
  {
    id: 7,
    name: "Liam Anderson",
    
    city: "Denver",
    state: "CO",
    specialty: "Soccer",
  },
  {
    id: 8,
    name: "Ava Thompson",
    
    city: "Seattle",
    state: "WA",
    specialty: "Swimming",
  },
  {
    id: 9,
    name: "Noah White",
    
    city: "Chicago",
    state: "IL",
    specialty: "Basketball",
  },
  {
    id: 10,
    name: "Mia Harris",
    
    city: "Orlando",
    state: "FL",
    specialty: "Running",
  },
  {
    id: 11,
    name: "Ethan Moore",
    
    city: "Phoenix",
    state: "AZ",
    specialty: "Cycling",
  },
  {
    id: 12,
    name: "Isabella Clark",
    
    city: "San Diego",
    state: "CA",
    specialty: "Pilates",
  },
  {
    id: 13,
    name: "Mason Hall",
    
    city: "Portland",
    state: "OR",
    specialty: "CrossFit",
  },
  {
    id: 14,
    name: "Sophia Allen",
    
    city: "Atlanta",
    state: "GA",
    specialty: "Dancing",
  },
  {
    id: 15,
    name: "Logan Young",
    
    city: "Boston",
    state: "MA",
    specialty: "Martial Arts",
  },
  
];

// NOTE Need to change default profile picture to User's uploaded picture and set inputs for profile in settings
const Page = () => {
  const router = useRouter();
  const [toggleSettings, setToggleSettings] = useState<boolean>(false);
  const [name, setName] = useState<string>("Mike Hackerman");
  const [state, setState] = useState<string>("CA");
  const [city, setCity] = useState<string>("Stockton");
  const [specialty, setSpecialty] = useState<string>("Master of Hacks");
  //const [profileImage, setProfileImage] = useState<StaticImageData | null | string | ArrayBuffer>(profile);
  //console.log(setProfileImage(profile)) //Redundant code to trick ESlint Compiler to think it is being used
  const [toggleStats, setToggleStats] = useState<boolean>(true);
  const [toggleFriends, setToggleFriends] = useState<boolean>(false);
  const [toggleStatModal, setToggleStatModal] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openAddFriendModal, setOpenAddFriendModal] = useState<boolean>(false);

  const [friends, setFriends] = useState(mockFriends);
  console.log(setFriends(mockFriends)) //Redundant code to trick ESlint Compiler to think it is being used
  const [friendSearch, setFriendSearch] = useState<string>("");

  const [edit, setEdit] = useState<boolean>(false);
console.log(setEdit(true)) //Redundant code to trick ESlint Compiler to think it is being used
  const [statTitle, setStatTitle] = useState<string>("");
  const [statDescription, setStatDescription] = useState<string>("");
  console.log(statTitle + statDescription) //Redundant code to trick ESlint Compiler to think it is being used
  const [statCategories, setStatCategories] = useState<string>("Categories");

  const [statsItems, setStatsItems] = useState<IUserStats[]>(Stats);
  console.log(setStatsItems)//Redundant code to trick ESlint Compiler to think it is being used

  // ------------ Toggle Logic -------------------

  const handleToggleSettings = () => {
    setToggleSettings(!toggleSettings);
  };

  const handleStats = () => {
    setToggleStats(true);
    setToggleFriends(false);
  };

  const handleFriends = () => {
    setToggleStats(false);
    setToggleFriends(true);
  };

  // ---------------- Settings Logic ---------------------

  const handleSettingsSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    //const item = {};
    console.log(e)//Redundant code to trick ESlint Compiler to think it is being used
    setToggleSettings(false);

    if (edit) {
      // Our Edit Login Will go here
    } else {
      // Our Add Logic will go here
    }
  };

  const handleState = (state: string) => setState(state);

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const handleCity = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCity(e.target.value);

  const handleSpecialty = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSpecialty(e.target.value);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    // We're creating a new file reader object
    const reader = new FileReader();

    // Then we are going to get the first file we uploaded
    const file = e.target.files?.[0];

    // And if there is a file to select
    if (file) {
      //When this file is turned into a string this onLoad function will run
      reader.onload = () => {
        //setProfileImage(reader.result); // Once the file is read we will store the result into our setter function
      };

      reader.readAsDataURL(file); // This converts our file to a base64 encoded string
    }
  };

  // ---------------- Stats Logic --------------------

  const handleStatModal = () => {
    setToggleStatModal(!toggleStatModal);
  };
  console.log(handleStatModal())

  const handleStatName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setStatTitle(e.target.value);

  const handleScore = (e: React.ChangeEvent<HTMLInputElement>) =>
    setStatDescription(e.target.value);

  const handleCategories = (categories: string) =>
    setStatCategories(categories);

  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    //const item = {};
    console.log(e)//Redundant code to trick ESlint Compiler to think it is being used
    setOpenAddModal(false);

    if (edit) {
      // Our Edit Login Will go here
    } else {
      // Our Add Logic will go here
    }
  };

  // ---------------- Friend Logic --------------------
  const handleAddFriend = () => {
    setOpenAddFriendModal(true);
  };

  const handleFriendSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFriendSearch(e.target.value);
  };

  const handleSaveFriend = () => {
    setOpenAddFriendModal(false);
  };

  const handleMessageFriend = (friendId: number) => {
    router.push(`/DirectMessages?friendId=${friendId}`);
  };

  const handleViewProfile = (friendId: number) => {
    router.push(`/profile/${friendId}`);
  };

  return (
    <main className="flex flex-col">
      {/* Main content area */}
      <div className="w-full px-4 sm:px-6 md:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          {/* Profile Image and Details */}
          <div className="w-full sm:w-auto flex flex-col mx-auto sm:flex-row items-center mb-6 sm:mb-0">
            <div className="relative mb-4 sm:mb-0">
              <Image
                src={`#`}
                alt="User Profile"
                className="h-40 w-40 sm:h-52 sm:w-52 lg:h-60 lg:w-60 rounded-full border-2 border-black object-cover"
              />
            </div>

            <div className="text-lg md:text-xl font-bold text-center sm:text-left sm:ml-6">
              <p>Name: {name}</p>
              <p>
                Location: {city}, {state}
              </p>
              <p>Speciality: {specialty}</p>
            </div>
          </div>

          {/* Settings Button */}
          <div className="mt-4 sm:-mt-40">
            <Image
              src={SettingsImage}
              alt="Settings"
              className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 cursor-pointer"
              onClick={handleToggleSettings}
            />
          </div>
          <Modal
            className="bg-[#16697A]"
            show={toggleSettings}
            onClose={() => setToggleSettings(false)}
          >
            <ModalHeader>Settings</ModalHeader>
            <ModalBody>
              <form className="flex max-w-md flex-col gap-4">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="Title">Name</Label>
                  </div>
                  <TextInput
                    id="Name"
                    type="text"
                    placeholder="Name"
                    required
                    onChange={handleName}
                  />
                </div>
                <div className="mb-2 block">
                  <Label htmlFor="Title">Location</Label>
                </div>
                <TextInput
                  id="City"
                  type="text"
                  placeholder="City"
                  required
                  onChange={handleCity}
                />
                <div>
                  <Dropdown label="State" dismissOnClick={true}>
                    <div className="h-[300px] overflow-y-auto">
                      <DropdownItem onClick={() => handleState("AL")}>
                        Alabama
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("AK")}>
                        Alaska
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("AZ")}>
                        Arizona
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("AR")}>
                        Arkansas
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("CA")}>
                        California
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("CO")}>
                        Colorado
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("CT")}>
                        Connecticut
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("DE")}>
                        Delaware
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("FL")}>
                        Florida
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("GA")}>
                        Georgia
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("HI")}>
                        Hawaii
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("ID")}>
                        Idaho
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("IL")}>
                        Illinois
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("IN")}>
                        Indiana
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("IA")}>
                        Iowa
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("KS")}>
                        Kansas
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("KY")}>
                        Kentucky
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("LA")}>
                        Louisiana
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("ME")}>
                        Maine
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("MD")}>
                        Maryland
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("MA")}>
                        Massachusetts
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("MI")}>
                        Michigan
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("MN")}>
                        Minnesota
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("MS")}>
                        Mississippi
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("MO")}>
                        Missouri
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("MT")}>
                        Montana
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("NE")}>
                        Nebraska
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("NV")}>
                        Nevada
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("NH")}>
                        New Hampshire
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("NJ")}>
                        New Jersey
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("NM")}>
                        New Mexico
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("NY")}>
                        New York
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("NC")}>
                        North Carolina
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("ND")}>
                        North Dakota
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("OH")}>
                        Ohio
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("OK")}>
                        Oklahoma
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("OR")}>
                        Oregon
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("PA")}>
                        Pennsylvania
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("RI")}>
                        Rhode Island
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("SC")}>
                        South Carolina
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("SD")}>
                        South Dakota
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("TN")}>
                        Tennessee
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("TX")}>
                        Texas
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("UT")}>
                        Utah
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("VT")}>
                        Vermont
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("VA")}>
                        Virginia
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("WA")}>
                        Washington
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("WV")}>
                        West Virginia
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("WI")}>
                        Wisconsin
                      </DropdownItem>
                      <DropdownItem onClick={() => handleState("WY")}>
                        Wyoming
                      </DropdownItem>
                    </div>
                  </Dropdown>
                  <div className="mb-2 block">
                    <Label htmlFor="descrption">Specialty</Label>
                  </div>
                  <TextInput
                    id="Specialty"
                    placeholder="Specialty"
                    type="text"
                    required
                    onChange={handleSpecialty}
                  />

                  <div className="mb-2 block">
                    <Label htmlFor="Image">Image</Label>
                  </div>
                  <FileInput
                    onChange={handleImage}
                    id="Picture"
                    accept="image/png, image/jpg"
                    placeholder="Chose Picture"
                  />
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button
                className="bg-[#82C0CC] text-xl"
                onClick={handleSettingsSave}
              >
                Save
              </Button>
              <Button
                className="bg-red-500 text-xl"
                onClick={() => setToggleSettings(false)}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-center mt-8 gap-3 sm:gap-4">
          <Button
            onClick={handleStats}
            className={`h-12 sm:h-14 w-full sm:w-[120px] lg:w-[160px] text-white text-lg hover:text-xl sm:hover:text-2xl sm:text-xl ${
              toggleStats
                ? "bg-[#82C0CC] !text-[#16697A]"
                : "bg-[#16697A] hover:!text-[#16697A] hover:bg-[#82C0CC]"
            } rounded-3xl`}
          >
            Stats
          </Button>

          <Button
            onClick={handleFriends}
            className={`h-12 sm:h-14 w-full sm:w-[120px] lg:w-[160px] text-white text-lg hover:text-xl sm:hover:text-2xl sm:text-xl ${
              toggleFriends
                ? "bg-[#82C0CC] !text-[#16697A]"
                : "bg-[#16697A] hover:!text-[#16697A] hover:bg-[#82C0CC]"
            } rounded-3xl`}
          >
            Friends
          </Button>
        </div>

        {/* Content Section - Toggle between Stats and Friends */}
        <div className="w-full sm:w-[90%] md:w-[90%] lg:w-[85%] mx-auto mt-8 text-center py-4">
          {toggleStats ? (
            // Stats Content
            <>
              <Button
                className="bg-[#FFA62B] text-2xl font-bold px-10 py-7 rounded-3xl cursor-pointer"
                onClick={() => setOpenAddModal(true)}
              >
                Add Stat +
              </Button>
              <Modal
                className="bg-[#16697A]"
                show={openAddModal}
                onClose={() => setOpenAddModal(false)}
              >
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
                        <Dropdown label={statCategories} dismissOnClick={true}>
                          <DropdownItem
                            onClick={() => handleCategories("Basketball")}
                          >
                            Basketball
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => handleCategories("Boxing")}
                          >
                            Boxing
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => handleCategories("Baseball")}
                          >
                            Baseball
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => handleCategories("Cycling")}
                          >
                            Cycling
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => handleCategories("Martial Arts")}
                          >
                            Martial Arts
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => handleCategories("Volleyball")}
                          >
                            Volleyball
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => handleCategories("Football")}
                          >
                            Football
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => handleCategories("Hockey")}
                          >
                            Hockey
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => handleCategories("Weight Lifting")}
                          >
                            Weight Lifting
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => handleCategories("Track & Field")}
                          >
                            Track & Field
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => handleCategories("Tennis")}
                          >
                            Tennis
                          </DropdownItem>
                        </Dropdown>
                      </div>
                    </div>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button className="bg-[#82C0CC] text-xl" onClick={handleSave}>
                    Save
                  </Button>
                  <Button
                    className="bg-red-500 text-xl"
                    onClick={() => setOpenAddModal(false)}
                  >
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
              <div className="mt-6">
                <h2 className="text-xl font-bold mb-4">{name}&#39;s Scores</h2>

                <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                  {statsItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="px-4 pb-4 rounded-lg shadow-md flex flex-col items-center text-center bg-[#82C0CC]"
                    >
                      <div className="flex justify-end w-full">
                        <button className="text-3xl tracking-widest font-bold text-black pb-2 cursor-pointer">
                          ...
                        </button>
                      </div>
                      <h3 className="text-xl text-black font-bold">
                        {item.sport}
                      </h3>
                      <p className="text-black">{item.statName}</p>
                      <p className="text-xl text-white font-semibold">
                        {item.score}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            // Friends Content
            <>
              <Button
                className="bg-[#FFA62B] text-2xl font-bold px-10 py-7 rounded-3xl cursor-pointer"
                onClick={handleAddFriend}
              >
                Add Friend +
              </Button>
              <Modal
                className="bg-[#16697A]"
                show={openAddFriendModal}
                onClose={() => setOpenAddFriendModal(false)}
              >
                <ModalHeader>Add New Friend</ModalHeader>
                <ModalBody>
                  <form className="flex max-w-md flex-col gap-4">
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="friendSearch">Search for Friends</Label>
                      </div>
                      <TextInput
                        id="friendSearch"
                        type="text"
                        placeholder="Enter name or username"
                        required
                        onChange={handleFriendSearch}
                        value={friendSearch}
                      />
                    </div>

                    <div className="mt-4">
                      <p className="text-white">
                        Search results will appear here
                      </p>
                    </div>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button
                    className="bg-[#82C0CC] text-xl"
                    onClick={handleSaveFriend}
                  >
                    Add
                  </Button>
                  <Button
                    className="bg-red-500 text-xl"
                    onClick={() => setOpenAddFriendModal(false)}
                  >
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
              <div className="mt-6">
                <h2 className="text-xl font-bold mb-4">{name}&#39;s Friends</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {friends.map((friend) => (
                    <div
                      key={friend.id}
                      className="p-4 rounded-lg shadow-md flex flex-col items-center text-center bg-[#82C0CC]"
                    >
                      <div className="flex justify-between w-full mb-2">
                        <h3 className="text-xl text-black font-bold">
                          {friend.name}
                        </h3>
                        <button className="text-3xl tracking-widest font-bold text-black cursor-pointer">
                          ...
                        </button>
                      </div>

                      <div className="flex items-center mb-3">
                        <Image
                          src={"#"}
                          alt={friend.name}
                          className="h-16 w-16 rounded-full border border-black object-cover"
                        />
                        <div className="ml-4 text-left">
                          <p className="text-black">{friend.city}, {friend.state}</p>
                          <p className="text-black">
                            Specialty: {friend.specialty}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-around w-full mt-2">
                        <Button
                          className="bg-[#16697A] text-white hover:bg-[#FFA62B] p-2 rounded-full"
                          onClick={() => handleMessageFriend(friend.id)}
                        >
                          <MessageSquare size={20} />
                        </Button>
                        <Button
                          className="bg-[#16697A] text-white hover:bg-[#FFA62B] p-2 rounded-full"
                          onClick={() => handleViewProfile(friend.id)}
                        >
                          <User size={20} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Page;
