import React, { useState, useEffect } from "react";
import SectionTitle from "../titles/SectionTitle";
import { getHotTopics } from "../../helper/apis";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ScrollNews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("right");
  const [isLoading, setIsLoading] = useState(false);
  const [hotTopics, setHotTopics] = useState([]);

  const allHotTopics = async () => {
    setIsLoading(true);
    try {
      const res = await getHotTopics();
      if (res?.status === "success") {
        setHotTopics(res?.news);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    allHotTopics();
  }, []);
  // Auto-advance every 4 seconds with right-to-left animation
  useEffect(() => {
    if (hotTopics.length === 0) return;

    const interval = setInterval(() => {
      setDirection("right");
      setCurrentIndex((prevIndex) => (prevIndex + 1) % hotTopics.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [hotTopics?.length]);

  const goToNext = () => {
    setDirection("right");
    setCurrentIndex((prevIndex) => (prevIndex + 1) % hotTopics.length);
  };

  const goToPrev = () => {
    setDirection("left");
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + hotTopics.length) % hotTopics.length
    );
  };

  const goToIndex = (index) => {
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  const getItemPosition = (index) => {
    if (index === currentIndex) return "active";

    if (direction === "right") {
      if (index === (currentIndex - 1 + hotTopics.length) % hotTopics.length) {
        return "left-exit";
      }
      return "right-enter";
    } else {
      if (index === (currentIndex + 1) % hotTopics.length) {
        return "right-exit";
      }
      return "left-enter";
    }
  };

  return (
    <div className="scroll-news-container">
      {hotTopics.length > 0 && <SectionTitle title="Today Hot Topics" />}
      {!isLoading && hotTopics.length > 0 && (
        <div className="scroll-news-wrapper">
          <button className="scroll-news-button left" onClick={goToPrev}>
            <FaChevronLeft />
          </button>
          <div className="scroll-news">
            {hotTopics.map((item, index) => (
              <Link
                key={index}
                className={`scroll-news-item ${getItemPosition(index)}`}
                to={`/${item?.category}/${item?.newsId}`}
              >
                <img src={item?.mainUrl} alt={item?.title} />
                <div className="scroll-news-title">{item?.title}</div>
              </Link>
            ))}
          </div>
          <button className="scroll-news-button right" onClick={goToNext}>
            <FaChevronRight />
          </button>
        </div>
      )}
      <div className="scroll-news-dots">
        {hotTopics.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ScrollNews;
