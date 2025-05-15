import React, { useState } from "react";
import { toast } from "react-toastify";
import { addVideoPost } from "../../../helper/apis";

const DasAddVideos = ({ setPopupBox }) => {
  const [title, setTitle] = useState("");
  const [ytId, setYtId] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const onSubmit = async () => {
    setIsSaving(true);
    try {
      const res = await addVideoPost({ title, subCategory, ytId });
      if (res?.status === "success") {
        toast.success(res?.message);
        setIsSaving(false);
        setTitle("");
        setSubCategory("");
        setYtId("");
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
      setIsSaving(false);
    }
  };

  return (
    <div className="popup-news-container popup-container">
      <div className="br5 popup-img p10">
        <div className="das-news-container">
          <div className="popup-news-top das-d-flex das-jcsb">
            <div className="das-news-container-title">Add Video</div>
            <span className="popup-news-top-x das-mx20">
              <i className="fa fa-xmark" onClick={() => setPopupBox(false)}></i>
            </span>
          </div>
          <div className="wns-box das-my20 das-py20">
            <h3 className="text-start">Add Title</h3>
            <input
              type="text"
              placeholder="Title Here..."
              className="br5"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="wns-box das-my20 das-py20">
            <h3 className="text-start">Add YouTube Video Id</h3>
            <input
              type="text"
              placeholder="Video Id Here..."
              className="br5"
              value={ytId}
              onChange={(e) => setYtId(e.target.value)}
            />
          </div>
          {/* <div className="other-details"> */}
          {/* <div className="wns-box das-my20 das-py20">
                <h3 className="">Category</h3>
                <select
                  name=""
                  id=""
                  className="br5"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="videos">Videos</option>
                </select>
              </div> */}
          <div className="wns-box das-my20 das-py20">
            <h3 className="text-start">Sub Category</h3>
            <select
              name=""
              id=""
              className="br5"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            >
              <option value="">Select Here</option>
              <option value="trailers">Trailer</option>
              <option value="video songs">Video Songs</option>
              <option value="lyrical videos">Lyrical Songs</option>
              <option value="events">Events</option>
              <option value="shows">Shows</option>
              <option value="ott">OTT</option>
            </select>
            {/* </div> */}
          </div>
          <div className="other-details">
            <div className="cancel-news-btn btn">Cancel</div>
            {!isSaving ? (
              <div className="post-news-btn btn" onClick={onSubmit}>
                Post
              </div>
            ) : (
              <button type="submit" className="is-submitting-btn btn">
                Submitting...
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DasAddVideos;
