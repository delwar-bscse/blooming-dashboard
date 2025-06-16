import React from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from '../ui/button'

const CreatorScript = () => {
  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 220px)" }}>
      <div className="flex-1 flex flex-col">
        <Textarea className="flex-1 resize-none bg-white" />
      </div>
      <div className='flex justify-end py-8'>
        <Button variant={"customYellow"} className="w-40">Save</Button>
      </div>
    </div>
  )
}

export default CreatorScript