import React, { useCallback, useEffect, useState } from "react";
import UploadFile from "./UploadFile";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import { getSingleGallery, updateGallery } from "../../../helper/apis";

const DasGalleryEdit = () => {
  const { user } = useSelector((state) => state.user); 
  const { gid } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [isUpload, setIsUpload] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fetchGallery = useCallback(async () => {
    try {
      const res = await getSingleGallery(gid);

      if (res?.status === "success") {
        setTitle(res?.gallery?.title);
        setName(res?.gallery?.name);
        setDescription(res?.gallery?.description);
        setMediaFiles(res?.gallery?.galleryPics);
        setCategory(res?.gallery?.category);
      } else {
        toast.error(res?.message);
        navigate(`/${user?._id}/dashboard/all-gallery/`);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while posting!");
    } finally {
      setIsSaving(false);
    }
  }, [gid, navigate, user?._id]);

  const handlePost = async () => {
    if (!title || title === "") {
      toast.error("Please write something..!");
      return;
    }
    setIsSaving(true);
    try {
      const res = await updateGallery(gid, {
        title,
        name,
        category,
        description,
      });

      if (res?.status === "success") {
        toast.success(res?.message);
        fetchGallery();
      } else {
        toast.error(res?.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while posting!");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  return (
    <>
      <div className="write-news-container das-my20">
        <div className="das-news-container">
          <div className="das-all-gallery-section-top das-d-flex das-jcsb aic">
            <span className="das-news-container-title">Edit Gallery</span>
            <Link
              to={`/${user?._id}/dashboard/all-gallery`}
              className="das-d-flex aic"
            >
              <b className="color-blue">View All</b>
            </Link>
          </div>
          <div className="write-news-section">
            <div className="wns-box das-my20 das-py20">
              <h3 className="">Add Name</h3>
              <input
                type="text"
                placeholder="eg. Elon Musk"
                className="br5"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="wns-box das-my20 das-py20">
              <h3 className="">Add Title</h3>
              <input
                type="text"
                placeholder="eg. Elon started..."
                className="br5"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="wns-box das-my20 das-py20">
              <div className="das-d-flex das-jcsb">
                <h3 className="">Add Description</h3>
                <div
                  className="upload-system-files br5 cp"
                  onClick={() => setIsUpload(true)}
                >
                  <b>Upload</b>
                  <i className="fa fa-cloud-arrow-up"></i>
                </div>
              </div>
              <JoditEditor
                className="jodiac-editor"
                value={description}
                onChange={(newContent) => setDescription(newContent)}
              />
            </div>
            {/* <div className="wns-box das-my20 das-py20">
              <h3 className="">Main Image</h3>
              <div className="br5 upload-news-img">
                <div className="upload-news-img-box dfc fdc">
                  <i className="fa fa-cloud-arrow-up"></i>
                  <span>Select one below</span>
                </div>
              </div>
            </div> */}
            <div className="wns-box das-my20 das-py20">
              <h3 className="">Images</h3>
              <div className="das-gallery-grid">
                {mediaFiles?.map((file, index) => (
                  <div key={index} className="das-gg-img">
                    <img src={file?.url} alt="pic" />
                  </div>
                ))}
              </div>
            </div>
            <div className="other-details">
              <div className="wns-box das-my20 das-py20">
                <h3 className="">Category</h3>
                <select
                  name=""
                  id=""
                  className="br5"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Here</option>
                  <option value="actress">Actress</option>
                  <option value="hero">Hero</option>
                </select>
              </div>
              {/* <div className="wns-box das-my20 das-py20">
              <h3 className="">Sub Category</h3>
              <select name="" id="" className="br5">
                <option value="">Select Here</option>
                <option value="">Politics</option>
                <option value="">Movies</option>
                <option value="">Gossips</option>
                <option value="">Reviews</option>
              </select>
            </div> */}
            </div>
            <div className="other-details">
              <div className="cancel-news-btn btn">Cancel</div>
              {!isSaving ? (
                <div className="post-news-btn btn" onClick={handlePost}>
                  Update
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

      {/* <div className="preview-box bgc-fff das-m20 p20">
        <h4>Preview</h4>
        <div
          dangerouslySetInnerHTML={{ __html: description }}
          className="description-preview"
        />
      </div> */}

      {isUpload && <UploadFile setIsUpload={setIsUpload} />}
    </>
  );
};

export default DasGalleryEdit;
