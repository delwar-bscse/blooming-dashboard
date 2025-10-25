/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { myFetch } from "@/utils/myFetch";
import JoditEditor from "jodit-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const CustomJodit = () => {
  const pathname = usePathname();
  const editor = useRef(null);
  const [content, setContent] = useState("");



  const getContent = async () => {
    toast.loading("Fetching...", { id: "fetch" });
    const res = await myFetch(`/setting`, {
      method: "GET",
    })
    
    if (res?.data) {
      if (pathname.endsWith("/terms-and-condition")) setContent(res?.data?.termsOfService);
      if (pathname.endsWith("/privacy-policy")) setContent(res?.data?.privacyPolicy);
      toast.success("Fetched successfully!", { id: "fetch" });
    }else{
      toast.error(res?.message || "Failed to fetch!", { id: "fetch" });
    }
  };

  const handleOnSave = async () => {
    toast.loading("Updating...", { id: "update" });
    
    let payload

    if (pathname.endsWith("/terms-and-condition")) {
      payload = {
        termsOfService: content
      }
    }
    if (pathname.endsWith("/privacy-policy")) {
      payload = {
        privacyPolicy: content
      }
    }

    const res = await myFetch(`/setting`, {
      method: "PATCH",
      body: payload,
    });
    
    if (res?.data) {
      toast.success("Updated successfully!", { id: "update" });
      getContent();
    } else {
      toast.error(res?.message || "Failed to update!", { id: "update" });
    }
  };


  useEffect(() => {
    getContent();
  }, [pathname]);

  return (
    <>
      <div className="">
        <JoditEditor
          ref={editor}
          value={content}
          config={{ readonly: false, height: 600 }}
          onBlur={(newContent) => setContent(newContent)}
        />
      </div>
      <div className="flex justify-end mt-4">
        <button onClick={handleOnSave} className="inline-block w-100 px-10 py-2 bg-black hover:bg-gray-700 text-white border border-gray-400 rounded">Save</button>
      </div>
    </>
  );
};

export default CustomJodit;