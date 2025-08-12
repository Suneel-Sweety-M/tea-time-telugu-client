import React from 'react'
import './scrollTop.css'

const ScrollTop = () => {
  return (
    <div className="scroll-top">
      <button onClick={() => window.scrollTo(0, 0)}>
        <i className="fa fa-arrow-up"></i>
      </button>
    </div>
  )
}

export default ScrollTop;