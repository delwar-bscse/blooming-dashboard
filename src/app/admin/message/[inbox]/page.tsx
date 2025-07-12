"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { IoIosSend } from "react-icons/io";
import dayjs from "dayjs";
import { io } from "socket.io-client";
import { myFetch } from "@/utils/myFetch";
import { useParams } from "next/navigation";
import { TMessage } from "@/type/type";
import { debounce } from "lodash";

const AdminInbox = () => {
  const [msg, setMsg] = useState<TMessage[]>([] as TMessage[]); 
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const paramas = useParams();
  const msgId = paramas["inbox"];

  const socket = useMemo(() => io(process.env.NEXT_PUBLIC_IMAGE_URL), []);

  // Fetch messages
  const myMessage = async (pageNumber: number) => {
    setLoading(true);
    const res = await myFetch(`/message/my-messages/${msgId}?page=${pageNumber}&limit=20`);
    console.log("Fetched Messages: ", res?.data);
    if (res?.data?.result) {
      setMsg((prevMsgs) => {
        if (pageNumber > 1) {
          return [...prevMsgs, ...res?.data?.result]; // Append new messages at the bottom
        }
        return res?.data?.result;
      });
    }
    setLoading(false);
  };

  // Send message
  const sendMessage = async () => {
    if (inputRef?.current && inputRef.current.value.trim() !== "") {
      const formData = new FormData();
      formData.append("chatId", msgId as string);
      formData.append("text", inputRef.current.value);

      try {
        const res = await myFetch("/message/send-messages", {
          method: "POST",
          body: formData,
        });

        if (res?.success) {
          setPage(1);  // Reset to page 1 after sending the message
          myMessage(1); // Re-fetch messages to get the latest
          inputRef.current.value = ""; // Clear input

          // Scroll to the bottom to show the new message
          if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
          }
        } else {
          setError("Failed to send the message.");
        }
      } catch (error) {
        setError("Error sending message. Please try again.");
        console.error("Error sending message:", error);
      }
    }
  };

  // Handle scroll event
  const handleScroll = debounce(() => {
    if (messageContainerRef.current && !loading && msg.length > 0) {
      const scrollTop = messageContainerRef.current.scrollTop;
      const scrollHeight = messageContainerRef.current.scrollHeight;
      const clientHeight = messageContainerRef.current.clientHeight;

      if (scrollTop === 0) {
        setPage((prev) => {
          const newPage = prev + 1;
          if (newPage !== page) {
            myMessage(newPage);
          }
          return newPage;
        });
      }
      if (scrollTop + clientHeight === scrollHeight) {
        setPage((prev) => {
          const newPage = prev + 1;
          if (newPage !== page) {
            myMessage(newPage);
          }
          return newPage;
        });
      }
    }
  }, 200);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket");
    });

    myMessage(1);

    const eventName = "new-message::" + msgId;
    socket.on(eventName, () => {
      myMessage(1);
    });

    return () => {
      socket.off(eventName);
      socket.disconnect();
    };
  }, [msgId, socket]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [msg]);

  return (
    <div className="w-full max-w-[1000px] mx-auto h-[90vh] flex flex-col justify-between py-8">
      <div ref={messageContainerRef} className="flex-1 overflow-y-auto hide-scrollbar" onScroll={handleScroll}>
        <div className="flex flex-col-reverse justify-end gap-4">
          {msg?.map((msg) => (
            <div key={msg?._id} className={`${msg?.sender?.role === "admin" ? "flex-row-reverse" : "flex-row"} flex gap-4 group`}>
              <div className={`${msg?.sender?.role !== "admin" ? "bg-gray-50" : "bg-white"} p-4 rounded-2xl w-[800px]`}>
                <p className="text-gray-600">{msg?.text}</p>
                <p className="text-right text-gray-400 pt-4 text-sm">{dayjs(msg?.createdAt).format("YYYY-MM-DD hh:mm:ss A")}</p>
              </div>
            </div>
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>
      <div className="flex items-center gap-4 pt-4">
        <Input ref={inputRef} type="text" variant="msgField" placeholder="type..." className="flex-1 transition-all duration-300" disabled={loading} />
        <span onClick={sendMessage} className={`text-2xl cursor-pointer bg-white p-2.5 rounded-full shadow-md hover:scale-105 transition-all duration-300 ${loading ? "cursor-not-allowed opacity-50" : ""}`}>
          <IoIosSend className="text-gray-600 hover:text-gray-400 transition-all duration-300 text-2xl" />
        </span>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default AdminInbox;
