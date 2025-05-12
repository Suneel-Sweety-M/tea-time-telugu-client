import React, { useEffect, useState } from "react";
import SectionTitle from "../titles/SectionTitle";
import { Link } from "react-router-dom";
import { getNewsPosts } from "../../helper/apis";

const MostViewed = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const allNews = async () => {
    setIsLoading(true);
    try {
      const res = await getNewsPosts();
      if (res?.status === "success") {
        setNews(res?.news);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  
  useEffect(() => {
    allNews();
  }, []);

  return (
    <div className="most-viewed-container">
      <SectionTitle title="Most Viewed" />
      {isLoading ? (
        <div className="most-viewed-grid">
          {Array(6)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="most-viewed-card">
                <div className="most-viewed-card-image-container">
                  <img
                    src="https://res.cloudinary.com/demmiusik/image/upload/v1729620426/post-default-pic_jbf1gl.png"
                    alt="pic"
                    loading="lazy"
                    className="most-viewed-card-image"
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
        <div className="most-viewed-grid">
          {news?.slice(9, 15)?.map((article) => (
            <Link
              to="/"
              key={article?._id}
              className="most-viewed-card"
              aria-label={`Read ${article?.title}`}
            >
              <div className="most-viewed-card-image-container">
                <img
                  src={article?.mainUrl}
                  alt={article?.title}
                  loading="lazy"
                  className="most-viewed-card-image"
                />
              </div>
              <div className="most-viewed-card-content">
                <span className="most-viewed-card-category">
                  {article?.category}
                </span>
                <h3 className="most-viewed-card-title">{article?.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MostViewed;
