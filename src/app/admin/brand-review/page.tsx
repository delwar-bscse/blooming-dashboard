/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"


import CustomPagination from "@/components/cui/CustomPagination";
import { myFetch } from "@/utils/myFetch";
import { Suspense, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import dayjs from "dayjs"



const BrandReviewSuspense = () => {
  const [totalPage, setTotalPage] = useState(1);
  const [allReviewsData, setAllReviewsData] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";

  const getReviews = async() => {
    
    const res  = await myFetch(`/review?page=${page}`,{
      method: "GET",
    });
    
    if(res?.data){
      setAllReviewsData(res?.data);
      setTotalPage(res?.pagination?.totalPage || 1);
    }else {
      toast.error(res?.message || "Fetching failed!");
    }
  }

  useEffect(() => {
    getReviews();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);



  return (
    <div className="pt-8">
      <div className="space-y-4 pb-8">
        {
          allReviewsData?.map((data: any) => (
            <div key={data._id} className='bg-white p-3 rounded-sm shadow'>
              <div className='flex justify-between border-b-2 border-gray-200 mb-2 pb-2'>
                <div className='flex items-center gap-4 mb-2'>
                  <Image src={data.userId?.profile} alt="Profile Image" width={50} height={50} className="rounded-full object-fit" />
                  <div>
                    <p className='font-semibold text-gray-700'>{data.userId?.fullName}</p>
                    <p className='text-sm text-gray-500'>{data.userId?.email}</p>
                  </div>
                </div>
                <p className='text-sm text-gray-500'>{dayjs(data.createdAt).format("MMM D, YYYY h:mm A")}</p>
              </div>
              <div className='text-gray-700 text-sm'>{data.review}</div>
            </div>
          ))
        }
      </div>
      <CustomPagination TOTAL_PAGES={totalPage}/>
    </div>
  )
}

export default function BrandReviews() {
  return (
    <Suspense fallback={<div>Loading...</div>} >
      <BrandReviewSuspense />
    </Suspense>
  )
}