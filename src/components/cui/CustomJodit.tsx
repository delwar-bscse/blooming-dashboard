"use client";

import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
// import 'jodit/build/jodit.min.css';

// import toast from "react-hot-toast";

const CustomJodit = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const handleOnSave = async () => {
    console.log(content);
  };


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