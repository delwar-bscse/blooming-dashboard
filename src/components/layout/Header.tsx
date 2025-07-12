"use client"

import React, { useEffect, useState } from 'react'
import { bloomimgLogo, profileImage01 } from "@/assets/assets"
import Image from 'next/image'
import { MdOutlineNotificationsActive } from "react-icons/md";
import { usePathname } from 'next/navigation';
import { myFetch } from '@/utils/myFetch';

const Header = () => {
  const pathname = usePathname();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    try {
      const getUser = async () => {
        const response = await myFetch("/users/my-profile", {
          method: "GET"
        });
        // console.log("Header User Data:", response?.data);
        setUser(response?.data);
      };
      getUser();
    } catch (error) {
      console.log(error);
    }
  }, [pathname]);

  return (
    <div className='flex items-center justify-between'>
      <div>
        <Image src={bloomimgLogo} alt="profileImage01" />
      </div>
      <div className='flex items-center justify-end gap-2'>
        <div className='relative w-13 h-13 rounded-full bg-gray-200 flex items-center justify-center'>
          <MdOutlineNotificationsActive size={28} />
          <span
            className="h-4 min-w-4 rounded-full bg-red-500 absolute top-2.5 right-2.5 text-white text-xs flex items-center justify-center text-[10px]"
          >
            9
          </span>
        </div>
        <div className='flex gap-2 items-center'>
          <div className='w-13 h-13 rounded-full overflow-hidden'>
            <Image src={profileImage01} width={100} height={100} alt="profileImage01" className='' />
            {/* <Image src={user ? user?.profile : profileImage01} width={100} height={100} alt="profileImage01" className='' /> */}
          </div>
          <p className='flex flex-col'>
            <span className='font-semibold text-gray-800'>{user?.fullName}</span>
            <span className='text-gray-700'>{user?.role}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Header