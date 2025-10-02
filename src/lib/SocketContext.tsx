"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { io, Socket } from "socket.io-client"

type SocketContextType = {
  socket: Socket
}

const SocketContext = createContext<SocketContextType>({ socket: {} as Socket })

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket>()

  useEffect(() => {
    // Only run once
    const newSocket = io(process.env.NEXT_PUBLIC_IMAGE_URL as string, {
      transports: ["websocket"],
      withCredentials: true,
    })

    setSocket(newSocket)
    console.log("🔌 Socket connected:", newSocket.id)

    return () => {
      newSocket.disconnect()
      console.log("❌ Socket disconnected")
    }
  }, [])

  return (
    <SocketContext.Provider value={{ socket: socket! }}>
      {children}
    </SocketContext.Provider>
  )
}

// Hook for using socket
export const useSocket = () => useContext(SocketContext);