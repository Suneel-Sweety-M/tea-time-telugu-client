import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getPopupPoster } from "../../helper/apis";

const PopupPoster = ({ closePopup }) => {
  const [popupPosterImg, setPopupPosterImg] = useState("");
  const [popupPosterLink, setPopupPosterLink] = useState("");

  useEffect(() => {
    handleGetPopupPoster();
  }, []);

  const handleGetPopupPoster = async () => {
    const res = await getPopupPoster();
    if (res?.status === "success") {
      setPopupPosterImg(res?.popupPoster?.img);
      setPopupPosterLink(res?.popupPoster?.link);
    } else {
      toast.error(res?.message);
    }
  };
  return (
    <>
      {popupPosterImg && (
        <div className="popup-container">
          <div className="popup-ad-section">
            <i className="fa fa-xmark" onClick={closePopup}></i>
            <a href={`${popupPosterLink}`} target="_blank" rel="noreferrer">
              <img src={popupPosterImg} alt="popup-poster-pic" />
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupPoster;
