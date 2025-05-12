import React from "react";
import "../components/videos/videos.css";
import AllVideos from "../components/videos/AllVideos";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import TabTitle from "../components/titles/TabTitle";

const Videos = () => {
  return (
    <>
      <Navbar />
      <div className="videos-page main-page">
        <TabTitle title={"Videos"} />
        <div className="videos-page-container">
          <AllVideos />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Videos;
