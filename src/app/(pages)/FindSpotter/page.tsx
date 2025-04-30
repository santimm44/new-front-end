"use client";

import { getProfileItemsByUser } from "@/lib/DataServices";
import { useEffect, useState } from "react";
import ProfilePicture from "@/assets/Stock_Profile-removebg-preview.png";
import Image from "next/image";


interface IuserCreateInfo {
  id: number;
  username: string;
  password: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
  userBio: string;
  userLocation: string;
  userLocationPublic: boolean;
  userPrimarySport: string;
  userSecondarySport: string;
  isSpotter: boolean;
  isTrainer: boolean;
  profilePicture: string;
  trueName: string;
}

const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`); // Change to AM and PM format

export default function PostPage() {
  const [user, setUser] = useState<IuserCreateInfo | null>(null);
  const [myName, setMyName] = useState("");
  const [content, setContent] = useState("");
  const [sport, setSport] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const emailOrUsername = localStorage.getItem("userEmailOrUsername");

      if (token && emailOrUsername) {
        const data = await getProfileItemsByUser(emailOrUsername, token);
        setUser(data);
      }
    };

    fetchUser();
  }, []);

  const handlePost = async () => {
    if (!user) return;

    const newPost = {
      userId: user.id,
      username: user.username,
      profilePicture: user.profilePicture,
      userLocation: user.userLocationPublic ? user.userLocation : "Private",
      myName,
      content,
      sport,
      date,
      time: `${startTime} - ${endTime}`,
      createdAt: new Date().toISOString(),
    };

    try {
      setLoading(true);
      const response = await fetch("", { // Fill in when the backend is complete
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) throw new Error("Failed to post");
      console.log("Post saved!");

     
      setMyName("");
      setContent("");
      setSport("");
      setDate("");
      setStartTime("");
      setEndTime("");
    } catch (error) {
      console.error("Error posting:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Create a New Post</h1>

      {user && (
        <div className="flex items-center gap-4 mb-4">
          <Image
            src={ProfilePicture}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-medium">{user.username}</p>
            <p className="text-sm text-gray-500">
              {user.userLocationPublic ? user.userLocation : "Private Location"}
            </p>
          </div>
        </div>
      )}

      <input
        type="text"
        placeholder="Name"
        className="w-full border border-gray-300 rounded-lg p-2 mb-3"
        value={myName}
        onChange={(e) => setMyName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Sport"
        className="w-full border border-gray-300 rounded-lg p-2 mb-3"
        value={sport}
        onChange={(e) => setSport(e.target.value)}
      />

      <input
        type="text"
        placeholder="Days Available"
        className="w-full border border-gray-300 rounded-lg p-2 mb-3"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <div className="flex gap-3 mb-3">
        <select
          className="w-1/2 border border-gray-300 rounded-lg p-2"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        >
          <option value="">Start Time</option>
          {hours.map((hour) => (
            <option key={hour} value={hour}>{hour}</option>
          ))}
        </select>

        <select
          className="w-1/2 border border-gray-300 rounded-lg p-2"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        >
          <option value="">End Time</option>
          {hours.map((hour) => (
            <option key={hour} value={hour}>{hour}</option>
          ))}
        </select>
      </div>

      <textarea
        placeholder="About Yourself"
        className="w-full border border-gray-300 rounded-lg p-2 h-32 resize-none mb-4"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        onClick={handlePost}
        className="w-full bg-[#FC6F2F] text-white py-2 rounded-lg disabled:opacity-50"
        disabled={loading || !myName || !content || !startTime || !endTime || !date}
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </div>
  );
}