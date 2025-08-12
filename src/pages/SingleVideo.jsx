import React from 'react'
import SingleVideoContainer from '../components/videos/SingleVideoContainer'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import ScrollTop from '../components/scroll-top/ScrollTop'

const SingleVideo = () => {
  return (
    <>
    <Navbar />
      <div className="single-video-page main-page">
        <SingleVideoContainer />
      </div>
      <Footer />
      <ScrollTop />
    </>
  )
}

export default SingleVideo;