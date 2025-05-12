import React, { useEffect, useState } from "react";
import SectionTitle from "../titles/SectionTitle";
import { Link } from "react-router-dom";
import { getFilteredNewsPosts } from "../../helper/apis";

const CategoryTop = () => {
  const [moviesNews, setMoviesNews] = useState([]);
  const [politicalNews, setPoliticalNews] = useState([]);
  const [gossipsNews, setGossipsNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNewsByCategory = async (category, setNews) => {
    try {
      const res = await getFilteredNewsPosts(category);
      if (res?.status === "success") {
        setNews(res?.news);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch movies news
    fetchNewsByCategory("movies", setMoviesNews);

    // Fetch political news
    fetchNewsByCategory("politics", setPoliticalNews);

    // Fetch gossips news
    fetchNewsByCategory("gossips", setGossipsNews);
  }, []);

  return (
    <div className="category-top-container">
      <section className="category-top-section">
        <SectionTitle title={"Movies"} nav={"movies"} />
        {!loading ? (
          <div className="category-top-grid">
            {moviesNews?.slice(0, 3)?.map((post) => (
              <Link
                to={`/${post?.category}/${post?._id}`}
                key={post?._id}
                className="category-top-card"
                aria-label={`Read ${post?.title}`}
              >
                <div className="category-top-image-container">
                  <img
                    src={post?.mainUrl}
                    alt={post?.title}
                    loading="lazy"
                    className="category-top-image"
                  />
                </div>
                <div className="category-top-content">
                  <span className="category-top-author">
                    {post?.postedBy?.fullName}
                  </span>
                  <h3 className="category-top-title">{post?.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="category-top-grid">
            {Array(3)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="category-top-card">
                  <div className="category-top-image-container">
                    <img
                      src="https://res.cloudinary.com/demmiusik/image/upload/v1729620426/post-default-pic_jbf1gl.png"
                      alt="Pic"
                      loading="lazy"
                      className="category-top-image"
                    />
                  </div>
                  <div className="snlc-title p20">
                    <div className="snlc-text"></div>
                    <div className="snlc-half-text"></div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </section>
      <section className="category-top-section">
        <SectionTitle title={"Politics"} nav={"politics"} />
        {!loading ? (
          <div className="category-top-grid">
            {politicalNews?.slice(0, 3)?.map((post) => (
              <Link
                to={`/${post?.category}/${post?._id}`}
                key={post?._id}
                className="category-top-card"
                aria-label={`Read ${post?.title}`}
              >
                <div className="category-top-image-container">
                  <img
                    src={post?.mainUrl}
                    alt={post?.title}
                    loading="lazy"
                    className="category-top-image"
                  />
                </div>
                <div className="category-top-content">
                  <span className="category-top-author">
                    {post?.postedBy?.fullName}
                  </span>
                  <h3 className="category-top-title">{post?.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="category-top-grid">
            {Array(3)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="category-top-card">
                  <div className="category-top-image-container">
                    <img
                      src="https://res.cloudinary.com/demmiusik/image/upload/v1729620426/post-default-pic_jbf1gl.png"
                      alt="Pic"
                      loading="lazy"
                      className="category-top-image"
                    />
                  </div>
                  <div className="snlc-title p20">
                    <div className="snlc-text"></div>
                    <div className="snlc-half-text"></div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </section>
      <section className="category-top-section">
        <SectionTitle title={"Gossips"} nav={"gossips"} />
        {!loading ? (
          <div className="category-top-grid">
            {gossipsNews?.slice(0, 3)?.map((post) => (
              <Link
                to={`/${post?.category}/${post?._id}`}
                key={post?._id}
                className="category-top-card"
                aria-label={`Read ${post?.title}`}
              >
                <div className="category-top-image-container">
                  <img
                    src={post?.mainUrl}
                    alt={post?.title}
                    loading="lazy"
                    className="category-top-image"
                  />
                </div>
                <div className="category-top-content">
                  <span className="category-top-author">
                    {post?.postedBy?.fullName}
                  </span>
                  <h3 className="category-top-title">{post?.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="category-top-grid">
            {Array(3)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="category-top-card">
                  <div className="category-top-image-container">
                    <img
                      src="https://res.cloudinary.com/demmiusik/image/upload/v1729620426/post-default-pic_jbf1gl.png"
                      alt="Pic"
                      loading="lazy"
                      className="category-top-image"
                    />
                  </div>
                  <div className="snlc-title p20">
                    <div className="snlc-text"></div>
                    <div className="snlc-half-text"></div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default CategoryTop;
