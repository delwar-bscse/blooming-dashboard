import React from 'react'

const deadlineCommunication = [
  "Content must be delivered by the agreed-upon deadline.",
  "If you need an extension, you must inform The Social Chance Brands at least 48 hours in advance.",
  "Failure to meet the deadline without notice will result in a 20% deduction from the base project fee.",
  "A maximum extension of 2 days may be granted if communicated in time."
]

const filmingGuidelines = [
  "Lighting: Film in front of a window using natural daylight. Avoid artificial lighting unless specifically requested.",
  "Camera: Always wipe your camera lens before filming for a clear image.",
  "Sound: Ensure there's no background noise during filming. Choose a quiet space."
]

const appearanceStyling = [
  "Wear simple, clean, and neutral-colored clothing (no graphics or logos).",
  "Maintain a clean and tidy appearance: Hair neatly styled Nails clean "
]

const contentDelivery = [
  "Follow the approved script exactly as confirmed with the agency/brand.",
  "Keep your background uncluttered and distraction-free.",
  "Be confident, natural, and authentic — we want you to shine through."
];


const CreatorVideoGuidelines = () => {
  return (
    <div className='space-y-5 pb-16'>
      <div className='font-semibold bg-white rounded-2xl p-8 space-y-3'>
        <h2 className='text-3xl font-bold text-gray-700 uppercase'>The Social Chance</h2>
        <p className='text-gray-600'>To ensure consistency, quality and professionalism across all content, please follow the guidelines below when creating UGC for our partnered Brands.</p>
      </div>
      <div className='bg-white rounded-2xl p-8'>
        <div>
          <SubComponent title="Deadlines & Communication" list={deadlineCommunication} />
        </div>
      </div>
      <div className='bg-white rounded-2xl p-8'>
        <SubComponent title="Filming Guidelines" list={filmingGuidelines} />
      </div>
      <div className='bg-white rounded-2xl p-8'>
        <SubComponent title="Appearance & Styling" list={appearanceStyling} />
      </div>
      <div className='bg-white rounded-2xl p-8'>
        <SubComponent title="Content Delivery" list={contentDelivery} />
      </div>
    </div>
  )
}

const SubComponent = ({ title, list }: { title: string; list: string[] }) => {
  return (
    <div>
      <h2 className='text-2xl font-semibold text-gray-700 mb-4'>{title}</h2>
      <ul className='space-y-1.5'>
        {list.map((item, index) => (
          <li key={index} className='list-disc list-inside pl-4 text-gray-600'>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default CreatorVideoGuidelines