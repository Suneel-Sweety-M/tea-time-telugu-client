import React, { useEffect, useState } from "react";
import SectionTitle from "../titles/SectionTitle";
import { Link } from "react-router-dom";
import { getFilteredNewsPosts } from "../../helper/apis";

const HomeReviews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsByCategory = async () => {
      try {
        const res = await getFilteredNewsPosts("reviews");
        if (res?.status === "success") {
          setNews(res?.news);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsByCategory();
  }, []);

  return (
    <div className="home-review-container">
      <SectionTitle title="Reviews" nav="/reviews" />
      {!loading ? (
        <div className="home-review-grid">
          {news?.slice(0, 4)?.map((review) => (
            <Link
              to={`/${review?.category}/${review?._id}`}
              key={review?._id}
              className="home-review-card"
              aria-label={`Read ${review?.title} review`}
            >
              <div className="home-review-image-container">
                <img
                  src={review?.mainUrl}
                  alt={review?.title}
                  loading="lazy"
                  className="home-review-image"
                />
              </div>
              <div className="home-review-content">
                <div className="home-review-rating">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fa fa-star ${
                        i < review?.movieRating ? "gold-star" : ""
                      }`}
                    />
                  ))}
                </div>
                <h3 className="home-review-title">{review?.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="home-review-grid">
          {Array(4)
            ?.fill(null)
            ?.map((_, index) => (
              <div key={index} className="home-review-card">
                <div className="home-review-image-container">
                  <img
                    src="https://res.cloudinary.com/demmiusik/image/upload/v1729620426/post-default-pic_jbf1gl.png"
                    alt=""
                    loading="lazy"
                    className="home-review-image"
                  />
                </div>
                <div className="home-review-content"></div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default HomeReviews;
