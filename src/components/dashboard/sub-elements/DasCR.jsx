import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  addMovieCollections,
  addMovieReleases,
  deleteMovieCollection,
  deleteMovieRelease,
  editMovieCollection,
  editMovieRelease,
  getMovieCollections,
  getMovieReleases,
} from "../../../helper/apis";

const DasCR = () => {
  const [allReleases, setAllReleases] = useState([]);
  const [allCollections, setAllCollections] = useState([]);

  const [releaseCategory, setReleaseCategory] = useState("movie");
  const [collectionsCategory, setCollectionsCategory] =
    useState("1st-day-ap&ts");

  const [movie, setMovie] = useState("");
  const [movie2, setMovie2] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [category2, setCategory2] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isSaving2, setIsSaving2] = useState(false);

  const [updateRelease, setUpdateRelease] = useState({
    id: "",
    movie: "",
    date: "",
    category: "",
  });

  const [updateCollection, setUpdateCollection] = useState({
    id: "",
    movie: "",
    amount: "",
    category: "",
  });

  const getReleases = async () => {
    try {
      const res = await getMovieReleases();
      if (res?.status === "success") {
        setAllReleases(res?.movieReleases);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCollections = async () => {
    try {
      const res = await getMovieCollections();
      if (res?.status === "success") {
        setAllCollections(res?.movieCollections);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit1 = async () => {
    setIsSaving(true);
    try {
      const res = await addMovieReleases({ movie, category, date });
      if (res?.status === "success") {
        toast.success(res?.message);
        getReleases();
        setMovie("");
        setDate("");
        setCategory("");
      } else {
        toast.error(res?.message);
      }
      setIsSaving(false);
    } catch (error) {
      console.log(error);
      setIsSaving(false);
    }
  };

  const onSubmit2 = async () => {
    setIsSaving2(true);
    try {
      const res = await addMovieCollections({ movie2, category2, amount });
      if (res?.status === "success") {
        toast.success(res?.message);
        setMovie2("");
        setAmount("");
        setCategory2("");
        getCollections();
      } else {
        toast.error(res?.message);
      }
      setIsSaving2(false);
    } catch (error) {
      console.log(error);
      setIsSaving2(false);
    }
  };

  const addUpdateRelease = (item) => {
    setUpdateRelease({
      ...updateRelease,
      id: item?.id || "",
      movie: item?.movie || "",
      date: item?.date || "",
      category: item?.category || "",
    });
  };

  const handleURChange = (e) => {
    const { name, value } = e.target;
    setUpdateRelease((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const cancelURChange = () => {
    setUpdateRelease({
      id: "",
      movie: "",
      date: "",
      category: "",
    });
  };

  const editRelease = async () => {
    try {
      const res = await editMovieRelease(updateRelease);
      if (res?.status === "success") {
        toast.success(res?.message);
        getReleases();
        cancelURChange();
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRelease = async (id) => {
    try {
      const res = await deleteMovieRelease(id);
      if (res?.status === "success") {
        toast.success(res?.message);
        getReleases();
        cancelURChange();
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addUpdateCollection = (item) => {
    setUpdateCollection({
      ...updateCollection,
      id: item?.id || "",
      movie: item?.movie || "",
      amount: item?.amount || "",
      category: item?.category || "",
    });
  };

  const handleUCChange = (e) => {
    const { name, value } = e.target;
    setUpdateCollection((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const cancelUCChange = () => {
    setUpdateCollection({
      id: "",
      movie: "",
      amount: "",
      category: "",
    });
  };

  const editCollection = async () => {
    try {
      const res = await editMovieCollection(updateCollection);
      if (res?.status === "success") {
        toast.success(res?.message);
        getCollections();
        cancelUCChange();
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCollection = async (id) => {
    try {
      const res = await deleteMovieCollection(id);
      if (res?.status === "success") {
        toast.success(res?.message);
        getCollections();
        cancelUCChange();
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReleases();
    getCollections();
  }, []);

  return (
    <>
      <div className="box-shadow das-m20 p10">
        <h1>Collections & Releases</h1>
      </div>
      <div className="das-m20 p10 das-d-flex main-duo-con">
        <div className="box-shadow duo-con-50 br5 das-mr20">
          <h2 className="das-py20 text-center">Movie Releases</h2>
          {allReleases?.length > 0 ? (
            <div className="movie-schedules-section">
              <div className="current-schedules">
                <span
                  style={{
                    backgroundColor:
                      releaseCategory === "movie" ? "red" : undefined,
                    color: releaseCategory === "movie" ? "#fff" : undefined,
                  }}
                  onClick={() => setReleaseCategory("movie")}
                >
                  Movies
                </span>
                <span
                  style={{
                    backgroundColor:
                      releaseCategory === "ott" ? "red" : undefined,
                    color: releaseCategory === "ott" ? "#fff" : undefined,
                  }}
                  onClick={() => setReleaseCategory("ott")}
                >
                  OTT
                </span>
              </div>
              <div className="schedules-list">
                <div className="schedules-list-item">
                  <span style={{ color: "red", fontWeight: "500" }}>Name</span>
                  <span style={{ color: "red", fontWeight: "500" }}>
                    Relese Data
                  </span>
                </div>
                {allReleases?.map((item, index) => (
                  <div
                    className="schedules-list-item sl-item"
                    key={index}
                    style={{
                      display: releaseCategory !== item?.category && "none",
                    }}
                    onClick={() => addUpdateRelease(item)}
                  >
                    <span className="text-center">{item?.movie}</span>
                    <span>{item?.date}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center das-mb20">No data exist</p>
          )}
        </div>
        <div className="box-shadow duo-con-50 br5">
          <h2 className="das-py20 text-center">Movie Collections</h2>
          {allCollections?.length > 0 ? (
            <div className="movie-schedules-section">
              <div className="current-schedules">
                <span
                  style={{
                    backgroundColor:
                      collectionsCategory === "1st-day-ap&ts"
                        ? "red"
                        : undefined,
                    color:
                      collectionsCategory === "1st-day-ap&ts"
                        ? "#fff"
                        : undefined,
                  }}
                  onClick={() => setCollectionsCategory("1st-day-ap&ts")}
                >
                  1st Day TS & AP
                </span>
                <span
                  style={{
                    backgroundColor:
                      collectionsCategory === "1st-day-ww" ? "red" : undefined,
                    color:
                      collectionsCategory === "1st-day-ww" ? "#fff" : undefined,
                  }}
                  onClick={() => setCollectionsCategory("1st-day-ww")}
                >
                  1st Day WW
                </span>
                <span
                  style={{
                    backgroundColor:
                      collectionsCategory === "closing-ww" ? "red" : undefined,
                    color:
                      collectionsCategory === "closing-ww" ? "#fff" : undefined,
                  }}
                  onClick={() => setCollectionsCategory("closing-ww")}
                >
                  Closing WW
                </span>
              </div>
              <div className="schedules-list">
                <div className="schedules-list-item">
                  <span style={{ color: "red", fontWeight: "500" }}>Name</span>
                  <span style={{ color: "red", fontWeight: "500" }}>
                    Relese Data
                  </span>
                </div>
                {allCollections?.map((item, index) => (
                  <div
                    className="schedules-list-item sl-item"
                    key={index}
                    style={{
                      display: collectionsCategory !== item?.category && "none",
                    }}
                    onClick={() => addUpdateCollection(item)}
                  >
                    <span className="text-center">{item?.movie}</span>
                    <span>₹ {item?.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center das-mb20">No data exist</p>
          )}
        </div>
      </div>

      <div className="das-m20 p10 das-d-flex main-duo-con">
        {updateRelease?.id === "" ? (
          <div className="box-shadow duo-con-50 das-mr20 br5">
            <h2 className="das-py20 text-center">Add Movie Release</h2>
            <div className="das-mx20">
              <div className="wns-box das-my20 das-py20">
                <h3 className="text-start">Add Movie / Series Name</h3>
                <input
                  type="text"
                  placeholder="Name Here..."
                  className="br5"
                  value={movie}
                  onChange={(e) => setMovie(e.target.value)}
                />
              </div>
              <div className="wns-box das-my20 das-py20">
                <h3 className="text-start">Add Release Date</h3>
                <input
                  type="text"
                  className="br5"
                  placeholder="Ex. 08 Nov 2024"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="wns-box das-my20 das-py20">
                <h3 className="text-start">Sub Category</h3>
                <select
                  name=""
                  id=""
                  className="br5"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Here</option>
                  <option value="movie">Movie</option>
                  <option value="ott">OTT</option>
                </select>
              </div>

              <div className="other-details das-mb20">
                <div></div>
                {!isSaving ? (
                  <div className="post-news-btn btn" onClick={onSubmit1}>
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
        ) : (
          <div className="box-shadow duo-con-50 das-mr20 br5">
            <h2 className="das-py20 text-center">Update Movie Release</h2>
            <div className="das-mx20">
              <div className="wns-box das-my20 das-py20">
                <h3 className="text-start">Add Movie / Series Name</h3>
                <input
                  type="text"
                  placeholder="Name Here..."
                  className="br5"
                  name="movie"
                  value={updateRelease?.movie}
                  onChange={handleURChange}
                />
              </div>
              <div className="wns-box das-my20 das-py20">
                <h3 className="text-start">Add Release Date</h3>
                <input
                  type="text"
                  className="br5"
                  placeholder="Ex. 08 Nov 2024"
                  name="date"
                  value={updateRelease?.date}
                  onChange={handleURChange}
                />
              </div>

              <div className="wns-box das-my20 das-py20">
                <h3 className="text-start">Sub Category</h3>
                <select
                  name="category"
                  id=""
                  className="br5"
                  value={updateRelease?.category}
                  onChange={handleURChange}
                >
                  <option value="">Select Here</option>
                  <option value="movie">Movie</option>
                  <option value="ott">OTT</option>
                </select>
              </div>

              <div className="other-details das-mb20">
                <div className="btn">
                  <span className="das-mr20" onClick={cancelURChange}>
                    Cancel
                  </span>
                  <span className="color-red">
                    <i
                      className="fa fa-trash"
                      onClick={() => deleteRelease(updateRelease?.id)}
                    ></i>
                  </span>
                </div>
                {!isSaving ? (
                  <div className="post-news-btn btn" onClick={editRelease}>
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
        )}

        {updateCollection?.id === "" ? (
          <div className="box-shadow duo-con-50 br5">
            <h2 className="das-py20 text-center">Add Movie Collection</h2>
            <div className="das-mx20">
              <div className="wns-box das-my20 das-py20">
                <h3 className="text-start">Add Movie / Series Name</h3>
                <input
                  type="text"
                  placeholder="Name Here..."
                  className="br5"
                  value={movie2}
                  onChange={(e) => setMovie2(e.target.value)}
                />
              </div>
              <div className="wns-box das-my20 das-py20">
                <h3 className="text-start">Add Amount (In ₹)</h3>
                <input
                  type="text"
                  placeholder="Ex. 222 CR"
                  className="br5"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="wns-box das-my20 das-py20">
                <h3 className="text-start">Category</h3>
                <select
                  name=""
                  id=""
                  className="br5"
                  value={category2}
                  onChange={(e) => setCategory2(e.target.value)}
                >
                  <option value="">Select Here</option>
                  <option value="1st-day-ap&ts">1st Day TS & AP</option>
                  <option value="1st-day-ww">1st Day WW</option>
                  <option value="closing-ww">Closing WW</option>
                </select>
              </div>

              <div className="other-details das-mb20">
                <div></div>
                {!isSaving2 ? (
                  <div className="post-news-btn btn" onClick={onSubmit2}>
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
        ) : (
          <div className="box-shadow duo-con-50 br5">
            <h2 className="das-py20 text-center">Update Movie Collection</h2>
            <div className="das-mx20">
              <div className="wns-box das-my20 das-py20">
                <h3 className="text-start">Add Movie / Series Name</h3>
                <input
                  type="text"
                  placeholder="Name Here..."
                  className="br5"
                  name="movie"
                  value={updateCollection?.movie}
                  onChange={handleUCChange}
                />
              </div>
              <div className="wns-box das-my20 das-py20">
                <h3 className="text-start">Add Amount (In ₹)</h3>
                <input
                  type="text"
                  placeholder="Ex. 222 CR"
                  className="br5"
                  name="amount"
                  value={updateCollection?.amount}
                  onChange={handleUCChange}
                />
              </div>

              <div className="wns-box das-my20 das-py20">
                <h3 className="text-start">Category</h3>
                <select
                  name="category"
                  id=""
                  className="br5"
                  value={updateCollection?.category}
                  onChange={handleUCChange}
                >
                  <option value="">Select Here</option>
                  <option value="1st-day-ap&ts">1st Day TS & AP</option>
                  <option value="1st-day-ww">1st Day WW</option>
                  <option value="closing-ww">Closing WW</option>
                </select>
              </div>

              <div className="other-details das-mb20">
                <div className="btn">
                  <span className="das-mr20" onClick={cancelUCChange}>
                    Cancel
                  </span>
                  <span className="color-red">
                    <i
                      className="fa fa-trash"
                      onClick={() => deleteCollection(updateCollection?.id)}
                    ></i>
                  </span>
                </div>
                {!isSaving2 ? (
                  <div className="post-news-btn btn" onClick={editCollection}>
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
        )}
      </div>
    </>
  );
};

export default DasCR;
