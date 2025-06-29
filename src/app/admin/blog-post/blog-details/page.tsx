"use client"
import CustomButton from '@/components/cui/CustomButtom';
import { myFetch } from '@/utils/myFetch';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { toast } from 'sonner';

interface TBlogPost {
  _id: string;
  image: string;
  title: string;
  details: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}



const BlogDetails = () => {
  const [blogData, setBlogData] = React.useState<TBlogPost | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const getBlogDetails = async () => {
    const response = await myFetch(`/blog/${id}`, {
      method: "GET",
    });
    console.log(response?.data);
    if (response?.data) {
      setBlogData(response?.data);
      toast.success("Blog details fetched successfully!");
    } else {
      toast.error(response?.message || "Failed to fetch blog details!");
    }
  }

  useEffect(() => {
    getBlogDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])


  const handleDelete = async () => {
    const response = await myFetch(`/blog/${id}`, {
      method: "DELETE",
    });
    console.log(response?.data);
    if (response?.success) {
      toast.success("Blog deleted successfully!");
      router.push("/admin/blog-post");
    } else {
      toast.error(response?.message || "Failed to delete blog details!");
    }
  }

  return (
    <div className='flex items-center justify-center px-10 py-10' style={{ minHeight: 'calc(100vh - 220px)' }}>
      <div className='bg-white rounded-xl p-8 flex flex-col w-full customShadow'>
        <div className='flex justify-between'>
          <div className='rounded-lg overflow-hidden h-80 w-140 border-2 border-gray-300'>
            <Image src={blogData?.image || ""} width={500} height={500} alt="content image" className='object-cover w-full childDiv transition-transform duration-500 ease-in-out' />
          </div>
          <div onClick={handleDelete} className='w-40'>
            <CustomButton text="Delete Blog" />
          </div>
        </div>
        <div className='flex-1 flex flex-col gap-4 pt-16'>
          <h3 className='text-xl font-bold text-font01'>{blogData?.title}</h3>
          <p className='flex-1 text-justify text-lg text-gray-700'>{blogData?.details}</p>
        </div>
      </div>
    </div>
  )
}

export default BlogDetails