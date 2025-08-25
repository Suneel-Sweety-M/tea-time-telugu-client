import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SectionTitle from "../titles/SectionTitle";
import Trailers from "../trailers/Trailers";
import LatestStories from "../home/LatestStories";
import { toast } from "react-toastify";
import { getVideo, getNewsShortAd } from "../../helper/apis";
import moment from "moment";

const SingleVideoContainer = () => {
  const { vid } = useParams();
  const [videoData, setVideoData] = useState({});
  const [suggestedPosts, setSuggestedPosts] = useState([]);
  const [similarPosts, setSimilarPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getVideoData = async () => {
      setIsLoading(true);
      try {
        const res = await getVideo(vid);
        if (res?.status === "success") {
          setVideoData(res?.video);
          document.title = `${res?.video?.title?.te}`;
          setSuggestedPosts(res?.suggestedVideos);
          setSimilarPosts(res?.similarVideos || []);
        } else {
          toast.error(res?.message);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getVideoData();
  }, [vid]);
  // const [newsLongAdImg, setNewsLongAdImg] = useState("");
  // const [newsLongAdLink, setNewsLongAdLink] = useState("");
  const [newsShortAdImg, setNewsShortAdImg] = useState("");
  const [newsShortAdLink, setNewsShortAdLink] = useState("");

  // const handleGetNewsLongAd = async () => {
  //   const res = await getNewsLongAd();

  //   if (res?.status === "success") {
  //     setNewsLongAdImg(res?.newsLongAd?.img);
  //     setNewsLongAdLink(res?.newsLongAd?.link);
  //   } else {
  //     toast.error(res?.message);
  //   }
  // };

  const handleGetNewsShortAd = async () => {
    const res = await getNewsShortAd();

    if (res?.status === "success") {
      setNewsShortAdImg(res?.newsShortAd?.img);
      setNewsShortAdLink(res?.newsShortAd?.link);
    } else {
      toast.error(res?.message);
    }
  };

  useEffect(() => {
    // handleGetNewsLongAd();
    handleGetNewsShortAd();
  }, []);
  return (
    <>
      {!isLoading ? (
        <div className="single-video-container main-padding">
          <h1 className="p20">
            <span style={{ color: "red", marginRight: "10px" }}>Video:</span>
            {videoData?.title?.en}
          </h1>
          <span className="single-news-duo-left-top-auth-details">
            <span className="sn-author">
              Writer: <b>{videoData?.postedBy?.fullName}</b>
            </span>
            <span className="sn-posted-date">
              <i className="fa fa-calendar mr5"></i>
              {moment(videoData?.createdAt).format("hh:mm A, D MMMM YYYY")}
            </span>
            {/* <span className="sn-posted-date">
              <i className="fa-regular fa-face-smile mr5"></i>
              {videoData?.reactions?.length} <span>Reactions</span>
            </span>
            <span className="sn-posted-date">
              <i className="fa-regular fa-comments mr5"></i>
              {commentsCount} <span>Comments</span>
            </span> */}
          </span>
          <div className="single-video-container-top">
            <div className="svct-video-container">
              <iframe
                src={videoData?.videoUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          {similarPosts?.length > 0 && (
            <div className="video-related-videos">
              <SectionTitle title={"Related Videos"} />
              <div className="all-category-posts-container">
                {similarPosts?.map((item, index) => (
                  <Link
                    to={`/videos/v/${item?.newsId}`}
                    className="single-category-post"
                    aria-label={`Watch video`}
                    key={index}
                  >
                    <div className="video-thumbnail-container">
                      <img
                        src={item?.mainUrl}
                        alt="yt-thumbnail"
                        loading="lazy"
                      />
                      <div className="play-icon">
                        <svg viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="single-category-post-texts">
                      <span className="video-meta">
                        {moment(item?.createdAt).format("Do MMM YYYY")}
                      </span>
                      <h3 className="video-title">{item?.title?.en}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          <Trailers />
          <div className="single-video-container-suggested">
            <div className="single-video-container-suggested-left">
              {suggestedPosts?.length > 0 && (
                <div className="single-video-suggested-posts-container">
                  <SectionTitle title={"Suggested Posts"} />
                  <div className="sv-suggested-posts">
                    {suggestedPosts?.map((item, index) => (
                      <Link
                        to={`/videos/v/${item?.newsId}`}
                        className="sv-suggested-post"
                        key={index}
                      >
                        <div className="video-thumbnail-container">
                          <img src={item?.mainUrl} alt="yt-thumbnail" />
                          <div className="play-icon">
                            <svg viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                        <h4>
                          <span style={{ color: "red" }} className="mr10">
                            Video:
                          </span>
                          {item?.title?.en}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="single-video-container-suggested-right">
              <div className="single-news-medias single-news-tags">
                <SectionTitle title={"Follow Us"} />
                <div className="sn-all-tags">
                  <a
                    href="https://www.facebook.com/profile.php?id=61572501587074"
                    target="blank"
                    className="sn-social sn-tag box-shadow"
                  >
                    <i
                      style={{ color: "#1093f5" }}
                      className="fa fa-facebook"
                    ></i>
                    <span>Facebook</span>
                  </a>
                  <a
                    href="https://www.instagram.com/teatime_telugu"
                    target="blank"
                    className="sn-social sn-tag box-shadow"
                  >
                    <i style={{ color: "red" }} className="fa fa-instagram"></i>
                    <span>Instagram</span>
                  </a>
                  <a
                    href="https://www.youtube.com/@TeaTimeTelugu-s8b"
                    target="blank"
                    className="sn-social sn-tag box-shadow"
                  >
                    <i style={{ color: "red" }} className="fa fa-youtube"></i>
                    <span>YouTube</span>
                  </a>
                  <a
                    href="https://x.com/TeaTimeTelugu"
                    target="blank"
                    className="sn-social sn-tag box-shadow"
                  >
                    <i
                      style={{ color: "#000000" }}
                      className="fa fa-twitter"
                    ></i>
                    <span>Twitter</span>
                  </a>
                </div>
              </div>
              <LatestStories />
              <a href={newsShortAdLink} target="blank">
                <img
                  src={
                    newsShortAdImg ||
                    "https://res.cloudinary.com/demmiusik/image/upload/v1741353625/Ad2_jpiggx.png"
                  }
                  alt="ad"
                  className="ad-img br5 cp"
                />
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="single-news-loading-container main-padding">
          <div className="snlc-title">
            <div className="snlc-text"></div>
            <div className="snlc-text"></div>
            <div className="snlc-half-text"></div>
          </div>
          <div className="snlc-img"></div>
          <div className="snlc-desc">
            <div className="snlc-text"></div>
            <div className="snlc-text"></div>
            <div className="snlc-text"></div>
            <div className="snlc-text"></div>
            <div className="snlc-text"></div>
            <div className="snlc-text"></div>
            <div className="snlc-half-text"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleVideoContainer;
