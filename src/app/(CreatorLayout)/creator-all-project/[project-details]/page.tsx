import CustomStep from '@/components/cui/CustomStep';
import { StepDataType } from '@/type/type';
import React from 'react'

const CreatorProjectDetailsPage = () => {
  

const stepDatas: StepDataType[] = [
  {
    id: 1,
    title: "Project Details",
    label: "project-details",
  },
  {
    id: 2,
    title: "Video Guidelines",
    label: "video-guidelines",
  },
  {
    id: 3,
    title: "Video upload",
    label: "video-upload",
  },
  {
    id: 4,
    title: "Script",
    label: "script",
  }
];

  return (
    <div>
      <div className="pb-4">
        <CustomStep stepDatas={stepDatas} />
      </div>

      <div>CreatorProjectDetailsPage</div>
    </div>
  )
}

export default CreatorProjectDetailsPage