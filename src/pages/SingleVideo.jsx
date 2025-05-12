import React from 'react'
import SingleVideoContainer from '../components/videos/SingleVideoContainer'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'

const SingleVideo = () => {
  return (
    <>
    <Navbar />
      <div className="single-video-page main-page">
        <SingleVideoContainer />
      </div>
      <Footer />
    </>
  )
}

export default SingleVideo;