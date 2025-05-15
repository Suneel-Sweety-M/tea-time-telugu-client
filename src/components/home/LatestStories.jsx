import React, { useEffect, useState } from "react";
import SectionTitle from "../titles/SectionTitle";
import { Link } from "react-router-dom";
import { getNewsPosts } from "../../helper/apis";

const LatestStories = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const allNews = async () => {
    try {
      setIsLoading(true);
      const res = await getNewsPosts();
      if (res?.status === "success") {
        setNews(res?.news);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    allNews();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="latest-stories-container">
          {[...Array(8)]?.map((_, index) => (
            <article
              key={`skeleton-${index}`}
              className="top-nine-post latest-stories-post"
            >
              <div className="top-nine-link">
                <figure className="post-image-container">
                  <img
                    src="https://res.cloudinary.com/demmiusik/image/upload/v1729620426/post-default-pic_jbf1gl.png"
                    alt="Loading..."
                    loading="lazy"
                    className="post-image"
                  />
                </figure>
                <div className="snlc-title p20">
                  <div className="snlc-text"></div>
                  <div className="snlc-half-text"></div>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="latest-stories-container">
          <SectionTitle title={"Latest Stories"} />
          <div className="latest-stories-section">
            {news?.slice(1, 10)?.map((post, index) => (
              <article
                key={index}
                className="top-nine-post latest-stories-post"
              >
                <Link
                  to={`/${post?.category}/${post?._id}`}
                  className="top-nine-link"
                >
                  <figure className="post-image-container">
                    <img
                      src={
                        post?.mainUrl ||
                        "https://res.cloudinary.com/demmiusik/image/upload/v1729620426/post-default-pic_jbf1gl.png"
                      }
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
        </div>
      )}
    </>
  );
};

export default LatestStories;
