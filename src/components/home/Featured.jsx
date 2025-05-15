import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHomeGridPosts } from "../../helper/apis";
import { toast } from "react-toastify";

const Featured = () => {
  const [gridNews, setGridNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const mainFeatured = gridNews[0];
  const otherFeatured = gridNews.slice(1);

  useEffect(() => {
    const fetchGridPosts = async () => {
      setLoading(true);
      try {
        const res = await getHomeGridPosts();
        if (res?.status === "success") {
          setGridNews(res?.news);
        } else {
          toast.error(res?.message || "Something went wrong!");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching grid posts:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchGridPosts();
  }, []);

  return (
    <>
      {!loading ? (
        <div className="featured-section">
          <div className="featured-left">
            <FeaturedItem item={mainFeatured} isMain={true} />
          </div>
          <div className="featured-right">
            {otherFeatured.map((item) => (
              <FeaturedItem key={item?._id} item={item} isMain={false} />
            ))}
          </div>
        </div>
      ) : (
        <div className="featured-section">
          <div className="featured-left">
            <div className="featured-news-container main-featured">
              <img
                src="https://res.cloudinary.com/demmiusik/image/upload/v1729620426/post-default-pic_jbf1gl.png"
                alt="img"
                loading="lazy"
              />
            </div>
          </div>
          <div className="featured-right">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                className="featured-news-container main-featured"
                key={index}
              >
                <img
                  src="https://res.cloudinary.com/demmiusik/image/upload/v1729620426/post-default-pic_jbf1gl.png"
                  alt="img"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

// Separate component for featured item for better reusability
const FeaturedItem = ({ item, isMain }) => {
  return (
    <Link
      to={`/${item?.category}/${item?._id}`}
      className={`featured-news-container ${isMain ? "main-featured" : ""}`}
      key={item?._id}
    >
      <img
        src={item?.mainUrl}
        alt={item?.title}
        loading="lazy" // Add lazy loading for better performance
      />
      <div className="featured-news-overlay"></div>
      <div className="featured-news-texts">
        <span className="featured-news-category text-capital">
          {item?.category}
        </span>
        <h3 className="featured-news-title">{item?.title}</h3>
      </div>
    </Link>
  );
};

export default Featured;
