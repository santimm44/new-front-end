'use client'
import React from 'react'
import { useEffect, useState } from "react";
import { IUserData } from '@/lib/Interfaces';
import { getLoggedInUserData } from '@/lib/DataServices';

export type Message = {
  senderId: string | undefined;
  content: string;
  timestamp: string;
  sender?: string;
  sentTime?: string | Date;
};

interface TFriends {
  id: number,
  username: string
}

interface TMessages {
  content: string,
  id: string,
  senderId: string,
  timestamp: string
}

const DirectMessaging = () => {
  //const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [friends, setFriends] = useState<TFriends[]>([])
  const [userId, setUserId] = useState<number | null | undefined>()
  const [recipientId, setRecipientID] = useState<number>(0)
  const [userInformation, setUserInformation] = useState<IUserData | null>()
  const [messageHistory, setMessageHistory] = useState<TMessages[]>([])
  //const [receiverConnectionId, setReceiverConnectionId] = useState<string>("");
  const [currentFriend, setCurrentFriend] = useState<string>("")



  const CallUserInformation = async () => {
    const token = localStorage.getItem("username");
    const information = await getLoggedInUserData(token + "")
    setUserInformation(information)
  }


  const grabFriends = async () => {
    try {
      if (userId != undefined || userId != null && userId != 0) {
        const response = await fetch(`https://fullstackwebapp-bxcja2evd2hef3b9.westus-01.azurewebsites.net/Friendship/${userId}`)
        const data = await response.json();
        setFriends(data)
      }
    }
    catch {
      alert("Something went wrong when trying to fetch friends... Maybe you have no friends T_T")
    }
  }

  const enterChatRoom = async (grabbedId: number, grabbedUsername: string) => {
    console.log(grabbedUsername + " username and the ID is " + grabbedId)
    console.log("My id is" + userInformation?.id)

    const getData = async () => {
      try {
        if (userId) {
          const res = await fetch(`https://backendsignalr-dmh2gfdjf9fphqdt.westus-01.azurewebsites.net/Message/Conversation/${userInformation?.id}/${grabbedId}`)
          const data = await res.json();
          //console.log(data.messages);
          setMessageHistory(data.messages)
          console.log("Hitting enter chat function")
        }
      }
      catch {
        // const now: Date = new Date()
      }
    }
    getData();
  }


  const saveMessage = async (grabbedId: number, timeStamp: string) => {
    if (newMessage.trim()) {
      try {
        console.log(`${newMessage}\n${userInformation?.id}\n${timeStamp}\n${grabbedId}`)
        await fetch(`https://backendsignalr-dmh2gfdjf9fphqdt.westus-01.azurewebsites.net/Message/SaveMessage/${newMessage}/${userInformation?.id}/${timeStamp}/${grabbedId}`, {
          method: 'POST',
        })

        setNewMessage("")

        enterChatRoom(grabbedId, currentFriend)

      }
      catch { }
    }
  }

  // const sendMessage = async () => {
  //   try {
  //     sendMessages(receiverConnectionId, messageText, Date.now().toString())
  //     setMessageText("");
  //   } catch (error) {
  //     console.error("Failed to send message:", error);
  //   }
  // };

  useEffect(() => {
    CallUserInformation()
  }, [])

  useEffect(() => {
    console.log(userInformation)
    setUserId(userInformation?.id);
  }, [userInformation]);

  useEffect(() => {
    if (userId !== undefined && userId !== null && userId !== 0) {
      grabFriends();
      //connectOnFunct(userId.toString())

    }
  }, [userId]);

  // useEffect(() => {

  //   CallUserInformation();
  //   console.log(receiverConnectionId)
  //   connextionServie((senderId, receiverConnectionId, content, timeStamp) => {
  //     setMessageHistory(prev => [...prev, {
  //       senderId: senderId,
  //       timestamp: timeStamp,
  //       id: receiverConnectionId,
  //       content: content,
  //     }])
  //   });

  //   return () => {
  //     stopConnection();
  //   }
  // }, [receiverConnectionId]);

  return (
    <div className='flex flex-row h-screen'>

      <div className='border-r-2 p-8 break-after-avoid w-1/3'>

        {friends.map((friendList, index) => {
          return (
            <div key={index} className=''>
              <button className='mt-6 bg-gradient-to-br from-[#FFE9D1] to-[#FFF2E6] rounded-2xl p-6 shadow-xl border border-white/20 w-full cursor-pointer' onClick={() => {
                enterChatRoom(friendList.id, friendList.username)
                setCurrentFriend(friendList.username)
                setRecipientID(friendList.id)
                //setReceiverConnectionId(friendList.id.toString())
              }}>
                <h3 className='font-bold mb-3 text-2xl text-gray-800 flex items-center gap-2'>

                {friendList.username}
                </h3>
              </button>
            </div>
          )
        }
        )}
      </div>

      <div className={`flex-col w-2/3 ${currentFriend ? '': 'hidden'}`}>
        <div className='pl-4 pr-4 h-4/5 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300'>
          <div>
            {messageHistory != null ? messageHistory.map((message, index) => {
              return (
                <div key={index}>
                  <div className={`min-w-1/2 max-w-full break-all mt-4 rounded-xl p-2 border ${message.senderId ? 'bg-red-300 pl-4 place-items-start' : 'bg-blue-300 place-items-end pr-4'}`}>
                    <p className=''>
                      {message.content != '' ? message.content : 'Begin a conversation'}
                    </p>
                  </div>
                  <div >
                    <p className='text-sm text-gray-500'>
                      <span>
                        {message.timestamp.toLocaleString()}
                      </span>
                      <span className='ml-3'>
                        {message.id == userInformation?.id.toString() ? `${userInformation?.username}`: `${currentFriend}`}
                      </span>
                    </p>
                  </div>
                </div>
              )
            }
            ) : 'no messages'}
          </div>

          {/* <div className="mb-4">
            {messages.map((msg, index) => (
              <div
                key={index}

              >
                <div className={`min-w-1/2 max-w-full break-all mt-4 rounded-xl p-2 border`}>
                  <p>{msg.content}</p>
                </div>

                <p className="text-xs text-gray-500">
                  {new Date(msg.sentTime ?? Date.now()).toDateString()}
                </p>
              </div>
            ))}
          </div> */}

        </div>


        <div className="p-4 place-content-center border-t-2 place-items-end h-1/5 break-after-avoid w-full">
          <div className="flex justify-row items-center w-full h-full">
            <textarea
              maxLength={1600}
              className="border-2 break-inside-auto p-2 mr-2 rounded w-4/5 h-full scrollbar-thumb-rounded-full scrollbar-track-rounded-full resize-none scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              onClick={() => {
                if (newMessage != '') {
                  //sendMessage()
                  saveMessage(recipientId, new Date().toDateString())
                }
              }}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Send
            </button>
          </div>
        </div>

      </div>

    </div>
  )
}


export default DirectMessaging





















