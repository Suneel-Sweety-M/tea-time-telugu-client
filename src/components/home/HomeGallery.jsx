import React, { useEffect, useState } from "react";
import SectionTitle from "../titles/SectionTitle";
import { Link } from "react-router-dom";
import { getGalleryPosts } from "../../helper/apis";

const HomeGallery = () => {
  const [homeGalleryNews, setHomeGalleryNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const allHomeGalleryPosts = async () => {
    try {
      const res = await getGalleryPosts();
      if (res?.status === "success") {
        setHomeGalleryNews(res?.gallery);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    allHomeGalleryPosts();
  }, []);

  return (
    <section className="gallery-container">
      <SectionTitle title="Gallery" nav="gallery" />
      {loading ? (
        <div className="gallery-grid">
          {Array(5)
            .fill(null)
            ?.map((_, index) => (
              <div className="gallery-card" key={index}>
                <div className="card-image-container">
                  <img
                    src={
                      "https://res.cloudinary.com/demmiusik/image/upload/v1729620719/EET_cyxysf.png"
                    }
                    alt="pic"
                    loading="lazy"
                    className="card-image"
                  />
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="gallery-grid">
          {homeGalleryNews?.slice(0, 5)?.map((item) => (
            <Link
              to={`/gallery/${item?._id}`}
              key={item?._id}
              className="gallery-card"
              aria-label={`View ${item?.name} gallery`}
            >
              <div className="card-image-container">
                <img
                  src={
                    item?.galleryPics[0]?.url ||
                    "https://res.cloudinary.com/demmiusik/image/upload/v1729620719/EET_cyxysf.png"
                  }
                  alt={item?.name}
                  loading="lazy"
                  className="card-image"
                />
              </div>
              <div className="card-overlay">
                <span className="card-category">{item?.category}</span>
                <h3 className="card-title">{item?.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default HomeGallery;
