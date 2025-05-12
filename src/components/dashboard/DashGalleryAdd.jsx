import React, { useState } from 'react'
import DashboardTopbar from './DashboardTopbar';
import DashboardSidebar from './DashboardSidebar';
import DasAddGallery from './sub-elements/DasAddGallery';

const DashGalleryAdd = () => {
  const [bars, setBars] = useState(false);

  return (
    <div className="dashboard-page">
      <div className={bars ? "mobile-left das-left" : "das-left"}>
        <DashboardSidebar setBars={setBars} />
      </div>
      <div className={bars ? "mobile-right das-right" : "das-right"}>
        <DashboardTopbar setBars={setBars} />
        <div className="das-display">
          <DasAddGallery />
        </div>
      </div>
    </div>
  )
}

export default DashGalleryAdd;