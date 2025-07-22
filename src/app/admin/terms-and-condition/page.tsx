"use client"

import React from 'react'
import dynamic from 'next/dynamic';
const CustomJodit = dynamic(() => import('@/components/cui/CustomJodit'), {
  ssr: false,
});

const TermsCondition = () => {


  return (
    <div className="py-1 px-4">
      <div className="p-2 rounded">
        <h1 className="text-4xl font-bold py-4 text-gray-700">
          Terms & Condition
        </h1>
        
        <CustomJodit />
        
      </div>
    </div>
  )
}

export default TermsCondition