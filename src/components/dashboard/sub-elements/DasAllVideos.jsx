import React, { useCallback, useEffect, useState } from "react";
import DasAddVideos from "./DasAddVideos";
import { deleteVideo, getAllVideos } from "../../../helper/apis";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const DasAllVideos = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [popupBox, setPopupBox] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deletePopup, setDeletePopup] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const fetchVideos = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getAllVideos();
      if (res?.status === "success") {
        setVideos(res?.videos);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, []);

  const handleDeletePopup = async (id) => {
    setDeleteId(id);
    setDeletePopup(true);
  };

  const handleDeleteCancel = async () => {
    setDeleteId("");
    setDeletePopup(false);
  };

  const handleDelete = async () => {
    try {
      setIsUploading(true);
      const res = await deleteVideo(deleteId);
      if (res?.status === "success") {
        toast.success(res?.message);
        setDeleteId("");
        setDeletePopup(false);
        fetchVideos();
      } else {
        toast.error(res?.message);
      }
      setIsUploading(false);
    } catch (error) {
      setIsUploading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);
  return (
    <>
      <div className="das-news-container">
        <i
          className="fa fa-plus das-float-right cp fs22"
          onClick={() => setPopupBox(true)}
        ></i>
        <div className="das-news-container-title">All Videos</div>
        {!isLoading ? (
          <div>
            {videos?.length > 0 ? (
              <div className="das-all-videos-container das-mt20">
                {videos.map((item, index) => (
                  <div className="das-video-card box-shadow" key={index}>
                    <img
                      src={item?.mainUrl}
                      alt="yt-thumbnail"
                      className="br5"
                    />
                    <div className="das-video-card-texts">
                      <p className="text-capital">{item?.subCategory}</p>
                      <Link to={`/${item?.category}/video/${item?._id}`}>
                        <h4 className="threelineselpsis">{item?.title}</h4>
                      </Link>
                    </div>
                    <div className="das-video-card-btns">
                      <Link
                        to={`/${item?.category}/video/${item?._id}`}
                        className="das-video-card-btn view-btn"
                      >
                        <i className="fa fa-eye"></i> <span>View</span>
                      </Link>
                      <div
                        className="das-video-card-btn delete-btn"
                        onClick={() => handleDeletePopup(item?._id)}
                      >
                        <i className="fa fa-trash"></i> <span>Delete</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <b>No posts available</b>
            )}
          </div>
        ) : (
          <div className="das-all-videos-container das-mt20">
            {[...Array(8)].map((_, index) => (
              <div className="das-video-card box-shadow" key={index}>
                <img
                  src="https://res.cloudinary.com/demmiusik/image/upload/v1729620426/post-default-pic_jbf1gl.png"
                  alt="yt-thumbnail"
                  className="br5"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {popupBox && <DasAddVideos setPopupBox={setPopupBox} />}

      {deletePopup && (
        <div className="popup-news-container popup-container">
          <div className="br5 popup-img p10">
            <div className="das-news-container">
              <div className="popup-news-top das-d-flex das-jcsb">
                <div className="das-news-container-title">
                  Are you sure want to delete ?
                </div>
                <span className="popup-news-top-x das-mx20">
                  <i
                    className="fa fa-xmark"
                    onClick={() => setDeletePopup(false)}
                  ></i>
                </span>
              </div>
              <div className="das-all-news-bottom das-mt20">
                <div className="news-popup-btns das-mx10">
                  <button className="btn" onClick={handleDeleteCancel}>
                    Cancel
                  </button>
                </div>

                <div className="news-popup-btns">
                  {!isUploading ? (
                    <button className="btn save-btn" onClick={handleDelete}>
                      Delete
                    </button>
                  ) : (
                    <button className="btn is-sending-btn">Deleting...</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DasAllVideos;
