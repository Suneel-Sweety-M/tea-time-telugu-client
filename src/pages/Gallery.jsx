import React, { useEffect, useState } from "react";
import "../components/gallery/gallery.css";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { Link } from "react-router-dom";
import { getGalleryPosts } from "../helper/apis";
import { toast } from "react-toastify";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visiblePosts, setVisiblePosts] = useState(9);

  const loadMorePosts = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 8);
  };

  useEffect(() => {
    const fetchPictures = async () => {
      document.title = "Tea Time Telugu - GALLERY";
      setIsLoading(true);
      try {
        const res = await getGalleryPosts();
        if (res?.status === "success") {
          setGallery(res?.gallery || []);
        } else {
          toast.error(res?.message || "Something went wrong!");
        }
        setIsLoading(false);
      } catch (error) {
        toast.error("Something went wrong!");
        setIsLoading(false);
        console.error("Error fetching gallery posts:", error);
      }
    };

    fetchPictures();
  }, []);

  return (
    <>
      <Navbar />
      <div className="gallery-page main-page">
        <div className="gallery-title-container">
          <h1 className="text-capital">Gallery</h1>
        </div>
        {!isLoading ? (
          <div className="gallery-section">
            {gallery.length > 0 &&
              gallery?.slice(0, visiblePosts)?.map((item) => (
                <Link
                  to={`/gallery/${item?._id}`}
                  className="gallery-card"
                  key={item?._id}
                  aria-label={`View ${item?.name} gallery`}
                >
                  <div className="gallery-image-container">
                    <img
                      src={
                        item?.galleryPics[0]?.url ||
                        "https://res.cloudinary.com/demmiusik/image/upload/v1729620719/EET_cyxysf.png"
                      }
                      alt={item?.name}
                      loading="lazy"
                    />
                  </div>
                  <span className="gallery-name">{item?.name}</span>
                </Link>
              ))}
          </div>
        ) : (
          <div className="gallery-section">
            {[...Array(9)].map((_, index) => (
              <div className="gallery-card" key={index}>
                <div className="gallery-image-container">
                  <img
                    src="https://res.cloudinary.com/demmiusik/image/upload/v1729620719/EET_cyxysf.png"
                    alt="Placeholder"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        {visiblePosts < gallery?.length && (
          <button className="load-more-btn" onClick={loadMorePosts}>
            <span className="btn-text">Load More</span>
            <span className="btn-icon">
              <i className="fa-solid fa-arrow-rotate-right"></i>
            </span>
          </button>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Gallery;
