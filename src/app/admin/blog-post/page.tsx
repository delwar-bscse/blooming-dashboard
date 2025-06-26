
import Image from 'next/image'
import React from 'react'
// import { blogDatas } from '@/data/blogDatas'
import CustomButton from '@/components/cui/CustomButtom'
import Link from 'next/link'
import { myFetch } from '@/utils/myFetch'

type BlogData = {
  _id: string;
  image: string;
  title: string;
  details: string;
  headline: string;
  headlineDetails: string;
  bodyTextDetails: string;
  bodyImage: string;
  benefit: string;
  disadvantage: string;
  upload3Photos: {
    key: string;
    url: string;
    _id: string;
  }[];
  ugcheadline: string;
  ugcDetails: string;
  ugcImage: string;
  keyOfFeature: string;
  price: string;
  createdAt: string; // or Date, depending on your usage
  updatedAt: string; // or Date
};


const BlogPost = async() => {

  const res = await myFetch("/blog", {
    method: "GET",
  });

  console.log("Blog Post Response:", res);
  const blogDatas: BlogData[] = res?.data || [];


  return (
    <div className='pb-20'>
      <div className='maxWidth flex justify-between items-center py-10 pr-8'>
        <h1 className='text-3xl md:text-4xl xl:text-5xl font-bold text-font01 lg:leading-16'>Blog Post</h1>
        <Link href={`/admin/blog-post/add-blog`} className='bg-yellow-400 font-semibold px-4 py-2 rounded-md'>+ Add</Link>
      </div>
      <div className='maxWidth grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
        {blogDatas?.map((data)=>(
          <div key={data?._id} className='parentDiv rounded-lg shadow-lg p-4 space-y-4'>
            <div className='rounded-lg overflow-hidden'>
              <Image src={data?.image} width={500} height={500} alt="content image" className='object-cover w-full childDiv transition-transform duration-500 ease-in-out' />
            </div>
            <div className='flex flex-col items-center gap-4'>
              <h3 className='text-lg md:text-xl font-bold text-font01'>{data.title}</h3>
              <p className='text-center'>{data.details}</p>
              <div className='w-full max-w-[200px] mx-auto'>
                <CustomButton text="Edit Blog" url={`/admin/blog-post/add-blog?id=${data._id}`}/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogPost