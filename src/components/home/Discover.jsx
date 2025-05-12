import React from "react";
import SectionTitle from "../titles/SectionTitle";
import { Link } from "react-router-dom";

const Discover = () => {
  return (
    <div className="discover-container page-main-container">
      <SectionTitle title={"Discover"} />
      <div className="discover-section">
        <Link to="/movies" className="discover-card">
          <img
            src="https://i1.wp.com/worldupclose.in/wp-content/uploads/2021/05/Untitled-design-3.jpg?fit=2240%2C1260&ssl=1"
            alt="pic"
          />
          <span>Movies</span>
        </Link>
        <Link to="/gallery" className="discover-card">
          <img
            src="https://cdn.gulte.com/wp-content/uploads/2024/10/Kavya-Thapar-Success.jpg"
            alt="pic"
          />
          <span>Gallery</span>
        </Link>
        <Link to="/ott" className="discover-card">
          <img
            src="https://cdn.gulte.com/wp-content/uploads/2024/10/Screenshot-2024-10-12-at-11.30.28.png"
            alt="pic"
          />
          <span>OTT</span>
        </Link>
        <Link to="/reviews" className="discover-card">
          <img
            src="https://m.media-amazon.com/images/M/MV5BZmUyMmZlODYtZWVjOC00MDMwLWIwYjgtYTBiNjgzZDRkYjdhXkEyXkFqcGc@._V1_.jpg"
            alt="pic"
          />
          <span>Reviews</span>
        </Link>
        <Link to="/gossips" className="discover-card">
          <img
            src="https://www.greatandhra.com/newphotos10/devara191727486950.jpg"
            alt="pic"
          />
          <span>Gossips</span>
        </Link>
        <Link to="/videos" className="discover-card">
          <img
            src="https://i.ytimg.com/vi/HgY3Xl2WXN4/maxresdefault.jpg"
            alt="pic"
          />
          <span>Videos</span>
        </Link>
      </div>
    </div>
  );
};

export default Discover;
