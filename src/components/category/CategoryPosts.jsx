import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getCategoryNewsPosts } from "../../helper/apis";
import { toast } from "react-toastify";
import moment from "moment";

const POSTS_PER_PAGE = 12;

const CategoryPosts = () => {
  const { category } = useParams();
  const { search } = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(search);
  const subcategory = queryParams.get("subcategory");
  const pageParam = parseInt(queryParams.get("page"), 10);

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 🔁 Sync URL ?page=... with state
  useEffect(() => {
    if (!isNaN(pageParam) && pageParam > 0) {
      setCurrentPage(pageParam);
    } else {
      setCurrentPage(1);
    }
  }, [pageParam]);

  // 📡 Fetch News from backend
  const fetchNewsByCategory = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getCategoryNewsPosts(
        category,
        subcategory,
        currentPage || 1,
        POSTS_PER_PAGE
      );
      document.title = `Tea Time Telugu - ${category?.toUpperCase()}`;
      if (res?.status === "success") {
        setNews(res.news || []);
        setTotalPages(res?.pagination?.totalPages || 1);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching news.");
    } finally {
      setLoading(false);
    }
  }, [category, subcategory, currentPage]);

  useEffect(() => {
    fetchNewsByCategory();
    window.scrollTo(0, 0);
  }, [fetchNewsByCategory]);

  // 🔀 Navigate to page
  const goToPage = (page) => {
    const targetPage = Math.max(1, Math.min(page, totalPages));
    const searchParams = new URLSearchParams();
    if (subcategory) searchParams.set("subcategory", subcategory);
    searchParams.set("page", targetPage);
    navigate(`/${category}?${searchParams.toString()}`);
  };

  const handlePrevious = () => goToPage(currentPage - 1);
  const handleNext = () => goToPage(currentPage + 1);

  const renderPageNumbers = () => (
    <>
      {totalPages > 1 && (
        <span onClick={handlePrevious}>
          <i className="fa fa-angle-left"></i>
        </span>
      )}
      {totalPages > 1 && (
        <span className="currentPage-text">
          Page {currentPage} of {totalPages}
        </span>
      )}
      {totalPages > 1 && (
        <span onClick={handleNext}>
          <i className="fa fa-angle-right"></i>
        </span>
      )}
    </>
  );

  return (
    <div className="category-posts-container">
      {loading ? (
        <div className="latest-collection-grid">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="latest-collection-card">
              <div className="latest-collection-image-container">
                <img
                  src="https://res.cloudinary.com/demmiusik/image/upload/v1729620426/post-default-pic_jbf1gl.png"
                  alt="loading"
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
        <div className="category-posts-section">
          {news?.length > 0 ? (
            news.map((post) => (
              <Link
                to={`/${post?.category?.en}/${post?.newsId}`}
                key={post?._id}
                className="single-category-post box-shadow"
              >
                <div className="single-category-post-image-container">
                  <img
                    src={
                      post?.mainUrl ||
                      "https://res.cloudinary.com/demmiusik/image/upload/v1729620426/post-default-pic_jbf1gl.png"
                    }
                    alt={post.title?.en}
                  />
                </div>
                <div className="single-category-post-texts">
                  <span className="single-category-post-category">
                    {post?.category?.en} /{" "}
                    {moment(post?.createdAt).format("MMM DD, YYYY")}
                  </span>
                  <h3 className="single-category-post-title">
                    {post?.title?.en}
                  </h3>
                </div>
              </Link>
            ))
          ) : (
            <p>No news found in this category.</p>
          )}
        </div>
      )}

      <div className="news-pagenations">
        <div className="news-page-count">{renderPageNumbers()}</div>
      </div>
    </div>
  );
};

export default CategoryPosts;
