import React, { useEffect, useState } from "react";
import "../components/home/home.css";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Featured from "../components/home/Featured";
import TopNine from "../components/home/TopNine";
import Trends from "../components/home/Trends";
import { Link } from "react-router-dom";
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
import { getMoviePoster } from "../helper/apis";

const Home = () => {
  const [poster, setPoster] = useState(false);

  const closePopup = () => {
    setPoster(false);
    const currentTime = new Date().getTime();
    localStorage.setItem("popupLastShown", currentTime);
  };

  const [moviePosterImg, setMoviePosterImg] = useState("");
  // const [moviePosterLink, setMoviePosterLink] = useState("");

  const handleGetMoviePoster = async () => {
    const res = await getMoviePoster();
    if (res?.status === "success") {
      setMoviePosterImg(res?.moviePoster?.img);
      // setMoviePosterLink(res?.moviePoster?.link);
    } else {
      toast.error(res?.message);
    }
  };

  useEffect(() => {
    const lastShownTime = localStorage.getItem("popupLastShown");
    const currentTime = new Date().getTime();

    if (!lastShownTime || currentTime - lastShownTime >= 600000) {
      setPoster(true);
    }
    document.title = "Telugu News on AP and TS Politics, Movies and Gossips";
    handleGetMoviePoster();
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
              <Link to={`/`}>
                <img src={moviePosterImg} alt="ad-img" className="ad-img" />
              </Link>
            )}
            <MovieSchedules />
            <MovieCollections />
          </div>
        </div>
        <HomeGallery />
        <Trailers />
        <MostViewed />
        <a href="https://eagleiitech.com" target="blank" className="">
          <img
            src="https://res.cloudinary.com/demmiusik/image/upload/v1741353445/Ad1_ykrrgv.png"
            alt="ad-img"
            className="ad-img"
          />
        </a>
        <HomeReviews />
        <LatestCollection />
        <div className="duo2-content">
          <div className="duo2-content-left">
            <LatestStories />
            <a href="https://eagleiitech.com" target="blank" className="">
              <img
                src="https://res.cloudinary.com/demmiusik/image/upload/v1741353625/Ad2_jpiggx.png"
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
