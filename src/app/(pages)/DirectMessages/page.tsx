"use client";
import React, { useState } from "react";
import profile from "@/assets/blank-profile-picture-973460_640.png";
import Image from "next/image";
import { Friend } from "@/lib/Interfaces";


// Mock Friends Until Backend is setup
const mockFriends: Friend[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    image: profile,
  },
  {
    id: 2,
    name: "James Wilson",
    image: profile,
  },
  {
    id: 3,
    name: "Emma Davis",
    image: profile,
  },
  {
    id: 4,
    name: "Alex Taylor",
    image: profile,
  },
  {
    id: 5,
    name: "Chris Lee",
    image: profile,
  },
  {
    id: 6,
    name: "Olivia Martin",
    image: profile,
  },
  {
    id: 7,
    name: "Liam Anderson",
    image: profile,
  },
  {
    id: 8,
    name: "Ava Thompson",
    image: profile,
  },
  {
    id: 9,
    name: "Noah White",
    image: profile,
  },
  {
    id: 10,
    name: "Mia Harris",
    image: profile,
  },
  {
    id: 11,
    name: "Ethan Moore",
    image: profile,
  },
  {
    id: 12,
    name: "Isabella Clark",
    image: profile,
  },
  {
    id: 13,
    name: "Mason Hall",
    image: profile,
  },
  {
    id: 14,
    name: "Sophia Allen",
    image: profile,
  },
  {
    id: 15,
    name: "Logan Young",
    image: profile,
  },
];

const Page = () => {
  const [friends, setFriends] = useState<Friend[]>(mockFriends);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  
  const handleSelectFriend = (friend: Friend) => {
    setSelectedFriend(friend);
  };
  
  return (
    <div className="flex h-screen">
      {/* Friends list sidebar (1/3 width) */}
      <div className="w-full md:w-1/3 border-r overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="text-xl md:mt-0 mt-12 font-bold">Direct Messages</h2>
        </div>
        <div className="flex flex-col">
          {friends.map((friend) => (
            <div
              key={friend.id}
              className={`p-4 flex items-center cursor-pointer hover:bg-gray-100 ${
                selectedFriend?.id === friend.id ? 'bg-gray-200' : ''
              }`}
              onClick={() => handleSelectFriend(friend)}
            >
              <Image
                src={friend.image}
                alt={friend.name}
                className="h-12 w-12 rounded-full border border-gray-300 object-cover"
              />
              <div className="ml-3">
                <h3 className="font-semibold">{friend.name}</h3>
                <p className="text-sm text-gray-500">
                  {friend.lastMessage || 'No messages yet'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Message area */}
      <div className="hidden md:w-2/3 md:flex flex-col">
        {selectedFriend ? (
          <div className="flex flex-col h-full">
            <div className="p-4 border-b flex items-center">
              <Image
                src={selectedFriend.image}
                alt={selectedFriend.name}
                className="h-8 w-8 rounded-full border border-gray-300 object-cover"
              />
              <h3 className="ml-3 font-semibold">{selectedFriend.name}</h3>
            </div>
            
           
            <div className="flex-grow p-4 overflow-y-auto">
              {/* My Mapping for Messages */}
            </div>
            
            {/* Message input */}
            <div className="p-4 border-t">
              <div className="flex">
                <input
                  type="text"
                  className="flex-grow rounded-full border px-4 py-2"
                  placeholder="Message..."
                />
                <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-full">
                  Send
                </button>
              </div>
            </div>
          </div>
        ) : (

          <div className="flex flex-col items-center justify-center h-full">
            <h3 className="text-xl font-semibold mb-2">Your Messages</h3>
            <p className="text-sm text-gray-500 mb-4">Send messages to your friends!!!</p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded">
              Send Message
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;