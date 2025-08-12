import React, { useEffect, useState, useCallback } from "react";
import "../components/gallery/gallery.css";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loadGalleryPosts } from "../helper/apis";
import { toast } from "react-toastify";
import ScrollTop from "../components/scroll-top/ScrollTop";

const POSTS_PER_PAGE = 12;

const Gallery = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const pageParam = parseInt(queryParams.get("page"), 10);

  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(pageParam || 1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchGallery = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await loadGalleryPosts(currentPage, POSTS_PER_PAGE);
      document.title = "Tea Time Telugu - GALLERY";
      if (res?.status === "success") {
        setGallery(res?.gallery || []);
        setTotalPages(Math.ceil((res?.total || 0) / POSTS_PER_PAGE));
      } else {
        toast.error(res?.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error fetching gallery posts:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchGallery();
    window.scrollTo(0, 0);
  }, [fetchGallery]);

  useEffect(() => {
    if (!isNaN(pageParam) && pageParam > 0) {
      setCurrentPage(pageParam);
    } else {
      setCurrentPage(1);
    }
  }, [pageParam]);

  const goToPage = (page) => {
    const target = Math.max(1, Math.min(page, totalPages));
    navigate(`/gallery?page=${target}`);
  };

  const handlePrevious = () => goToPage(currentPage - 1);
  const handleNext = () => goToPage(currentPage + 1);

  const renderPagination = () => (
    <div className="news-pagenations">
      <div className="news-page-count">
        {totalPages > 1 && (
          <span onClick={handlePrevious}>
            <i className="fa fa-angle-left"></i>
          </span>
        )}
        <span className="currentPage-text">
          Page {currentPage} of {totalPages}
        </span>
        {totalPages > 1 && (
          <span onClick={handleNext}>
            <i className="fa fa-angle-right"></i>
          </span>
        )}
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="gallery-page main-page">
        <div className="gallery-title-container">
          <h1 className="text-capital">Gallery</h1>
        </div>

        {!isLoading ? (
          <div className="gallery-section">
            {gallery.length > 0 ? (
              gallery.map((item) => (
                <Link
                  to={`/gallery/${item?.newsId}`}
                  className="gallery-card"
                  key={item?._id}
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
              ))
            ) : (
              <p>No gallery items found.</p>
            )}
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

        {renderPagination()}
      </div>
      <Footer />
      <ScrollTop />
    </>
  );
};

export default Gallery;
