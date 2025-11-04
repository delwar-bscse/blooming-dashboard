"use client"
import React from 'react'

import dynamic from 'next/dynamic';
const AddBlogPost = dynamic(() => import('@/components/cui/AddBlogPost'), {
  ssr: false,
});

const AddBlog = () => {
  return (
    <div>
      <AddBlogPost />
    </div>
  )
}

export default AddBlog