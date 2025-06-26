"use client"

import { dashboard, logoutImg } from '@/assets/assets'
import { menuType } from '@/type/type'
import { deleteCookie } from 'cookies-next/client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

const Sidebar = ({menu}:{menu?:menuType[]}) => {
  const router = useRouter();



  const handleLogout = () => {
    toast.loading("Logging out...", {
          id: "logout",
        });

    deleteCookie('bloom_accessToken');
    toast.success('Logged out successfully',{id: 'logout'});
    router.push('/login');
  }

  return (
    <div className='px-4'>
      <div className='pt-8 pb-8'>
        <div className='flex gap-2 items-center justify-center py-2 px-6 rounded-xl cursor-pointer border-3 border-[#6D715F]/80'>
          <Image src={dashboard} width={30} height={30} alt="dashboard" />
          <span className='font-bold text-xl text-[#6D715F]'>Dashboard</span>
        </div>
      </div>
      <div className='flex flex-col gap-1'>
        {menu?.map((item) => (
          <Link href={item?.label} key={item.id} className='flex gap-2 items-center py-2 px-4 hover:bg-yellow-300 transition-colors duration-300 rounded-md cursor-pointer'>
            <Image src={item.icon} alt={item.title} />
            <span className='text-bold text-lg'>{item.title}</span>
          </Link>
        ))}
        <button onClick={handleLogout} className='flex gap-2 items-center py-2 px-4 hover:bg-red-300 transition-colors duration-300 rounded-md cursor-pointer'>
            <Image src={logoutImg} alt="logout button" />
            <span className='text-bold text-lg'>Log Out</span>
          </button>
      </div>
    </div>
  )
}

export default Sidebar