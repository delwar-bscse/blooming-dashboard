import React from 'react'

const VideoViewCard: React.FC<{ videoUrl: string }> = ({ videoUrl }) => (
  <div className="bg-gray-200 w-60 h-40 aspect-video flex items-center justify-center">
    {/* <p>{videoUrl}</p> */}
    <video width="480" height="320" controls className='h-full object-cover'>
      <source src={videoUrl ?? ""} type="video/mp4" />
      <track
        src="/path/to/captions.vtt"
        kind="subtitles"
        srcLang="en"
        label="English"
      />
      Your browser does not support the video tag.
    </video>
  </div>
);

export default VideoViewCard