import React, { useCallback, useEffect, useState } from "react";
import "../components/single-news/singleNews.css";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import LatestStories from "../components/home/LatestStories";
import SectionTitle from "../components/titles/SectionTitle";
import NewsComments from "../components/single-news/NewsComments";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getNewsShortAd, getSingleNews } from "../helper/apis";
import moment from "moment";
import { toast } from "react-toastify";

const SingleNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState({});
  const [suggestedNews, setSuggestedNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [postsCount, setpostsCount] = useState(8);
  const [commentsCount, setCommentsCount] = useState(0);

  const getNews = useCallback(async () => {
    if (!id || id.length !== 24) {
      return navigate("/");
    }

    try {
      setIsLoading(true);
      const res = await getSingleNews(id);
      if (res?.status === "success") {
        setNews(res?.news);

        document.title = `${res?.news?.title}`;
        setSuggestedNews(res?.suggestedNews);
      } else {
        navigate("/");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      navigate("/");
    }
  }, [id, navigate]);

  useEffect(() => {
    getNews();
  }, [getNews]);

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
      <Navbar />
      <div className="single-news-page main-page main-padding">
        <div className="single-news-duo">
          {!isLoading ? (
            <div className="single-news-duo-left">
              <div className="single-news-duo-left-top">
                <h1 className="single-news-duo-left-top-title">
                  {news?.title}
                </h1>
                <span className="single-news-duo-left-top-auth-details">
                  <span className="sn-author">
                    By <b>{news?.postedBy?.fullName}</b>
                  </span>
                  <span className="sn-posted-date">
                    <i className="fa fa-calendar mr5"></i>
                    {moment(news?.createdAt).format("D MMMM YYYY")}
                  </span>
                  <span className="sn-posted-date">
                    <i className="fa-regular fa-face-smile mr5"></i>
                    {news?.reactions?.length} <span>Reactions</span>
                  </span>
                  <span className="sn-posted-date">
                    <i className="fa-regular fa-comments mr5"></i>
                    {commentsCount} <span>Comments</span>
                  </span>
                </span>
                <div className="single-news-content-container">
                  {news?.subCategory !== "trailer" && (
                    <img src={news?.mainUrl} alt={news?.title} />
                  )}

                  <div
                    className="single-news-description main-font"
                    dangerouslySetInnerHTML={{ __html: news?.description }}
                  />
                </div>
              </div>
              <NewsComments
                news={news}
                getNews={getNews}
                setCommentsCount={setCommentsCount}
              />
            </div>
          ) : (
            <div className="single-news-loading-container single-news-duo-left">
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
          <div className="single-news-duo-right">
            {news?.tags?.length > 0 && (
              <div className="single-news-tags">
                <SectionTitle title={"Tags"} />
                <div className="sn-all-tags">
                  {news?.tags?.map((tag, index) => (
                    <Link
                      to={`/search?q=${tag}`}
                      className="sn-tag box-shadow"
                      key={index}
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
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
                  <i style={{ color: "#000000" }} className="fa fa-twitter"></i>
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

        {suggestedNews?.length > 0 && (
          <div className="latest-collection-container">
            <SectionTitle title="Suggested Posts" />
            {isLoading ? (
              <div className="latest-collection-grid">
                {Array(9)
                  .fill(null)
                  .map((_, index) => (
                    <div key={index} className="latest-collection-card">
                      <div className="latest-collection-image-container">
                        <img
                          src="https://res.cloudinary.com/demmiusik/image/upload/v1729620426/post-default-pic_jbf1gl.png"
                          alt="pic"
                          loading="lazy"
                          className="latest-collection-image"
                        />
                      </div>
                      <div className="snlc-title p20">
                        <div className="snlc-text"></div>
                        <div className="snlc-half-text"></div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="latest-collection-grid">
                {suggestedNews?.slice(0, 9)?.map((collection) => (
                  <Link
                    to={`/${collection?.category}/${collection?._id}`}
                    key={collection?._id}
                    className="latest-collection-card"
                    aria-label={`View ${collection?.title}`}
                  >
                    <div className="latest-collection-image-container">
                      <img
                        src={collection?.mainUrl}
                        alt={collection?.title}
                        loading="lazy"
                        className="latest-collection-image"
                      />
                    </div>
                    <div className="latest-collection-content">
                      <span className="latest-collection-category">
                        {collection?.category}
                      </span>
                      <h3 className="latest-collection-title">
                        {collection?.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SingleNews;
