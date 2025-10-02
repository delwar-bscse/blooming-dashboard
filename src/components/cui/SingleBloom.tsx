"use client"
import React from 'react'
import Image from 'next/image'
import { reviewDataType } from '@/type/type'
import { myFetch } from '@/utils/myFetch'
import { toast } from 'sonner'
import { RiDeleteBinLine } from "react-icons/ri";

const SingleBloom = ({ review }: { review: reviewDataType }) => {

  const handleDelete = async () => {
    const response = await myFetch(`/ugc-content/${review._id}`, {
      method: "DELETE",
    });
    if (response?.success) {
      toast.success("Bloom  deleted successfully!");
      window.location.reload();
    } else {
      toast.error(response?.message || "Failed to delete Bloom!");
    }
  }

  return (
    <>
      <div id='review' className='border-[2px] border-gray-400 rounded-lg shadow-lg relative flex flex-col items-center justify-center mt-[90px] bg-white'>
        <div id='reviewImage' className='absolute -top-[75px] mx-auto w-[120px] h-[120px] rounded-full overflow-hidden transition-transform duration-500 ease-in-out'>
          <Image
            src={review.image}
            alt="Review Image"
            className="w-[120px] h-[120px] mx-auto rounded-lg shadow-lg"
            width={200}
            height={200}
          />
        </div>
        <p className='rounded-lg bg-white text-gray-500 pt-[66px] pb-8 max-w-[300px] text-center text-[14px]'>{review?.details}</p>
        <div onClick={handleDelete} className='absolute top-2 -right-12 cursor-pointer w-20'>
          <RiDeleteBinLine className='text-2xl text-red-500 hover:text-red-600'/>
        </div>
      </div>
    </>
  )
}

export default SingleBloom