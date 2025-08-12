import React, { useEffect, useState } from "react";
import SectionTitle from "../titles/SectionTitle";
import { Link } from "react-router-dom";
import { getTrendsPosts } from "../../helper/apis";
import moment from "moment";

const Trends = () => {
  const [trendsNews, setTrendsNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const allTrendsPosts = async () => {
    try {
      const res = await getTrendsPosts();
      if (res?.status === "success") {
        setTrendsNews(res?.news);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const mainTrends = trendsNews[0];
  const otherTrends = trendsNews.slice(1);

  useEffect(() => {
    allTrendsPosts();
  }, []);
  return (
    <div className="trends-container">
      <SectionTitle title="Trends" />
      {loading ? (
        <div className="trends-section">
          <div className="trends-left">
            <div className="trends-post cp">
              <img
                src={
                  "https://res.cloudinary.com/demmiusik/image/upload/v1729620426/post-default-pic_jbf1gl.png"
                }
                alt="pic"
              />
              <div className="snlc-title">
                <div className="snlc-text"></div>
                <div className="snlc-text"></div>
                <div className="snlc-text"></div>
                <div className="snlc-half-text"></div>
              </div>
            </div>
          </div>
          <div className="trends-right">
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <div className="trends-post cp" key={index}>
                  <img
                    src={
                      "https://res.cloudinary.com/demmiusik/image/upload/v1729620426/post-default-pic_jbf1gl.png"
                    }
                    alt="pic"
                  />
                  <div className="snlc-title">
                    <div className="snlc-text"></div>
                    <div className="snlc-half-text"></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className="trends-section">
          <div className="trends-left">
            <Link
              to={`/${mainTrends?.category}/${mainTrends?.newsId}`}
              className="trends-post cp"
            >
              <img
                src={
                  mainTrends?.mainUrl ||
                  "https://res.cloudinary.com/demmiusik/image/upload/v1729620426/post-default-pic_jbf1gl.png"
                }
                alt="pic"
              />
              <div className="trends-texts">
                <span className="trends-category">
                  {mainTrends?.postedBy?.fullName} -{" "}
                  {moment(mainTrends?.createdAt).format("MMM DD, YYYY")}
                </span>
                <h3 className="trends-title fs20">{mainTrends?.title}</h3>
                {/* <span
                  className="trends-desc dynamic-desc"
                  dangerouslySetInnerHTML={{
                    __html: mainTrends?.description,
                  }}
                /> */}
              </div>
            </Link>
          </div>
          <div className="trends-right">
            {otherTrends.slice(0, 4).map((item, index) => (
              <Link
                to={`/${item?.category}/${item?.newsId}`}
                className="trends-post cp"
                key={index}
              >
                <img
                  src={
                    item?.mainUrl ||
                    "https://res.cloudinary.com/demmiusik/image/upload/v1729620426/post-default-pic_jbf1gl.png"
                  }
                  alt="pic"
                />
                <div className="trends-texts">
                  <span className="trends-category">
                    {item?.category} /{" "}
                    {moment(item?.createdAt).format("MMM DD, YYYY")}
                  </span>
                  <h3 className="trends-title fs20">{item?.title}</h3>
                  {/* <span
                    className="trends-desc dynamic-desc"
                    dangerouslySetInnerHTML={{
                      __html: mainTrends?.description,
                    }}
                  /> */}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Trends;
