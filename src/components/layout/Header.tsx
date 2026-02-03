"use client"

import React, { useEffect, useState } from 'react'
import { bloomimgLogo, profileImage01 } from "@/assets/assets"
import Image from 'next/image'
// import { MdOutlineNotificationsActive } from "react-icons/md";
import { usePathname } from 'next/navigation';
import { myFetch } from '@/utils/myFetch';
import { formatImagePath } from '@/utils/formatImagePath';

const Header = () => {
  const pathname = usePathname();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const response = await myFetch("/users/my-profile", {
        method: "GET"
      });
      setUser(response?.data);
      //console.log(response?.data)
    };
    getUser();
  }, [pathname]);

  return (
    <div className='flex items-center justify-between'>
      <div className='py-2'>
        <Image src={bloomimgLogo} width={150} height={50} alt="profileImage01 object-contain" />
      </div>
      <div className='flex items-center justify-end gap-2'>
        <div className='flex gap-2 items-center'>
          <div className='w-13 h-13 rounded-full overflow-hidden'>
            <Image src={formatImagePath(user?.profile) || profileImage01} width={100} height={100} alt="profileImage01" className='w-full h-full' />
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