import React from "react";
import "../components/category/category.css";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import TabTitle from "../components/titles/TabTitle";
import AllCategories from "../components/category/AllCategories";
import CategoryPosts from "../components/category/CategoryPosts";
import { useParams } from "react-router-dom";

const Category = () => {
  const { category } = useParams();
  return (
    <>
      <Navbar />
      <div className="category-page main-page">
        <TabTitle title={category || "Category"} />
        <AllCategories />
        <a href="https://eagleiitech.com" target="blank" className="">
          <img
            className="ad-img"
            src="https://res.cloudinary.com/demmiusik/image/upload/v1741353445/Ad1_ykrrgv.png"
            alt="ad-img"
          />
        </a>
        <CategoryPosts />
        <a href="https://eagleiitech.com" target="blank" className="">
          <img
            className="ad-img"
            src="https://res.cloudinary.com/demmiusik/image/upload/v1741353445/Ad1_ykrrgv.png"
            alt="ad-img"
          />
        </a>
      </div>
      <Footer />
    </>
  );
};

export default Category;
