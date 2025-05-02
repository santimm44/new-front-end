'use client'
import React from 'react'
import { HubConnectionBuilder, HubConnection, LogLevel } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import { getLoggedInUserData } from '@/lib/DataServices';
import { IUserData } from '@/lib/Interfaces';

type Message = {
  sender: string;
  content: string;
  sentTime: Date;
};

interface TFriends {
  id: number,
  username: string
}

const page = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [friends, setFriends] = useState<TFriends[]>([])
  const [userId, setUserId] = useState<number | null | undefined>()
  const [userInformation, setUserInformation] = useState<IUserData | null>()

  const CallUserInformation = async () => {
    const token = localStorage.getItem("username");

    const information = await getLoggedInUserData(token + "")

    //Set user information for pagetsx
    setUserInformation(information)
  }

  const grabFriends = async () => {

    setUserId(userInformation?.id)

    try {
      if (userId != undefined || userId != null && userId != 0) {
        const response = await fetch(`https://fullstackwebapp-bxcja2evd2hef3b9.westus-01.azurewebsites.net/Friendship/${userId}`)
        const data = await response.json();

        //grab a list of friends connected to the user
        setFriends(data)
      }
    }
    catch {
      alert("Something went wrong when trying to fetch friends... Maybe you have no friends T_T")
    }

  }
  useEffect(() => {
    grabFriends()
  }, [userInformation, userId])

  useEffect(() => {
    CallUserInformation()

    const connect = new HubConnectionBuilder()
      .withUrl("https://signalr-cwfbb7dya3agffc8.westus-01.azurewebsites.net/hub") //Where my api endpoint should be
      .withAutomaticReconnect() // What is this doing?
      .configureLogging(LogLevel.Information) // What is this doing?
      .build(); // Assume it is what it is named
    setConnection(connect);
    connect
      .start()
      .then(() => {
        connect.on("ReceiveMessage", (sender, content, sentTime) => {
          setMessages((prev) => [...prev, { sender, content, sentTime }]);
        });
        connect.invoke("RetrieveMessageHistory");
      })

      .catch((err) =>
        console.error("Error while connecting to SignalR Hub:", err)
      );

    return () => {
      if (connection) {
        connection.off("ReceiveMessage");
      }
    };
  }, []);


  const sendMessage = async () => {
    if (connection && newMessage.trim()) {
      await connection.send("PostMessage", newMessage);
      setNewMessage("");
    }
  };

  const isMyMessage = (username: string) => {
    return connection && username === connection.connectionId;
  };

  const enterChatRoom = async (grabbedId: number, grabbedUsername: string) => {
    console.log(grabbedUsername + " username and the ID is " + grabbedId)
    console.log("My id is" + userInformation?.id)

    // try {
    //   const response = await fetch(`https://fullstackwebapp-bxcja2evd2hef3b9.westus-01.azurewebsites.net/Message/Conversation/${userInformation?.id}/${grabbedId}`)
    //   const data = await response.json()

    //   console.log(data)
    // }
    // catch {
    //   console.error(" Could not make proper call to api for messaging")
    // }
  }


  return (
    <div className='border-4 flex flex-row justify-between border-blue-700'>

      <div className='bg-amber-300 break-after-avoid w-1/3'>
        list of friends

        {friends.map((friendList, index) => {
          return (
            <div key={index}>
              <button className='bg-blue-200 rounded m-1 p-1' onClick={() => enterChatRoom(friendList.id, friendList.username)}>
                {friendList.username}
              </button>
            </div>
          )
        }
        )}
      </div>

      <div className="p-4 bg-emerald-300 break-after-avoid w-full">
        <div className="mb-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 my-2 rounded ${isMyMessage(msg.sender) ? "bg-blue-200" : "bg-gray-200"
                }`}
            >
              <p>{msg.content}</p>
              <p className="text-xs">
                {new Date(msg.sentTime).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
        <div className="d-flex justify-row">
          <input
            type="text"
            className="border p-2 mr-2 rounded w-[300px]"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default page

// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import { Friend } from "@/lib/Interfaces";


// // Mock Friends Until Backend is setup
// const mockFriends: Friend[] = [
//   {
//     id: 1,
//     name: "Sarah Johnson",

//   },
//   {
//     id: 2,
//     name: "James Wilson",

//   },
//   {
//     id: 3,
//     name: "Emma Davis",

//   },
//   {
//     id: 4,
//     name: "Alex Taylor",

//   },
//   {
//     id: 5,
//     name: "Chris Lee",

//   },
//   {
//     id: 6,
//     name: "Olivia Martin",

//   },
//   {
//     id: 7,
//     name: "Liam Anderson",

//   },
//   {
//     id: 8,
//     name: "Ava Thompson",

//   },
//   {
//     id: 9,
//     name: "Noah White",

//   },
//   {
//     id: 10,
//     name: "Mia Harris",

//   },
//   {
//     id: 11,
//     name: "Ethan Moore",

//   },
//   {
//     id: 12,
//     name: "Isabella Clark",

//   },
//   {
//     id: 13,
//     name: "Mason Hall",

//   },
//   {
//     id: 14,
//     name: "Sophia Allen",

//   },
//   {
//     id: 15,
//     name: "Logan Young",

//   },
// ];

// const Page = () => {
//   const [friends, setFriends] = useState<Friend[]>(mockFriends);
//   const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
//   setFriends(mockFriends)//Redundant code to trick ESlint Compiler to think it is being used
//   const handleSelectFriend = (friend: Friend) => {
//     setSelectedFriend(friend);
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Friends list sidebar (1/3 width) */}
//       <div className="w-full md:w-1/3 border-r overflow-y-auto">
//         <div className="p-4 border-b">
//           <h2 className="text-xl md:mt-0 mt-12 font-bold">Direct Messages</h2>
//         </div>
//         <div className="flex flex-col">
//           {friends.map((friend) => (
//             <div
//               key={friend.id}
//               className={`p-4 flex items-center cursor-pointer hover:bg-gray-100 ${
//                 selectedFriend?.id === friend.id ? 'bg-gray-200' : ''
//               }`}
//               onClick={() => handleSelectFriend(friend)}
//             >
//               <Image
//                 src={"#"}
//                 alt={friend.name}
//                 className="h-12 w-12 rounded-full border border-gray-300 object-cover"
//               />
//               <div className="ml-3">
//                 <h3 className="font-semibold">{friend.name}</h3>
//                 <p className="text-sm text-gray-500">
//                   {friend.lastMessage || 'No messages yet'}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Message area */}
//       <div className="hidden md:w-2/3 md:flex flex-col">
//         {selectedFriend ? (
//           <div className="flex flex-col h-full">
//             <div className="p-4 border-b flex items-center">
//               <Image
//                 src={"#"}
//                 alt={selectedFriend.name}
//                 className="h-8 w-8 rounded-full border border-gray-300 object-cover"
//               />
//               <h3 className="ml-3 font-semibold">{selectedFriend.name}</h3>
//             </div>


//             <div className="flex-grow p-4 overflow-y-auto">
//               {/* My Mapping for Messages */}
//             </div>

//             {/* Message input */}
//             <div className="p-4 border-t">
//               <div className="flex">
//                 <input
//                   type="text"
//                   className="flex-grow rounded-full border px-4 py-2"
//                   placeholder="Message..."
//                 />
//                 <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-full">
//                   Send
//                 </button>
//               </div>
//             </div>
//           </div>
//         ) : (

//           <div className="flex flex-col items-center justify-center h-full">
//             <h3 className="text-xl font-semibold mb-2">Your Messages</h3>
//             <p className="text-sm text-gray-500 mb-4">Send messages to your friends!!!</p>
//             <button className="px-4 py-2 bg-blue-500 text-white rounded">
//               Send Message
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Page;