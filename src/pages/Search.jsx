import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import TabTitle from "../components/titles/TabTitle";
import { toast } from "react-toastify";
import { getSearchNews } from "../helper/apis";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SectionTitle from "../components/titles/SectionTitle";
import moment from "moment";

const Search = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(search);
  const q = queryParams.get("q");

  const [searchText, setSearchText] = useState(q || "");
  const [searchData, setSearchData] = useState({});
  const [visiblePosts, setVisiblePosts] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Debounced search text for live search
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);

  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchText]);

  // Function to handle search submission
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchText.trim()) {
      toast.info("Please enter a search term!");
      return;
    }
    setHasSearched(true);
    navigate(`/search?q=${encodeURIComponent(searchText)}`);
  };

  // Fetch search results based on query
  const fetchSearchResults = useCallback(async () => {
    if (debouncedSearchText.trim()) {
      setIsLoading(true);
      try {
        const res = await getSearchNews(debouncedSearchText);
        if (res?.status === "success") {
          setSearchData(res?.data || {});
        } else {
          toast.error(res?.message || "Failed to fetch search results");
          setSearchData({});
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        toast.error("Something went wrong while fetching results!");
        setSearchData({});
      } finally {
        setIsLoading(false);
      }
    } else {
      setSearchData({});
    }
  }, [debouncedSearchText]);

  // Update document title
  useEffect(() => {
    document.title = debouncedSearchText
      ? `Search - ${debouncedSearchText}`
      : "Search";
  }, [debouncedSearchText]);

  // Fetch results when debounced search text changes
  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  // Function to load more posts
  const loadMorePosts = () => {
    setVisiblePosts((prev) => prev + 8);
  };

  const renderPosts = (category) => {
    const categoryData = searchData[category] || [];

    if (categoryData.length === 0) return null;

    return (
      <div className="videos-category-container" key={category}>
        <SectionTitle
          title={category.charAt(0).toUpperCase() + category.slice(1)}
          nav={`/${category}`}
        />
        <div className="all-category-posts-container">
          {categoryData.slice(0, visiblePosts).map((item) => (
            <Link
              key={item?._id}
              to={`/${item?.category}/${item?._id}`}
              className="single-category-post"
              aria-label={`View ${item?.title}`}
            >
              <div className="video-thumbnail-container">
                <img
                  src={
                    category === "gallery"
                      ? item?.galleryPics[0]?.url
                      : item?.mainUrl
                  }
                  alt={item?.title}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x200?text=Image+Not+Available";
                  }}
                />
                {category === "videos" && (
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
                <h3 className="video-title">{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>
        {visiblePosts < categoryData.length && (
          <button className="load-more-btn" onClick={loadMorePosts}>
            <span className="btn-text">Load More</span>
            <span className="btn-icon">
              <i className="fa-solid fa-arrow-rotate-right"></i>
            </span>
          </button>
        )}
      </div>
    );
  };

  const categories = [
    "news",
    "politics",
    "movies",
    "ott",
    "gallery",
    "videos",
    "gossips",
    "reviews",
    "collections",
    "shows",
  ];

  const hasResults = Object.values(searchData).some(
    (category) => category?.length > 0
  );

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
                aria-label="Search"
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

          {isLoading ? (
            <div className="all-category-posts-container">
              {[...Array(12)].map((_, index) => (
                <div className="single-category-post box-shadow" key={index}>
                  <img
                    src="https://res.cloudinary.com/demmiusik/image/upload/v1729620426/post-default-pic_jbf1gl.png"
                    alt="Loading placeholder"
                  />
                </div>
              ))}
            </div>
          ) : hasResults ? (
            <div className="all-videos-container">
              {categories.map((category) => renderPosts(category))}
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
    </>
  );
};

Search.propTypes = {
  // Add any prop types if needed
};

export default Search;
