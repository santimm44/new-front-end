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
import { MessageSquare, User, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

// Mock data for friends
const mockFriends = [
  {
    id: 1,
    name: "Sarah Johnson",
    image: profile,
    location: "Oakland, CA",
    specialty: "Weightlifting",
  },
  {
    id: 2,
    name: "James Wilson",
    image: profile,
    location: "San Jose, CA",
    specialty: "Track & Field",
  },
  {
    id: 3,
    name: "Emma Davis",
    image: profile,
    location: "Fresno, CA",
    specialty: "Basketball",
  },
  {
    id: 4,
    name: "Alex Taylor",
    image: profile,
    location: "Sacramento, CA",
    specialty: "Boxing",
  },
  {
    id: 5,
    name: "Chris Lee",
    image: profile,
    location: "Modesto, CA",
    specialty: "Tennis",
  },
];

// NOTE Need to change default profile picture to User's uploaded picture and set inputs for profile in settings
const page = () => {
  const router = useRouter();
  const [toggleSettings, setToggleSettings] = useState<boolean>(false);
  const [name, setName] = useState<string>("Mike Hackerman");
  const [location, setLocation] = useState<string>("CA");
  const [city, setCity] = useState<string>("Stockton");
  const [specialty, setSpecialty] = useState<string>("Master of Hacks");
  const [profileImage, setProfileImage] = useState<any>(profile);
  const [toggleStats, setToggleStats] = useState<boolean>(true);
  const [toggleFriends, setToggleFriends] = useState<boolean>(false);
  const [toggleStatModal, setToggleStatModal] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openAddFriendModal, setOpenAddFriendModal] = useState<boolean>(false);

  const [friends, setFriends] = useState(mockFriends);
  const [friendSearch, setFriendSearch] = useState<string>("");

  const [edit, setEdit] = useState<boolean>(false);

  const [statTitle, setStatTitle] = useState<string>("");
  const [statDescription, setStatDescription] = useState<string>("");
  const [statCategories, setStatCategories] = useState<string>("");

  const [statsItems, setStatsItems] = useState<IUserStats[]>(Stats);

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
    const item = {};
    setToggleSettings(false);

    if (edit) {
      // Our Edit Login Will go here
    } else {
      // Our Add Logic will go here
    }
  };

  const handleLocation = (location: string) => setLocation(location);
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const handleCity = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCity(e.target.value);
  const handleSpecialty = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSpecialty(e.target.value);



  // ---------------- Stats Logic --------------------

  const handleStatModal = () => {
    setToggleStatModal(!toggleStatModal);
  };

  const handleStatName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setStatTitle(e.target.value);

  const handleScore = (e: React.ChangeEvent<HTMLInputElement>) =>
    setStatDescription(e.target.value);

  const handleCategories = (categories: string) =>
    setStatCategories(categories);

  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const item = {};
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
                src={profileImage}
                alt="User Profile"
                className="h-40 w-40 sm:h-52 sm:w-52 lg:h-60 lg:w-60 rounded-full border-2 border-black object-cover"
              />
            </div>

            <div className="text-lg md:text-xl font-bold text-center sm:text-left sm:ml-6">
              <p>Name: {name}</p>
              <p>Location: {city}, {location}</p>
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
                  id="Location"
                  type="text"
                  placeholder="Location"
                  required
                  onChange={handleCity}
                />
                <div>
                  <Dropdown label="State" dismissOnClick={true}>
                    <div className="h-[300px] overflow-y-auto">
                    <DropdownItem onClick={() => handleLocation("AL")}>
                      Alabama
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("AK")}>
                      Alaska
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("AZ")}>
                      Arizona
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("AR")}>
                      Arkansas
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("CA")}>
                      California
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("CO")}>
                      Colorado
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("CT")}>
                      Connecticut
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("DE")}>
                      Delaware
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("FL")}>
                      Florida
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("GA")}>
                      Georgia
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("HI")}>
                      Hawaii
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("ID")}>
                      Idaho
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("IL")}>
                      Illinois
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("IN")}>
                      Indiana
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("IA")}>
                      Iowa
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("KS")}>
                      Kansas
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("KY")}>
                      Kentucky
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("LA")}>
                      Louisiana
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("ME")}>
                      Maine
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("MD")}>
                      Maryland
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("MA")}>
                      Massachusetts
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("MI")}>
                      Michigan
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("MN")}>
                      Minnesota
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("MS")}>
                      Mississippi
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("MO")}>
                      Missouri
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("MT")}>
                      Montana
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("NE")}>
                      Nebraska
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("NV")}>
                      Nevada
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("NH")}>
                      New Hampshire
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("NJ")}>
                      New Jersey
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("NM")}>
                      New Mexico
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("NY")}>
                      New York
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("NC")}>
                      North Carolina
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("ND")}>
                      North Dakota
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("OH")}>
                      Ohio
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("OK")}>
                      Oklahoma
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("OR")}>
                      Oregon
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("PA")}>
                      Pennsylvania
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("RI")}>
                      Rhode Island
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("SC")}>
                      South Carolina
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("SD")}>
                      South Dakota
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("TN")}>
                      Tennessee
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("TX")}>
                      Texas
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("UT")}>
                      Utah
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("VT")}>
                      Vermont
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("VA")}>
                      Virginia
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("WA")}>
                      Washington
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("WV")}>
                      West Virginia
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("WI")}>
                      Wisconsin
                    </DropdownItem>
                    <DropdownItem onClick={() => handleLocation("WY")}>
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
                        <Dropdown label="Categories" dismissOnClick={true}>
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
                <h2 className="text-xl font-bold mb-4">{name}'s Scores</h2>

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
                <h2 className="text-xl font-bold mb-4">{name}'s Friends</h2>

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
                          src={friend.image}
                          alt={friend.name}
                          className="h-16 w-16 rounded-full border border-black object-cover"
                        />
                        <div className="ml-4 text-left">
                          <p className="text-black">{friend.location}</p>
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

export default page;
