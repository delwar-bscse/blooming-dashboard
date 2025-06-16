import Image from 'next/image'
import React from 'react'
import subImage from "@/assets/common/package00.png";
import { Button } from "@/components/ui/button"
import { subDatas } from '@/data/subDatas';

const Subscription = () => {
  return (
    <div className='px-2 flex justify-center items-center'>
      <div id='subscription' className='flex flex-col md:flex-row border-2 border-gray-400 rounded-md gap-4 p-4 bg-white'>
        <div className='border-2 border-gray-400 rounded-md w-full sm:max-w-80 h-full overflow-hidden'>
          <Image id='subImage' src={subImage} alt="Video Analysis" width={500} height={500} className='object-cover transition-transform duration-500 ease-in-out' />
        </div>
        <div className='relative grow border-2 border-gray-400 rounded-md'>
          <div className='border-b-2 border-gray-400 p-4'>
            <h2 className='text-2xl font-bold'>{subDatas?.title}</h2>
            <p className='text-gray-600'>{subDatas?.des}</p>
          </div>
          <ul className='p-4 space-y-1'>
            {subDatas?.features?.map((feature, index) => (
              <li key={index} className='list-disc list-inside text-gray-700'>{feature}</li>
            ))}
          </ul>
          <div className='absolute right-4 bottom-6'>
            <Button variant="customYellow" className='w-full mt-8 h-12'>Edit Subscription</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Subscription