import { dashboard, logoutImg } from '@/assets/assets'
import { adminMenu } from '@/constant/sidebarData'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  return (
    <div className='px-4'>
      <div className='pt-8 pb-8'>
        <div className='flex gap-2 items-center justify-center py-2 px-6 rounded-xl cursor-pointer border-3 border-[#6D715F]/80'>
          <Image src={dashboard} width={30} height={30} alt="dashboard" />
          <span className='font-bold text-xl text-[#6D715F]'>Dashboard</span>
        </div>
      </div>
      <div className='flex flex-col gap-1'>
        {adminMenu?.map((item) => (
          <Link href={item?.label} key={item.id} className='flex gap-2 items-center py-2 px-4 hover:bg-yellow-300 transition-colors duration-300 rounded-md cursor-pointer'>
            <Image src={item.icon} alt={item.title} />
            <span className='text-bold text-lg'>{item.title}</span>
          </Link>
        ))}
        <button className='flex gap-2 items-center py-2 px-4 hover:bg-red-300 transition-colors duration-300 rounded-md cursor-pointer'>
            <Image src={logoutImg} alt="logout button" />
            <span className='text-bold text-lg'>Log Out</span>
          </button>
      </div>
    </div>
  )
}

export default Sidebar