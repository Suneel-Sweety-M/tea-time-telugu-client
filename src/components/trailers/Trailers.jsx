import React, { useEffect, useState } from "react";
import "./trailers.css";
import SectionTitle from "../titles/SectionTitle";
import { toast } from "react-toastify";
import { getHomeVideos } from "../../helper/apis";

const Trailers = () => {
  const [currentVid, setCurrentVid] = useState({});
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchAllVideos = async () => {
      try {
        const res = await getHomeVideos("trailers", 10);
        if (res?.status === "success") {
          setVideos(res?.videos);
          setCurrentVid(res?.videos[0]);
        } else {
          toast.error(res?.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllVideos();
  }, []);
  return (
    <div className="video-gallery-container">
      {videos?.length > 0 && <SectionTitle title="New Trailers" />}
      {videos?.length > 0 && (
        <div className="video-gallery-section">
          <div className="vg-video-player">
            <iframe
              src={currentVid?.videoUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="vg-videos-list">
            {videos?.slice(0, 10)?.map((item, index) => (
              <div
                className={`vg-videos-list-item ${
                  currentVid?._id === item?._id ? "vg-active" : ""
                }`}
                onClick={() => setCurrentVid(item)}
                key={index}
              >
                <img src={item?.mainUrl} alt="yt-thumbnail" />
                <div className="vg-videos-list-item-texts">
                  <span className="vg-item-title">{item?.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Trailers;
