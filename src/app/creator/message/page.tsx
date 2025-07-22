/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { IoIosSend } from "react-icons/io";
import dayjs from "dayjs";
import { io } from "socket.io-client";
import { myFetch } from "@/utils/myFetch";
import { TMessage } from "@/type/type";
import { debounce } from "lodash";

const CreatorMessage = () => {
  const [msgId, setMsgId] = useState<string>(""); // chatId of current chat
  const [msg, setMsg] = useState<TMessage[]>([] as TMessage[]); // message list state
  const [page, setPage] = useState(1); // page state for pagination
  const [loading, setLoading] = useState(false); // loading state to prevent duplicate fetches
  const [error, setError] = useState<string | null>(null); // error message state
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null); // ref for message container to listen for scroll events

  const socket = useMemo(() => io(process.env.NEXT_PUBLIC_IMAGE_URL), []); // socket connection

  // Fetch the chat ID
  const myMessageId = async () => {
    try {
      const res = await myFetch(`/chat/my-chat-list`);
      setMsgId(res?.data[0]?.chat?._id); // Update msgId with chatId
      console.log("Creator Message ID: ", res?.data[0]?.chat?._id);
    } catch (error) {
      setError("Failed to fetch chat ID.");
      console.error("Error fetching chat ID:", error);
    }
  };

  // Fetch messages for the current chat
  const myMessage = async () => {
    if (!msgId) return; // Ensure msgId is available before fetching messages

    setLoading(true);
    try {
      const res = await myFetch(`/message/my-messages/${msgId}?page=${page}&limit=20`);
      if (res?.data?.result) {
        setMsg((prevMsgs) => {
          if (page > 1) {
            return [...prevMsgs, ...res?.data?.result]; // Append new messages at the bottom
          }
          return res?.data?.result; // Replace with the latest messages
        });
      }
    } catch (error) {
      setError("Failed to fetch messages.");
      console.error("Error fetching messages:", error);
    }
    setLoading(false);
  };

  // Send a message to the server
  const sendMessage = async () => {
    if (inputRef?.current && inputRef.current.value.trim() !== "") {
      const formData = new FormData();
      formData.append("chatId", msgId);
      formData.append("text", inputRef.current.value || "");

      try {
        const res = await myFetch("/message/send-messages", {
          method: "POST",
          body: formData,
        });

        if (res?.success) {
          setPage(1); // Reset to page 1 after sending the message
          myMessage(); // Re-fetch messages to get the latest one
          inputRef.current.value = ""; // Clear input field
          socket.emit("newMessage"); // Emit socket event for real-time updates
        } else {
          setError("Failed to send the message.");
        }
      } catch (error) {
        setError("Error sending message. Please try again.");
        console.error("Error sending message:", error);
      }
    }
  };

  // Handle scroll events with debouncing for performance
  const handleScroll = debounce(() => {
    if (messageContainerRef.current && !loading && msg.length > 0) {
      const scrollTop = messageContainerRef.current.scrollTop;
      const scrollHeight = messageContainerRef.current.scrollHeight;
      const clientHeight = messageContainerRef.current.clientHeight;

      if (scrollTop === 0 && !loading) {
        // If at the top, fetch previous messages
        setPage((prev) => {
          const newPage = prev + 1;
          if (newPage !== page) {
            myMessage(); // Re-fetch messages based on new page
          }
          return newPage;
        });
      }

      if (scrollTop + clientHeight === scrollHeight && !loading) {
        // If at the bottom, fetch next messages
        setPage((prev) => {
          const newPage = prev + 1;
          if (newPage !== page) {
            myMessage(); // Re-fetch messages based on new page
          }
          return newPage;
        });
      }
    }
  }, 200); // Debounce with 200ms delay

  useEffect(() => {
    myMessageId(); // Fetch chat ID on initial render

    socket.on("connect", () => {
      console.log("Connected to socket");
    });

    return () => {
      socket.disconnect(); // Cleanup socket connection when the component is unmounted
    };
  }, [socket]); // Only run this on initial render

  // Fetch messages and listen to socket events when msgId changes
  useEffect(() => {
    if (!msgId) return; // Don't fetch messages if chatId is not set

    // Fetch messages when msgId changes
    myMessage();

    const eventName = "new-message::" + msgId;
    // Listen for real-time new messages via socket
    socket.on(eventName, () => {
      myMessage(); // Re-fetch messages when new messages arrive
    });

    // Cleanup socket listener when msgId changes
    return () => {
      socket.off(eventName);
    };
  }, [msgId, socket, page]); // Re-fetch messages when msgId, socket, or page changes

  // Scroll to the bottom after messages are updated
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [msg]); // Re-run this effect when new messages are received

  return (
    <div className="w-full max-w-[1000px] mx-auto h-[90vh] flex flex-col justify-between py-8">
      {/* Message List */}
      <div
        ref={messageContainerRef}
        className="flex-1 overflow-y-auto hide-scrollbar"
        onScroll={handleScroll}
      >
        <div className="flex flex-col-reverse justify-end gap-4">
          {msg?.map((msg) => (
            <div
              key={msg._id}
              className={`${msg?.sender?.role === "creator" ? "flex-row-reverse" : "flex-row"} flex gap-4 group`}
            >
              <div
                className={`${msg?.sender?.role !== "creator" ? "bg-gray-50" : "bg-white"} p-4 rounded-2xl w-[800px]`}
              >
                <p className="text-gray-600">{msg.text}</p>
                <p className="text-right text-gray-400 pt-4 text-sm">
                  {dayjs(msg?.createdAt).format("YYYY-MM-DD hh:mm:ss A")}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Field and Send Button */}
      <div className="flex items-center gap-4 pt-4">
        <Input
          ref={inputRef}
          type="text"
          variant="msgField"
          placeholder="type..."
          className="flex-1 transition-all duration-300"
          disabled={loading} // Disable input while loading
        />
        <span
          onClick={sendMessage}
          className={`text-2xl cursor-pointer bg-white p-2.5 rounded-full shadow-md hover:scale-105 transition-all duration-300 ${
            loading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          <IoIosSend className="text-gray-600 hover:text-gray-400 transition-all duration-300 text-2xl" />
        </span>
      </div>

      {/* Error Handling */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default CreatorMessage;
