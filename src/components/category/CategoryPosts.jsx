import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getFilteredNewsPosts } from "../../helper/apis";
import { toast } from "react-toastify";
import moment from "moment";

const POSTS_PER_PAGE = 12;

const CategoryPosts = () => {
  const { category } = useParams();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const subcategory = queryParams.get("subcategory");

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchNewsByCategory = useCallback(async () => {
    try {
      const res = await getFilteredNewsPosts(category, subcategory);
      document.title = `Tea Time Telugu - ${category.toUpperCase()}`;
      if (res?.status === "success") {
        setNews(res?.news);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [category, subcategory]);

  useEffect(() => {
    fetchNewsByCategory();
  }, [fetchNewsByCategory]);

  const totalPages = Math.ceil(news.length / POSTS_PER_PAGE);
  const displayNews = news.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const goToPage = (page) => {
    if (page < 1) {
      setCurrentPage(totalPages);
    } else if (page > totalPages) {
      setCurrentPage(1);
    } else {
      setCurrentPage(page);
    }
  };

  const handlePrevious = () => goToPage(currentPage - 1);
  const handleNext = () => goToPage(currentPage + 1);

  const renderPageNumbers = () => {
    if (totalPages <= 8) {
      return (
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
    } else {
      const nextPages = [];
      for (
        let i = currentPage + 1;
        i <= Math.min(currentPage + 3, totalPages);
        i++
      ) {
        nextPages.push(
          <span key={i} onClick={() => goToPage(i)}>
            {i}
          </span>
        );
      }

      const lastPages = [];
      for (let i = totalPages - 2; i <= totalPages; i++) {
        lastPages.push(
          <span key={i} onClick={() => goToPage(i)}>
            {i}
          </span>
        );
      }

      return (
        <>
          <span onClick={handlePrevious}>
            <i className="fa fa-angle-left"></i>
          </span>
          {nextPages}
          {totalPages > 1 && (
            <span className="currentPage-text">
              Page {currentPage} of {totalPages}
            </span>
          )}
          {lastPages}
          <span onClick={handleNext}>
            <i className="fa fa-angle-right"></i>
          </span>
        </>
      );
    }
  };

  // const loadingPlaceholders = Array(POSTS_PER_PAGE).fill(null);

  return (
    <div className="category-posts-container">
      {loading ? (
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
        <div className="category-posts-section">
          {displayNews?.length > 0 ? (
            displayNews.map((post) => (
              <Link
                to={`/${post?.category}/${post?._id}`}
                key={post?._id}
                className="single-category-post box-shadow"
              >
                <div className="single-category-post-image-container">
                  <img
                    src={
                      post?.mainUrl ||
                      "https://res.cloudinary.com/demmiusik/image/upload/v1729620426/post-default-pic_jbf1gl.png"
                    }
                    alt={post.title}
                  />
                </div>
                <div className="single-category-post-texts">
                  <span className="single-category-post-category">
                    {post?.category} /{" "}
                    {moment(post?.createdAt).format("MMM DD, YYYY")}
                  </span>
                  <h3 className="single-category-post-title">{post?.title}</h3>
                  {/* <p
                  className="single-category-post-desc font-inherit"
                  dangerouslySetInnerHTML={{ __html: post?.description }}
                /> */}
                </div>
              </Link>
            ))
          ) : (
            <p>No data found!</p>
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
