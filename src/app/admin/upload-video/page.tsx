import AdminVideoUpload from '@/components/cui/AdminVideoUpload'
import CustomSelectOption from '@/components/cui/CustomSelectOption'
import { selectOptions } from '@/constant/videoSelectDatasts'
import React from 'react'






const UploadVideo = () => {
  return (
    <div className='px-2 max-w-[1200px] mx-auto py-8'>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-4xl font-bold text-gray-700">Upload Videos</h2>
        <CustomSelectOption selectOptions={selectOptions} placeHolderValue="Select A Category" queryKey="category"/>
      </div>
      <AdminVideoUpload />
    </div>
  )
}

export default UploadVideo