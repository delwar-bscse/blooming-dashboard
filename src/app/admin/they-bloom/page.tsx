

import React from 'react'
import Link from 'next/link'
import { myFetch } from '@/utils/myFetch'
import { reviewDataType } from '@/type/type'
import SingleBloom from '@/components/cui/SingleBloom'


const TheyBloom = async() => {

  const res = await myFetch("/ugc-content", {
    method: "GET",
  });

  // console.log("Blog Post Response:", res);
  const bloomDatas: reviewDataType[] = res?.data || [];


  return (
    <div className='pb-20'>
      <div className='maxWidth flex justify-between items-center py-6 pr-8 pl-2'>
        <h1 className='text-3xl md:text-4xl xl:text-5xl font-bold text-font01 lg:leading-16 text-gray-700'>They Bloom</h1>
        <Link href={`/admin/they-bloom/add-bloom`} className='bg-yellow-400 font-semibold px-8 py-3 rounded-md'>+ Add</Link>
      </div>
      <div className='maxWidth grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-2'>
        {bloomDatas?.map((data)=>(
          <SingleBloom key={data._id} review={data} />
        ))}
      </div>
    </div>
  )
}

export default TheyBloom