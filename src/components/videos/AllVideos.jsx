import React, { useEffect, useState } from "react";
import SectionTitle from "../titles/SectionTitle";
import { Link } from "react-router-dom";
import { getPaginatedCategoryVideos } from "../../helper/apis";
import { toast } from "react-toastify";
import moment from "moment";

const AllVideos = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [categoryData, setCategoryData] = useState({
    latestVideos: { items: [], skip: 0, hasMore: true },
    trailers: { items: [], skip: 0, hasMore: true },
    videoSongs: { items: [], skip: 0, hasMore: true },
    lyricalVideos: { items: [], skip: 0, hasMore: true },
    shows: { items: [], skip: 0, hasMore: true },
    ott: { items: [], skip: 0, hasMore: true },
    events: { items: [], skip: 0, hasMore: true },
  });

  // Map state keys to DB subCategory values
  const getSubCategoryParam = (key) => {
    switch (key) {
      case "latestVideos":
        return "latestVideos"; // special handling in backend
      case "trailers":
        return "trailers";
      case "videoSongs":
        return "video songs";
      case "lyricalVideos":
        return "lyrical videos";
      case "shows":
        return "shows";
      case "ott":
        return "ott";
      case "events":
        return "events";
      default:
        return "";
    }
  };

  const fetchVideosByCategory = async (categoryKey) => {
    const limit = 9;
    const { skip, hasMore } = categoryData[categoryKey];
    if (!hasMore) return;

    try {
      setIsLoading(true);
      const res = await getPaginatedCategoryVideos({
        category: "videos",
        subCategory: getSubCategoryParam(categoryKey),
        skip,
        limit,
      });

      if (res?.status === "success") {
        setCategoryData((prev) => {
          const old = prev[categoryKey];
          const newSkip = old.skip + limit;
          return {
            ...prev,
            [categoryKey]: {
              items: [...old.items, ...res.data.videos],
              skip: newSkip,
              hasMore: newSkip < res.data.total,
            },
          };
        });
      } else {
        toast.error(res?.message || "Failed to load videos");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error while fetching videos");
    } finally {
      setIsLoading(false);
    }
  };

  // Load initial 9 for each category
  useEffect(() => {
    Object.keys(categoryData).forEach((key) => {
      fetchVideosByCategory(key);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderCategory = (key, title) => {
    const cat = categoryData[key];
    if (!cat.items.length) return null;

    return (
      <div className="videos-category-container" key={key}>
        <SectionTitle title={title} />
        <div className="all-category-posts-container">
          {cat.items.map((video) => (
            <Link
              key={video._id}
              to={`/videos/v/${video.newsId}`}
              className="single-category-post"
            >
              <div className="video-thumbnail-container">
                <img src={video.mainUrl} alt={video.title} loading="lazy" />
                <div className="play-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="single-category-post-texts">
                <span className="video-meta">
                  {moment(video.createdAt).format("Do MMM YYYY")}
                </span>
                <h3 className="video-title">{video.title}</h3>
              </div>
            </Link>
          ))}
        </div>
        {cat.hasMore && (
          <button
            className="load-more-btn"
            onClick={() => fetchVideosByCategory(key)}
          >
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
      {isLoading && Object.values(categoryData).every((cat) => cat.items.length === 0) ? (
        // Initial loader
        <div className="all-category-posts-container">
          {[...Array(9)].map((_, index) => (
            <div className="single-category-post box-shadow" key={index}>
              <img
                src="https://res.cloudinary.com/demmiusik/image/upload/v1729620426/post-default-pic_jbf1gl.png"
                alt="Loading placeholder"
              />
            </div>
          ))}
        </div>
      ) : (
        <>
          {renderCategory("latestVideos", "Latest Videos")}
          {renderCategory("trailers", "Trailers")}
          {renderCategory("videoSongs", "Video Songs")}
          {renderCategory("lyricalVideos", "Lyrical Videos")}
          {renderCategory("ott", "OTT")}
          {renderCategory("events", "Events")}
          {renderCategory("shows", "Shows")}
        </>
      )}
    </div>
  );
};

export default AllVideos;
