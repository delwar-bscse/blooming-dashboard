/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { IoIosSend } from "react-icons/io";
import dayjs from "dayjs";
import { myFetch } from "@/utils/myFetch";
import { useParams } from "next/navigation";
import { TMessage } from "@/type/type";
import { debounce } from "lodash";
import { useSocket } from "@/lib/SocketContext";

const AdminInbox = () => {
  const [msgs, setMsgs] = useState<TMessage[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const msgId = params["inbox"];
  const { socket } = useSocket();

  // Fetch messages from backend
  const myMessage = async (pageNumber: number) => {
    try {
      setLoading(true);
      const res = await myFetch(
        `/message/my-messages/${msgId}?page=${pageNumber}&limit=20`
      );
      if (res?.data?.result) {
        setMsgs((prevMsgs) => {
          if (pageNumber > 1) {
            return [...prevMsgs, ...res.data.result]; // append older msgs
          }
          return res.data.result;
        });
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError("Failed to fetch messages.");
    } finally {
      setLoading(false);
    }
  };

  // Send message
  const sendMessage = async () => {
    if (!inputRef.current || inputRef.current.value.trim() === "") return;

    const formData = new FormData();
    formData.append("chatId", msgId as string);
    formData.append("text", inputRef.current.value);

    try {
      const res = await myFetch("/message/send-messages", {
        method: "POST",
        body: formData,
      });

      if (res?.success) {
        inputRef.current.value = ""; // clear input
        // no need to refetch here, socket will handle new message
      } else {
        setError("Failed to send message.");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Error sending message. Please try again.");
    }
  };

  // Scroll event handler (pagination)
  const handleScroll = debounce(() => {
    if (messageContainerRef.current && !loading && msgs.length > 0) {
      const { scrollTop } = messageContainerRef.current;

      if (scrollTop === 0) {
        const newPage = page + 1;
        setPage(newPage);
        myMessage(newPage);
      }
    }
  }, 200);

  // Initial fetch + socket listener
  useEffect(() => {
    myMessage(1);

    if (!socket) return;

    const eventName = "new-message::" + msgId;

    socket.on(eventName, (newMsg: TMessage) => {
      // prepend new message at bottom
      setMsgs((prev) => [newMsg, ...prev]);
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    });

    return () => {
      socket.off(eventName); // ✅ cleanup only
    };
  }, [msgId, socket]);

  // Auto-scroll when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [msgs]);

  return (
    <div className="w-full max-w-[1000px] mx-auto h-[90vh] flex flex-col justify-between py-8">
      {/* Messages list */}
      <div
        ref={messageContainerRef}
        className="flex-1 overflow-y-auto hide-scrollbar"
        onScroll={handleScroll}
      >
        <div className="flex flex-col-reverse justify-end gap-4">
          {msgs.map((msg: TMessage) => (
            <div
              key={msg?._id}
              className={`${
                msg?.sender?.role === "admin"
                  ? "flex-row-reverse"
                  : "flex-row"
              } flex gap-4 group`}
            >
              <div
                className={`${
                  msg?.sender?.role !== "admin" ? "bg-gray-50" : "bg-white"
                } p-4 rounded-2xl w-[800px]`}
              >
                <p className="text-gray-600">{msg?.text}</p>
                <p className="text-right text-gray-400 pt-4 text-sm">
                  {dayjs(msg?.createdAt).format("YYYY-MM-DD hh:mm:ss A")}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
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
          className={`text-2xl cursor-pointer bg-white p-2.5 rounded-full shadow-md hover:scale-105 transition-all duration-300 ${
            loading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          <IoIosSend className="text-gray-600 hover:text-gray-400 transition-all duration-300 text-2xl" />
        </span>
      </div>

      {/* Error */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default AdminInbox;
