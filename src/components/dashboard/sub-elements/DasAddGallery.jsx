import JoditEditor from "jodit-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { addGalleryPosts } from "../../../helper/apis";
import UploadFile from "./UploadFile";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const DasAddGallery = () => {
  const { user } = useSelector((state) => state.user); 

  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isUpload, setIsUpload] = useState(false);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setMediaFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const removeFile = (index) => {
    setMediaFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const renderPreview = (file, index) => {
    const fileURL = URL.createObjectURL(file);

    return (
      <div key={index} className="das-gg-img">
        <i className="fa fa-xmark" onClick={() => removeFile(index)}></i>
        <img src={fileURL} alt="pic" />
      </div>
    );
  };

  const handlePost = async () => {
    if (!title || title === "") {
      toast.error("Please write something..!");
      return;
    }

    setIsSaving(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("name", name);
    formData.append("category", category);
    formData.append("description", description);

    mediaFiles.forEach((file) => {
      formData.append("mediaFiles", file);
    });

    try {
      const res = await addGalleryPosts(formData);

      if (res?.status === "success") {
        toast.success(res?.message);
        setTitle("");
        setName("");
        setCategory("");
        setDescription("");
        setIsSaving(false);
        setMediaFiles([]);
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

  return (
    <>
      <div className="write-news-container das-my20">
        <div className="das-news-container">
          <div className="das-all-gallery-section-top das-d-flex das-jcsb aic">
            <span className="das-news-container-title">Add Gallery</span>
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
              <h3 className="">Add Images</h3>
              <div className="das-gallery-grid">
                {mediaFiles?.map((file, index) => renderPreview(file, index))}
                <input
                  type="file"
                  multiple
                  accept="image/*, gif/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  id="galleryPics"
                />
                <label
                  htmlFor="galleryPics"
                  className="das-gg-img das-add-gg-img"
                >
                  <i className="fa fa-plus"></i>
                  <span>Add image</span>
                </label>
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

      <div className="preview-box bgc-fff das-m20 p20">
        <h4>Preview</h4>
        <div
          dangerouslySetInnerHTML={{ __html: description }}
          className="description-preview"
        />
      </div>

      {isUpload && <UploadFile setIsUpload={setIsUpload} />}
    </>
  );
};

export default DasAddGallery;
