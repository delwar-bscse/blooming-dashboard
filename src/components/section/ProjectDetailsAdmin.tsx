/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import StarEmogi from "@/assets/common/star.png"
import LoveEmogi from "@/assets/common/loveEmoji.png"
import { toast } from 'sonner';
import { myFetch } from '@/utils/myFetch';
import { useParams, useRouter } from 'next/navigation';
import { TOrdersData } from '@/type/orderDataTypes';
import { Button } from '../ui/button';




const ProjectDetailsAdmin = () => {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState<TOrdersData>({} as TOrdersData);
  const params = useParams();
  const id = params["project-details"];
  // const id = "686faecf79e3153cdede9fc1"


  const getOrderDetails = async () => {

    toast.loading("Order Details Fetching...", { id: "fetch" });
    const res = await myFetch(`/hire-creator/${id}`, {
      method: "GET",
    });

    if (res?.data) {
      toast.success("Order Details fetched successfully!", { id: "fetch" });
      setOrderDetails(res?.data);
    } else {
      toast.error(res?.message || "Order Details Fetching failed!", { id: "fetch" });
    }
  }

  useEffect(() => {
    getOrderDetails();
  }, [])

  const handleDelete = async () => {

    toast.loading("Deleting...", { id: "delete" });
    const res = await myFetch(`/hire-creator/cancel/${id}`, {
      method: "PATCH",
    });

    if (res?.data) {
      toast.success("Deleted successfully!", { id: "delete" });
      router.push("/admin/creator/all-project");
    } else {
      toast.error(res?.message || "Failed to delete!", { id: "delete" });
    }
  }

  const handleApprove = async () => {

    toast.loading("Approving...", { id: "approve" });
    const res = await myFetch(`/hire-creator/approved/${id}`, {
      method: "PATCH",
    });

    if (res?.data) {
      toast.success("Approved successfully!", { id: "approve" });
      getOrderDetails();
    } else {
      toast.error(res?.message || "Failed to approve!", { id: "approve" });
    }
  }

  return (
    <div className='max-w-[900px] mx-auto space-y-5 pb-16'>
      <div className='bg-white rounded-2xl p-8'>
        <div className='flex gap-4 items-center'>
          <div className='flex items-center justify-center rounded-sm bg-[#FFF0BE] shadow gap-2 w-72 py-2.5 mb-6'>
            <Image src={StarEmogi} alt="package" width={30} height={30} />
            <p className='text-xl font-semibold text-gray-700'>Brand Price ${orderDetails?.brandPrice}</p>
            <Image src={LoveEmogi} alt="package" width={30} height={30} />
          </div>
          {orderDetails?.creatorPrice && <div className='flex items-center justify-center rounded-sm bg-[#FFF0BE] shadow gap-2 w-72 py-2.5 mb-6'>
            <Image src={StarEmogi} alt="package" width={30} height={30} />
            <p className='text-xl font-semibold text-gray-700'>Creator Price ${orderDetails?.creatorPrice}</p>
            <Image src={LoveEmogi} alt="package" width={30} height={30} />
          </div>}
        </div>
        {orderDetails?.brandInfo && <SubComponent title="Project Info" list={orderDetails.brandInfo} />}
      </div>
      <div className='bg-white rounded-2xl p-8'>
        <SubComponent title="Contain Info" list={orderDetails.brandInfo} />
      </div>
      <div className='bg-white rounded-2xl p-8'>
        <SubComponent title="Brand Social" list={orderDetails.brandSocial} />
      </div>
      <div className='bg-white rounded-2xl p-8'>
        <SubComponent title="Video Info" list={orderDetails.videoInfo} />
      </div>
      <div className='bg-white rounded-2xl p-8'>
        <SubComponent title="Characteristics Of The Creator" list={orderDetails.characteristicInfo} />
      </div>
      <div className='bg-white rounded-2xl p-8'>
        <SubComponent title="Add-Ons" list={orderDetails.addOns} />
      </div>

      {orderDetails.status === "pending" && <div className='flex items-center justify-end space-x-4'>
        <Button onClick={handleApprove}>Approve</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </div>}
    </div>
  )
}

const SubComponent = ({ title, list }: { title: string; list: any }) => {
  if (!list || typeof list !== "object") {
    return null; // or render a fallback UI
  }

  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>{title}</h2>
      <ul className='space-y-1.5'>
        {Object.entries(list)?.map(([key, value], index) => {
          if (key === "_id") return null;
          return <li key={index} className="list-disc list-inside pl-4 text-gray-600">
            <span className="font-semibold text-gray-700 text-lg capitalize">{key ?? ""}:</span><br />
            <span className="pl-6">{String(value)}</span>
          </li>
        })}
      </ul>
    </div>
  );
};


export default ProjectDetailsAdmin