/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useRef, useState, useLayoutEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { IoIosSend } from "react-icons/io";
import dayjs from "dayjs";
import { myFetch } from "@/utils/myFetch";
import { TMessage } from "@/type/type";
import { debounce } from "lodash";
import { useSocket } from "@/lib/SocketContext";

const SCROLL_THRESHOLD = 60; // px

const CreatorMessage = () => {
  const [msgId, setMsgId] = useState<string>("");            // current chatId
  const [msg, setMsg] = useState<TMessage[]>([]);            // messages (oldest -> newest)
  const [page, setPage] = useState(1);                       // pagination page for older history
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);       // sentinel (bottom)

  const isNearBottom = useRef(true);                         // track if user was near bottom before updates
  const { socket } = useSocket();

  // ------- helpers -------
  const getIsNearBottom = () => {
    const el = messageContainerRef.current;
    if (!el) return true;
    const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
    return distance < SCROLL_THRESHOLD;
    };

  const scrollToBottom = () => {
    const el = messageContainerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  };

  const preserveScrollOnPrepend = (prevHeight: number) => {
    const el = messageContainerRef.current;
    if (!el) return;
    const newHeight = el.scrollHeight;
    el.scrollTop = newHeight - prevHeight;
  };

  // ------- fetch chat id on mount -------
  useEffect(() => {
    (async () => {
      try {
        const res = await myFetch(`/chat/my-chat-list`);
        const chatId = res?.data?.[0]?.chat?._id;
        if (chatId) {
          setMsgId(chatId);
        } else {
          setError("No chat found.");
        }
      } catch (err) {
        setError("Failed to fetch chat ID.");
        console.error("Error fetching chat ID:", err);
      }
    })();
  }, []);

  // ------- fetch messages (keep oldest -> newest in state) -------
  const myMessage = async (pageNumber: number) => {
    if (!msgId) return;
    try {
      setLoading(true);
      const prevHeight = messageContainerRef.current?.scrollHeight || 0;

      const res = await myFetch(`/message/my-messages/${msgId}?page=${pageNumber}&limit=20`);
      const list: TMessage[] = res?.data?.result ?? [];

      // Normalize each batch as oldest -> newest
      const normalized = list
        .slice()
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

      setMsg(prev => {
        if (pageNumber > 1) {
          // prepend older
          return [...normalized, ...prev];
        }
        // first load / refresh
        return normalized;
      });

      requestAnimationFrame(() => {
        if (pageNumber > 1) {
          preserveScrollOnPrepend(prevHeight);
        } else {
          scrollToBottom();
        }
      });
    } catch (err) {
      setError("Failed to fetch messages.");
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  };

  // initial fetch when chat id is ready
  useEffect(() => {
    if (!msgId) return;
    setPage(1);
    myMessage(1);
  }, [msgId]);

  // ------- scroll listener: load older when at top; track stickiness -------
  const handleScroll = useMemo(
    () =>
      debounce(() => {
        const el = messageContainerRef.current;
        if (!el) return;

        // update "near bottom" flag continuously
        isNearBottom.current = getIsNearBottom();

        if (!loading && msg.length > 0 && el.scrollTop === 0) {
          const newPage = page + 1;
          setPage(newPage);
          myMessage(newPage);
        }
      }, 120),
    [loading, msg.length, page, msgId]
  );

  useEffect(() => {
    return () => handleScroll.cancel();
  }, [handleScroll]);

  // ------- auto-stick to bottom on list re-render (only when near bottom before) -------
  useLayoutEffect(() => {
    if (isNearBottom.current) {
      scrollToBottom();
    }
  }, [msg]);

  // ------- socket: append new message (newest at end) -------
  useEffect(() => {
    if (!msgId || !socket) return;

    const eventName = "new-message::" + msgId;

    const onNewMsg = (newMsg: TMessage) => {
      // capture stickiness just before mutating
      isNearBottom.current = getIsNearBottom();

      setMsg(prev => [...prev, newMsg]); // append at end (oldest -> newest)

      requestAnimationFrame(() => {
        if (isNearBottom.current) scrollToBottom();
      });
    };

    socket.on(eventName, onNewMsg);
    return () => {
      socket.off(eventName, onNewMsg);
    };
  }, [msgId, socket]);

  // ------- send message -------
  const sendMessage = async () => {
    if (!inputRef.current) return;
    const value = inputRef.current.value.trim();
    if (!value || !msgId) return;

    const formData = new FormData();
    formData.append("chatId", msgId);
    formData.append("text", value);

    try {
      const res = await myFetch("/message/send-messages", {
        method: "POST",
        body: formData,
      });

      inputRef.current.value = "";

      if (!res?.success) {
        setError("Failed to send the message.");
      }

    } catch (err) {
      setError("Error sending message. Please try again.");
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto h-[90vh] flex flex-col justify-between py-8">
      {/* Message List */}
      <div
        ref={messageContainerRef}
        className="flex-1 overflow-y-auto hide-scrollbar"
        onScroll={handleScroll}
      >
        {/* normal column flow; newest ends up at the bottom */}
        <div className="flex flex-col justify-end gap-4">
          {msg.map((m) => (
            <div
              key={m._id}
              className={`${m?.sender?.role === "creator" ? "flex-row-reverse" : "flex-row"} flex gap-4 group`}
            >
              <div
                className={`${m?.sender?.role !== "creator" ? "bg-blue-50" : "bg-white"} p-4 rounded-2xl w-[500px] 2xl:w-[600px]`}
              >
                <p className="text-gray-600 break-words">{m.text}</p>
                <p className="text-right text-gray-400 pt-4 text-sm">
                  {dayjs(m?.createdAt).format("YYYY-MM-DD hh:mm:ss A")}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* Keep this at the bottom as a sentinel */}
        <div ref={messagesEndRef} />
      </div>

      {/* Composer */}
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
        <button
          onClick={sendMessage}
          disabled={loading}
          className={`text-2xl bg-white p-2.5 rounded-full shadow-md hover:scale-105 transition-all duration-300 ${
            loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
          aria-label="Send message"
        >
          <IoIosSend className="text-gray-600 hover:text-gray-400 transition-all duration-300 text-2xl" />
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default CreatorMessage;
