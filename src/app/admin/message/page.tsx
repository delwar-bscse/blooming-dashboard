"use client";

import Image from 'next/image'
import React, { useEffect, useMemo } from 'react'
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { TbChecks } from "react-icons/tb";
import ProfileImg from "@/assets/common/profileImage02.png"
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input"
import { io } from "socket.io-client";


const adminMessage = [
  {
    id: 1,
    name: "John Doe",
    lastMessage: "Hello, I have a problem",
    time: "1:00 PM",
    status: "in"
  },
  {
    id: 2,
    name: "Example",
    lastMessage: "Hello, Example",
    time: "1:02 PM",
    status: "out"
  },
]

const Message = () => {
  const router = useRouter();

    // handle live chatting
  const socket = useMemo(() => io("http://localhost:3000"), []);
  // socket.on("connect", () => {
  //   console.log("Connected to socket");
  // });
 
  useEffect(() => {
    const handleGetMessage = () => {
      console.log("Get Message");
      // revalidateTags(["chats"]);
      // setRefetch((prev) => !prev);
    };
 
    // const eventName = `getMessages::${profileData?._id}`;
    const eventName = `sdjflsjad`;
 
    socket.on(eventName, handleGetMessage);
    return () => {
      socket.off(eventName, handleGetMessage);
    };
  }, [socket]);

  

  return (
    <div className='py-4'>
      <div className='flex items-center gap-4 py-4'>
        <Input onChange={(e) => { console.log(e.target.value)}} type="Search ..." variant='msgField' placeholder="type..." className='flex-1 transition-all duration-300'/>
      </div>
      <div className='space-y-4'>
        {adminMessage?.map((msg) => (
          <div onClick={() => router.push(`/admin/message/${msg.id}`)} key={msg.id} className='bg-white flex items-center gap-4 py-3 px-4 rounded-md hover:bg-yellow-50 transition-colors duration-300 cursor-pointer'>
            <div className='w-12 h-12 rounded-full overflow-hidden'>
              <Image src={ProfileImg} alt="profile" width={50} height={50} />
            </div>
            <div className='flex-1 space-y-2'>

              <div className='flex items-center justify-between'>
                <p className='font-semibold'>{msg.name}</p>
                <p>{msg.time}</p>
              </div>

              <div className='flex justify-between'>
                <p className='flex items-center gap-2'>
                  <span>
                    <LuSquareArrowOutUpRight className={msg.status === "out" ? "text-green-500" : "text-red-500 rotate-180"}/>
                  </span>
                  <span className='text-gray-600 font-sm'>
                    {msg.lastMessage}
                  </span>
                </p>
                <span>
                  <TbChecks className='text-green-500'/>
                </span>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Message