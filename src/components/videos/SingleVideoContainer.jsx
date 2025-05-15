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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getVideoData = async () => {
      setIsLoading(true);
      try {
        const res = await getVideo(vid);
        if (res?.status === "success") {
          setVideoData(res?.data);
          document.title = `${res?.data?.video?.title}`;
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
            {videoData?.video?.title}
          </h1>
          <div className="single-video-container-top">
            <div className="svct-video-container">
              {videoData?.video && (
                <iframe
                  src={videoData?.video?.videoUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>
          {videoData?.similarPosts?.length > 0 && (
            <div className="video-related-videos">
              <SectionTitle title={"Related Videos"} />
              <div className="all-category-posts-container">
                {videoData?.similarPosts?.map((item, index) => (
                  <Link
                    to={`/videos/v/${item?._id}`}
                    className="single-category-post"
                    aria-label={`Watch v`}
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
                      <h3 className="video-title">{item?.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          <Trailers />
          <div className="single-video-container-suggested">
            <div className="single-video-container-suggested-left">
              {videoData?.suggestedPosts?.length > 0 && (
                <div className="single-video-suggested-posts-container">
                  <SectionTitle title={"Suggested Posts"} />
                  <div className="sv-suggested-posts">
                    {videoData?.suggestedPosts?.map((item, index) => (
                      <Link
                        to={`/videos/v/${item?._id}`}
                        className="sv-suggested-post"
                        key={index}
                      >
                        <img src={item?.mainUrl} alt="yt-thumbnail" />
                        <h4>
                          <span style={{ color: "red" }} className="mr10">
                            Video:
                          </span>
                          {item?.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {videoData?.videoSongs?.length > 0 && (
                <div className="single-video-suggested-posts-container">
                  <SectionTitle title={"Video Songs"} />
                  <div className="sv-suggested-posts">
                    {videoData?.videoSongs?.map((item, index) => (
                      <Link
                        to={`/videos/v/${item?._id}`}
                        className="sv-suggested-post"
                        key={index}
                      >
                        <img src={item?.mainUrl} alt="yt-thumbnail" />
                        <h4>
                          <span style={{ color: "red" }} className="mr10">
                            Video:
                          </span>
                          {item?.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {videoData?.relatedPosts?.length > 0 && (
                <div className="single-video-suggested-posts-container">
                  <SectionTitle title={"Related Posts"} />
                  <div className="sv-suggested-posts">
                    {videoData?.relatedPosts?.map((item, index) => (
                      <Link
                        to={`/videos/v/${item?._id}`}
                        className="sv-suggested-post"
                        key={index}
                      >
                        <img src={item?.mainUrl} alt="yt-thumbnail" />
                        <h4>
                          <span style={{ color: "red" }} className="mr10">
                            Video:
                          </span>
                          {item?.title}
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
