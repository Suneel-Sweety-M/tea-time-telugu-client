import React, { useEffect, useState, useMemo, useCallback } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import TabTitle from "../components/titles/TabTitle";
import { toast } from "react-toastify";
import { getSearchNews } from "../helper/apis";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SectionTitle from "../components/titles/SectionTitle";
import moment from "moment";
import ScrollTop from "../components/scroll-top/ScrollTop";

const Search = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(search);
  const q = queryParams.get("q") || "";

  const [searchText, setSearchText] = useState(q);
  const [debouncedSearchText, setDebouncedSearchText] = useState(q);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const limit = 9;

  const categories = useMemo(
    () => [
      { key: "news", title: "General" },
      { key: "politics", title: "Politics" },
      { key: "movies", title: "Movies" },
      { key: "ott", title: "OTT" },
      { key: "gossips", title: "Gossips" },
      { key: "reviews", title: "Reviews" },
      { key: "sports", title: "Sports" },
      { key: "shows", title: "Shows" },
      { key: "gallery", title: "Gallery" },
      { key: "videos", title: "Videos" },
    ],
    []
  );

  const [searchData, setSearchData] = useState(() =>
    categories.reduce((acc, c) => {
      acc[c.key] = { items: [], skip: 0, hasMore: true };
      return acc;
    }, {})
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchText]);

  const fetchCategoryResults = useCallback(
    async (categoryKey, term, customSkip = 0) => {
      try {
        setIsLoading(true);
        const res = await getSearchNews(term, customSkip, limit);
        if (res?.status === "success") {
          const categoryResult = res.data[categoryKey];
          if (categoryResult) {
            setSearchData((prev) => {
              const old = prev[categoryKey];
              const newSkip = customSkip + limit;
              return {
                ...prev,
                [categoryKey]: {
                  items:
                    customSkip === 0
                      ? categoryResult.items
                      : [...old.items, ...categoryResult.items],
                  skip: newSkip,
                  hasMore: newSkip < categoryResult.total,
                },
              };
            });
          }
        } else {
          toast.error(res?.message || `Failed to fetch ${categoryKey}`);
        }
      } catch (error) {
        console.error(error);
        toast.error(`Error fetching ${categoryKey}`);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const fetchAllCategories = useCallback(
    (term) => {
      setSearchData(
        categories.reduce((acc, c) => {
          acc[c.key] = { items: [], skip: 0, hasMore: true };
          return acc;
        }, {})
      );
      categories.forEach((cat) => {
        fetchCategoryResults(cat.key, term, 0);
      });
    },
    [categories, fetchCategoryResults]
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchText.trim()) {
      toast.info("Please enter a search term!");
      return;
    }
    setHasSearched(true);
    navigate(`/search?q=${encodeURIComponent(searchText)}`);
    fetchAllCategories(searchText);
  };

  // useEffect(() => {
  //   if (debouncedSearchText.trim()) {
  //     setHasSearched(true);
  //     fetchAllCategories(debouncedSearchText);
  //   }
  // }, [debouncedSearchText, fetchAllCategories]);

  const renderPosts = (categoryKey, title) => {
    const cat = searchData[categoryKey];
    if (!cat.items.length) return null;
    return (
      <div className="videos-category-container" key={categoryKey}>
        <SectionTitle title={title} />
        <div className="all-category-posts-container">
          {cat.items.map((item) => {
            // Telugu for display, English for SEO/link
            const displayTitle = item.title?.en || item.title?.en || "Untitled";
            const seoTitle = item.title?.en || displayTitle;

            return (
              <Link
                key={item._id}
                to={
                  categoryKey === "gallery"
                    ? `/gallery/${item.newsId}`
                    : categoryKey === "videos"
                    ? `/videos/v/${item.newsId}`
                    : `/${item.category?.en || "news"}/${item.newsId}`
                }
                className="single-category-post"
              >
                <div className="video-thumbnail-container">
                  <img
                    src={
                      categoryKey === "gallery"
                        ? item.galleryPics?.[0]
                        : item.mainUrl
                    }
                    alt={seoTitle}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x200?text=Image+Not+Available";
                    }}
                  />
                  {categoryKey === "videos" && (
                    <div className="play-icon">
                      <svg viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="single-category-post-texts">
                  <span className="video-meta">
                    {moment(item.createdAt).format("Do MMM YYYY")}
                  </span>
                  <h3 className="video-title">{displayTitle}</h3>
                </div>
              </Link>
            );
          })}
        </div>
        {cat.hasMore && (
          <button
            className="load-more-btn"
            onClick={() =>
              fetchCategoryResults(categoryKey, debouncedSearchText, cat.skip)
            }
          >
            {isLoading ? (
              <>
                <span className="btn-text">Loading...</span>
                <span className="btn-icon spinner"></span>
              </>
            ) : (
              <>
                <span className="btn-text">Load More</span>
                <span className="btn-icon">
                  <i className="fa-solid fa-arrow-rotate-right"></i>
                </span>
              </>
            )}
          </button>
        )}
      </div>
    );
  };

  const hasResults = Object.values(searchData).some(
    (cat) => cat.items.length > 0
  );

  useEffect(() => {
    document.title = `Search ${debouncedSearchText}`;
  }, [debouncedSearchText]);

  return (
    <>
      <Navbar />
      <div className="search-page main-page">
        <TabTitle title="Search" />
        <div className="search-page-container">
          <div className="search-container-top">
            <form
              onSubmit={handleSearch}
              className="search-container-input-box"
            >
              <input
                type="text"
                placeholder="Search here..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                aria-label="Search input"
              />
              <button
                type="submit"
                className="btn search-btn"
                disabled={isLoading}
              >
                {isLoading ? "Searching..." : "Search"}
              </button>
            </form>
            {debouncedSearchText && (
              <h1 className="search-text text-capital main-padding">
                Results for <span>{debouncedSearchText}</span>
              </h1>
            )}
          </div>

          {isLoading &&
          Object.values(searchData).every((c) => c.items.length === 0) ? (
            <div className="all-category-posts-container">
              {Array.from({ length: 9 }).map((_, i) => (
                <div className="single-category-post box-shadow" key={i}>
                  <img
                    src="https://res.cloudinary.com/demmiusik/image/upload/v1729620426/post-default-pic_jbf1gl.png"
                    alt="Loading placeholder"
                  />
                </div>
              ))}
            </div>
          ) : hasResults ? (
            <div className="all-videos-container">
              {categories.map((cat) => renderPosts(cat.key, cat.title))}
            </div>
          ) : (
            hasSearched && (
              <p className="text-capital main-padding text-center">
                No results found for "{debouncedSearchText}"
              </p>
            )
          )}
        </div>
      </div>
      <Footer />
      <ScrollTop />
    </>
  );
};

export default Search;
