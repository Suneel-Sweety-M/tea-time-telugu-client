import React, { useEffect, useState } from "react";
import SectionTitle from "../titles/SectionTitle";
import { toast } from "react-toastify";
import { getMovieReleases } from "../../helper/apis";

const MovieSchedules = () => {
  const [allReleases, setAllReleases] = useState([]);
  const [releaseCategory, setReleaseCategory] = useState("movie");

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

  useEffect(() => {
    getReleases();
  }, []);
  return (
    <>
      <div className="movie-schedules-container">
        <SectionTitle title={"Movie Schedules"} />
        <div className="movie-schedules-section">
          <div className="current-schedules">
            <span
              style={{
                backgroundColor:
                  releaseCategory === "movie" ? "red" : undefined,
                color: releaseCategory === "movie" ? "#fff" : undefined,
              }}
              onClick={() => setReleaseCategory("movie")}
              className="ms-text"
            >
              Movies
            </span>
            <span
              style={{
                backgroundColor: releaseCategory === "ott" ? "red" : undefined,
                color: releaseCategory === "ott" ? "#fff" : undefined,
              }}
              onClick={() => setReleaseCategory("ott")}
              className="ms-text"
            >
              OTT
            </span>
          </div>
          <div className="schedules-list">
            <div className="schedules-list-item">
              <span
                style={{ color: "red", fontWeight: "500" }}
                className="ms-text"
              >
                Name
              </span>
              <span
                style={{ color: "red", fontWeight: "500" }}
                className="ms-text"
              >
                Release Date
              </span>
            </div>

            {allReleases?.map((item, index) => (
              <div
                className="schedules-list-item"
                key={index}
                style={{
                  display: releaseCategory !== item?.category && "none",
                }}
              >
                <span className="text-center ms-text">{item?.movie}</span>
                <span className="ms-text">{item?.date} </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieSchedules;
