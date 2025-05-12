import React, { useEffect, useState } from "react";
import {
  getMoviePoster,
  getPopupPoster,
  setMoviePoster,
  setPopupPoster,
} from "../../../helper/apis";
import { toast } from "react-toastify";

const DasAdsPosters = () => {
  const [popupPosterImg, setPopupPosterImg] = useState("");
  const [popupPosterLink, setPopupPosterLink] = useState("");
  const [moviePosterImg, setMoviePosterImg] = useState("");
  const [moviePosterLink, setMoviePosterLink] = useState("");

  const handleGetMoviePoster = async () => {
    const res = await getMoviePoster();
    if (res?.status === "success") {
      setMoviePosterImg(res?.moviePoster?.img);
      setMoviePosterLink(res?.moviePoster?.link);
    } else {
      toast.error(res?.message);
    }
  };

  const handleGetPopupPoster = async () => {
    const res = await getPopupPoster();
    if (res?.status === "success") {
      setPopupPosterImg(res?.popupPoster?.img);
      setPopupPosterLink(res?.popupPoster?.link);
    } else {
      toast.error(res?.message);
    }
  };

  const handleMoviePoster = async () => {
    const res = await setMoviePoster({
      img: moviePosterImg,
      link: moviePosterLink,
    });
    if (res?.status === "success") {
      toast.success(res?.message);
    } else {
      toast.success(res?.message);
    }
  };

  const handlePopupPoster = async () => {
    const res = await setPopupPoster({
      img: popupPosterImg,
      link: popupPosterLink,
    });
    if (res?.status === "success") {
      toast.success(res?.message);
    } else {
      toast.success(res?.message);
    }
  };

  useEffect(() => {
    handleGetPopupPoster();
    handleGetMoviePoster();
  }, []);

  return (
    <>
      <div className="mt20">
        <div className="das-news-container">
          <div className="das-news-container-title">Posters</div>
          <div className="das-posters-container">
            <div className="das-poster-section">
              <div className="das-poster-section-top py10">
                <p>
                  <b className="color-main-org">Popup Poster</b> (1000px X
                  600px)
                </p>
                {/* <img src="/assets/Ad-top.png" alt="" /> */}
              </div>
              <div className="das-poster-section-bottom">
                <div className="other-details">
                  <div className="wns-box py10">
                    <h3 className="">Image Src</h3>
                    <input
                      name=""
                      id=""
                      className="br5"
                      value={popupPosterImg}
                      onChange={(e) => setPopupPosterImg(e.target.value)}
                    />
                  </div>
                  <div className="wns-box py10">
                    <h3 className="">Link</h3>
                    <input
                      name=""
                      id=""
                      className="br5"
                      value={popupPosterLink}
                      onChange={(e) => setPopupPosterLink(e.target.value)}
                    />
                  </div>
                  <div className="mt20">
                    <button
                      className="btn save-btn"
                      onClick={() => handlePopupPoster()}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="das-poster-section">
              <div className="das-poster-section-top py10">
                <p>
                  <b className="color-main-org">Movie Poster</b> (365px X 457px)
                </p>
                {/* <img src="/assets/Ad-top.png" alt="" /> */}
              </div>
              <div className="das-poster-section-bottom">
                <div className="other-details">
                  <div className="wns-box py10">
                    <h3 className="">Image Src</h3>
                    <input
                      name=""
                      id=""
                      className="br5"
                      value={moviePosterImg}
                      onChange={(e) => setMoviePosterImg(e.target.value)}
                    />
                  </div>
                  <div className="wns-box py10">
                    <h3 className="">Link</h3>
                    <input
                      name=""
                      id=""
                      className="br5"
                      value={moviePosterLink}
                      onChange={(e) => setMoviePosterLink(e.target.value)}
                    />
                  </div>
                  <div className="mt20">
                    <button
                      className="btn save-btn"
                      onClick={() => handleMoviePoster()}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="das-news-container">
          <div className="das-news-container-title">Ads</div>
          <div className="das-posters-container">
            <div className="das-poster-section">
              <div className="das-poster-section-top py10">
                <p>
                  <b className="color-main-org">Navbar</b> Ad (748px X 78px)
                </p>
                {/* <img src="/assets/Ad-top.png" alt="" /> */}
              </div>
              <div className="das-poster-section-bottom">
                <div className="other-details">
                  <div className="wns-box py10">
                    <h3 className="">Image Src</h3>
                    <input
                      name=""
                      id=""
                      className="br5"
                      //   value={category}
                      //   onChange={(e) => setCategory(e.target.value)}
                    />
                  </div>
                  <div className="wns-box py10">
                    <h3 className="">Link</h3>
                    <input
                      name=""
                      id=""
                      className="br5"
                      //   value={subCategory}
                      //   onChange={(e) => setSubCategory(e.target.value)}
                    />
                  </div>
                  <div className="mt20">
                    <button className="btn save-btn">Save</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="das-poster-section">
              <div className="das-poster-section-top py10">
                <p>
                  <b className="color-main-org">Home</b> Popup Ad (1000px X
                  600px)
                </p>
                {/* <img src="/assets/Ad-top.png" alt="" /> */}
              </div>
              <div className="das-poster-section-bottom">
                <div className="other-details">
                  <div className="wns-box py10">
                    <h3 className="">Image Src</h3>
                    <input
                      name=""
                      id=""
                      className="br5"
                      //   value={category}
                      //   onChange={(e) => setCategory(e.target.value)}
                    />
                  </div>
                  <div className="wns-box py10">
                    <h3 className="">Link</h3>
                    <input
                      name=""
                      id=""
                      className="br5"
                      //   value={subCategory}
                      //   onChange={(e) => setSubCategory(e.target.value)}
                    />
                  </div>
                  <div className="mt20">
                    <button className="btn save-btn">Save</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="das-poster-section">
              <div className="das-poster-section-top py10">
                <p>
                  <b className="color-main-org">Home</b> Ad (1200px X 190px)
                </p>
                {/* <img src="/assets/Ad-top.png" alt="" /> */}
              </div>
              <div className="das-poster-section-bottom">
                <div className="other-details">
                  <div className="wns-box py10">
                    <h3 className="">Image Src</h3>
                    <input
                      name=""
                      id=""
                      className="br5"
                      //   value={category}
                      //   onChange={(e) => setCategory(e.target.value)}
                    />
                  </div>
                  <div className="wns-box py10">
                    <h3 className="">Link</h3>
                    <input
                      name=""
                      id=""
                      className="br5"
                      //   value={subCategory}
                      //   onChange={(e) => setSubCategory(e.target.value)}
                    />
                  </div>
                  <div className="mt20">
                    <button className="btn save-btn">Save</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="das-poster-section">
              <div className="das-poster-section-top py10">
                <p>
                  <b className="color-main-org">Home</b> Ad (336px X 280px)
                </p>
                {/* <img src="/assets/Ad-top.png" alt="" /> */}
              </div>
              <div className="das-poster-section-bottom">
                <div className="other-details">
                  <div className="wns-box py10">
                    <h3 className="">Image Src</h3>
                    <input
                      name=""
                      id=""
                      className="br5"
                      //   value={category}
                      //   onChange={(e) => setCategory(e.target.value)}
                    />
                  </div>
                  <div className="wns-box py10">
                    <h3 className="">Link</h3>
                    <input
                      name=""
                      id=""
                      className="br5"
                      //   value={subCategory}
                      //   onChange={(e) => setSubCategory(e.target.value)}
                    />
                  </div>
                  <div className="mt20">
                    <button className="btn save-btn">Save</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="das-poster-section">
              <div className="das-poster-section-top py10">
                <p>
                  <b className="color-main-org">Category</b> Ad (1200px X 100px)
                </p>
                {/* <img src="/assets/Ad-top.png" alt="" /> */}
              </div>
              <div className="das-poster-section-bottom">
                <div className="other-details">
                  <div className="wns-box py10">
                    <h3 className="">Image Src</h3>
                    <input
                      name=""
                      id=""
                      className="br5"
                      //   value={category}
                      //   onChange={(e) => setCategory(e.target.value)}
                    />
                  </div>
                  <div className="wns-box py10">
                    <h3 className="">Link</h3>
                    <input
                      name=""
                      id=""
                      className="br5"
                      //   value={subCategory}
                      //   onChange={(e) => setSubCategory(e.target.value)}
                    />
                  </div>
                  <div className="mt20">
                    <button className="btn save-btn">Save</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="das-poster-section">
              <div className="das-poster-section-top py10">
                <p>
                  <b className="color-main-org">Category</b> Ad (1200px X 190px)
                </p>
                {/* <img src="/assets/Ad-top.png" alt="" /> */}
              </div>
              <div className="das-poster-section-bottom">
                <div className="other-details">
                  <div className="wns-box py10">
                    <h3 className="">Image Src</h3>
                    <input
                      name=""
                      id=""
                      className="br5"
                      //   value={category}
                      //   onChange={(e) => setCategory(e.target.value)}
                    />
                  </div>
                  <div className="wns-box py10">
                    <h3 className="">Link</h3>
                    <input
                      name=""
                      id=""
                      className="br5"
                      //   value={subCategory}
                      //   onChange={(e) => setSubCategory(e.target.value)}
                    />
                  </div>
                  <div className="mt20">
                    <button className="btn save-btn">Save</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="das-poster-section">
              <div className="das-poster-section-top py10">
                <p>
                  <b className="color-main-org">Single News</b> Ad (336px X
                  280px)
                </p>
                {/* <img src="/assets/Ad-top.png" alt="" /> */}
              </div>
              <div className="das-poster-section-bottom">
                <div className="other-details">
                  <div className="wns-box py10">
                    <h3 className="">Image Src</h3>
                    <input
                      name=""
                      id=""
                      className="br5"
                      //   value={category}
                      //   onChange={(e) => setCategory(e.target.value)}
                    />
                  </div>
                  <div className="wns-box py10">
                    <h3 className="">Link</h3>
                    <input
                      name=""
                      id=""
                      className="br5"
                      //   value={subCategory}
                      //   onChange={(e) => setSubCategory(e.target.value)}
                    />
                  </div>
                  <div className="mt20">
                    <button className="btn save-btn">Save</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="das-poster-section">
              <div className="das-poster-section-top py10">
                <p>
                  <b className="color-main-org">Single Video</b> Ad (348px X
                  348px)
                </p>
                {/* <img src="/assets/Ad-top.png" alt="" /> */}
              </div>
              <div className="das-poster-section-bottom">
                <div className="other-details">
                  <div className="wns-box py10">
                    <h3 className="">Image Src</h3>
                    <input
                      name=""
                      id=""
                      className="br5"
                      //   value={category}
                      //   onChange={(e) => setCategory(e.target.value)}
                    />
                  </div>
                  <div className="wns-box py10">
                    <h3 className="">Link</h3>
                    <input
                      name=""
                      id=""
                      className="br5"
                      //   value={subCategory}
                      //   onChange={(e) => setSubCategory(e.target.value)}
                    />
                  </div>
                  <div className="mt20">
                    <button className="btn save-btn">Save</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DasAdsPosters;
