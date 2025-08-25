import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import LatestStories from "../components/home/LatestStories";
import SectionTitle from "../components/titles/SectionTitle";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getNewsShortAd, getSingleGallery } from "../helper/apis";
import moment from "moment";
import { toast } from "react-toastify";
import ScrollTop from "../components/scroll-top/ScrollTop";
import { useSelector } from "react-redux";
import NewsComments from "../components/single-news/NewsComments";
import ReadButton from "../components/single-news/ReadButton";

const GalleryShow = () => {
  const { id } = useParams();
  const reactionsArray = useSelector((state) => state.teatimetelugu.reactions);
  const navigate = useNavigate();
  const [gallery, setGallery] = useState({});
  const [suggestedPosts, setSuggestedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [imgViewStyle, setImgViewStyle] = useState("img-h-full");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  // const [postsCount, setpostsCount] = useState(8);

  const styleOptions = ["img-h-full", "img-w-full"];

  const handleEyeClick = () => {
    setImgViewStyle((prevStyle) => {
      const currentIndex = styleOptions.indexOf(prevStyle);
      const nextIndex = (currentIndex + 1) % styleOptions.length;
      return styleOptions[nextIndex];
    });
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? gallery.galleryPics.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === gallery.galleryPics.length - 1 ? 0 : prevIndex + 1
    );
  };

  const getPictures = useCallback(async () => {
    if (!id) {
      return navigate("/gallery");
    }
    setIsLoading(true);
    try {
      const res = await getSingleGallery(id);
      if (res?.status === "success") {
        setGallery(res?.gallery);
        document.title = `${res?.gallery?.title?.en}`;
        setSuggestedPosts(res?.suggestedGallery);
      } else {
        navigate("/gallery");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching gallery:", error);
      navigate("/gallery");
    }
  }, [id, navigate]);

  useEffect(() => {
    getPictures();
  }, [getPictures]);
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
                  {gallery?.title?.en}
                </h1>
                <span className="single-news-duo-left-top-auth-details">
                  <span className="sn-author">
                    By <b>{gallery?.postedBy?.fullName}</b>
                  </span>
                  <span className="sn-posted-date">
                    <i className="fa fa-calendar mr5"></i>
                    {moment(gallery?.createdAt).format("h:mm a, D MMMM YYYY")}
                  </span>
                  <span className="sn-posted-date">
                    <i className="fa-regular fa-face-smile mr5"></i>
                    {reactionsArray?.length} <span> Reactions</span>
                  </span>
                  <span className="sn-posted-date">
                    <i className="fa-regular fa-comments mr5"></i>
                    {commentsCount || gallery?.comments?.length || 0}
                    <span> Comments</span>
                  </span>
                  {gallery?.newsAudio?.en && <ReadButton news={gallery} />}
                </span>
                <div className="single-news-content-container">
                  {gallery?.galleryPics?.length > 0 && (
                    <img src={gallery?.galleryPics[0]} alt="pic" />
                  )}
                  <div
                    className="single-news-description main-font"
                    dangerouslySetInnerHTML={{
                      __html: gallery?.description?.en,
                    }}
                  />
                  <div className="all-pics-grid">
                    {gallery?.galleryPics?.map((pic, index) => (
                      <img
                        key={index}
                        src={pic}
                        alt=""
                        className="grid-pic"
                        onClick={() => {
                          setIsPopupOpen(true);
                          setCurrentImageIndex(index);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <NewsComments
                news={gallery}
                commentsCount={commentsCount}
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
            <div className="single-news-medias single-news-tags">
              <SectionTitle title={"Tags"} />
              <div className="sn-all-tags">
                <Link
                  to={`/search?q=${gallery?.name?.en}`}
                  className="sn-tag box-shadow"
                >
                  {gallery?.name?.en}
                </Link>
              </div>
            </div>
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
              {suggestedPosts?.slice(0, 9)?.map((collection) => (
                <Link
                  to={`/gallery/${collection?.newsId}`}
                  key={collection?._id}
                  className="latest-collection-card"
                  aria-label={`View ${collection?.title?.en}`}
                >
                  <div className="latest-collection-image-container">
                    <img
                      src={collection?.galleryPics[0]}
                      alt={collection?.title?.en}
                      loading="lazy"
                      className="latest-collection-image"
                    />
                  </div>
                  <div className="latest-collection-content">
                    <span className="latest-collection-category">
                      {collection?.category?.en}
                    </span>
                    <h3 className="latest-collection-title">
                      {collection?.title?.en}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
      <ScrollTop />

      {isPopupOpen && (
        <div className="popup-container">
          <i
            className="fa fa-xmark close-icon"
            onClick={() => setIsPopupOpen(false)}
          ></i>
          <i
            className="fa fa-angle-left angle left-angle"
            onClick={handlePrevImage}
          ></i>
          <i
            className="fa fa-angle-right angle right-angle"
            onClick={handleNextImage}
          ></i>
          <div className={`popup-img ${imgViewStyle}`}>
            <div className="popup-eye">
              <i className="fa fa-eye" onClick={handleEyeClick}></i>
            </div>
            <div className="popup-count">
              <span>
                {currentImageIndex + 1} / {gallery?.galleryPics?.length}
              </span>
            </div>
            <img
              src={gallery?.galleryPics[currentImageIndex]}
              alt={gallery?.name?.en}
              className="popup-image"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryShow;
