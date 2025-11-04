/* eslint-disable react-hooks/exhaustive-deps */
import { myFetch } from '@/utils/myFetch';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';

const AdminScript = () => {
  const [status, setStatus] = useState("")
  const [script, setScript] = useState("")
  const [scriptStatus, setScriptStatus] = useState<string>("");
  const params = useParams();
  const id = params["project-details"];

  const getScript = async () => {
    const res = await myFetch(`/hire-creator/${id}`, {
      method: "GET",
    });

    console.log("Script : ", res);

    if (res.success) {
      setStatus(res?.data?.status)
      setScript(res?.data?.isScript)
      setScriptStatus(res?.data?.scriptStatus)
    }
  }

  useEffect(() => {
    getScript()
  }, [])


  const onSubmit = async () => {
    const res = await myFetch(`/hire-creator/addApprovedCancelIsScript/${id}`, {
      method: "PATCH",
      body: {
        revisionText: script
      },
    });

    if (res.success) {
      toast.success("Script added successfully!");
      getScript()
    }else {
      toast.error(res.message || "Failed to add script!");
    }
  }


  return (
    <div className="" style={{ height: "calc(100vh - 220px)" }}>
      <p className='text-2xl font-semibold py-4'>Status: {status}</p>
      <Textarea readOnly={scriptStatus === "pending" ? false : true} onChange={(e) => setScript(e.target.value)} value={script} variant="blackBorder" placeholder="" className=" bg-white min-h-[500px] p-3" />
      {(scriptStatus === "pending") &&<div className='flex justify-end mt-4'>
        <button onClick={onSubmit} className='bg-yellow-400 text-white font-semibold px-4 py-2 rounded-lg'>Add Script</button>
      </div>}
    </div>
  )
}

export default AdminScript