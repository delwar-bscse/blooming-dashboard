
import Image from 'next/image'
import React from 'react'
import { blogDatas } from '@/data/blogDatas'
import CustomButton from '@/components/cui/CustomButtom'

const BlogPost = () => {
  return (
    <div className='pb-20'>
      <div className='maxWidth flex justify-between items-center py-10'>
        <h1 className='text-3xl md:text-4xl xl:text-5xl font-bold text-font01 lg:leading-16'></h1>
      </div>
      <div className='maxWidth grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
        {blogDatas?.map((data)=>(
          <div key={data.id} className='parentDiv rounded-lg shadow-lg p-4 space-y-4'>
            <div className='rounded-lg overflow-hidden'>
              <Image src={data.image} alt="content image" className='object-cover w-full childDiv transition-transform duration-500 ease-in-out' />
            </div>
            <div className='flex flex-col items-center gap-4'>
              <h3 className='text-lg md:text-xl font-bold text-font01'>{data.title}</h3>
              <p className='text-center'>{data.des}</p>
              <div className='w-full max-w-[200px] mx-auto'>
                <CustomButton text="Edit Blog" url={`/blog/${data.id}`}/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogPost