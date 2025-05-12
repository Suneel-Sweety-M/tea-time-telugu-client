import React, { useState } from 'react'
import DashboardSidebar from './DashboardSidebar';
import DashboardTopbar from './DashboardTopbar';
import DasAllGallery from './sub-elements/DasAllGallery';

const DashGalleryAll = () => {
  const [bars, setBars] = useState(false);

  return (
    <div className="dashboard-page">
      <div className={bars ? "mobile-left das-left" : "das-left"}>
        <DashboardSidebar setBars={setBars} />
      </div>
      <div className={bars ? "mobile-right das-right" : "das-right"}>
        <DashboardTopbar setBars={setBars} />
        <div className="das-display">
          <DasAllGallery />
        </div>
      </div>
    </div>
  )
}

export default DashGalleryAll;