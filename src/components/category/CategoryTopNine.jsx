import { useCallback, useEffect, useState } from "react";
import SectionTitle from "../titles/SectionTitle";
import { Link } from "react-router-dom";
import { getCategoryTopPosts } from "../../helper/apis";

const CategoryTopNine = ({ category }) => {
  const [topNineNews, setTopNineNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const allTopNinePosts = useCallback(async () => {
    // setLoading(true);
    setError(null);
    try {
      const res = await getCategoryTopPosts(category);
      if (res?.status === "success") {
        setTopNineNews(res?.posts);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to load top posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    allTopNinePosts();
  }, [allTopNinePosts]);

  return (
    <section className={topNineNews.length > 0 ? "top-nine-section" : ""}>
      {topNineNews.length > 0 && <SectionTitle title="Top News" />}
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="top-nine-container">
          {Array.from({ length: 9 }).map((_, index) => (
            <article key={`skeleton-${index}`} className="top-nine-post">
              <div className="top-nine-link">
                <div className="post-rank">{index + 1}</div>
                <figure className="post-image-container">
                  <img
                    src="https://res.cloudinary.com/demmiusik/image/upload/v1729620426/post-default-pic_jbf1gl.png"
                    alt="Loading..."
                    loading="lazy"
                    className="post-image"
                  />
                </figure>
                <div className="snlc-title">
                  <div className="snlc-text"></div>
                  <div className="snlc-half-text"></div>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="top-nine-container">
          {topNineNews.map((post, index) => (
            <article key={post?._id} className="top-nine-post">
              <Link
                to={`/${post?.category}/${post?.newsId}`}
                className="top-nine-link"
              >
                <div className="post-rank">{index + 1}</div>
                <figure className="post-image-container">
                  <img
                    src={post?.mainUrl}
                    alt={post?.title}
                    loading="lazy"
                    className="post-image"
                  />
                </figure>
                <div className="post-content">
                  <span className="post-category">{post?.category}</span>
                  <h3 className="post-title">{post?.title}</h3>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default CategoryTopNine;
