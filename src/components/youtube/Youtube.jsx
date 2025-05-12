import React from "react";
import "./youtube.css";

const Youtube = ({ setYTurl, yTurl }) => {
  return (
    <>
      <div className="popup-container">
        <div className="yt-popup">
          <i className="fa fa-xmark cp" onClick={() => setYTurl("")}></i>
          <iframe
            src={`${yTurl || ""}?autoplay=1&mute=0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Youtube;
