import JoditEditor from "jodit-react";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { editNewsPost, getSingleNews } from "../../../helper/apis";
import { useNavigate, useParams } from "react-router-dom";

const EditNews = () => {
  const { newsId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isUpload, setIsUpload] = useState(false);
  const [mainUrl, setMainUrl] = useState(
    "https://res.cloudinary.com/demmiusik/image/upload/v1729620426/post-default-pic_jbf1gl.png"
  );
  const [mainFile, setMainFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [tagsText, setTagsText] = useState("");
  const [tags, setTags] = useState([]);
  const [movieRating, setMovieRating] = useState(0);

  const handleImageUpload = (event) => {
    try {
      const file = event.target.files[0];
      setMainFile(file);

      if (file) {
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getNews = useCallback(async () => {
    if (!newsId || newsId.length !== 24) {
      return navigate("/");
    }

    try {
      // setIsLoading(true);
      const res = await getSingleNews(newsId);
      if (res?.status === "success") {
        document.title = `Edit News: ${res?.news?.title}`;
        setTitle(res?.news?.title);
        setCategory(res?.news?.category);
        setSubCategory(res?.news?.subCategory);
        setDescription(res?.news?.description);
        setMainUrl(res?.news?.mainUrl);
        setTags(res?.news?.tags || []);
      } else {
        navigate("/");
      }
      // setIsLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      // navigate("/");
    }
  }, [newsId, navigate]);

  useEffect(() => {
    getNews();
  }, [getNews]);

  const handlePost = async () => {
    try {
      if (!title || title === "") {
        toast.error("Please write something..!");
        return;
      }

      setIsSaving(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("description", description);
      formData.append("mainFile", mainFile);
      formData.append("movieRating", movieRating);
      tags.forEach((tag) => {
        formData.append("tags[]", tag); // Use "tags[]" for array notation
      });

      const res = await editNewsPost(formData, newsId);

      if (res?.status === "success") {
        toast.success(res?.message);
        setIsSaving(false);
        getNews();
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

  const handleTags = async (e) => {
    e.preventDefault();
    if (!tagsText || tagsText === "") {
      toast.info("Write tags...!");
      return;
    }
    const splitedTags = tagsText.split(", ");
    setTags([...tags, ...splitedTags]);
    setTagsText("");
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };
  return (
    <>
      <div className="write-news-container das-my20">
        <div className="das-news-container">
          <div className="das-news-container-title">Edit News</div>
          <div className="write-news-section">
            <div className="wns-box das-my20 das-py20">
              <h3 className="">Add Title</h3>
              <input
                type="text"
                placeholder="Exiting News..."
                className="br5"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="wns-box das-my20 das-py20">
              <h3 className="">Main Image</h3>
              <input
                type="file"
                accept="image/*, gif/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
                id="file"
              />
              <label htmlFor="file" className="preview-img cp">
                <img src={preview || mainUrl} alt="uploaded-pic" />
              </label>
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
                onChange={(newContent) => {
                  setDescription(newContent);
                }}
              />
            </div>

            <div className="wns-box das-my20 das-py20">
              <h3 className="">Add Tags</h3>
              <form onSubmit={handleTags} className="das-d-flex pt10">
                <input
                  type="text"
                  placeholder="Ex. Chandrababu, Pawan Kalyan, Andhra Pradesh"
                  className="br5"
                  value={tagsText}
                  onChange={(e) => setTagsText(e.target.value)}
                />
                <button type="submit" className="btn save-btn">
                  Add
                </button>
              </form>
              {tags?.length > 0 && (
                <div className="wns-box-all-tags">
                  {tags?.map((tag, index) => (
                    <div className="wns-box-tag box-shadow p10 m10" key={index}>
                      <span className="mr10">{tag}</span>
                      <i
                        className="fa fa-xmark cp"
                        onClick={() => removeTag(tag)}
                      ></i>
                    </div>
                  ))}
                </div>
              )}
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
                  <option value="news">News</option>
                  <option value="politics">Politics</option>
                  <option value="movies">Movies</option>
                  <option value="ott">OTT</option>
                  <option value="show">Show</option>
                  <option value="gossips">Gossips</option>
                  <option value="reviews">Reviews</option>
                  <option value="sports">Sports</option>
                </select>
              </div>
              <div className="wns-box das-my20 das-py20">
                <h3 className="">Sub Category</h3>
                <select
                  name=""
                  id=""
                  className="br5"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                >
                  <option value="">Select Here</option>

                  {category === "news" && <option value="ap">Andhra</option>}
                  {category === "news" && <option value="ts">Telengana</option>}
                  {category === "news" && (
                    <option value="national">National</option>
                  )}
                  {category === "news" && (
                    <option value="international">International</option>
                  )}

                  {category === "politics" && (
                    <option value="ap">Andhra</option>
                  )}
                  {category === "politics" && (
                    <option value="ts">Telengana</option>
                  )}
                  {category === "politics" && (
                    <option value="national">National</option>
                  )}
                  {category === "politics" && (
                    <option value="international">International</option>
                  )}

                  {category === "movies" && (
                    <option value="tollywood">Tollywood</option>
                  )}
                  {category === "movies" && (
                    <option value="bollywood">Bollywood</option>
                  )}
                  {category === "movies" && (
                    <option value="hollywood">Hollywood</option>
                  )}
                  {category === "movies" && (
                    <option value="south">South Cinema</option>
                  )}
                  {/* {category === "movies" && (
                    <option value="north">North Cinema</option>
                  )}
                  {category === "movies" && (
                    <option value="trailer">Trailer</option>
                  )} */}
                  {category === "movies" && (
                    <option value="collections">Collections</option>
                  )}

                  {category === "ott" && <option value="review">Review</option>}
                  {category === "ott" && (
                    <option value="release">Release</option>
                  )}

                  {category === "show" && <option value="tv">TV</option>}

                  {/* {category === "collections" && (
                    <option value="1stday-ta">AP/TS 1st Day</option>
                  )}
                  {category === "collections" && (
                    <option value="1stweek-ta">AP/TS 1st Week</option>
                  )}
                  {category === "collections" && (
                    <option value="closing-ta">AP/TS Closing</option>
                  )}
                  {category === "collections" && (
                    <option value="1stday-in">Nation Wide 1st Day</option>
                  )}
                  {category === "collections" && (
                    <option value="1stweek-in">Nation Wide 1st Week</option>
                  )}
                  {category === "collections" && (
                    <option value="closing-in">Nation Wide Closing</option>
                  )}
                  {category === "collections" && (
                    <option value="1stday-ww">World Wide 1st Day</option>
                  )}
                  {category === "collections" && (
                    <option value="1stweek-ww">World Wide 1st Week</option>
                  )}
                  {category === "collections" && (
                    <option value="closing-ww">World Wide Closing</option>
                  )} */}

                  {category === "gossips" && (
                    <option value="movies">Movies</option>
                  )}

                  {category === "gossips" && (
                    <option value="ts-political">TS Political</option>
                  )}

                  {category === "gossips" && (
                    <option value="ap-political">AP Political</option>
                  )}

                  {category === "reviews" && (
                    <option value="theater">Theater</option>
                  )}
                  {category === "reviews" && <option value="ott">OTT</option>}
                  {category === "reviews" && (
                    <option value="rerelease">Re-release</option>
                  )}

                  {category === "sports" && (
                    <option value="cricket">Cricket</option>
                  )}
                  {category === "sports" && (
                    <option value="football">Football</option>
                  )}
                  {category === "sports" && (
                    <option value="olympics">Olympics</option>
                  )}
                </select>
              </div>
            </div>

            {category === "reviews" && (
              <div className="other-details">
                <div className="wns-box das-my20 das-py20">
                  <h3 className="">Movie Rating</h3>
                  <select
                    name=""
                    id=""
                    className="br5"
                    value={movieRating}
                    onChange={(e) => setMovieRating(e.target.value)}
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>
            )}

            <div className="other-details">
              <div className="cancel-news-btn btn">Cancel</div>
              {!isSaving ? (
                <div className="post-news-btn btn" onClick={handlePost}>
                  Update
                </div>
              ) : (
                <button className="is-submitting-btn btn">Submitting...</button>
              )}
            </div>
          </div>
        </div>
      </div>

      {isUpload && (
        <div className="popup-container files-popup">
          <div className="uploaded-files-container br5 popup-img p10">
            <i className="fa fa-xmark" onClick={() => setIsUpload(false)}></i>
            <h1>Upload Files</h1>
            <p>Click on a file to copy link</p>
            <div className="upload-file-box br5 cp">
              <i className="fa fa-cloud-arrow-up"></i>
            </div>
            <div className="uploaded-file-pre-grid das-gallery-grid">
              <div className="uploaded-file-pre das-gg-img">
                <i className="fa fa-xmark"></i>
                <img
                  src="https://cdn.gulte.com/wp-content/uploads/2024/10/hegdepooja_1728916355_3478724980622505728_287472860-260x320.jpg"
                  alt="pic"
                />
              </div>
              <div className="uploaded-file-pre das-gg-img">
                <img
                  src="https://drscdn.500px.org/photo/80810083/q%3D80_m%3D2000/v2?sig=d40d5dbd17f14dbb088764a1ceb28a09dc8be1ebaaab51841d06d1c0a38e0f21"
                  alt="pic"
                />
              </div>
              <div className="uploaded-file-pre das-gg-img">
                <img
                  src="https://cdn.gulte.com/wp-content/uploads/2024/10/shraddhakapoor_1729147170_3480661201655213532_296102572.jpg"
                  alt="pic"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditNews;
