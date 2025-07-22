/* eslint-disable react-hooks/exhaustive-deps */
import { myFetch } from '@/utils/myFetch';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { Textarea } from '../ui/textarea';

const CreatorScript = () => {
  const [status, setStatus] = React.useState("")
  const [script, setScript] = React.useState("")
  const params = useParams();
  const id = params["project-details"];

  const getScript = async () => {
    const res = await myFetch(`/hire-creator/${id}`, { method: 'GET' });
    console.log("Fetch Script Response:", res)

    if (res.success) {
      console.log(res?.data?.status)
      setStatus(res?.data?.status)
      setScript(res?.data?.isScript)
    }
  }

  useEffect(() => {
    getScript()
  }, [])


  return (
    <div className="" style={{ height: "calc(100vh - 220px)" }}>
      <p className='text-2xl font-semibold py-4'>Status: {status}</p>
      <Textarea value={script} variant="blackBorder" placeholder="" className=" bg-white min-h-[500px] p-3" />
    </div>
  )
}

export default CreatorScript