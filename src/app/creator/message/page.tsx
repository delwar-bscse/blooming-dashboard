/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { IoIosSend } from "react-icons/io";
import dayjs from "dayjs";
import { myFetch } from "@/utils/myFetch";
import { TMessage } from "@/type/type";
import { debounce } from "lodash";
import { useSocket } from "@/lib/SocketContext";

const CreatorMessage = () => {
  const [msgId, setMsgId] = useState<string>(""); // chatId of current chat
  const [msg, setMsg] = useState<TMessage[]>([]); // message list
  const [page, setPage] = useState(1); // pagination page 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const { socket } = useSocket();

   // Fetch chat ID
  useEffect(() => {
    (async () => {
      try {
        const res = await myFetch(`/chat/my-chat-list`);
        const chatId = res?.data?.[0]?.chat?._id;
        if (chatId) setMsgId(chatId);
        console.log("Creator Message ID: ", res?.data);
      } catch (error) {
        setError("Failed to fetch chat ID.");
        console.error("Error fetching chat ID:", error);
      }
    })();
  }, []);
  
  // Scroll helpers
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Preserve scroll position when prepending messages
  const preserveScrollOnPrepend = (oldHeight: number) => {
    if (messageContainerRef.current) {
      const newHeight = messageContainerRef.current.scrollHeight;
      messageContainerRef.current.scrollTop = newHeight - oldHeight;
    }
  };


  // Fetch messages
  const myMessage = async (pageNumber: number) => {
    if (!msgId) return;

    try {

      setLoading(true);

      const prevHeight = messageContainerRef.current?.scrollHeight || 0;

      const res = await myFetch(
        `/message/my-messages/${msgId}?page=${pageNumber}&limit=20`
      );

      if (res?.data?.result) {
        setMsg((prevMsgs) => {
          if (pageNumber > 1) {
            return [...prevMsgs, ...res.data.result]; // append older
          }
          return res.data.result; // reset on first load
        });

        if (pageNumber > 1) {
          // restore scroll after loading older messages
          requestAnimationFrame(() => preserveScrollOnPrepend(prevHeight));
        } else {
          // scroll to bottom only for initial load
          requestAnimationFrame(() => scrollToBottom());
        }
      }
    } catch (error) {
      setError("Failed to fetch messages.");
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  // Send message
  const sendMessage = async () => {
    if (!inputRef.current || inputRef.current.value.trim() === "") return;

    const formData = new FormData();
    formData.append("chatId", msgId);
    formData.append("text", inputRef.current.value);

    try {
      const res = await myFetch("/message/send-messages", {
        method: "POST",
        body: formData,
      });

      if (res?.success) {
        inputRef.current.value = ""; 
      } else {
        setError("Failed to send the message.");
      }
    } catch (error) {
      setError("Error sending message. Please try again.");
      console.error("Error sending message:", error);
    }
  };

  // Scroll event → load older messages when at top
  const handleScroll = debounce(() => {
    if (messageContainerRef.current && !loading && msg.length > 0) {
      const { scrollTop } = messageContainerRef.current;
      if (scrollTop === 0) {
        const newPage = page + 1;
        setPage(newPage);
        myMessage(newPage);
      }
    }
  }, 200);



  // When chat ID changes, fetch messages + listen for new ones
  useEffect(() => {
    if (!msgId || !socket) return;
    
    
    const eventName = "new-message::" + msgId;
    
    socket.on(eventName, (newMsg: TMessage) => {
      setMsg((prev) => [newMsg, ...prev]); // prepend new message
      
      myMessage(1);
      scrollToBottom();
    });

    return () => {
      socket.off(eventName);
    };
  }, [msgId, socket]);

  return (
    <div className="w-full max-w-[1000px] mx-auto h-[90vh] flex flex-col justify-between py-8">
      {/* Message List */}
      <div
        ref={messageContainerRef}
        className="flex-1 overflow-y-auto hide-scrollbar"
        onScroll={handleScroll}
      >
        <div className="flex flex-col-reverse justify-end gap-4">
          {msg.map((m) => (
            <div
              key={m._id}
              className={`${m?.sender?.role === "creator" ? "flex-row-reverse" : "flex-row"
                } flex gap-4 group`}
            >
              <div
                className={`${m?.sender?.role !== "creator" ? "bg-gray-50" : "bg-white"
                  } p-4 rounded-2xl w-[800px]`}
              >
                <p className="text-gray-600">{m.text}</p>
                <p className="text-right text-gray-400 pt-4 text-sm">
                  {dayjs(m?.createdAt).format("YYYY-MM-DD hh:mm:ss A")}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Input - Send Message */}
      <div className="flex items-center gap-4 pt-4">
        <Input
          ref={inputRef}
          type="text"
          variant="msgField"
          placeholder="Type..."
          className="flex-1 transition-all duration-300"
          disabled={loading}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <span
          onClick={sendMessage}
          className={`text-2xl cursor-pointer bg-white p-2.5 rounded-full shadow-md hover:scale-105 transition-all duration-300 ${loading ? "cursor-not-allowed opacity-50" : ""
            }`}
        >
          <IoIosSend className="text-gray-600 hover:text-gray-400 transition-all duration-300 text-2xl" />
        </span>
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default CreatorMessage;
