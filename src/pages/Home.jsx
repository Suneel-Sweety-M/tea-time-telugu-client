import React, { useEffect, useState } from "react";
import "../components/home/home.css";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Featured from "../components/home/Featured";
import TopNine from "../components/home/TopNine";
import Trends from "../components/home/Trends";
import MovieSchedules from "../components/home/MovieSchedules";
import MovieCollections from "../components/home/MovieCollections";
import GridView from "../components/home/GridView";
import HomeGallery from "../components/home/HomeGallery";
import Trailers from "../components/trailers/Trailers";
import MostViewed from "../components/home/MostViewed";
import HomeReviews from "../components/home/HomeReviews";
import LatestCollection from "../components/home/LatestCollection";
import LatestStories from "../components/home/LatestStories";
import CategoryTop from "../components/home/CategoryTop";
import Discover from "../components/home/Discover";
import PopupPoster from "../components/home/PopupPoster";
import { toast } from "react-toastify";
import { getHomeLongAd, getHomeShortAd, getMoviePoster } from "../helper/apis";

const Home = () => {
  const [poster, setPoster] = useState(false);

  const closePopup = () => {
    setPoster(false);
    const currentTime = new Date().getTime();
    localStorage.setItem("popupLastShown", currentTime);
  };

  const [moviePosterImg, setMoviePosterImg] = useState("");
  const [moviePosterLink, setMoviePosterLink] = useState("");
  const [homeLongAdImg, setHomeLongAdImg] = useState("");
  const [homeLongAdLink, setHomeLongAdLink] = useState("");
  const [homeShortAdImg, setHomeShortAdImg] = useState("");
  const [homeShortAdLink, setHomeShortAdLink] = useState("");

  const handleGetMoviePoster = async () => {
    const res = await getMoviePoster();
    if (res?.status === "success") {
      setMoviePosterImg(res?.moviePoster?.img);
      setMoviePosterLink(res?.moviePoster?.link);
    } else {
      toast.error(res?.message);
    }
  };

  const handleGetHomeLongAd = async () => {
    const res = await getHomeLongAd();

    if (res?.status === "success") {
      setHomeLongAdImg(res?.homeLongAd?.img);
      setHomeLongAdLink(res?.homeLongAd?.link);
    } else {
      toast.error(res?.message);
    }
  };

  const handleGetHomeShortAd = async () => {
    const res = await getHomeShortAd();

    if (res?.status === "success") {
      setHomeShortAdImg(res?.homeShortAd?.img);
      setHomeShortAdLink(res?.homeShortAd?.link);
    } else {
      toast.error(res?.message);
    }
  };

  useEffect(() => {
    const lastShownTime = localStorage.getItem("popupLastShown");
    const currentTime = new Date().getTime();

    if (!lastShownTime || currentTime - lastShownTime >= 600000) {
      setPoster(true);
      const timeoutId = setTimeout(() => {
        closePopup();
      }, 10000);
      return () => clearTimeout(timeoutId);
    }
    document.title = "Telugu News on AP and TS Politics, Movies and Gossips";
    handleGetMoviePoster();
    handleGetHomeLongAd();
    handleGetHomeShortAd();
  }, []);
  return (
    <>
      <Navbar />
      <div className="home-page main-page main-padding">
        <Featured />
        <TopNine />
        <div className="duo-content">
          <div className="duo-content-left">
            <Trends />
            <GridView />
          </div>
          <div className="duo-content-right">
            {moviePosterImg && (
              <a href={moviePosterLink} target="blank">
                <img src={moviePosterImg} alt="ad-img" className="ad-img" />
              </a>
            )}
            <MovieSchedules />
            <MovieCollections />
          </div>
        </div>
        <HomeGallery />
        <Trailers />
        <MostViewed />

        <a href={homeLongAdLink} target="blank" className="">
          <img
            src={
              homeLongAdImg ||
              "https://res.cloudinary.com/demmiusik/image/upload/v1741353445/Ad1_ykrrgv.png"
            }
            alt="ad-img"
            className="ad-img"
          />
        </a>

        <HomeReviews />
        <LatestCollection />
        <div className="duo2-content">
          <div className="duo2-content-left">
            <LatestStories />

            <a href={homeShortAdLink} target="blank" className="">
              <img
                src={
                  homeShortAdImg ||
                  "https://res.cloudinary.com/demmiusik/image/upload/v1741353625/Ad2_jpiggx.png"
                }
                alt="ad-img"
                className="ad-img"
              />
            </a>
          </div>
          <div className="duo2-content-right">
            <CategoryTop />
          </div>
        </div>
        <Discover />
      </div>
      <Footer />

      {poster && <PopupPoster closePopup={closePopup} />}
    </>
  );
};

export default Home;
