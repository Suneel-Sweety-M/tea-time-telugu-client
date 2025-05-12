import React, { useEffect, useState } from "react";
import SectionTitle from "../titles/SectionTitle";
import { Link } from "react-router-dom";
import { getAllCategoryVideos } from "../../helper/apis";
import { toast } from "react-toastify";
import moment from "moment";

const AllVideos = () => {
  const [videos, setVideos] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [visiblePosts, setVisiblePosts] = useState(8);

  const fetchAllVideos = async () => {
    setIsLoading(true);
    try {
      document.title = "Videos";
      const res = await getAllCategoryVideos();

      if (res?.status === "success") {
        setVideos(res?.data || {}); // Ensure we always have an object
      } else {
        toast.error(res?.message);
        setVideos({}); // Set empty object on error
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setVideos({}); // Set empty object on error
      setIsLoading(false);
    }
  };

  const loadMorePosts = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 8);
  };

  useEffect(() => {
    fetchAllVideos();
  }, []);

  const renderPosts = (category, title) => {
    // Add null check for videos[category]
    const categoryVideos = videos[category] || [];

    return (
      <div key={title} className="videos-category-container">
        {categoryVideos?.length > 0 && <SectionTitle title={title} />}
        {categoryVideos?.length > 0 && (
          <div className="all-category-posts-container">
            {categoryVideos?.slice(0, visiblePosts)?.map((video) => (
              <Link
                key={video?._id}
                to={`/videos/v/${video?._id}`}
                className="single-category-post"
                aria-label={`Watch ${video?.title}`}
              >
                <div className="video-thumbnail-container">
                  <img src={video?.mainUrl} alt={video?.title} loading="lazy" />
                  <div className="play-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="single-category-post-texts">
                  <span className="video-meta">
                    {moment(video?.createdAt).format("Do MMM YYYY")}
                  </span>
                  <h3 className="video-title">{video?.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}
        {visiblePosts < videos[category]?.length && (
          <button className="load-more-btn" onClick={loadMorePosts}>
            <span className="btn-text">Load More</span>
            <span className="btn-icon">
              <i className="fa-solid fa-arrow-rotate-right"></i>
            </span>
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="all-videos-container">
      {!isLoading ? (
        <div>
          {renderPosts("latestVideos", "Latest Videos")}
          {renderPosts("trailers", "Trailers")}
          {renderPosts("videoSongs", "Video Songs")}
          {renderPosts("lyricalSongs", "Lyrical Songs")}
          {renderPosts("ott", "Ott")}
          {renderPosts("events", "Events")}
          {renderPosts("shows", "Shows")}
        </div>
      ) : (
        <div className="all-category-posts-container">
          {[...Array(12)].map((_, index) => (
            <div className="single-category-post box-shadow" key={index}>
              <img
                src="https://res.cloudinary.com/demmiusik/image/upload/v1729620426/post-default-pic_jbf1gl.png"
                alt=""
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllVideos;
