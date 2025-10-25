import Image from 'next/image'
import React, {Suspense} from 'react'
import subImage from "@/assets/common/package00.png";
import { Button } from "@/components/ui/button"
// import { subDatas } from '@/data/subDatas';
import Link from 'next/link';
import { myFetch } from '@/utils/myFetch';
import { packageDataType } from '@/type/type';
// import {Suspense} from 'react';

const SubscriptionComponent = async () => {

  const res = await myFetch("/package/subscription-packages", {
    method: "GET",
  });
  const packageData: packageDataType[] = res?.data || [];


  return (
    <div className='px-2 flex flex-col justify-center items-center'>
      <div className='w-full max-w-[900px] mx-auto flex items-center justify-between py-8'>
        <h2 className='text-3xl font-bold'>Subscriptions</h2>
        <Link href={`/admin/subscriptions/subscription?type=monthly`} className='bg-yellow-400 font-semibold px-4 py-2 rounded-lg'>+ Add</Link>
      </div>
      {packageData?.map((item: packageDataType) => (
        <div key={item._id} id='subscription' className='flex flex-col md:flex-row border-2 border-gray-400 rounded-md gap-4 p-4 bg-white'>
          <div className='border-2 border-gray-400 rounded-md w-full sm:max-w-80 h-full overflow-hidden'>
            <Image id='subImage' src={subImage} alt="Video Analysis" width={500} height={500} className='object-cover transition-transform duration-500 ease-in-out' />
          </div>
          <div className='relative grow border-2 border-gray-400 rounded-md'>
            <div className='border-b-2 border-gray-400 p-4'>
              <h2 className='text-2xl font-bold'>{item?.title}</h2>
              <p className='text-gray-600'>{item?.subtitle}</p>
            </div>
            <ul className='p-4 space-y-1'>
              {item?.benefits?.map((benefit, index) => (
                <li key={index} className='list-disc list-inside text-gray-700'>{benefit}</li>
              ))}
            </ul>
            <div className='absolute right-4 bottom-6'>
              <Link href={`/admin/subscriptions/edit-subscription?id=${item._id}&type=monthly`} className=''>
                <Button variant="customYellow" className='w-full mt-8 h-12'>Edit Subscription</Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Subscription() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SubscriptionComponent />
    </Suspense>
  );
}