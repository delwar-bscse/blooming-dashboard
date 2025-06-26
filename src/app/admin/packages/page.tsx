
import Image from 'next/image'
import React from 'react'
import { LiaCheckCircle } from "react-icons/lia";
import { Button } from "@/components/ui/button"
import { packageData } from '@/data/packageData';
import Link from 'next/link';

const PackageSection = () => {

  const bgColor = ["#FFF9E5", "#E9EDF2", "#EBE2D1", "#E8E9E4"];

  return (
    <div className='pb-8'>
      <div className='maxWidth'>
        <div className='w-full max-w-[1440px] mx-auto flex items-center justify-between py-4'>
          <h2 className='text-3xl font-bold'>All Packages</h2>
          <Link href={'/packages/package'} className='bg-yellow-400 font-semibold px-4 py-2 rounded-lg'>+ Add</Link>
        </div>
        <div className='w-full max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {packageData?.map((item) => (
            <div id='package' key={item.id} style={{ backgroundColor: bgColor[item.id - 1] }} className='p-4 lg:p-6 rounded-4xl shadow-lg'>
              <div className='border-6 border-[#FFECAC] rounded-t-4xl overflow-hidden mb-4 h-[360px]'>
                <Image id='packageImg' src={item?.image} alt={item?.title} className='object-cover h-full transition-transform duration-500 ease-in-out' />
              </div>
              <h2 className='text-2xl font-bold text-center'>{item?.title}</h2>
              <h2 className='text-2xl font-bold text-center'>{`${item?.videos}x videos`}</h2>
              <p className='text-center text-sm text-gray-600'>{item?.des}</p>
              <ul className='mt-4 space-y-3'>
                {item?.features?.map((feature, index) => (
                  <li key={index} className='flex items-center gap-2 text-gray-700'>
                    <LiaCheckCircle className='text-xl' />
                    <span className='text-sm text-gray-500'>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href={`/packages/package?id=${item?.id}`} className=''>
                <Button variant="customYellow" className='w-full mt-8 h-12'>Edit Package</Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PackageSection