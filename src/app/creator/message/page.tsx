import React from 'react'
import { Input } from "@/components/ui/input"
import { IoIosSend } from "react-icons/io";
import { allMsgs } from '@/data/msgData';



const CreatorMessage = () => {
  return (
    <div className='w-full max-w-[1000px]  mx-auto h-full flex flex-col justify-end gap-4 py-8'>
      <div className='flex-1'>
        <div className='h-full flex flex-col justify-end gap-4'>
          {allMsgs?.map((msg) => (
            <div key={msg.id} className={`${msg.role === "creator" ? "flex-row-reverse" : "flex-row"} flex gap-4`}>
              <div key={msg.id} className={`${msg.role !== "creator" ? "bg-gray-50" : "bg-white"} p-4 rounded-2xl w-[800px]`}>
                <p className='text-gray-600'>{msg.message}</p>
                <p className={`${msg.role === "creator" ? "text-right" : "text-left"} text-gray-400 pt-4`}>1:00 PM</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <Input type="text" variant='msgField' placeholder="type..." className='flex-1 transition-all duration-300'/>
        <span className='text-2xl cursor-pointer bg-white p-2.5 rounded-full shadow-md hover:scale-105 transition-all duration-300'>
          <IoIosSend className='text-gray-600 hover:text-gray-400 transition-all duration-300 text-2xl'/>
        </span>
      </div>
    </div>
  )
}

export default CreatorMessage