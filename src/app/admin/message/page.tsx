/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from 'next/image'
import React, { Suspense, useEffect } from 'react'
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { TbChecks } from "react-icons/tb";
import ProfileImg from "@/assets/common/profileImage02.png"
import { useRouter, useSearchParams } from 'next/navigation';
// import { io } from "socket.io-client";
import { myFetch } from '@/utils/myFetch';
import dayjs from 'dayjs';
import { CustomSearchBar } from '@/components/cui/CustomSearchBar';
import { useSocket } from '@/lib/SocketContext';

interface IChatItem {
  profile?: string;
  id: number;
  role: "admin" | "creator";
  name: string;
  lastMessage: string;
  time: string;
  status: string;
}

const MessageSuspense = () => {
  const [adminMessage, setAdminMessage] = React.useState<IChatItem[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('query') || '';
   // handle live chatting
  // const socket = useMemo(() => io(process.env.NEXT_PUBLIC_IMAGE_URL), []);
  const { socket } = useSocket()

  const allMessages = async () => {
    const res = await myFetch(`/chat/my-chat-list?search=${searchQuery}`);
    
    const msgArray = res?.data.map((msg: Record<string, any>) => {
      return {
        id: msg?.chat?._id,
        name: msg?.chat?.participants[0]?.fullName,
        profile: msg?.chat?.participants[0]?.profile,
        lastMessage: msg?.message?.text,
        time: msg?.chat?.updatedAt,
        status: msg?.chat?.status,
        role: msg?.message?.role
      }
    });
    setAdminMessage(msgArray); // Update message state
  };


  useEffect(() => {

    allMessages();

    const eventName = "newMessage";

    socket.on(eventName, allMessages);
    return () => {
      socket.off(eventName, allMessages);
    };
  }, [socket, searchQuery]);



  return (
    <div className='py-4'>
      <div className='max-w-[700px] py-4'>
       <CustomSearchBar />
      </div>
      <div className='space-y-4'>
        {adminMessage?.map((msg) => (
          <div onClick={() => router.push(`/admin/message/${msg.id}`)} key={msg.id} className='bg-white flex items-center gap-4 py-3 px-4 rounded-md hover:bg-yellow-50 transition-colors duration-300 cursor-pointer'>
            <div className='w-12 h-12 rounded-full overflow-hidden'>
              <Image src={msg?.profile || ProfileImg} alt="profile" width={50} height={50} />
            </div>
            <div className='flex-1 space-y-2'>

              <div className='flex items-center justify-between'>
                <p className='font-semibold'>{msg?.name || "Example"}</p>
                <p>{dayjs(msg?.time).format('YYYY-MM-DD hh:mm:ss a')}</p>
              </div>

              <div className='flex justify-between'>
                <p className='flex items-center gap-2'>
                  <span>
                    <LuSquareArrowOutUpRight className={(msg?.role === "admin") ? "text-green-500" : "text-red-500 rotate-180"} />
                  </span>
                  <span className='text-gray-600 font-sm'>
                    {msg.lastMessage}
                  </span>
                </p>
                <span>
                  <TbChecks className='text-green-500' />
                </span>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Message() {
  return (
    <Suspense fallback={<div>Loading...</div>} >
      <MessageSuspense />
    </Suspense>
  )
}