import React, { useState } from 'react'
import DashboardSidebar from './DashboardSidebar'
import DashboardTopbar from './DashboardTopbar'
import EditNews from './sub-elements/EditNews'

const DashEditNews = () => {
  const [bars, setBars] = useState(false);

  return (
    <div className="dashboard-page">
      <div className={bars ? "mobile-left das-left" : "das-left"}>
        <DashboardSidebar setBars={setBars} />
      </div>
      <div className={bars ? "mobile-right das-right" : "das-right"}>
        <DashboardTopbar setBars={setBars} />
        <div className="das-display">
          <EditNews />
        </div>
      </div>
    </div>
  )
}

export default DashEditNews