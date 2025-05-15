import React, { useEffect, useState } from "react";
import SectionTitle from "../titles/SectionTitle";
import { Link } from "react-router-dom";
import { getNewsPosts } from "../../helper/apis";

const LatestCollection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const allNews = async () => {
      setIsLoading(true);
      try {
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

    allNews();
  }, []);

  return (
    <div className="latest-collection-container">
      <SectionTitle title="Latest Collection" />
      {isLoading ? (
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
        <div className="latest-collection-grid">
          {news?.slice(0, 9)?.map((collection) => (
            <Link
              to={`/${collection?.category}/${collection?._id}`}
              key={collection?._id}
              className="latest-collection-card"
              aria-label={`View ${collection?.title}`}
            >
              <div className="latest-collection-image-container">
                <img
                  src={collection?.mainUrl}
                  alt={collection?.title}
                  loading="lazy"
                  className="latest-collection-image"
                />
              </div>
              <div className="latest-collection-content">
                <span className="latest-collection-category">
                  {collection?.category}
                </span>
                <h3 className="latest-collection-title">{collection?.title}</h3>
                {/* <p
                  className="latest-collection-description dynamic-desc"
                  dangerouslySetInnerHTML={{
                    __html: collection?.description,
                  }}
                /> */}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestCollection;
