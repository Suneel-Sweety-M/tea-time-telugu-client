import React, { useRef, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getBreakingNews } from "../../helper/apis";

const BreakingNews = () => {
  const scrollContainerRef = useRef(null);
  const scrollIntervalRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [breakingNews, setBreakingNews] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  const allBreakingNewsPosts = async () => {
    // setIsLoading(true);
    try {
      const res = await getBreakingNews();
      if (res?.status === "success") {
        setBreakingNews(res?.news);
      }
    } catch (error) {
      console.log(error);
    }
    // setIsLoading(false);
  };

  // Check if scrolling is needed based on screen size
  const needsScrolling = useCallback(() => {
    if (windowWidth >= 1024) return breakingNews.length > 3; // Desktop
    if (windowWidth >= 768) return breakingNews.length > 2; // Tablet
    return breakingNews.length > 1; // Mobile
  }, [windowWidth, breakingNews.length]);

  // Handle window resize
  useEffect(() => {
    allBreakingNewsPosts();
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (!needsScrolling()) return;

    const startAutoScroll = () => {
      scrollIntervalRef.current = setInterval(() => {
        const container = scrollContainerRef.current;
        if (container) {
          const scrollAmount = getScrollAmount();
          container.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
          });

          // Reset to start if at end
          if (
            container.scrollLeft + container.clientWidth >=
            container.scrollWidth - 10
          ) {
            setTimeout(() => {
              container.scrollTo({
                left: 0,
                behavior: "smooth",
              });
            }, 2000);
          }
        }
      }, 10000); // 10 seconds
    };

    const getScrollAmount = () => {
      if (windowWidth >= 1024)
        return (
          scrollContainerRef.current?.querySelector(".breaking-news-post")
            ?.offsetWidth * 3 || 0
        );
      if (windowWidth >= 768)
        return (
          scrollContainerRef.current?.querySelector(".breaking-news-post")
            ?.offsetWidth * 2 || 0
        );
      return (
        scrollContainerRef.current?.querySelector(".breaking-news-post")
          ?.offsetWidth || 0
      );
    };

    startAutoScroll();

    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [breakingNews.length, windowWidth, needsScrolling]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = getScrollAmount();
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const getScrollAmount = () => {
    if (windowWidth >= 1024)
      return (
        scrollContainerRef.current?.querySelector(".breaking-news-post")
          ?.offsetWidth * 3 || 0
      );
    if (windowWidth >= 768)
      return (
        scrollContainerRef.current?.querySelector(".breaking-news-post")
          ?.offsetWidth * 2 || 0
      );
    return (
      scrollContainerRef.current?.querySelector(".breaking-news-post")
        ?.offsetWidth || 0
    );
  };

  return (
    <div className="breaking-news-container">
      <div
        className={`breaking-news-wrapper ${
          needsScrolling() ? "needs-scrolling" : ""
        }`}
      >
        {needsScrolling() && (
          <>
            <button
              className="scroll-button left"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
            >
              <FaChevronLeft />
            </button>
            <button
              className="scroll-button right"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
            >
              <FaChevronRight />
            </button>
          </>
        )}

        <div ref={scrollContainerRef} className="breaking-news-section">
          {breakingNews.map((post) => (
            <article key={post?._id} className="breaking-news-post">
              <Link
                to={`/${post?.category}/${post?.newsId}`}
                className="breaking-news-link"
              >
                <figure className="breaking-news-image-container">
                  <img
                    src={post?.mainUrl}
                    alt={post?.title}
                    loading="lazy"
                    className="breaking-news-image"
                  />
                </figure>
                <div className="breaking-news-content">
                  <span className="breaking-news-category">
                    {/* {post?.category} */} Breaking News
                  </span>
                  <h3 className="breaking-news-title">{post?.title}</h3>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;
